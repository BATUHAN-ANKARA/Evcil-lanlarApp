import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modalize} from 'react-native-modalize';
import axios from 'axios';
import {CreateAdScreen2Style} from '../../style/styles';

const screenWidth = Dimensions.get('window').width;

const PurchaseStep2 = ({navigation, route}) => {
  const [invoice, setInvoice] = useState(false);
  const [rules, setRules] = useState(true);

  const [dummyData2, setDummyData2] = useState([]);
  async function fetchData() {
    await axios
      .get('https://reqres.in/api/users?page=1')
      .then(function (response) {
        setDummyData2(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [packageName, setPackageNAme] = useState(route.params.packageName);
  const [cost, setCost] = useState(route.params.cost);
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');

  const ageModalRef = useRef();
  const rulesModalRef = useRef();
  const rulesAddModal = async () => {
    rulesModalRef.current?.open();
  };
  const rulesAddModalUserClose = async () => {
    rulesModalRef.current?.close();
  };
  const ageAddModal = async () => {
    ageModalRef.current?.open();
  };
  const ageAddModalUserClose = async () => {
    ageModalRef.current?.close();
  };

  const [modalType, setModalType] = useState('');
  const openModal = type => {
    if (type === 'İl') {
      ageAddModal();
      setModalType('İl');
    } else if (type === 'İlçe') {
      ageAddModal();
      setModalType('İlçe');
    }
  };

  const selectCity = city => {
    setCity(city);
    ageAddModalUserClose();
  };
  const selectTown = town => {
    setTown(town);
    ageAddModalUserClose();
  };

  const renderModalCity = ({item, index}) => (
    <>
      <TouchableOpacity
        onPress={() => selectCity(item.first_name)}
        style={styles.modalOptions}>
        <Text>{item.first_name}</Text>
      </TouchableOpacity>
    </>
  );
  const renderModalTown = ({item, index}) => (
    <>
      <TouchableOpacity
        onPress={() => selectTown(item.last_name)}
        style={styles.modalOptions}>
        <Text>{item.last_name}</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>İlan Hakkı Al</Text>
        <View style={{width: 40, height: 40}} />
      </View>

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.pageTitle}>Bilgileriniz</Text>

          <View style={styles.row}>
            <View style={{width: '48%'}}>
              <Text style={styles.inputLabel}>Adınız</Text>
              <TextInput style={styles.inputArea} />
            </View>
            <View style={{width: '48%'}}>
              <Text style={styles.inputLabel}>Soyadınız</Text>
              <TextInput style={styles.inputArea} />
            </View>
          </View>

          <View style={styles.row}>
            <View style={{width: '48%'}}>
              <Text style={styles.inputLabel}>E-posta Adresiniz</Text>
              <TextInput
                autoCorrect={false}
                style={styles.inputArea}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCompleteType="email"
              />
            </View>
            <View style={{width: '48%'}}>
              <Text style={styles.inputLabel}>Telefon</Text>
              <TextInput style={styles.inputArea} keyboardType="number-pad" />
            </View>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={{width: '30%'}}
              onPress={() => openModal('İl')}>
              <Text style={styles.inputLabel}>İl Seçiniz</Text>
              <View
                style={{
                  ...styles.inputArea,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.inputText}>{city}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openModal('İlçe')}
              style={{width: '30%'}}>
              <Text style={styles.inputLabel}>İlçe Seçiniz</Text>
              <View
                style={{
                  ...styles.inputArea,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.inputText}>{town}</Text>
              </View>
            </TouchableOpacity>

            <View style={{width: '30%'}}>
              <Text style={styles.inputLabel}>Posta Kodu</Text>
              <TextInput
                style={styles.inputArea}
                keyboardType="number-pad"
                maxLength={5}
              />
            </View>
          </View>

          <View style={styles.greyBox}>
            <Text style={styles.greyBoxTitle}>Fatura Gönderim Tercihi</Text>

            <TouchableOpacity
              onPress={() => setInvoice(true)}
              style={styles.greyBoxRow}>
              {invoice ? (
                <Ionicons name="ellipse" color="#444" size={17} />
              ) : (
                <Ionicons name="ellipse-outline" color="#444" size={17} />
              )}
              <Text style={styles.optionText}>
                Fatura gönderilmesini istiyorum.{' '}
                <Text
                  style={{
                    ...styles.optionText,
                    fontFamily: 'Manrope-Bold',
                  }}>
                  (+5 TL)
                </Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setInvoice(false)}
              style={styles.greyBoxRow}>
              {invoice ? (
                <Ionicons name="ellipse-outline" color="#444" size={17} />
              ) : (
                <Ionicons name="ellipse" color="#444" size={17} />
              )}
              <Text style={styles.optionText}>
                Fatura gönderilmesini istemiyorum.
              </Text>
            </TouchableOpacity>
          </View>

          {invoice ? (
            <View style={{width: '100%'}}>
              <Text style={styles.inputLabel}>Fatura Adresiniz</Text>
              <TextInput
                multiline
                style={styles.invoiceArea}
                autoCorrect={false}
              />
            </View>
          ) : null}

          <View style={styles.summaryCard}>
            <View style={styles.summaryCardRow}>
              <Text style={styles.summaryCardBold}>Seçtiğiniz Paket</Text>
              <Text style={styles.summaryCardRegular}>{packageName}</Text>
            </View>

            <View style={styles.seperator}></View>

            <View style={styles.summaryCardRow}>
              <Text style={styles.summaryCardBold}>Genel Toplam</Text>
              <Text style={styles.summaryCardRegular}>₺ {cost}</Text>
            </View>

            <TouchableOpacity
              onPress={() => setRules(!rules)}
              style={styles.summaryRulesArea}>
              {rules ? (
                <Ionicons name="checkbox" size={20} color="#986108" />
              ) : (
                <Ionicons name="square-outline" size={20} color="#986108" />
              )}
              <Text style={styles.summaryCardRulesText}>
                <Text
                  onPress={rulesAddModal}
                  style={{
                    ...styles.summaryCardRulesText,
                    fontFamily: 'Manrope-ExtraBold',
                  }}>
                  Satış sözleşmesini
                </Text>{' '}
                okudum ve kabul ediyorum
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('PurchaseStep3')}
            style={styles.nextButton}>
            <Text style={styles.nextButtonText}>DEVAM ET</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Modalize
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          scrollEnabled: false,
        }}
        withHandle={false}
        panGestureEnabled={false}
        disableScrollIfPossible={false}
        ref={ageModalRef}
        modalStyle={{flex: 0.35, backgroundColor: '#fff'}}>
        <View
          style={{
            alignItems: 'center',
            height: 200,
            marginVertical: 30,
          }}>
          <Text style={CreateAdScreen2Style.moneyTypeOptionsTitle}>
            {modalType} Seçiniz
          </Text>

          <View style={{width: screenWidth - 20, marginVertical: 20}}>
            {modalType === 'İl' ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={dummyData2}
                renderItem={renderModalCity}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : null}
            {modalType === 'İlçe' ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={dummyData2}
                renderItem={renderModalTown}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : null}
          </View>
        </View>
      </Modalize>

      <Modalize
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          scrollEnabled: false,
        }}
        ref={rulesModalRef}
        modalStyle={{flex: 0.35, backgroundColor: '#fff'}}>
        <View
          style={{
            alignItems: 'center',
            height: 300,
            marginVertical: 0,
          }}>
          <Text style={CreateAdScreen2Style.moneyTypeOptionsTitle}>
            Satış Sözleşmesi
          </Text>

          <ScrollView
            style={{width: screenWidth - 20, marginTop: 20, marginBottom: 40}}>
            <Text style={styles.rulesText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              lobortis enim quis lobortis sollicitudin. Praesent aliquet in quam
              eu congue. In nec magna vitae diam aliquet ornare quis ut tellus.
              Sed non aliquet nisi. Suspendisse rutrum ex est, quis eleifend est
              consectetur eu. Fusce pellentesque ipsum vel commodo fermentum.
              Donec vitae tincidunt sapien. Etiam condimentum rutrum dui a
              facilisis. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia curae; Phasellus volutpat dui purus, quis
              posuere est placerat eget. Mauris tincidunt eros ipsum, id aliquet
              erat tincidunt at. Nunc non aliquet nulla. Morbi luctus
              sollicitudin diam, sit amet pretium ipsum malesuada quis.
              Curabitur ante odio, ornare ut elit sed, auctor rhoncus lacus. Sed
              viverra felis et augue pretium blandit. Proin placerat, tellus
              vitae fringilla pharetra, nibh odio bibendum massa, eu tempor leo
              neque ut felis. Mauris ac orci et ante imperdiet auctor eget a
              nisi. Cras quis eleifend urna. Duis pellentesque nisl non sapien
              venenatis fermentum. Nullam non est nec eros convallis euismod. Ut
              hendrerit aliquam varius. Etiam tincidunt est in lorem tristique,
              nec ullamcorper tortor consequat. Etiam libero metus, pharetra
              vitae pharetra in, feugiat eget turpis. Aenean vitae augue vitae
              leo auctor consequat. Integer non massa magna. Cras fermentum
              suscipit justo in commodo. Sed a suscipit augue. Etiam scelerisque
              rutrum est convallis condimentum. Vestibulum tincidunt
              pellentesque cursus. Curabitur eget cursus dolor. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Phasellus viverra tortor a ipsum molestie
              eleifend. Nulla facilisi. Maecenas lacinia nunc fringilla gravida
              mattis. Nullam ac faucibus neque. Sed finibus quam eu erat
              maximus, quis rhoncus dolor vulputate. Nulla convallis urna sit
              amet massa facilisis facilisis. Nunc et cursus odio, ut vestibulum
              ante. Pellentesque ut eros in libero vestibulum malesuada. Nam id
              pretium lectus. Proin ligula magna, semper ut hendrerit eu,
              consequat sed nibh. Vivamus venenatis sit amet ex at porttitor.
              Maecenas ipsum eros, faucibus et rutrum nec, tincidunt eu libero.
              Aenean bibendum sodales ligula non bibendum. Ut vitae auctor
              turpis, eu faucibus ipsum. Morbi bibendum dignissim sapien viverra
              ultrices. Ut porta feugiat eros non maximus. Vestibulum nec nisi
              eros. Nam quis tempor est. Donec ligula odio, malesuada sed dui
              ullamcorper, imperdiet tempus nisi. Morbi rutrum a urna venenatis
              vestibulum. Curabitur nulla nibh, congue quis nunc ac, aliquam
              rutrum erat. Etiam quis sagittis urna.
            </Text>
          </ScrollView>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default PurchaseStep2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 0.1,
    backgroundColor: '#1F5D44',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Manrope-Bold',
    color: '#fff',
    fontSize: 20,
  },
  body: {
    flex: 1,
    padding: 10,
  },
  pageTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#444',
    lineHeight: 30,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputArea: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 5,
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#14B219',
  },
  inputLabel: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    marginBottom: 10,
  },
  greyBox: {
    width: '100%',
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  greyBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  optionText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    marginLeft: 5,
    color: '#111',
  },
  greyBoxTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#111',
  },
  invoiceArea: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
  nextButton: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#14B219',
    height: 45,
    marginVertical: 20,
    borderRadius: 10,
  },
  nextButtonText: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 18,
    color: '#fff',
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#fff7e1',
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
  summaryCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryCardBold: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 16,
    color: '#986108',
  },
  summaryCardRegular: {
    fontFamily: 'Manrope-Bold',
    fontSize: 15,
    color: '#333',
  },
  seperator: {
    width: '100%',
    borderColor: '#986108',
    borderWidth: 0.5,
    marginVertical: 10,
  },
  summaryRulesArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  summaryCardRulesText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 14,
    color: '#986108',
    marginLeft: 5,
  },
  modalOptions: {
    height: 40,
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderColor: '#ccc',
  },
  moneyTypeOptions: {
    height: 40,
    justifyContent: 'space-between',
    width: screenWidth,
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 10,
    borderBottomWidth: 0.8,
    borderColor: '#ccc',
  },
  inputText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 14,
    color: '#14B219',
  },
  rulesText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    lineHeight: 23,
    color: '#222',
  },
});
