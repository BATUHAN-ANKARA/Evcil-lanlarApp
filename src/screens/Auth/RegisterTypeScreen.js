import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const screenWidth = Dimensions.get('screen').width;
const RegisterTypeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/splash.png')}
        resizeMode="cover"
        style={{flex: 1, padding: 10}}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="chevron-back" size={25} color="#fff" />
          </TouchableOpacity>

          <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>Kayıt Ol</Text>
          </View>
          <View style={{width: 40, height: 40}}></View>
        </View>

        <View style={styles.body}>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 99,
              width: 170,
              height: 170,
            }}
          />

          <Text style={styles.explanation}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </Text>

          <TouchableOpacity
            style={{...styles.button, backgroundColor: '#DB4437'}}
            onPress={() => alert('Google ile devam et')}>
            <Ionicons name="logo-google" size={18} color="#fff" />
            <Text style={styles.button_text}>Google ile devam et</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{...styles.button, backgroundColor: '#4267B2'}}
            onPress={() => alert('Facebook ile devam et')}>
            <Ionicons name="logo-facebook" size={18} color="#fff" />
            <Text style={styles.button_text}>Facebook ile devam et</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{...styles.button, backgroundColor: '#fff'}}
            onPress={() => navigation.navigate('Register')}>
            <Ionicons name="mail-outline" size={18} color="#333" />
            <Text style={{...styles.button_text, color: '#333'}}>
              E-posta adresi ile devam et
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footer_text}>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </Text>

          <Text style={styles.footer_text}>There are many</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F5D44',
    padding: 0,
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
  },
  footer: {
    flex: 0.2,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#fff',
  },
  explanation: {
    textAlign: 'center',
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    fontSize: 16,
    margin: 10,
    marginBottom: 30,
  },
  button: {
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#999',
    width: '100%',
    margin: 10,
    justifyContent: 'center',
  },
  button_text: {
    color: '#fff',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    marginLeft: 10,
  },
  footer_text: {
    textAlign: 'center',
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 3,
  },
});
