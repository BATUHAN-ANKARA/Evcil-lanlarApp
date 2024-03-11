/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Animated,
  Platform,
  Linking,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import persons from '../Home/Data/Persons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modalize} from 'react-native-modalize';
import LeftBack from '../../../assets/images/LeftBack';
import Dots from '../../../assets/images/Dots';
import Calendar from '../../../assets/images/Calendar';
import ChatBox from '../../../assets/images/ChatBox';
import CakeSvg from '../../../assets/images/CakeSvg';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import Loader from '../Loader';
import {DetailStyle} from '../../style/styles';

const screenWidth = Dimensions.get('window').width;

const DetailScreen = ({route, navigation}) => {
  const invoiceModalRef = useRef(null);
  const invoiceAddModal = async () => {
    invoiceModalRef.current?.open();
  };
  const invoiceAddModalUserClose = async () => {
    invoiceModalRef.current?.close();
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleSingleIndexSelect = index => {
    setSelectedIndex(index);
  };
  let itemId = route.params.id;
  console.log('itemid=>', itemId);
  const scrolling = React.useRef(new Animated.Value(0)).current;
  const boxInterpolation = scrolling.interpolate({
    inputRange: [10, 800],
    outputRange: ['transparent', 'rgba(53,49,53,1)'],
  });
  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };
  const [isLiked, setIsLiked] = useState('#ddd');
  useEffect(() => {
    console.log(isLiked);
  }, [isLiked]);

  const changeColorLike = () => {
    if (isLiked === '#ddd') {
      setIsLiked('red');
    } else {
      setIsLiked('#ddd');
    }
  };

  const sharePet = () => {
    alert('Paylaş butonu');
  };

  const [img, setImg] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [loader, setLoader] = useState(true);

  async function fetchData() {
    await axios
      .get(`https://reqres.in/api/users/${itemId}`)
      .then(function (response) {
        console.log(response.data.data.first_name);
        setImg(response.data.data.avatar);
        setFirstName(response.data.data.first_name);
        setLastName(response.data.data.last_name);
        setLoader(false);
        // setPhone(response.data.phone);
        // setGender(response.data.gender);
        // setCity(response.data.address.city);
        // setTown(response.data.address.state);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchData();
  });

  const phoneNumber = '0554 555 5555';

  return (
    <SafeAreaView style={DetailStyle.container}>
      {loader ? (
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'grey',
            width: '60%',
            height: '20%',
            borderRadius: 12,
            opacity: 0.8,
            top: Dimensions.get('screen').height / 4,
            padding: 20,
          }}>
          <Text style={{...styles.headerTitle, marginBottom: 5}}>
            Lütfen Bekleyin
          </Text>
          <Loader />
        </View>
      ) : null}
      <Animated.View
        style={{
          width: screenWidth,
          height: 60,
          ...animatedStyle,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[DetailStyle.chevronBack]}>
          <LeftBack />
        </TouchableOpacity>

        <TouchableOpacity
          style={DetailStyle.dotStyle}
          onPress={invoiceAddModal}>
          <Dots />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{flex: 1, position: 'relative'}}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrolling,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}>
        <View style={styles.img}>
          {persons
            .filter(function (item) {
              return item.id === itemId;
            })
            .map(function ({image, image2}) {
              return (
                <Swiper>
                  <Image source={image} style={DetailStyle.largeImg} />
                  <Image source={image2} style={DetailStyle.largeImg} />
                  <Image source={image} style={DetailStyle.largeImg} />
                </Swiper>
              );
            })}
        </View>

        <TouchableOpacity
          style={DetailStyle.heartButton}
          onPress={() => changeColorLike()}>
          <Ionicons name="heart" size={22} color={isLiked} />
        </TouchableOpacity>

        <TouchableOpacity style={DetailStyle.callButton}>
          <Ionicons name="logo-whatsapp" size={22} color="#128C7E" />
        </TouchableOpacity>

        <TouchableOpacity style={DetailStyle.messageButton}>
          <ChatBox />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
          style={DetailStyle.emptyButton}>
          <Ionicons name="call" size={22} color="#2A405F" />
        </TouchableOpacity>

        <View style={{marginTop: 30}}>
          {persons
            .filter(function (item) {
              return item.id === itemId;
            })
            .map(function ({name, age, breed, adDate, gender, category}) {
              return (
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <Text style={DetailStyle.infoTitle}>{name}</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={DetailStyle.petInfo}>{category} - </Text>
                    <Text style={DetailStyle.petInfo}>{breed}</Text>
                  </View>
                  <View style={DetailStyle.rowCenter}>
                    <Calendar />
                    <Text style={DetailStyle.adDate}>{adDate}</Text>
                  </View>
                </View>
              );
            })}
        </View>

        <View
          style={{
            width: '100%',
            marginTop: 30,
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
            }}>
            <SegmentedControlTab
              values={['İLAN BİLGİLERİ', 'İLAN ÖZELLİKLERİ']}
              selectedIndex={selectedIndex}
              tabStyle={DetailStyle.tabStyle}
              activeTabStyle={DetailStyle.activeTabStyle}
              onTabPress={handleSingleIndexSelect}
              tabTextStyle={DetailStyle.tabTextStyle}
              activeTabTextStyle={DetailStyle.activeTabTextStyle}
              firstTabStyle={{marginRight: 0}}
            />
          </View>
        </View>

        {selectedIndex === 1 ? (
          <View style={DetailStyle.explanation}>
            {persons
              .filter(function (item) {
                return item.id === itemId;
              })
              .map(function ({explanation}) {
                return (
                  <Text style={DetailStyle.explanationPhragraph}>
                    {explanation}
                  </Text>
                );
              })}
          </View>
        ) : (
          <View style={{height: '100%', padding: 20}}>
            <View style={{marginTop: 20, marginBottom: 20}}>
              <Text style={DetailStyle.categoryTitle}>IRK</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('BreedDetail', {
                    id: itemId,
                    name: firstName,
                  })
                }
                style={{
                  ...DetailStyle.rowCenter,
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <View style={DetailStyle.iconArea}>
                  <Ionicons name="paw" size={22} color="#14B219" />
                  <View style={{marginLeft: 10}}>
                    {persons
                      .filter(function (item) {
                        return item.id === itemId;
                      })
                      .map(function ({breed}) {
                        return <Text>{breed}</Text>;
                      })}
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={22} />
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 20, marginBottom: 20}}>
              <Text style={DetailStyle.categoryTitle}>FİZİKSEL ÖZELLİKLER</Text>
              <View style={{...DetailStyle.fieldArea, marginTop: 20}}>
                <View style={DetailStyle.iconArea}>
                  <TouchableOpacity>
                    <Ionicons name="calendar-outline" size={22} color="#666" />
                  </TouchableOpacity>
                  <View style={{marginLeft: 10, width: 70}}>
                    <Text style={DetailStyle.fieldTitle}>İlan Tarihi</Text>
                  </View>
                </View>
                <View style={{marginLeft: 30}}>
                  {persons
                    .filter(function (item) {
                      return item.id === itemId;
                    })
                    .map(function ({adDate}) {
                      return (
                        <Text style={DetailStyle.fieldText}>{adDate}</Text>
                      );
                    })}
                </View>
              </View>
              <View style={DetailStyle.greyLine} />
              <View style={DetailStyle.fieldArea}>
                <View style={DetailStyle.iconArea}>
                  <TouchableOpacity>
                    <Ionicons name="bookmark-outline" size={22} color="#666" />
                  </TouchableOpacity>
                  <View style={{marginLeft: 10, width: 70}}>
                    <Text style={DetailStyle.fieldTitle}>İlan No</Text>
                  </View>
                </View>
                <View style={{marginLeft: 30}}>
                  {persons
                    .filter(function (item) {
                      return item.id === itemId;
                    })
                    .map(function ({adNo}) {
                      return <Text style={DetailStyle.fieldText}>{adNo}</Text>;
                    })}
                </View>
              </View>
              <View style={DetailStyle.greyLine} />
              <View style={DetailStyle.fieldArea}>
                <View style={DetailStyle.iconArea}>
                  <TouchableOpacity>
                    <Ionicons
                      name="male-female-outline"
                      size={22}
                      color="#666"
                    />
                  </TouchableOpacity>
                  <View style={{marginLeft: 10, width: 70}}>
                    <Text style={DetailStyle.fieldTitle}>Cinsiyet</Text>
                  </View>
                </View>
                <View style={{marginLeft: 30}}>
                  {persons
                    .filter(function (item) {
                      return item.id === itemId;
                    })
                    .map(function ({gender}) {
                      return (
                        <Text style={DetailStyle.fieldText}>{gender}</Text>
                      );
                    })}
                </View>
              </View>
              <View style={DetailStyle.greyLine} />
              <View style={DetailStyle.fieldArea}>
                <View style={DetailStyle.iconArea}>
                  <TouchableOpacity>
                    <CakeSvg />
                  </TouchableOpacity>
                  <View style={{marginLeft: 10, width: 70}}>
                    <Text style={DetailStyle.fieldTitle}>Yaş</Text>
                  </View>
                </View>
                <View style={{marginLeft: 30}}>
                  {persons
                    .filter(function (item) {
                      return item.id === itemId;
                    })
                    .map(function ({age}) {
                      return <Text style={DetailStyle.fieldText}>{age}</Text>;
                    })}
                </View>
              </View>
              <View style={DetailStyle.greyLine} />
              <View style={DetailStyle.fieldArea}>
                <View style={DetailStyle.iconArea}>
                  <TouchableOpacity>
                    <Ionicons name="location-outline" size={22} color="#666" />
                  </TouchableOpacity>
                  <View style={{marginLeft: 10, width: 70}}>
                    <Text style={DetailStyle.fieldTitle}>Konum</Text>
                  </View>
                </View>
                <View style={{marginLeft: 30}}>
                  {persons
                    .filter(function (item) {
                      return item.id === itemId;
                    })
                    .map(function ({location}) {
                      return (
                        <Text style={DetailStyle.fieldText}>{location}</Text>
                      );
                    })}
                </View>
              </View>
            </View>

            <View style={{marginTop: 10, marginBottom: 30}}>
              <Text style={DetailStyle.categoryTitle}>AÇIKLAMA</Text>
              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Manrope-SemiBold',
                    color: '#666',
                  }}>
                  2.5 aylık erkek orijinal pomerian boo teacup ayı surat aşılı
                  karneli teslim edilecektir sağlık ve ırk garantilidir
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#f1f1f1',
                width: '100%',
                height: 230,
                marginTop: 20,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Image style={DetailStyle.avatar} source={{uri: img}} />
              <Text style={DetailStyle.avatarName}>
                {firstName} {lastName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 30,
                  }}>
                  <Text>Aktif İlan Sayısı: </Text>
                  <Text>1</Text>
                </View>
                <Text>Konum: </Text>
                <View style={{}}>
                  {persons
                    .filter(function (item) {
                      return item.id === itemId;
                    })
                    .map(function ({location}) {
                      return (
                        <Text style={DetailStyle.fieldText}>{location}</Text>
                      );
                    })}
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  marginTop: 40,
                }}>
                <TouchableOpacity style={DetailStyle.filledButton}>
                  <Text style={DetailStyle.buttonText}>İlan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={DetailStyle.filledButton}>
                  <Text style={DetailStyle.buttonText}>
                    İlan Sahibini İncele
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={DetailStyle.outlineButton}
                onPress={() =>
                  navigation.navigate('Mesajlar', {
                    screen: 'MessagesDetail',
                    params: {id: itemId},
                  })
                }>
                <Text style={{...DetailStyle.buttonText, color: '#14B219'}}>
                  ÖZEL MESAJ GÖNDER
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <Modalize
        withHandle={false}
        ref={invoiceModalRef}
        modalStyle={{flex: 0.35}}>
        <View style={DetailStyle.modalContainer}>
          <TouchableOpacity
            style={DetailStyle.closeModal}
            onPress={invoiceAddModalUserClose}>
            <Ionicons name="close" size={23} />
          </TouchableOpacity>

          <View style={DetailStyle.modalTitle}>
            {persons
              .filter(function (item) {
                return item.id === itemId;
              })
              .map(function ({name}) {
                return (
                  <Text style={{...DetailStyle.infoTitle, color: '#aaa'}}>
                    {name}
                  </Text>
                );
              })}
          </View>

          <View style={DetailStyle.modalBody}>
            <TouchableOpacity
              style={DetailStyle.modalRow}
              onPress={() => sharePet()}>
              <Text style={{...DetailStyle.categoryTitle, color: '#1F5D44'}}>
                İLANI PAYLAŞ
              </Text>
              <Ionicons name="share-social" size={22} color="#14B219" />
            </TouchableOpacity>
            <TouchableOpacity
              style={DetailStyle.modalRow}
              onPress={() => changeColorLike()}>
              <Text style={{...DetailStyle.categoryTitle, color: '#1F5D44'}}>
                {isLiked === 'red' ? 'FAVORİLERDEN KALDIR' : 'FAVORİLERE EKLE'}
              </Text>
              <Ionicons name="heart" size={22} color={isLiked} />
            </TouchableOpacity>
          </View>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  img: {
    width: screenWidth,
    height: screenWidth,
  },
});
