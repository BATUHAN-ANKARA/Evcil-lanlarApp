/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LeftBack from '../../../assets/images/LeftBack';
import dummy from '../Home/Data/DummyData';
import axios from 'axios';
import Loader from '../Loader';
import {SubBreedStyle} from '../../style/styles';

const screenWidth = Dimensions.get('window').width;

const SubBreedScreen = ({navigation, route}) => {
  const scrolling = React.useRef(new Animated.Value(0)).current;
  const boxInterpolation = scrolling.interpolate({
    inputRange: [0, 250],
    outputRange: ['transparent', 'rgba(53,49,53,1)'],
  });
  const animatedStyle = {
    backgroundColor: boxInterpolation,
  };
  let type = 'malinois';

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

  return (
    <SafeAreaView style={SubBreedStyle.container}>
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
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[SubBreedStyle.chevronBack]}>
          <LeftBack />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            position: 'absolute',
            zIndex: 1,
            right: 30,
            width: 40,
            height: 40,
            top: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => alert('Paylaş Butonu')}>
          <Ionicons name="share-social" size={25} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        style={{flex: 1}}
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
          <Image
            source={require('../../../assets/images/malinois.jpg')}
            style={{...styles.breedImg, height: '100%'}}
          />
        </View>

        <View style={styles.title}>
          {dummy
            .filter(function (item) {
              return item.breed === type;
            })
            .map(function ({name}) {
              return (
                <Text style={{...SubBreedStyle.titleText, color: '#1F5D44'}}>
                  {type}
                </Text>
              );
            })}
        </View>

        <View style={styles.generalText}>
          {dummy
            .filter(function (item) {
              return item.breed === type;
            })
            .map(function ({generalText}) {
              return (
                <Text style={SubBreedStyle.generalTextStyle}>
                  Alabay köpek Irkı Alabay köpek ırkının tarihi kökeni son
                  derece eskidir. Geçmişinin yaklaşık olarak 4000 yıl öncesine
                  kadar dayandığı rivayet edilmektedir. Bu ırkın atalarının
                  Tibet’te yaşadığı düşünülmektedir. Tam bir bilinir. Bekçi
                  köpeği olmasının yanı sıra aynı zamanda yıllar boyunca savaş
                  köpeği olarak da kullanılmışlardır. Bu köpek ırkı Moğol
                  seferleri sırasında orduya oldukça fazla destek vermiş bir
                  ırktır.
                </Text>
              );
            })}
        </View>

        <View style={SubBreedStyle.buttonArea}>
          <TouchableOpacity
            style={SubBreedStyle.button}
            onPress={() => navigation.navigate('PetSearch')}>
            <Text style={SubBreedStyle.buttonText}>BU IRK'A AİT İLANLAR</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dummyData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={SubBreedStyle.breedArea}>
              <View style={styles.breedImgArea}>
                <Image source={{uri: item.avatar}} style={styles.breedImg} />
              </View>
              <View style={SubBreedStyle.breedName}>
                <Text style={SubBreedStyle.breedTitle}>Malinois</Text>
              </View>
              <View style={styles.breedText}>
                <Text style={SubBreedStyle.generalTextStyle}>
                  {item.first_name}
                </Text>
              </View>
              <View style={SubBreedStyle.breedButtonArea}>
                <TouchableOpacity
                  style={SubBreedStyle.breedButton}
                  onPress={() =>
                    navigation.navigate('BreedDetail', {id: item.id})
                  }>
                  <Text style={SubBreedStyle.breedButtonText}>Detay</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default SubBreedScreen;

const styles = StyleSheet.create({
  img: {
    width: screenWidth,
    height: 200,
    backgroundColor: 'grey',
  },
  title: {
    width: screenWidth,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  generalText: {
    width: screenWidth,
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  breedImgArea: {
    width: screenWidth,
    height: 150,
    backgroundColor: 'grey',
  },
  breedText: {
    width: screenWidth,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  breedImg: {
    width: screenWidth,
    height: 150,
  },
});
