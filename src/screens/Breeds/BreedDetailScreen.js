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
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LeftBack from '../../../assets/images/LeftBack';
import breeds from '../Home/Data/Breed';
import axios from 'axios';
import {BreedDetailStyle} from '../../style/styles';
import Loader from '../Loader';

const screenWidth = Dimensions.get('window').width;

const BreedDetailScreen = ({route, navigation}) => {
  let breedName = route.params.name;
  let itemId = route.params.id;
  const scrolling = React.useRef(new Animated.Value(0)).current;
  const boxInterpolation = scrolling.interpolate({
    inputRange: [10, 850],
    outputRange: ['transparent', 'rgba(53,49,53,1)'],
  });
  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };
  const ask = () => {
    Alert.alert('İlanı Paylaş', '', [
      {
        text: 'Evet',
        onPress: () => console.log('Evet Pressed'),
        style: 'cancel',
      },
      {text: 'Hayır', onPress: () => console.log('Hayır Pressed')},
    ]);
  };

  const [img, setImg] = useState(null);
  const [generalText, setGeneralText] = useState(null);
  const [character, setCharacter] = useState(null);
  const [physically, setPhysically] = useState(null);
  const [health, setHealth] = useState(null);
  const [maintenance, setMaintenance] = useState(null);
  const [title, setTitle] = useState(null);
  const [loader, setLoader] = useState(true);
  const [array, setArray] = useState([]);

  async function fetchData() {
    setLoader(true);
    await axios
      .get(`https://dummyjson.com/products/${itemId}`)
      .then(function (response) {
        setGeneralText(response.data.description);
        setCharacter(response.data.category);
        setTitle(response.data.title);
        setPhysically(response.data.stock);
        setHealth(response.data.discountPercentage);
        setMaintenance(response.data.rating);
        setImg(response.data.images[0]);
        setArray(response.data);
        console.log(array);
        setLoader(false);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={BreedDetailStyle.container}>
      <Animated.View
        style={{
          width: screenWidth,
          height: 60,
          ...animatedStyle,
          position: 'absolute',
          left: 0,
          zIndex: 1,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          top: Platform.OS === 'ios' ? 48 : 0,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[BreedDetailStyle.chevronBack]}>
          <LeftBack />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => ask()}
          style={{
            position: 'absolute',
            zIndex: 1,
            right: 30,
            width: 40,
            height: 40,
            top: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="share-social" size={22} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

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
          }}>
          <Loader />
          <Text style={{color: '#fff', fontSize: 18}}>Lütfen Bekleyin</Text>
        </View>
      ) : null}

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
          <Image source={{uri: img}} style={BreedDetailStyle.largeImg} />
        </View>

        <View style={styles.title}>
          <Text style={BreedDetailStyle.titleText}>{title}</Text>
        </View>

        <View style={styles.generalInfo}>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              width: '100%',
            }}>
            <View style={BreedDetailStyle.generalInfoColumn}>
              <View style={{alignItems: 'center'}}>
                <Ionicons name="airplane-outline" size={40} />
                <View style={{marginTop: 15, alignItems: 'center'}}>
                  <Text style={BreedDetailStyle.generalInfoTitle}>
                    Irk Grubu
                  </Text>
                  <Text style={BreedDetailStyle.generalInfoText}>
                    {maintenance}
                  </Text>
                </View>
              </View>

              <View style={{alignItems: 'center', marginTop: 20}}>
                <Ionicons name="airplane-outline" size={40} />
                <View style={{marginTop: 15, alignItems: 'center'}}>
                  <Text style={BreedDetailStyle.generalInfoTitle}>Kilo</Text>
                  <Text style={BreedDetailStyle.generalInfoText}>{health}</Text>
                </View>
              </View>
            </View>

            <View style={BreedDetailStyle.generalInfoColumn}>
              <View style={{alignItems: 'center'}}>
                <Ionicons name="airplane-outline" size={40} />
                <View style={{marginTop: 15, alignItems: 'center'}}>
                  <Text style={BreedDetailStyle.generalInfoTitle}>
                    Yaşam Süresi
                  </Text>
                  <Text style={BreedDetailStyle.generalInfoText}>
                    {physically}
                  </Text>
                </View>
              </View>

              <View style={{alignItems: 'center', marginTop: 20}}>
                <Ionicons name="airplane-outline" size={40} />
                <View style={{marginTop: 15, alignItems: 'center'}}>
                  <Text style={BreedDetailStyle.generalInfoTitle}>Boy</Text>
                  <Text style={BreedDetailStyle.generalInfoText}>
                    {character}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.generalText}>
          <Text style={BreedDetailStyle.sectionTitle}>Genel Bilgi</Text>
          <Text style={BreedDetailStyle.generalTextStyle}>{generalText}</Text>
        </View>

        <View style={BreedDetailStyle.seperator}>
          <View style={BreedDetailStyle.line} />
          <View style={BreedDetailStyle.seperatorIcon}>
            <Ionicons name="paw-outline" size={30} color="#14B219" />
          </View>
        </View>

        <View style={styles.infoBars}>
          {breeds
            .filter(function (item) {
              return item.name === breedName;
            })
            .map(function ({
              apartmentLiving,
              amateurOwner,
              coldWeather,
              hotWeather,
              familyLove,
              kidsReact,
              otherPets,
              strangerFriend,
              saliva,
              molt,
              maintenanceBar,
              potentialWeight,
              size,
              easyEducate,
              intelligence,
              hunting,
              biteBehave,
              easyTravel,
              energy,
              exercise,
              playfullness,
            }) {
              return (
                <View style={{}}>
                  <View style={{...BreedDetailStyle.infoBarRow, marginTop: 0}}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Apartman yaşamı
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#14B219"
                        style={{marginLeft: 10}}
                      />
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#14B219"
                        style={{marginLeft: 10}}
                      />
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#14B219"
                        style={{marginLeft: 10}}
                      />
                    </View>
                  </View>

                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Acemi Sahipler İçin Uygunluk
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                    </View>
                  </View>

                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Soğuk Hava Koşullarına Uygunluk
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#14B219"
                        style={{marginLeft: 10}}
                      />
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#14B219"
                        style={{marginLeft: 10}}
                      />
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#14B219"
                        style={{marginLeft: 10}}
                      />
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#14B219"
                        style={{marginLeft: 10}}
                      />
                    </View>
                  </View>

                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Sıcak Hava Koşullarına Uygunluk
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#14B219"
                        style={{marginLeft: 10}}
                      />
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#14B219"
                        style={{marginLeft: 10}}
                      />
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#14B219"
                        style={{marginLeft: 10}}
                      />
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#14B219"
                        style={{marginLeft: 10}}
                      />
                      <Ionicons
                        name="paw"
                        size={20}
                        color="#14B219"
                        style={{marginLeft: 10}}
                      />
                    </View>
                  </View>

                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Aile İçi Sevgi
                    </Text>
                    <Text>{familyLove}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Çocuklarla Etkileşim
                    </Text>
                    <Text>{kidsReact}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Diğer Evcil Hayvanlarla Dostluk
                    </Text>
                    <Text>{otherPets}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Yabancılarla Dostluk
                    </Text>
                    <Text>{strangerFriend}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>Salya</Text>
                    <Text>{saliva}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Kıl ve Tüy Dökme
                    </Text>
                    <Text>{molt}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Kolay Bakım
                    </Text>
                    <Text>{maintenanceBar}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Kilo Alma Potansiyeli
                    </Text>
                    <Text>{potentialWeight}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>Boyut</Text>
                    <Text>{size}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Kolay Eğitim
                    </Text>
                    <Text>{easyEducate}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>Zeka</Text>
                    <Text>{intelligence}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Av Sürme Potansiyeli
                    </Text>
                    <Text>{hunting}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Kemirme Alışkanlığı
                    </Text>
                    <Text>{biteBehave}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Yolculuğa Uyum
                    </Text>
                    <Text>{easyTravel}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Enerji Seviyesi
                    </Text>
                    <Text>{energy}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Egzersiz İhtiyacı
                    </Text>
                    <Text>{exercise}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                  <View style={BreedDetailStyle.infoBarRow}>
                    <Text style={BreedDetailStyle.infoBarText}>
                      Sürekli Oyun İsteği
                    </Text>
                    <Text>{playfullness}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Ionicons name="paw" size={20} color="#14B219" />
                      <Ionicons name="paw" size={20} style={{marginLeft: 10}} />
                    </View>
                  </View>
                </View>
              );
            })}
        </View>

        <View style={BreedDetailStyle.seperator}>
          <View style={BreedDetailStyle.line} />
          <View style={BreedDetailStyle.seperatorIcon}>
            <Ionicons name="paw-outline" size={30} color="#14B219" />
          </View>
        </View>

        <View style={styles.character}>
          <Text style={BreedDetailStyle.sectionTitle}>
            Karakter Özellikleri
          </Text>
          <Text style={BreedDetailStyle.generalTextStyle}>{character}</Text>
        </View>

        <View style={BreedDetailStyle.seperator}>
          <View style={BreedDetailStyle.line} />
          <View style={BreedDetailStyle.seperatorIcon}>
            <Ionicons name="paw-outline" size={30} color="#14B219" />
          </View>
        </View>

        <View style={styles.physically}>
          <Text style={BreedDetailStyle.sectionTitle}>
            Fiziksel Özellikleri
          </Text>
          <Text style={BreedDetailStyle.generalTextStyle}>{physically}</Text>
        </View>

        <View style={BreedDetailStyle.seperator}>
          <View style={BreedDetailStyle.line} />
          <View style={BreedDetailStyle.seperatorIcon}>
            <Ionicons name="paw-outline" size={30} color="#14B219" />
          </View>
        </View>

        <View style={styles.health}>
          <Text style={BreedDetailStyle.sectionTitle}>Sağlık Özellikleri</Text>
          <Text style={BreedDetailStyle.generalTextStyle}>{health}</Text>
        </View>

        <View style={BreedDetailStyle.seperator}>
          <View style={BreedDetailStyle.line} />
          <View style={BreedDetailStyle.seperatorIcon}>
            <Ionicons name="paw-outline" size={30} color="#14B219" />
          </View>
        </View>

        <View style={styles.maintenance}>
          <Text style={BreedDetailStyle.sectionTitle}>Bakım ve Beslenme</Text>
          <Text style={BreedDetailStyle.generalTextStyle}>{maintenance}</Text>
        </View>
      </ScrollView>

      <View style={BreedDetailStyle.buttonArea}>
        <TouchableOpacity
          style={BreedDetailStyle.button}
          onPress={() => navigation.navigate('PetSearch')}>
          <Text style={BreedDetailStyle.buttonText}>
            Bu Irk İlanlarını İncele
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BreedDetailScreen;

const styles = StyleSheet.create({
  img: {
    width: screenWidth,
    height: screenWidth,
  },
  title: {
    width: screenWidth,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generalInfo: {
    width: screenWidth,
    height: 200,
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  generalText: {
    width: screenWidth,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  infoBars: {
    width: screenWidth,
    marginTop: 10,
    padding: 10,
  },
  character: {
    width: screenWidth,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  physically: {
    width: screenWidth,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  health: {
    width: screenWidth,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  maintenance: {
    width: screenWidth,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 20,
  },
});
