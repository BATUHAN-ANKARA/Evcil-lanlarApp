/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Logo from '../../assets/images/LogoIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SplashScreen = ({navigation}) => {
  async function fetchData() {
    const response = await axios.get('https://dummyjson.com/test', {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    console.log('uygulamanın durumu====>>>', response.data.status);
    if (response.data.status === 'ok') {
      getData();
    } else {
      setTimeout(() => {
        navigation.replace('AlertScreen');
      }, 1000);
    }
  }

  async function controlToken(parsed) {
    await axios
      .post('https://reqres.in/api/login', {
        email: parsed.mail,
        password: parsed.password,
      })
      .then(function (response) {
        console.log(response.data);
        if (response.data.token === parsed.token) {
          navigation.navigate('App');
        } else {
          console.log(parsed.token);
          navigation.navigate('Login');
        }
      })
      .catch(function (error) {
        navigation.navigate('Login');
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      if (jsonValue === null) {
        navigation.replace('OnBoard');
      } else {
        let parsed = JSON.parse(jsonValue);
        controlToken(parsed);
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/splash.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <View style={styles.body}>
          <View style={styles.logo}>
            <Logo />
          </View>
          <ActivityIndicator size="large" color="#14B219" />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Current Version: 1.0.0</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F5D44',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 11,
    lineHeight: 15,
    fontFamily: 'Manrope-Regular',
    opacity: 0.4,
  },
  img: {},
  logo: {
    marginBottom: 20,
  },
  body_title: {
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
    fontSize: 36,
    lineHeight: 45,
    fontFamily: 'Manrope-ExtraBold',
  },
  body_text: {
    marginBottom: 0,
    color: 'white',
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'Manrope-Bold',
  },
});
