import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Logo2 from '../../../assets/images/Logo2';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SuccessRegisterScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('Login', {from: 'verification'});
  }, 1000);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/splash.png')}
        resizeMode="contain"
        style={{flex: 1, padding: 10}}>
        <View style={styles.header}>
          <Logo2 />
        </View>
        <View style={styles.body}>
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Ionicons name="thumbs-up" color="#FCD15C" size={64} />
              <Text style={styles.cardText}>
                Kayıt Başarılı Giriş Yapabilirsiniz
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SuccessRegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F5D44',
  },
  body: {
    padding: 5,
    flex: 0.6,
    justifyContent: 'center',
  },
  header: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : 0,
  },
  card: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    alignItems: 'center',
    opacity: 0.9,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  cardText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    marginTop: 20,
    color: '#fff',
  },
});
