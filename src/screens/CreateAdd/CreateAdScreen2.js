/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
  TextInput,
  PermissionsAndroid,
  Image,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modalize} from 'react-native-modalize';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {CreateAdScreen2Style} from '../../style/styles';

const screenWidth = Dimensions.get('window').width;

const CreateAdScreen2 = ({navigation, route}) => {
  const [adTitle, setAdTitle] = useState('');
  const [explanation, setExplanation] = useState('');
  const [cost, setCost] = useState('yes');
  const [gender, setGender] = useState('');
  const [adCost, setAdCost] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');
  const [age, setAge] = useState('');
  const [permission, setPermission] = useState(true);
  const [rules, setRules] = useState(true);
  const [moneyType, setMoneyType] = useState('');
  const selectCity = city => {
    setCity(city);
    ageAddModalUserClose();
  };
  const selectTown = town => {
    setTown(town);
    ageAddModalUserClose();
  };
  const selectAge = age => {
    setAge(age);
    ageAddModalUserClose();
  };
  const selectMoneyType = item => {
    setMoneyType(item);
    ageAddModalUserClose();
  };
  const next = () => {
    if (adTitle && explanation && gender && age && rules) {
      if (cost === 'yes' && moneyType != '') {
        navigation.navigate('CreateAd3');
      } else if (cost === 'no' || cost === 'maybe') {
        navigation.navigate('CreateAd3');
      } else {
        alert('Gerekli bilgileri eksiksiz doldurun');
      }
    } else {
      alert('Gerekli bilgileri eksiksiz doldurun');
    }
  };
  const ageModalRef = useRef();
  const ageAddModal = async () => {
    ageModalRef.current?.open();
  };
  const ageAddModalUserClose = async () => {
    ageModalRef.current?.close();
  };

  const [modalType, setModalType] = useState('');
  const openModal = type => {
    if (type === 'Yaş') {
      ageAddModal();
      setModalType('Yaş');
    } else if (type === 'İl') {
      ageAddModal();
      setModalType('İl');
    } else if (type === 'İlçe') {
      ageAddModal();
      setModalType('İlçe');
    } else if (type === 'Birim') {
      ageAddModal();
      setModalType('Birim');
    }
  };
  const [dummyData2, setDummyData2] = useState([]);
  const [loader, setLoader] = useState(true);
  async function fetchData() {
    await axios
      .get('https://reqres.in/api/users?page=1')
      .then(function (response) {
        setDummyData2(response.data.data);
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  const renderModalMoney = ({item, index}) => (
    <>
      <TouchableOpacity
        onPress={() => selectMoneyType(item.last_name)}
        style={styles.moneyTypeOptions}>
        <Text style={CreateAdScreen2Style.moneyTypeOptionsText}>
          {item.first_name}
        </Text>
        <Text style={{...CreateAdScreen2Style.moneyTypeOptionsText}}>
          {item.last_name}
        </Text>
      </TouchableOpacity>
    </>
  );
  const renderModalAge = ({item, index}) => (
    <>
      <TouchableOpacity
        onPress={() => selectAge(item.id)}
        style={styles.modalOptions}>
        <Text style={CreateAdScreen2Style.moneyTypeOptionsText}>{item.id}</Text>
      </TouchableOpacity>
    </>
  );
  const renderModalCity = ({item, index}) => (
    <>
      <TouchableOpacity
        onPress={() => selectCity(item.first_name)}
        style={styles.modalOptions}>
        <Text style={CreateAdScreen2Style.moneyTypeOptionsText}>
          {item.first_name}
        </Text>
      </TouchableOpacity>
    </>
  );
  const renderModalTown = ({item, index}) => (
    <>
      <TouchableOpacity
        onPress={() => selectTown(item.last_name)}
        style={styles.modalOptions}>
        <Text style={CreateAdScreen2Style.moneyTypeOptionsText}>
          {item.last_name}
        </Text>
      </TouchableOpacity>
    </>
  );

  const [selectedImages, setSelectedImages] = useState([]);
  const pickImages = () => {
    const options = {
      title: 'Select Images',
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 15,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const images = response.assets.map(asset => asset.uri);
        setSelectedImages([...selectedImages, ...images]);
        console.log('selectedimages=>', selectedImages);
      }
    });
  };

  const removeImage = index => {
    console.log(index);
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const renderItem = ({item, index}) => (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity>
        <View style={CreateAdScreen2Style.selectedImagesArea}>
          <Image source={{uri: item}} style={{width: 140, height: 140}} />
          <TouchableOpacity
            onPress={() => removeImage(index)}
            style={CreateAdScreen2Style.imgDeleteButton}>
            <Ionicons name="close-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={CreateAdScreen2Style.container}>
      <View style={CreateAdScreen2Style.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={CreateAdScreen2Style.headerButton}>
          <Ionicons name="chevron-back" size={25} color="#fff" />
        </TouchableOpacity>

        <Text style={CreateAdScreen2Style.headerTitle}>İlan Detayları</Text>

        <View style={{width: 40, height: 40}} />
      </View>

      <View style={{flex: 1, margin: 10}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
          enabled>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{}}>
              <Text style={CreateAdScreen2Style.inputLabel}>İlan Başlığı</Text>
              <View style={styles.inputArea}>
                <TextInput
                  placeholder="İlan Başlığı"
                  onChangeText={val => setAdTitle(val)}
                  onSubmitEditing={() => alert(adTitle)}
                  style={{padding: 10}}
                />
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <Text style={CreateAdScreen2Style.inputLabel}>Açıklama</Text>

              <View style={{...styles.inputArea}}>
                <TextInput
                  multiline={true}
                  placeholder="İlan Açıklaması"
                  onChangeText={val => setExplanation(val)}
                  style={{padding: 10}}
                />
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <Text style={CreateAdScreen2Style.inputLabel}>
                Fiyat Vermek İstiyor Musunuz ?
              </Text>
              <View style={CreateAdScreen2Style.inputRow}>
                <TouchableOpacity
                  onPress={() => setCost('yes')}
                  style={{flexDirection: 'row', marginRight: 20}}>
                  {cost === 'yes' ? (
                    <Ionicons name="checkbox" size={20} color="#14B219" />
                  ) : (
                    <Ionicons name="square-outline" size={20} color="#aaa" />
                  )}
                  <Text style={CreateAdScreen2Style.optionText}>Evet</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setCost('maybe')}
                  style={{flexDirection: 'row', marginRight: 20}}>
                  {cost === 'maybe' ? (
                    <Ionicons name="checkbox" size={20} color="#14B219" />
                  ) : (
                    <Ionicons name="square-outline" size={20} color="#aaa" />
                  )}
                  <Text style={CreateAdScreen2Style.optionText}>Görüşülür</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setCost('no')}
                  style={{flexDirection: 'row', marginRight: 20}}>
                  {cost === 'no' ? (
                    <Ionicons name="checkbox" size={20} color="#14B219" />
                  ) : (
                    <Ionicons name="square-outline" size={20} color="#aaa" />
                  )}
                  <Text style={CreateAdScreen2Style.optionText}>
                    Ücretsiz Sahiplendirme
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {cost === 'yes' ? (
              <View style={{marginTop: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: '60%'}}>
                    <Text style={CreateAdScreen2Style.inputLabel}>Fiyat</Text>
                    <View
                      style={{
                        ...styles.inputAreaMoney,
                        alignSelf: 'flex-start',
                      }}>
                      <TextInput
                        placeholder="İlan Fiyatı"
                        onChangeText={val => setAdCost(val)}
                        style={{padding: 10}}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => openModal('Birim')}
                    style={{
                      ...styles.inputArea,
                      width: '35%',
                      alignSelf: 'flex-end',
                      padding: 10,
                    }}>
                    {moneyType === '' ? (
                      <Text style={CreateAdScreen2Style.inputAgeText}>
                        Birim Seçiniz
                      </Text>
                    ) : (
                      <Text
                        style={{
                          ...CreateAdScreen2Style.inputAgeText,
                          color: '#14B219',
                        }}>
                        {moneyType}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={CreateAdScreen2Style.infoText}>
                    Doğru Fiyat = Hızlı Sonuç
                  </Text>
                  <Text style={CreateAdScreen2Style.infoTextGrey}>
                    Rakamlar arasında ' . , ' kullanmayınız.
                  </Text>
                </View>
              </View>
            ) : null}

            <View style={{marginTop: 20}}>
              <Text style={CreateAdScreen2Style.inputLabel}>Cinsiyet</Text>

              <View style={CreateAdScreen2Style.inputRow}>
                <TouchableOpacity
                  onPress={() => setGender('male')}
                  style={{flexDirection: 'row', marginRight: 20}}>
                  {gender === 'male' ? (
                    <Ionicons name="checkbox" size={20} color="#14B219" />
                  ) : (
                    <Ionicons name="square-outline" size={20} color="#aaa" />
                  )}
                  <Text style={CreateAdScreen2Style.optionText}>Erkek</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setGender('female')}
                  style={{flexDirection: 'row', marginRight: 20}}>
                  {gender === 'female' ? (
                    <Ionicons name="checkbox" size={20} color="#14B219" />
                  ) : (
                    <Ionicons name="square-outline" size={20} color="#aaa" />
                  )}
                  <Text style={CreateAdScreen2Style.optionText}>Dişi</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setGender('both')}
                  style={{flexDirection: 'row', marginRight: 20}}>
                  {gender === 'both' ? (
                    <Ionicons name="checkbox" size={20} color="#14B219" />
                  ) : (
                    <Ionicons name="square-outline" size={20} color="#aaa" />
                  )}
                  <Text style={CreateAdScreen2Style.optionText}>
                    Her İkisi De
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <Text style={CreateAdScreen2Style.inputLabel}>Yaş Seçiniz</Text>
              <TouchableOpacity
                onPress={() => openModal('Yaş')}
                style={CreateAdScreen2Style.inputAge}>
                {age === '' ? (
                  <Text style={CreateAdScreen2Style.inputAgeText}>
                    Yaş Seçiniz
                  </Text>
                ) : (
                  <Text
                    style={{
                      ...CreateAdScreen2Style.inputAgeText,
                      color: '#14B219',
                    }}>
                    {age}
                  </Text>
                )}
                <Ionicons name="chevron-down" size={20} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={CreateAdScreen2Style.inputLabel}>İl Seçiniz</Text>
                <TouchableOpacity
                  onPress={() => openModal('İl')}
                  style={CreateAdScreen2Style.inputLocation}>
                  {city === '' ? (
                    <Text style={CreateAdScreen2Style.inputAgeText}>
                      İl Seçiniz
                    </Text>
                  ) : (
                    <Text
                      style={{
                        ...CreateAdScreen2Style.inputAgeText,
                        color: '#14B219',
                      }}>
                      {city}
                    </Text>
                  )}
                  <Ionicons name="chevron-down" size={20} />
                </TouchableOpacity>
              </View>

              {city != '' || null ? (
                <View>
                  <Text style={CreateAdScreen2Style.inputLabel}>
                    İlçe Seçiniz
                  </Text>
                  <TouchableOpacity
                    onPress={() => openModal('İlçe')}
                    style={CreateAdScreen2Style.inputLocation}>
                    {town === '' ? (
                      <Text style={CreateAdScreen2Style.inputAgeText}>
                        İlçe Seçiniz
                      </Text>
                    ) : (
                      <Text
                        style={{
                          ...CreateAdScreen2Style.inputAgeText,
                          color: '#14B219',
                        }}>
                        {town}
                      </Text>
                    )}
                    <Ionicons name="chevron-down" size={20} />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>

            <View style={{marginTop: 20}}>
              <Text style={CreateAdScreen2Style.inputLabel}>Fotoğraf Ekle</Text>
              <TouchableOpacity
                style={CreateAdScreen2Style.cameraArea}
                onPress={() => pickImages()}>
                <Ionicons name="camera-outline" size={40} color="#444" />
              </TouchableOpacity>
            </View>

            <View style={{}}>
              <FlatList
                data={selectedImages}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

            <TouchableOpacity
              onPress={() => setPermission(!permission)}
              style={CreateAdScreen2Style.permissionButton}>
              {permission ? (
                <Ionicons name="checkbox" size={20} color="#14B219" />
              ) : (
                <Ionicons name="square-outline" size={20} color="#aaa" />
              )}
              <Text
                style={{
                  ...CreateAdScreen2Style.rulesText,
                  marginLeft: 10,
                  fontSize: 15,
                }}>
                Diğer kullanıcılar bana mesaj gönderebilirler.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setRules(!rules)}
              style={{...CreateAdScreen2Style.permissionButton, marginTop: 0}}>
              {rules ? (
                <Ionicons name="checkbox" size={20} color="#14B219" />
              ) : (
                <Ionicons name="square-outline" size={20} color="#aaa" />
              )}
              <View style={CreateAdScreen2Style.rulesTextArea}>
                <TouchableOpacity onPress={() => alert('İlan verme kuralları')}>
                  <Text
                    style={{
                      ...CreateAdScreen2Style.rulesTextBold,
                      fontSize: 15,
                    }}>
                    İlan verme kurallarını
                  </Text>
                </TouchableOpacity>
                <Text style={{...CreateAdScreen2Style.rulesText, fontSize: 15}}>
                  {' '}
                  okudum, kabul ediyorum.
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => next()} style={styles.nextButton}>
              <Text style={CreateAdScreen2Style.nextButtonText}>İleri</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
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
            {modalType === 'Yaş' ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={dummyData2}
                renderItem={renderModalAge}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : null}
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
            {modalType === 'Birim' ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={dummyData2}
                renderItem={renderModalMoney}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : null}
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};
export default CreateAdScreen2;
const styles = StyleSheet.create({
  inputArea: {
    width: screenWidth - 20,
    alignSelf: 'center',
    height: 45,
    borderWidth: 0.8,
    borderRadius: 5,
    marginTop: 5,
    borderColor: '#555',
    justifyContent: 'center',
    padding: 0,
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
  nextButton: {
    width: screenWidth - 20,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#14B219',
    alignSelf: 'center',
    marginTop: 30,
  },
  inputAreaMoney: {
    width: '100%',
    alignSelf: 'center',
    height: 45,
    borderWidth: 0.8,
    borderRadius: 5,
    marginTop: 5,
    borderColor: '#555',
    justifyContent: 'center',
    padding: 0,
  },
});
