/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ProfileStyle} from '../../style/styles';
import Loader from '../Loader';

const ProfileScreen = ({navigation}) => {
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      let parsed = JSON.parse(jsonValue);
      console.log('çıkış token=>', parsed.token);
      storeData(parsed.mail, parsed.password);
    } catch (e) {
      // error reading value
    }
  };
  const storeData = async (mail, password, token) => {
    try {
      let value = {
        mail: mail,
        password: password,
        token: 'yenitoken',
      };
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  async function destroyToken() {
    navigation.navigate('AuthStack');
    await axios
      .put('https://reqres.in/api/users/4', {
        firstName: 'kminchelle',
      })
      .then(function (response) {
        console.log(response.data);
        if (response) {
          getData();
        } else {
          navigation.goBack();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const [profileInfo, setProfileInfo] = useState([]);
  const [loader, setLoader] = useState(true);
  async function fetchData() {
    await axios
      .get('https://reqres.in/api/users/4')
      .then(function (response) {
        console.log(response.data.data.email);
        setProfileInfo(response.data.data);
        setLoader(false);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={ProfileStyle.container}>
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
            top: Dimensions.get('screen').height / 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Loader />
          <Text style={{color: '#fff', fontSize: 18, alignSelf: 'center'}}>
            Lütfen Bekleyin
          </Text>
        </View>
      ) : null}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
        enabled>
        <View style={ProfileStyle.header}>
          <Text style={ProfileStyle.headerTitle}>Profil</Text>
        </View>

        <View style={ProfileStyle.body}>
          <View style={ProfileStyle.avatar}>
            <Image
              style={ProfileStyle.avatarImg}
              source={{uri: profileInfo.avatar}}
            />
            <Text style={ProfileStyle.avatarText}>{profileInfo.email}</Text>
          </View>

          <TouchableOpacity
            style={ProfileStyle.profileRow}
            onPress={() => navigation.navigate('Summary')}>
            <View style={ProfileStyle.leftRow}>
              <Ionicons name="stats-chart" size={25} />
              <Text style={ProfileStyle.profileRowText}>Özet</Text>
            </View>
            <Ionicons name="chevron-forward" size={30} />
          </TouchableOpacity>

          <TouchableOpacity
            style={ProfileStyle.profileRow}
            onPress={() => navigation.navigate('AccountInfo')}>
            <View style={ProfileStyle.leftRow}>
              <Ionicons name="person" size={25} />
              <Text style={ProfileStyle.profileRowText}>Profil bilgileri</Text>
            </View>
            <Ionicons name="chevron-forward" size={30} />
          </TouchableOpacity>

          <TouchableOpacity
            style={ProfileStyle.profileRow}
            onPress={() => navigation.navigate('OwnerInfo')}>
            <View style={ProfileStyle.leftRow}>
              <Ionicons name="list" size={25} />
              <Text style={ProfileStyle.profileRowText}>Satıcı profili</Text>
            </View>
            <Ionicons name="chevron-forward" size={30} />
          </TouchableOpacity>

          <TouchableOpacity style={ProfileStyle.profileRow}>
            <View style={ProfileStyle.leftRow}>
              <Ionicons name="grid" size={25} />
              <Text style={ProfileStyle.profileRowText}>Mağaza İşlemleri</Text>
            </View>
            <Ionicons name="chevron-forward" size={30} />
          </TouchableOpacity>

          <TouchableOpacity
            style={ProfileStyle.profileRow}
            onPress={() => navigation.navigate('Settings')}>
            <View style={ProfileStyle.leftRow}>
              <Ionicons name="settings" size={25} />
              <Text style={ProfileStyle.profileRowText}>Ayarlar</Text>
            </View>
            <Ionicons name="chevron-forward" size={30} />
          </TouchableOpacity>

          <TouchableOpacity style={ProfileStyle.profileRow}>
            <View style={ProfileStyle.leftRow}>
              <Ionicons name="star" size={25} />
              <Text style={ProfileStyle.profileRowText}>Bizi oylayın</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => destroyToken()}
            style={ProfileStyle.profileRow}>
            <View style={ProfileStyle.leftRow}>
              <Ionicons name="log-out-outline" size={25} />
              <Text style={ProfileStyle.profileRowText}>Çıkış Yap</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
