/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Loader from '../Loader';

const screenWidth = Dimensions.get('screen').width;

const AboutMeScreen = ({navigation}) => {
  const [optionId1, setOptionId1] = useState(0);
  const [optionId2, setOptionId2] = useState(0);
  const changeColor = id => {
    if (id === 1) {
      setOptionId1(1);
    } else if (id === 2) {
      setOptionId1(2);
    } else if (id === 3) {
      setOptionId1(3);
    } else if (id === 4) {
      setOptionId1(4);
    }
  };
  const changeColor2 = id => {
    if (id === 1) {
      setOptionId2(1);
    } else if (id === 2) {
      setOptionId2(2);
    } else if (id === 3) {
      setOptionId2(3);
    } else if (id === 4) {
      setOptionId2(4);
    }
  };

  const submit = () => {
    if (optionId1 != 0 && optionId2 != 0) {
      navigation.navigate('Home');
    } else {
      alert('Lütfen tüm soruları yanıtlayınız.');
    }
  };

  const [dummyData, setDummyData] = useState([]);
  const [loader, setLoader] = useState(true);

  async function fetchData() {
    await axios
      .get('https://reqres.in/api/users?page=2')
      .then(function (response) {
        setDummyData(response.data.data);
        setLoader(false);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [selected, setSelected] = useState(false);

  const renderItem = ({item, index}) => (
    <View style={styles.card}>
      <View style={styles.cardInside}>
        <Text style={styles.question}>{item.first_name}</Text>
        <View style={styles.answerArea}>
          <TouchableOpacity
            onPress={() => changeColor(1)}
            style={styles.optionArea}>
            <Text style={styles.optionsText}>A - </Text>
            {optionId1 === 1 ? (
              <View
                style={{
                  backgroundColor: '#14B219',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    ...styles.optionsText,
                    color: '#fff',
                  }}>
                  {item.last_name}
                </Text>
              </View>
            ) : (
              <Text style={styles.optionsText}>{item.email}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeColor(2)}
            style={styles.optionArea}>
            <Text style={styles.optionsText}>B - </Text>
            {optionId1 === 2 ? (
              <View
                style={{
                  backgroundColor: '#14B219',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    ...styles.optionsText,
                    color: '#fff',
                  }}>
                  {item.last_name}
                </Text>
              </View>
            ) : (
              <Text style={styles.optionsText}>{item.email}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeColor(3)}
            style={styles.optionArea}>
            <Text style={styles.optionsText}>C - </Text>
            {optionId1 === 3 ? (
              <View
                style={{
                  backgroundColor: '#14B219',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    ...styles.optionsText,
                    color: '#fff',
                  }}>
                  {item.last_name}
                </Text>
              </View>
            ) : (
              <Text style={styles.optionsText}>{item.email}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeColor(4)}
            style={styles.optionArea}>
            <Text style={styles.optionsText}>D - </Text>
            {optionId1 === 4 ? (
              <View
                style={{
                  backgroundColor: '#14B219',
                  borderRadius: 5,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    ...styles.optionsText,
                    color: '#fff',
                  }}>
                  {item.last_name}
                </Text>
              </View>
            ) : (
              <Text style={styles.optionsText}>{item.email}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Hakkımda</Text>
        <View style={{width: 40, height: 40}} />
      </View>
      <View style={styles.body}>
        {/* <ScrollView>
          <View style={styles.card}>
            <View style={styles.cardInside}>
              <Text style={styles.question}>Mesleğiniz nedir?</Text>
              <View style={styles.answerArea}>
                <TouchableOpacity
                  onPress={() => changeColor(1)}
                  style={styles.optionArea}>
                  <Text style={styles.optionsText}>A - </Text>
                  {optionId1 === 1 ? (
                    <View
                      style={{
                        backgroundColor: '#14B219',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          ...styles.optionsText,
                          color: '#fff',
                        }}>
                        Yazılım Mühendisi
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.optionsText}>Yazılım Mühendisi</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => changeColor(2)}
                  style={styles.optionArea}>
                  <Text style={styles.optionsText}>B - </Text>
                  {optionId1 === 2 ? (
                    <View
                      style={{
                        backgroundColor: '#14B219',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          ...styles.optionsText,
                          color: '#fff',
                        }}>
                        Sistem Mühendisi
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.optionsText}>Sistem Mühendisi</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => changeColor(3)}
                  style={styles.optionArea}>
                  <Text style={styles.optionsText}>C - </Text>
                  {optionId1 === 3 ? (
                    <View
                      style={{
                        backgroundColor: '#14B219',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          ...styles.optionsText,
                          color: '#fff',
                        }}>
                        Makine Mühendisi
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.optionsText}>Makine Mühendisi</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => changeColor(4)}
                  style={styles.optionArea}>
                  <Text style={styles.optionsText}>D - </Text>
                  {optionId1 === 4 ? (
                    <View
                      style={{
                        backgroundColor: '#14B219',
                        borderRadius: 5,
                        paddingHorizontal: 10,
                      }}>
                      <Text
                        style={{
                          ...styles.optionsText,
                          color: '#fff',
                        }}>
                        Orman Mühendisi
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.optionsText}>Orman Mühendisi</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => submit()} style={styles.submit}>
            <Text style={styles.submitText}>Profili Tamamla</Text>
          </TouchableOpacity>
        </ScrollView> */}
        <FlatList
          data={dummyData}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default AboutMeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    backgroundColor: '#1F5D44',
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#fff',
  },
  headerText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 20,
    color: '#fff',
  },
  card: {
    width: screenWidth,
    padding: 10,
  },
  question: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  answerArea: {
    width: '100%',
    height: 150,
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  optionsText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#555',
  },
  optionArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardInside: {
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 10,
  },
  submit: {
    backgroundColor: '#14B219',
    width: screenWidth - 20,
    height: 45,
    alignSelf: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: 20,
    fontFamily: 'Manrope-Bold',
    color: '#fff',
  },
});
