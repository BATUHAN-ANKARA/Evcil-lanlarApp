/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DATA from './Data/Data';
import {Modalize} from 'react-native-modalize';
import DogSvg from '../../../assets/images/DogSvg';
import CatSvg from '../../../assets/images/CatSvg';
import BirdSvg from '../../../assets/images/BirdSvg';
import FishSvg from '../../../assets/images/FishSvg';
import axios from 'axios';
import Loader from '../Loader';
import {HomeStyle} from '../../style/styles';

const screenWidth = Dimensions.get('screen').width;

const HomeScreen = ({navigation, route}) => {
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      }),
    [navigation],
  );
  const [dummyData, setDummyData] = useState([]);
  const [loader, setLoader] = useState(true);
  async function fetchData() {
    await axios
      .get('https://reqres.in/api/users?page=2')
      .then(function (response) {
        setDummyData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [dummyData2, setDummyData2] = useState([]);
  async function fetchData2() {
    await axios
      .get('https://reqres.in/api/users?page=2')
      .then(function (response) {
        setDummyData2(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
    fetchData2();
    setLoader(false);
  }, []);

  const [check, setCheck] = useState(false);
  const invoiceModalRef = useRef(null);
  const invoiceAddModal = async () => {
    invoiceModalRef.current?.open();
  };
  const invoiceAddModalUserClose = async () => {
    invoiceModalRef.current?.close();
  };
  const [profileComplete, setProfileComplete] = useState(false);

  const [modalValue, setModalValue] = useState('Terrier, yavru ara');
  const openModal = index => {
    setModalValue(index);
    invoiceAddModal();
  };

  return (
    <SafeAreaView style={HomeStyle.container}>
      {loader ? (
        <View
          style={{
            position: 'absolute',
            top: screenWidth,
            alignSelf: 'center',
            backgroundColor: 'grey',
            width: '50%',
            height: 100,
            padding: 20,
            zIndex: 9,
            opacity: 0.8,
          }}>
          <Loader />
          <Text style={{color: '#fff', fontSize: 18, alignSelf: 'center'}}>
            Lütfen Bekleyin
          </Text>
        </View>
      ) : null}
      <Modalize
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          scrollEnabled: false,
        }}
        ref={invoiceModalRef}
        modalStyle={{flex: 1}}
        panGestureEnabled={false}
        disableScrollIfPossible={false}
        withHandle={false}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTop}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={invoiceAddModalUserClose}>
                <Ionicons name="close-outline" size={25} />
              </TouchableOpacity>
              <Text style={styles.modalHeaderTitle}>İlan ara</Text>
            </View>
            <View style={styles.modalInputArea}>
              <TextInput
                value={modalValue}
                onChangeText={value => setModalValue(value)}
                onSubmitEditing={() =>
                  navigation.navigate('PetSearch', {search: modalValue})
                }
                placeholderTextColor="#888"
                style={{width: '85%', height: '100%', alignSelf: 'flex-end'}}
              />
              <Ionicons
                name="search-outline"
                size={20}
                color="#14B219"
                style={{position: 'absolute', top: 14, left: 15}}
              />
            </View>

            <View style={styles.modalPrivateArea}>
              <TouchableOpacity onPress={() => setCheck(!check)}>
                {!check ? (
                  <Ionicons name="square-outline" size={22} color="#888" />
                ) : (
                  <Ionicons name="checkbox" size={22} color="#14B219" />
                )}
              </TouchableOpacity>
              <Text style={styles.modalPrivateText}>
                Özel sahiplerin ilanlarını göster
              </Text>
            </View>
            <View
              style={{
                width: screenWidth,
                borderWidth: 0.5,
                borderColor: '#888',
              }}
            />
            <ScrollView
              style={{}}
              horizontal
              showsHorizontalScrollIndicator={false}>
              <View style={styles.modalCategories}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PetSearch')}
                  style={styles.modalCategoriesCardArea}>
                  <View style={styles.modalCategoriesCard} />
                  <Text style={{marginTop: 5}}>Köpek</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalCategories}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PetSearch')}
                  style={styles.modalCategoriesCardArea}>
                  <View style={styles.modalCategoriesCard} />
                  <Text style={{marginTop: 5}}>Kedi</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalCategories}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PetSearch')}
                  style={styles.modalCategoriesCardArea}>
                  <View style={styles.modalCategoriesCard} />
                  <Text style={{marginTop: 5}}>Kuş</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalCategories}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PetSearch')}
                  style={styles.modalCategoriesCardArea}>
                  <View style={styles.modalCategoriesCard} />
                  <Text style={{marginTop: 5}}>Balık</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalCategories}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PetSearch')}
                  style={styles.modalCategoriesCardArea}>
                  <View style={styles.modalCategoriesCard} />
                  <Text style={{marginTop: 5}}>Tavşan</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalCategories}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PetSearch')}
                  style={styles.modalCategoriesCardArea}>
                  <View style={styles.modalCategoriesCard} />
                  <Text style={{marginTop: 5}}>At</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <View
              style={{
                width: screenWidth,
                borderWidth: 0.5,
                borderColor: '#888',
              }}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginBottom:
                Platform.OS === 'android'
                  ? screenWidth - (screenWidth - 80)
                  : screenWidth - (screenWidth - 30),
            }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              <View style={styles.modalRecent}>
                <Text style={styles.modalRecentTitle}>Son Aramalar</Text>
                {dummyData2.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => navigation.navigate('PetSearch')}
                    style={styles.modalRecentButton}>
                    <Ionicons name="search-outline" size={20} color="#888" />
                    <Text style={styles.modalRecentText}>
                      {item.first_name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={{...styles.modalRecent, marginTop: 10}}>
                <Text style={styles.modalRecentTitle}>Popüler Aramalar</Text>
                {dummyData2.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => navigation.navigate('PetSearch')}
                    style={styles.modalRecentButton}>
                    <Ionicons name="search-outline" size={20} color="#888" />
                    <Text style={styles.modalRecentText}>{item.last_name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </Modalize>

      <View style={HomeStyle.header}>
        <View style={HomeStyle.header_top}>
          {/* <TouchableOpacity onPress={() => navigation.dispatch()}>
            <Ionicons name="chevron-back" color="#fff" size={25} />
          </TouchableOpacity> */}
          <View style={{width: 40, height: 40}}></View>
          <View style={{}}>
            <Text style={HomeStyle.title}>Evcil Hayvan Ara</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications" color="#fff" size={25} />
          </TouchableOpacity>
        </View>
        <View style={HomeStyle.header_bottom}>
          <TouchableOpacity
            style={HomeStyle.header_button}
            onPress={() => openModal('')}>
            <Ionicons name="search" color="#333" size={20} />
            <Text style={HomeStyle.header_button_text}>
              Ara: terrier, yavru kedi, doberman vb.
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={HomeStyle.body}>
        <View style={HomeStyle.categories}>
          <TouchableOpacity
            onPress={() => openModal('Köpek')}
            style={HomeStyle.categorieTab}>
            <DogSvg />
            <Text style={HomeStyle.categorieTitle}>Köpek</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openModal('Kedi')}
            style={HomeStyle.categorieTab}>
            <CatSvg />
            <Text style={HomeStyle.categorieTitle}>Kedi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openModal('Kuş')}
            style={HomeStyle.categorieTab}>
            <View style={{marginTop: 5}}>
              <BirdSvg />
            </View>
            <Text style={HomeStyle.categorieTitle}>Kuş</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openModal('Balık')}
            style={HomeStyle.categorieTab}>
            <FishSvg />
            <Text style={HomeStyle.categorieTitle}>Balık</Text>
          </TouchableOpacity>
        </View>

        {profileComplete ? (
          <View style={HomeStyle.card}>
            <Text style={HomeStyle.card_title}>
              Mükemmel eşleşmeni bulalım!
            </Text>
            <Text style={HomeStyle.card_text}>Aramanı filtrele.</Text>
            <TouchableOpacity
              style={HomeStyle.card_button}
              onPress={invoiceAddModal}>
              <Text style={HomeStyle.card_button_text}>BAŞLAYALIM</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={HomeStyle.card}>
            <Text style={HomeStyle.card_title}>Profilini Tamamlayalım</Text>
            <Text style={HomeStyle.card_text}>Bize kendinden bahset</Text>
            <TouchableOpacity
              style={HomeStyle.card_button}
              onPress={() => navigation.navigate('AboutMe')}>
              <Text style={HomeStyle.card_button_text}>BAŞLAYALIM</Text>
            </TouchableOpacity>
          </View>
        )}

        <View>
          <Text
            style={{
              marginVertical: 20,
              fontFamily: 'Manrope-SemiBold',
              fontSize: 19,
              color: '#333',
            }}>
            Son aramanıza göre sonuçlar
          </Text>

          <View style={HomeStyle.recentSearch}>
            <FlatList
              data={dummyData}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={HomeStyle.recentSearchCard}
                  onPress={() =>
                    navigation.navigate('Detail', {
                      id: item.id,
                      name: item.first_name,
                    })
                  }>
                  <View
                    style={{
                      backgroundColor: 'green',
                      flex: 0.8,
                      borderRadius: 5,
                    }}>
                    <Image
                      source={{uri: item.avatar}}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                      }}
                    />
                  </View>
                  <View style={HomeStyle.recentSearchBottom}>
                    <Text>{item.first_name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>

        <View style={HomeStyle.add}>
          <Text onPress={() => setProfileComplete(!profileComplete)}>
            Profil tamamlandı/tamamlanmadı
          </Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {dummyData.map(item => (
              <Text>{item.first_name}</Text>
            ))}
          </ScrollView>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={dummyData}
            renderItem={({item}) => (
              <Text style={{fontSize: 14, color: '#0F205B'}}>
                {item.first_name}
              </Text>
            )}
            keyExtractor={item => item.id}
          />
        </View>

        <View style={HomeStyle.searchPopular}>
          <Text style={HomeStyle.popularTitle}>Popüler Aramalar</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: 15,
              paddingBottom: 10,
            }}>
            {DATA.map(data => {
              return (
                <TouchableOpacity
                  onPress={() => openModal(data.title)}
                  style={{
                    backgroundColor: '#F8FFDB',
                    height: 52,
                    justifyContent: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#B3FFAE',
                    paddingHorizontal: 10,
                    margin: 5,
                  }}>
                  <Text
                    style={{
                      padding: 5,
                      fontFamily: 'Manrope-SemiBold',
                      fontSize: 13,
                      color: '#14B219',
                    }}>
                    {data.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalTop: {
    backgroundColor: '#fff',
  },
  modalRecentButton: {
    width: screenWidth,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  modalRecentText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#3C4048',
    marginHorizontal: 10,
  },
  modalRecentTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 15,
    color: '#000',
    marginHorizontal: 10,
    marginTop: 10,
  },
  modalRecent: {
    width: screenWidth,
  },
  modalScrollView: {
    height: 200,
    backgroundColor: 'red',
    marginBottom: 10,
    marginTop: 5,
  },
  modalInputArea: {
    height: 50,
    alignSelf: 'center',
    borderWidth: 1,
    width: screenWidth - 20,
    marginTop: 10,
    borderRadius: 5,
    paddingRight: 5,
    borderColor: '#14B219',
  },
  modalHeader: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.22,

    elevation: 3,
  },
  modalCloseButton: {
    borderRadius: 99,
    marginLeft: 10,
  },
  modalHeaderTitle: {
    marginLeft: 20,
    fontFamily: 'Manrope-Regular',
    fontSize: 18,
    color: '#888',
  },
  modalCategoriesCardArea: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modalCategoriesCard: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  modalCategories: {
    height: 80,
    marginVertical: 10,
    flexDirection: 'row',
  },
  modalPrivateText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 13,
    color: '#3C4048',
    marginLeft: 10,
  },
  modalPrivateArea: {
    width: screenWidth - 20,
    alignSelf: 'center',
    height: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalContainer: {
    paddingTop: Platform.OS === 'android' ? 10 : 40,
    height: Dimensions.get('screen').height,
    paddingBottom: 60,
  },
});
