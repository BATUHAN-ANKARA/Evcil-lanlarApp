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
  FlatList,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
const screenWidth = Dimensions.get('window').width;
import dummy from '../Home/Data/DummyData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {Modalize} from 'react-native-modalize';
import axios from 'axios';
import Loader from '../Loader';
import {BreedsStyle} from '../../style/styles';

const BreedsScreen = ({navigation}) => {
  const invoiceModalRef = useRef();
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
  const featuredBreed = 'Malinois';

  const [dummyData, setDummyData] = useState([]);
  const [dummyData2, setDummyData2] = useState([]);
  const [dummyData3, setDummyData3] = useState([]);
  const [loader, setLoader] = useState(true);
  async function topData() {
    setLoader(true);
    await axios
      .get('https://reqres.in/api/users?page=2')
      .then(function (response) {
        setDummyData(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function popData() {
    setLoader(true);
    await axios
      .get('https://reqres.in/api/users?page=1')
      .then(function (response) {
        setDummyData2(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function modalData() {
    setLoader(true);
    await axios
      .get('https://reqres.in/api/users?page=1')
      .then(function (response) {
        setDummyData3(response.data.data);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    topData();
    popData();
    modalData();
    setLoader(false);
  }, []);

  const renderItem = ({item, index}) => (
    <View>
      <View style={{width: '100%', borderWidth: 0.5, borderColor: '#ccc'}} />
      <TouchableOpacity
        onPress={() => navigation.navigate('BreedDetail', {id: item.id})}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 50,
            height: 50,
            margin: 10,
            borderRadius: 8,
          }}
          source={{uri: item.avatar}}
        />
        <View style={{marginLeft: 20}}>
          <Text>{item.first_name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={BreedsStyle.container}>
      <Modalize ref={invoiceModalRef} modalStyle={{flex: 1}} withHandle={false}>
        <View style={styles.modalContainer}>
          <View
            style={{
              width: '100%',
              height: 70,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#14B219',
                width: '70%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
                borderRadius: 5,
                paddingLeft: 20,
              }}>
              {selectedIndex === 1 ? (
                <TextInput
                  placeholder="Şunu deneyin 'Scotish'"
                  placeholderTextColor="#14B219"
                  style={{width: '90%', height: '100%'}}
                />
              ) : (
                <TextInput
                  placeholder="Şunu deneyin 'Akita Inu'"
                  placeholderTextColor="#14B219"
                  style={{width: '90%', height: '100%'}}
                />
              )}
              <Ionicons
                name="search-outline"
                size={16}
                color="#14B219"
                style={{position: 'absolute', left: 10}}
              />
            </View>

            <View
              style={{
                height: '100%',
                width: '30%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={{}} onPress={invoiceAddModalUserClose}>
                <Text
                  style={{
                    fontFamily: 'Manrope-SemiBold',
                    fontSize: 16,
                    color: '#14B219',
                  }}>
                  İptal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dummyData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modalize>

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
          <Text style={{...BreedsStyle.headerTitle, marginBottom: 5}}>
            Lütfen Bekleyin
          </Text>
          <Loader />
        </View>
      ) : null}

      <ScrollView>
        <View
          style={{
            position: 'absolute',
            zIndex: 5,
            width: '100%',
            alignItems: 'center',
            backgroundColor: 'transparent',
            marginTop: 5,
          }}>
          <View
            style={{
              width: '80%',
            }}>
            <SegmentedControlTab
              values={['Köpek Irkları', 'Kedi Irkları']}
              selectedIndex={selectedIndex}
              tabStyle={BreedsStyle.tabStyle}
              activeTabStyle={BreedsStyle.activeTabStyle}
              onTabPress={handleSingleIndexSelect}
              tabTextStyle={BreedsStyle.tabTextStyle}
              activeTabTextStyle={BreedsStyle.activeTabTextStyle}
              firstTabStyle={{marginRight: 0}}
            />
          </View>
          {selectedIndex === 1 ? (
            <TouchableOpacity
              style={{
                width: '90%',
                height: 40,
                backgroundColor: '#fff',
                marginTop: 10,
                borderRadius: 5,
                justifyContent: 'center',
              }}
              onPress={invoiceAddModal}>
              <Ionicons
                name="search-outline"
                size={20}
                style={{position: 'absolute', top: 10, left: 10}}
              />
              <View style={{marginLeft: 40}}>
                <Text
                  style={{
                    fontFamily: 'Manrope-Regular',
                    fontSize: 14,
                    color: '#888',
                  }}>
                  Şunu deneyin "Scotish Fold"
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={invoiceAddModal}
              style={{
                width: '90%',
                height: 40,
                backgroundColor: '#fff',
                marginTop: 10,
                borderRadius: 5,
                justifyContent: 'center',
              }}>
              <Ionicons
                name="search-outline"
                size={20}
                style={{position: 'absolute', top: 10, left: 10}}
              />
              <View style={{marginLeft: 40}}>
                <Text
                  style={{
                    fontFamily: 'Manrope-Regular',
                    fontSize: 14,
                    color: '#888',
                  }}>
                  Şunu deneyin "Solid Black German Shephard"
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={[styles.img]}>
          {selectedIndex === 1 ? (
            <View>
              <LinearGradient
                colors={['rgba(0,0,0, 1)', 'rgba(0,0,0, 0)']}
                style={{
                  height: '40%',
                  width: '100%',
                  position: 'absolute',
                  zIndex: 1,
                }}
              />
              <Image
                source={require('../../../assets/images/puppy.webp')}
                style={{width: '100%'}}
              />
            </View>
          ) : (
            <View>
              <LinearGradient
                colors={['rgba(0,0,0, 1)', 'rgba(0,0,0, 0)']}
                style={{
                  height: '40%',
                  width: '100%',
                  position: 'absolute',
                  zIndex: 1,
                }}
              />
              <Image
                source={require('../../../assets/images/sable.jpg')}
                style={{width: '100%'}}
              />
            </View>
          )}
        </View>

        {selectedIndex === 1 ? (
          <View style={{}}>
            <View style={BreedsStyle.topCollections}>
              <Text style={BreedsStyle.title}>Enler</Text>
              <FlatList
                data={dummyData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={BreedsStyle.topCollectionCard}
                    onPress={() =>
                      navigation.navigate('SubBreed', {name: item.first_name})
                    }>
                    <View
                      style={{
                        flex: 1,
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
                    <View style={BreedsStyle.topCollectionCardBottom}>
                      <Text>{item.first_name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            <TouchableOpacity
              style={styles.featuredBreed}
              onPress={() =>
                navigation.navigate('BreedDetail', {name: featuredBreed})
              }>
              <LinearGradient
                colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 1)']}
                style={{
                  height: '40%',
                  width: '95%',
                  position: 'absolute',
                  zIndex: 1,
                  bottom: 10,
                  left: 10,
                  borderRadius: 12,
                }}
              />
              <Image
                source={require('../../../assets/images/sable.jpg')}
                style={BreedsStyle.featuredImage}
              />
              <View
                style={{position: 'absolute', bottom: 25, left: 30, zIndex: 1}}>
                <Text style={BreedsStyle.featuredTitle}>Öne Çıkan Irk</Text>
                <Text style={BreedsStyle.featuredName}>German Shepard Dog</Text>
              </View>
            </TouchableOpacity>
            <View style={BreedsStyle.popularBreeds}>
              <Text style={BreedsStyle.title}>Popüler Irklar</Text>
              <FlatList
                data={dummyData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={BreedsStyle.topCollectionCard}
                    onPress={() =>
                      navigation.navigate('SubBreed', {name: item.breed})
                    }>
                    <View
                      style={{
                        flex: 1,
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
                    <View style={BreedsStyle.topCollectionCardBottom}>
                      <Text>{item.last_name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        ) : (
          <View style={{}}>
            <View style={BreedsStyle.topCollections}>
              <Text style={BreedsStyle.title}>Enler</Text>
              <FlatList
                data={dummyData}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={BreedsStyle.topCollectionCard}
                    onPress={() =>
                      navigation.navigate('SubBreed', {name: item.breed})
                    }>
                    <View
                      style={{
                        flex: 1,
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
                    <View style={BreedsStyle.topCollectionCardBottom}>
                      <Text>{item.first_name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
            <TouchableOpacity
              style={styles.featuredBreed}
              onPress={() =>
                navigation.navigate('BreedDetail', {name: featuredBreed})
              }>
              <LinearGradient
                colors={['rgba(0,0,0, 0)', 'rgba(0,0,0, 1)']}
                style={{
                  height: '40%',
                  width: '95%',
                  position: 'absolute',
                  zIndex: 1,
                  bottom: 10,
                  left: 10,
                  borderRadius: 12,
                }}
              />
              <Image
                source={require('../../../assets/images/sable.jpg')}
                style={BreedsStyle.featuredImage}
              />
              <View
                style={{position: 'absolute', bottom: 25, left: 30, zIndex: 1}}>
                <Text style={BreedsStyle.featuredTitle}>Öne Çıkan Irk</Text>
                <Text style={BreedsStyle.featuredName}>German Shepard Dog</Text>
              </View>
            </TouchableOpacity>
            <View style={BreedsStyle.popularBreeds}>
              <Text style={BreedsStyle.title}>Popüler Irklar</Text>
              <FlatList
                data={dummyData2}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={BreedsStyle.topCollectionCard}
                    onPress={() =>
                      navigation.navigate('SubBreed', {name: item.breed})
                    }>
                    <View
                      style={{
                        flex: 1,
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
                    <View style={BreedsStyle.topCollectionCardBottom}>
                      <Text>{item.last_name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BreedsScreen;

const styles = StyleSheet.create({
  img: {
    width: screenWidth,
    height: null,
  },
  featuredBreed: {
    width: screenWidth,
    height: screenWidth,
  },
  modalContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 40,
  },
});
