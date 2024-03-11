import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Logo2 from '../../../assets/images/Logo2';

const RegisterVerification = ({navigation}) => {
  const verificate = () => {
    alert('Doğrulanıyor');
    setTimeout(() => {
      navigation.navigate('SuccessRegister');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/splash.png')}
        resizeMode="cover"
        style={{flex: 1, padding: 10}}>
        <View style={styles.header}>
          <Logo2 />
        </View>
        <View style={styles.body}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>
                Telefonunuza gelen doğrulama kodunu giriniz.
              </Text>
              <View style={styles.smsArea} />
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => verificate()}>
                  <Text style={styles.submitText}>DOĞRULA</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => alert('Kod tekrar dönderildi')}>
                  <Text style={styles.reSendText}>Tekrar kod gönder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F5D44',
  },
  body: {
    padding: 5,
    marginTop: 30,
    flex: 0.6,
  },
  header: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
  card: {
    width: '100%',
    height: 200,
    backgroundColor: '#1F5D44',
    borderRadius: 15,
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  cardText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    marginTop: 20,
    color: '#fff',
  },
  smsArea: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    width: 300,
    height: 100,
  },
  submitText: {
    marginTop: 25,
    fontFamily: 'Manrope-Bold',
    color: '#14B219',
  },
  reSendText: {
    marginTop: 25,
    fontFamily: 'Manrope-Regular',
    color: '#fff',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
});
