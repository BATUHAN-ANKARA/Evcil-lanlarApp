/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Logo2 from '../../../assets/images/Logo2';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTogglePasswordVisibility} from '../../hooks/useTogglePasswordVisibility';
import FloatingLabelInput from './FloatingLabel';
import FloatingLabelPassword from './FloatingLabelPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';

const screenWidth = Dimensions.get('screen').width;

const LoginScreen = ({navigation}) => {
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      }),
    [navigation],
  );

  const [labelMail, setLabelMail] = useState('E-posta');
  const [labelPassword, setLabelPassword] = useState('Şifre');

  const [loader, setLoader] = useState(false);

  const changeMail = text => {
    console.log(text);
    setMail(text);
    if (text) {
      setLabelMail('');
    } else {
      setLabelMail('E-posta');
    }
  };
  const changePassword = text => {
    setPassword(text);
    if (text) {
      setLabelPassword('');
    } else {
      setLabelPassword('Şifre');
    }
  };

  async function postData(mail, password) {
    setLoader(true);
    console.log(mail);
    await axios
      .post('https://reqres.in/api/login', {
        email: mail,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.token);
        if (response) {
          storeData(response.data.token);
          setLoader(false);
          navigation.navigate('App');
        } else {
          alert('Bilgilerinizi kontrol edin');
        }
      })
      .catch(function (error) {
        alert('Bilgilerinizi kontrol edin');
        setLoader(false);
        console.log(error);
      });
  }

  const storeData = async token => {
    try {
      let value = {
        token: token,
      };
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
      console.log('token=>', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/splash.png')}
        resizeMode="cover"
        style={{flex: 1, padding: 10}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Logo2 />
          </View>

          <View style={styles.body}>
            <View style={{marginBottom: 30}}>
              <Text style={styles.page_title}>Giriş Yap</Text>
              <Text style={{...styles.explanation, textAlign: 'left'}}>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.{' '}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                height: '100%',
              }}>
              <FloatingLabelInput
                label={labelMail}
                defaultValue={mail}
                keyboardType="email-address"
                onChangeText={text => changeMail(text)}
              />

              <FloatingLabelPassword
                label={labelPassword}
                defaultValue={password}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => changePassword(text)}
                secureTextEntry={passwordVisibility}
                onPress={handlePasswordVisibility}
                name={rightIcon}
              />

              {loader ? (
                <ActivityIndicator size="large" color="#14B219" />
              ) : null}

              <TouchableOpacity
                style={styles.button}
                onPress={() => postData(mail, password)}>
                <View>
                  <Text style={styles.button_text}>Giriş Yap</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button_forgot}
                onPress={() => navigation.navigate('ForgotPassword')}>
                <View>
                  <Text style={styles.button_forgot_text}>Şifremi Unuttum</Text>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  justifyContent: 'space-between',
                  marginTop: 30,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#14B219',
                    width: '42%',
                    opacity: 0.2,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'Manrope-Regular',
                    fontSize: 16,
                    color: '#fff',
                  }}>
                  VEYA
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#14B219',
                    width: '42%',
                    opacity: 0.2,
                  }}
                />
              </View>

              <TouchableOpacity
                style={styles.button_register}
                onPress={() => navigation.navigate('Register')}>
                <View>
                  <Text style={styles.button_register_text}>Kayıt Ol</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F5D44',
    padding: 0,
  },
  body: {
    flex: 1,
    padding: 5,
    marginTop: 10,
  },
  header: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 0 : 30,
  },
  button: {
    height: 45,
    backgroundColor: '#14B219',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  button_forgot: {
    height: 45,
    backgroundColor: 'transparent',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  button_register: {
    height: 45,
    backgroundColor: 'transparent',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#14B219',
  },
  button_forgot_text: {
    color: '#14B219',
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
  },
  button_register_text: {
    color: '#14B219',
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
  },
  button_text: {
    color: '#fff',
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
  },
  page_title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  explanation: {
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
  },
  terms: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
});
