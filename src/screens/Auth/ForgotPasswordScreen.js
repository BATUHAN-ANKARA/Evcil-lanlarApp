/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Logo2 from '../../../assets/images/Logo2';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FloatingLabelInput from './FloatingLabel';

const ForgotPasswordScreen = ({navigation}) => {
  const [labelMail, setLabelMail] = useState('E-posta');

  const changeMail = text => {
    setMail(text);
    if (text) {
      setLabelMail('');
    } else {
      setLabelMail('E-posta');
    }
  };

  const [mail, setMail] = useState('');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/splash.png')}
        resizeMode="contain"
        style={{flex: 1, padding: 10}}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: 'absolute',
                top: 30,
                left: 0,
              }}>
              <Ionicons name="chevron-back" color="#fff" size={25} />
            </TouchableOpacity>
            <Logo2 />
          </View>

          <View style={styles.body}>
            <View style={{marginBottom: 30}}>
              <Text style={styles.page_title}>Şifremi Unuttum</Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                height: '100%',
              }}>
              <FloatingLabelInput
                label={labelMail}
                value={mail}
                keyboardType="email-address"
                onChangeText={text => changeMail(text)}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => alert('Şifre sıfırla')}>
                <View>
                  <Text style={styles.button_text}>Şifremi Unuttum</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button_register}
                onPress={() => navigation.navigate('Login')}>
                <View>
                  <Text style={styles.button_register_text}>Giriş Yap</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F5D44',
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
    marginTop: Platform.OS === 'ios' ? 30 : 0,
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
});
