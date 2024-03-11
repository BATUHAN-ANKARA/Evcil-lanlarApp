import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Logo2 from '../../../assets/images/Logo2';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTogglePasswordVisibility} from '../../hooks/useTogglePasswordVisibility';
import {useTogglePasswordConfirmVisibility} from '../../hooks/useTogglePasswordConfirmVisibility';
import FloatingLabelInput from './FloatingLabel';
import FloatingLabelPassword from './FloatingLabelPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import axios from 'axios';

const screenWidth = Dimensions.get('screen').width;
const RegisterScreen = ({navigation}) => {
  const [contract, setContract] = useState(false);
  const contractConfirm = () => {
    setContract(!contract);
  };
  const [labelName, setLabelName] = useState('İsim');
  const [labelSurname, setLabelSurname] = useState('Soyisim');
  const [labelPhone, setLabelPhone] = useState('Telefon');
  const [labelMail, setLabelMail] = useState('E-posta');
  const [labelPassword, setLabelPassword] = useState('Şifre');
  const [labelPasswordConfirm, setLabelPasswordConfirm] =
    useState('Şifre Tekrar');

  async function postData(mail, password) {
    setLoader(true);
    await axios
      .post('https://reqres.in/api/register', {
        // firstName: name,
        // lastName: surname,
        // phone: phone,
        email: mail,
        password: password,
      })
      .then(function (response) {
        console.log('Post edilen data=====>>>', response.data);
        setToken(response.data.token);
        console.log('set olduktan sonra token', token);
        setLoader(false);
        storeData();
      })
      .catch(function (error) {
        setLoader(false);
        alert('Hatalı işlem');
        console.log(error);
      });
  }

  const storeData = async () => {
    try {
      let value = {
        name: name,
        surname: surname,
        phone: phone,
        mail: mail,
        password: password,
        token: token,
      };

      if (
        // value.name &&
        // value.surname &&
        // value.phone &&
        value.mail &&
        value.password
      ) {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('user', jsonValue);
        navigation.navigate('RegisterVerification');
      } else {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
        alert('Lütfen tüm bilgileri girin');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [loader, setLoader] = useState(false);

  const changeName = text => {
    setName(text);
    if (text) {
      setLabelName('');
    } else {
      setLabelName('İsim');
    }
  };

  const changeSurname = text => {
    setSurname(text);
    if (text) {
      setLabelSurname('');
    } else {
      setLabelSurname('Soyisim');
    }
  };

  const changePhone = text => {
    setPhone(text);
    if (text) {
      setLabelPhone('');
    } else {
      setLabelPhone('Telefon');
    }
  };

  const changeMail = text => {
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

  const changePasswordConfirm = text => {
    setPasswordConfirm(text);
    if (text) {
      setLabelPasswordConfirm('');
    } else {
      setLabelPasswordConfirm('Şifre');
    }
  };

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility();

  const {
    passwordConfirmVisibility,
    rightConfirmIcon,
    handlePasswordConfirmVisibility,
  } = useTogglePasswordConfirmVisibility();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [token, setToken] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      enabled>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../../../assets/images/splash.png')}
          resizeMode="cover"
          style={{flex: 1, padding: 10}}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.headerButton}>
              <Ionicons name="chevron-back" size={25} color="#fff" />
            </TouchableOpacity>
            <Logo2 />
            <View style={styles.headerButton}></View>
          </View>
          <View>
            <ScrollView
              style={{marginTop: 30, marginBottom: 90}}
              showsVerticalScrollIndicator={false}>
              <View style={styles.body}>
                <View style={{marginBottom: 30}}>
                  <Text style={styles.page_title}>Kayıt Ol</Text>
                  <Text style={{...styles.explanation, textAlign: 'left'}}>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form.{' '}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    height: '100%',
                  }}>
                  <FloatingLabelInput
                    label={labelName}
                    value={name}
                    onChangeText={text => changeName(text)}
                  />
                  <FloatingLabelInput
                    label={labelSurname}
                    value={surname}
                    onChangeText={text => changeSurname(text)}
                  />
                  <FloatingLabelInput
                    label={labelPhone}
                    value={phone}
                    keyboardType="phone-pad"
                    onChangeText={text => changePhone(text)}
                  />
                  <FloatingLabelInput
                    label={labelMail}
                    value={mail}
                    keyboardType="email-address"
                    onChangeText={text => changeMail(text)}
                  />
                  <FloatingLabelPassword
                    label={labelPassword}
                    value={password}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => changePassword(text)}
                    secureTextEntry={passwordVisibility}
                    onPress={handlePasswordVisibility}
                    name={rightIcon}
                  />
                  <FloatingLabelPassword
                    label={labelPasswordConfirm}
                    value={passwordConfirm}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={text => changePasswordConfirm(text)}
                    secureTextEntry={passwordConfirmVisibility}
                    onPress={handlePasswordConfirmVisibility}
                    name={rightConfirmIcon}
                  />
                </View>
              </View>

              {loader ? (
                <ActivityIndicator size="large" color="#14B219" />
              ) : null}

              <View style={styles.terms}>
                <TouchableOpacity
                  onPress={() => contractConfirm()}
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  {contract ? (
                    <Ionicons
                      name="checkbox-outline"
                      size={30}
                      color="#14B219"
                    />
                  ) : (
                    <Ionicons name="square-outline" size={30} color="#eee" />
                  )}

                  <Text style={{...styles.explanation, marginLeft: 10}}>
                    Kullanım şartlarını kabul ediyorum.
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => postData(mail, password)}>
                  <View>
                    <Text style={styles.button_text}>Kayıt Ol</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
    width: '100%',
    height: null,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? 5 : 15,
  },
  button: {
    height: 45,
    backgroundColor: '#14B219',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
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
    width: '100%',
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
    marginLeft: 5,
  },
});
