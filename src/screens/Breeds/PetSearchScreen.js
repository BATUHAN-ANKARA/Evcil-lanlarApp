/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modalize} from 'react-native-modalize';
import Swiper from 'react-native-swiper';
import {PetSearchStyle} from '../../style/styles';
import Loader from '../Loader';
import axios from 'axios';

const screenWidth = Dimensions.get('screen').width;

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

const PetSearchScreen = ({navigation, route}) => {
  console.log(route?.params?.search);
  const invoiceModalRef = useRef();
  const sortModalRef = useRef();
  const filterModalRef = useRef();
  const breedModalRef = useRef();
  const invoiceAddModal = async () => {
    invoiceModalRef.current?.open();
  };
  const sortAddModal = async () => {
    sortModalRef.current?.open();
  };
  const filterAddModal = async () => {
    filterModalRef.current?.open();
  };
  const breedAddModal = async () => {
    breedModalRef.current?.open();
  };
  const invoiceAddModalUserClose = async () => {
    invoiceModalRef.current?.close();
  };
  const sortAddModalUserClose = async () => {
    sortModalRef.current?.close();
  };
  const filterAddModalUserClose = async () => {
    filterModalRef.current?.close();
  };
  const breedAddModalUserClose = async () => {
    breedModalRef.current?.close();
  };
  const [check, setCheck] = useState(false);
  const [searchText, setSearchText] = useState();
  const [searchTextBreed, setSearchTextBreed] = useState();
  const [fSelect1, setFSelect1] = useState(true);
  const [fSelect2, setFSelect2] = useState(true);
  const [sortSelect, setSortSelect] = useState();
  const readyFilter = id => {
    alert('Tıklanan id => ' + id);
  };

  const [dummyData, setDummyData] = useState([]);
  const [loader, setLoader] = useState(true);
  async function fetchData() {
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

  const [dummyData2, setDummyData2] = useState([]);
  async function fetchData2() {
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
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);
  const handlePress = itemId => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  const handlePress2 = itemId => {
    if (selectedItems2.includes(itemId)) {
      setSelectedItems2(selectedItems2.filter(id => id !== itemId));
    } else {
      setSelectedItems2([...selectedItems2, itemId]);
    }
  };
  const [dummyData3, setDummyData3] = useState([]);
  async function fetchData3() {
    await axios
      .get('https://reqres.in/api/users?page=1')
      .then(function (response) {
        setDummyData3(response.data.data);
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    setLoader(true);
    fetchData();
    fetchData2();
    fetchData3();
  }, []);
  const renderItem = ({item, index}) => (
    <View style={PetSearchStyle.card}>
      <View style={{height: 340}}>
        <Swiper>
          <Image
            source={require('../../../assets/images/sable.jpg')}
            resizeMode="cover"
            style={PetSearchStyle.imgArea}
          />
          <Image
            source={require('../../../assets/images/puppy.webp')}
            resizeMode="cover"
            style={PetSearchStyle.imgArea}
          />
        </Swiper>
        <View style={PetSearchStyle.timeInfoArea}>
          <View style={PetSearchStyle.timeInfoAreaDot} />
          <Text style={PetSearchStyle.timeInfoAreaText}>YENİ</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {id: item.id})}>
        <View style={PetSearchStyle.cardBottom}>
          <View>
            <Text style={PetSearchStyle.title}>{item.first_name}</Text>
          </View>
          <View style={PetSearchStyle.cardBottomRow}>
            <Text style={PetSearchStyle.petInfoText}>{item.last_name}</Text>
            <View style={PetSearchStyle.dot} />
            <Text style={PetSearchStyle.petInfoText}>{item.email}</Text>
            <View style={PetSearchStyle.dot} />
            <Text style={PetSearchStyle.petInfoText}>Times ago</Text>
          </View>
          <View style={PetSearchStyle.cardBottomRow}>
            <Text style={PetSearchStyle.viewProfile}>View Profile</Text>
            <View style={PetSearchStyle.cardIconArea}>
              <TouchableOpacity onPress={() => ask()}>
                <Ionicons name="share-social" size={22} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="heart-outline" size={22} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
  const renderItemFilter = ({item, index}) => (
    <TouchableOpacity
      style={styles.modalRecentButton}
      onPress={() => readyFilter(item.id)}>
      <Ionicons name="search-outline" size={20} color="#888" />
      <Text style={PetSearchStyle.modalRecentText}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <SafeAreaView style={PetSearchStyle.container}>
        <View style={PetSearchStyle.top}>
          <TouchableOpacity style={styles.searchArea} onPress={invoiceAddModal}>
            <View style={PetSearchStyle.searchAreaRow}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={25} />
              </TouchableOpacity>
              <Text style={{alignSelf: 'center', marginLeft: 10}}>
                FilterText
              </Text>
            </View>
            <View style={PetSearchStyle.searchAreaRow}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={filterAddModal}>
                <Ionicons name="options" size={20} />
                <Text style={PetSearchStyle.filteringText}>Filtrele</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {loader ? (
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              backgroundColor: 'grey',
              width: '60%',
              height: '20%',
              padding: 20,
              borderRadius: 12,
              zIndex: 9,
              opacity: 0.8,
              top: screenWidth / 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Loader />
            <Text style={{color: '#fff', fontSize: 18, alignSelf: 'center'}}>
              Lütfen Bekleyin
            </Text>
          </View>
        ) : null}

        <View style={{flex: 1, marginHorizontal: 10}}>
          <View style={PetSearchStyle.sortingRow}>
            <Text>{dummyData.length} Sonuç Listeleniyor</Text>
            <TouchableOpacity
              style={PetSearchStyle.sortButton}
              onPress={sortAddModal}>
              <Text>Sıralama Tipi</Text>
              <Ionicons name="chevron-down" size={14} color="#888" />
            </TouchableOpacity>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={dummyData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </SafeAreaView>

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
          <View style={PetSearchStyle.modalTop}>
            <View style={PetSearchStyle.modalHeader}>
              <TouchableOpacity
                style={PetSearchStyle.modalCloseButton}
                onPress={invoiceAddModalUserClose}>
                <Ionicons name="close-outline" size={25} />
              </TouchableOpacity>
              <Text style={PetSearchStyle.modalHeaderTitle}>İlan ara</Text>
            </View>

            <View style={styles.modalInputArea}>
              <TextInput
                placeholder="Terrier, yavru ara"
                onChangeText={value => setSearchText(value)}
                onSubmitEditing={() => alert(searchText)}
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
              <Text style={PetSearchStyle.modalPrivateText}>
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
              style={{marginRight: 0}}
              horizontal
              showsHorizontalScrollIndicator={false}>
              <View style={PetSearchStyle.modalCategories}>
                <TouchableOpacity
                  style={PetSearchStyle.modalCategoriesCardArea}>
                  <View style={PetSearchStyle.modalCategoriesCard} />
                  <Text style={{marginTop: 5}}>Köpek</Text>
                </TouchableOpacity>
              </View>

              <View style={PetSearchStyle.modalCategories}>
                <TouchableOpacity
                  style={PetSearchStyle.modalCategoriesCardArea}>
                  <View style={PetSearchStyle.modalCategoriesCard} />
                  <Text style={{marginTop: 5}}>Kedi</Text>
                </TouchableOpacity>
              </View>

              <View style={PetSearchStyle.modalCategories}>
                <TouchableOpacity
                  style={PetSearchStyle.modalCategoriesCardArea}>
                  <View style={PetSearchStyle.modalCategoriesCard} />
                  <Text style={{marginTop: 5}}>Kuş</Text>
                </TouchableOpacity>
              </View>

              <View style={PetSearchStyle.modalCategories}>
                <TouchableOpacity
                  style={PetSearchStyle.modalCategoriesCardArea}>
                  <View style={PetSearchStyle.modalCategoriesCard} />
                  <Text style={{marginTop: 5}}>Balık</Text>
                </TouchableOpacity>
              </View>

              <View style={PetSearchStyle.modalCategories}>
                <TouchableOpacity
                  style={PetSearchStyle.modalCategoriesCardArea}>
                  <View style={PetSearchStyle.modalCategoriesCard} />
                  <Text style={{marginTop: 5}}>Tavşan</Text>
                </TouchableOpacity>
              </View>

              <View style={PetSearchStyle.modalCategories}>
                <TouchableOpacity
                  style={PetSearchStyle.modalCategoriesCardArea}>
                  <View style={PetSearchStyle.modalCategoriesCard} />
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

          <View style={{flex: 1, paddingBottom: 80}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              <View style={{...styles.modalRecent, marginTop: 10}}>
                <Text style={PetSearchStyle.modalRecentTitle}>
                  Son Aramalar
                </Text>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={dummyData2}
                  renderItem={renderItemFilter}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

              <View style={{...styles.modalRecent, marginTop: 10}}>
                <Text style={PetSearchStyle.modalRecentTitle}>
                  Popüler Aramalar
                </Text>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={dummyData2}
                  renderItem={renderItemFilter}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modalize>

      <Modalize withHandle={false} ref={sortModalRef} modalStyle={{flex: 0.35}}>
        <View
          style={{
            alignItems: 'center',
            height: 200,
            marginVertical: 30,
          }}>
          <Text>SIRALA</Text>

          <View style={{...styles.sortModalBox, marginTop: 10}}>
            {sortSelect === 1 ? (
              <View
                style={{
                  width: '100%',
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 0.8,
                  borderColor: '#888',
                  backgroundColor: '#14B219',
                }}>
                <Text style={{color: '#fff'}}>En Alakalı</Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setSortSelect(1)}
                style={{
                  width: '100%',
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 0.8,
                  borderColor: '#888',
                }}>
                <Text>En Alakalı</Text>
              </TouchableOpacity>
            )}

            <View
              style={{
                width: '100%',
                height: 40,
                flexDirection: 'row',
              }}>
              {sortSelect === 2 ? (
                <View
                  style={{
                    width: '50%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRightWidth: 0.8,
                    borderColor: '#888',
                    backgroundColor: '#14B219',
                  }}>
                  <Text style={{color: '#fff'}}>Önce En Yeni</Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => setSortSelect(2)}
                  style={{
                    width: '50%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRightWidth: 0.8,
                    borderColor: '#888',
                  }}>
                  <Text>Önce En Yeni</Text>
                </TouchableOpacity>
              )}
              {sortSelect === 3 ? (
                <View
                  style={{
                    width: '50%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#14B219',
                  }}>
                  <Text style={{color: '#fff'}}>Önce En Eski</Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => setSortSelect(3)}
                  style={{
                    width: '50%',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text>Önce En Eski</Text>
                </TouchableOpacity>
              )}
            </View>
            {sortSelect === 4 ? (
              <View
                style={{
                  width: '100%',
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopWidth: 0.8,
                  borderColor: '#888',
                  backgroundColor: '#14B219',
                }}>
                <Text style={{color: '#fff'}}>En Alakalı</Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setSortSelect(4)}
                style={{
                  width: '100%',
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopWidth: 0.8,
                  borderColor: '#888',
                }}>
                <Text>En Alakalı</Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={PetSearchStyle.sortModalClose}
            onPress={sortAddModalUserClose}>
            <Ionicons name="chevron-down" size={22} />
          </TouchableOpacity>
        </View>
      </Modalize>

      <Modalize
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          scrollEnabled: false,
        }}
        ref={filterModalRef}
        modalStyle={{flex: 1}}
        panGestureEnabled={false}
        disableScrollIfPossible={false}
        withHandle={false}>
        <View style={styles.modalContainer}>
          <View style={PetSearchStyle.modalTop}>
            <View
              style={{
                ...PetSearchStyle.modalHeader,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={PetSearchStyle.modalCloseButton}
                  onPress={filterAddModalUserClose}>
                  <Ionicons name="close-outline" size={25} />
                </TouchableOpacity>

                <Text style={PetSearchStyle.filterModalHeaderTitle}>
                  Filtreler
                </Text>
              </View>

              <TouchableOpacity>
                <Text
                  style={{
                    ...PetSearchStyle.filterModalHeaderTitle,
                    marginRight: 10,
                  }}>
                  Sıfırla
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 0.9}}>
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              <View
                style={{
                  alignItems: 'center',
                  marginVertical: 30,
                }}>
                <Text>SIRALA</Text>

                <View style={{...styles.sortModalBox, marginTop: 10}}>
                  {sortSelect === 1 ? (
                    <View
                      style={{
                        width: '100%',
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 0.8,
                        borderColor: '#888',
                        backgroundColor: '#14B219',
                      }}>
                      <Text style={{color: '#fff'}}>En Alakalı</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setSortSelect(1)}
                      style={{
                        width: '100%',
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomWidth: 0.8,
                        borderColor: '#888',
                      }}>
                      <Text>En Alakalı</Text>
                    </TouchableOpacity>
                  )}

                  <View
                    style={{
                      width: '100%',
                      height: 40,
                      flexDirection: 'row',
                    }}>
                    {sortSelect === 2 ? (
                      <View
                        style={{
                          width: '50%',
                          height: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRightWidth: 0.8,
                          borderColor: '#888',
                          backgroundColor: '#14B219',
                        }}>
                        <Text style={{color: '#fff'}}>Önce En Yeni</Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => setSortSelect(2)}
                        style={{
                          width: '50%',
                          height: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRightWidth: 0.8,
                          borderColor: '#888',
                        }}>
                        <Text>Önce En Yeni</Text>
                      </TouchableOpacity>
                    )}
                    {sortSelect === 3 ? (
                      <View
                        style={{
                          width: '50%',
                          height: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#14B219',
                        }}>
                        <Text style={{color: '#fff'}}>Önce En Eski</Text>
                      </View>
                    ) : (
                      <TouchableOpacity
                        onPress={() => setSortSelect(3)}
                        style={{
                          width: '50%',
                          height: 40,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text>Önce En Eski</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  {sortSelect === 4 ? (
                    <View
                      style={{
                        width: '100%',
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopWidth: 0.8,
                        borderColor: '#888',
                        backgroundColor: '#14B219',
                      }}>
                      <Text style={{color: '#fff'}}>En Alakalı</Text>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setSortSelect(4)}
                      style={{
                        width: '100%',
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopWidth: 0.8,
                        borderColor: '#888',
                      }}>
                      <Text>En Alakalı</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.filterModalBreed}>
                  <Text style={PetSearchStyle.filterModalTitle}>IRKLAR</Text>

                  <View style={PetSearchStyle.filterModalBreedsBox}>
                    {dummyData3.map(item => (
                      <TouchableOpacity
                        style={PetSearchStyle.filterModalBreedRow}
                        key={item.id}
                        onPress={() => handlePress(item.id)}>
                        <Text>{item.first_name}</Text>
                        {selectedItems.includes(item.id) && (
                          <View style={PetSearchStyle.filterModalIconArea}>
                            <Ionicons
                              name="checkbox"
                              size={22}
                              color="#14B219"
                            />
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                      onPress={breedAddModal}
                      style={PetSearchStyle.filterModalMoreText}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={PetSearchStyle.filterModalBreedTextStyle}>
                          Daha fazla ırk
                        </Text>
                        <Ionicons name="chevron-forward" size={16} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.filterModalBreed}>
                  <Text style={PetSearchStyle.filterModalTitle}>KONUM</Text>

                  <View style={PetSearchStyle.filterModalBreedsBox}>
                    {dummyData2.map(item => (
                      <TouchableOpacity
                        style={PetSearchStyle.filterModalBreedRow}
                        key={item.id}
                        onPress={() => handlePress2(item.id)}>
                        <Text>{item.last_name}</Text>
                        {selectedItems2.includes(item.id) && (
                          <View style={PetSearchStyle.filterModalIconArea}>
                            <Ionicons
                              name="checkbox"
                              size={22}
                              color="#14B219"
                            />
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                      onPress={breedAddModal}
                      style={PetSearchStyle.filterModalMoreText}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={PetSearchStyle.filterModalBreedTextStyle}>
                          Daha fazla konum
                        </Text>
                        <Ionicons name="chevron-forward" size={16} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          <TouchableOpacity
            style={PetSearchStyle.filterModalApply}
            onPress={() => alert('Onayla')}>
            <Text style={PetSearchStyle.filterModalApplyText}>
              Değişiklikleri Onayla
            </Text>
          </TouchableOpacity>
        </View>
      </Modalize>

      <Modalize
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          scrollEnabled: false,
        }}
        ref={breedModalRef}
        modalStyle={{flex: 1}}
        panGestureEnabled={false}
        disableScrollIfPossible={false}
        withHandle={false}>
        <View style={styles.modalContainer}>
          <View style={PetSearchStyle.modalTop}>
            <View style={PetSearchStyle.modalHeader}>
              <TouchableOpacity
                style={PetSearchStyle.modalCloseButton}
                onPress={breedAddModalUserClose}>
                <Ionicons name="close-outline" size={25} />
              </TouchableOpacity>
              <Text style={PetSearchStyle.modalHeaderTitle}>Irklar</Text>
            </View>

            <View style={styles.modalInputArea}>
              <TextInput
                placeholder="Irk Arayın"
                onChangeText={value => setSearchTextBreed(value)}
                onSubmitEditing={() => alert(searchTextBreed)}
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

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={PetSearchStyle.breedModalRow}>
                <View style={PetSearchStyle.breedModalImgArea} />

                <View style={PetSearchStyle.breedModalInfoArea}>
                  <Text style={PetSearchStyle.breedModalRowText}>
                    German Shepherd Dog
                  </Text>
                  <View style={PetSearchStyle.filterModalIconArea}>
                    <TouchableOpacity onPress={() => setFSelect1(!fSelect1)}>
                      {fSelect1 ? (
                        <Ionicons name="checkbox" size={22} color="#14B219" />
                      ) : (
                        <Ionicons
                          name="square-outline"
                          size={22}
                          color="#777"
                        />
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setFSelect1(!fSelect1)}>
                      {fSelect1 ? (
                        <Ionicons
                          name="close-circle-outline"
                          size={22}
                          color="#777"
                        />
                      ) : (
                        <Ionicons name="close-circle" size={22} color="red" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={PetSearchStyle.breedModalRow}>
                <View style={PetSearchStyle.breedModalImgArea} />

                <View style={PetSearchStyle.breedModalInfoArea}>
                  <Text style={PetSearchStyle.breedModalRowText}>
                    German Shepherd Dog
                  </Text>

                  <View style={PetSearchStyle.filterModalIconArea}>
                    <TouchableOpacity onPress={() => setFSelect2(!fSelect2)}>
                      {fSelect2 ? (
                        <Ionicons name="checkbox" size={22} color="#14B219" />
                      ) : (
                        <Ionicons
                          name="square-outline"
                          size={22}
                          color="#777"
                        />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setFSelect2(!fSelect2)}>
                      {fSelect2 ? (
                        <Ionicons
                          name="close-circle-outline"
                          size={22}
                          color="#777"
                        />
                      ) : (
                        <Ionicons name="close-circle" size={22} color="red" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modalize>
    </>
  );
};

export default PetSearchScreen;
const styles = StyleSheet.create({
  filterModalBreed: {
    width: screenWidth - 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  sortModalBox: {
    flexDirection: 'column',
    width: screenWidth - 20,
    alignSelf: 'center',
    borderWidth: 0.8,
    borderColor: '#888',
    height: 120,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
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
  modalRecent: {
    width: screenWidth,
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
  modalPrivateArea: {
    width: screenWidth - 20,
    alignSelf: 'center',
    height: 30,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchArea: {
    width: screenWidth - 20,
    height: 45,
    marginTop: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.8,
    borderColor: '#14B219',
    marginBottom: 0,
  },
  modalContainer: {
    paddingTop: Platform.OS === 'android' ? 10 : 40,
    height: Dimensions.get('screen').height,
  },
});
