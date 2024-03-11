import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountInfoStyles} from '../../style/styles';
import axios from 'axios';

const AccountInfo = ({navigation}) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');

  async function update(name) {
    await axios
      .put('https://reqres.in/api/users/4', {
        first_name: name,
      })
      .then(function (response) {
        console.log(response.data);
        navigation.goBack();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function fetchData() {
    await axios
      .get('https://reqres.in/api/users/4')
      .then(function (response) {
        console.log(response.data.data.first_name);
        setName(response.data.data.first_name);
        setSurname(response.data.data.last_name);
        setMail(response.data.data.email);
        // setPhone(response.data.phone);
        // setGender(response.data.gender);
        // setCity(response.data.address.city);
        // setTown(response.data.address.state);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      enabled>
      <SafeAreaView style={AccountInfoStyles.modalProfileContainer}>
        <View>
          <View style={AccountInfoStyles.modalProfileHeader}>
            <TouchableOpacity
              style={AccountInfoStyles.modalProfileCloseButton}
              onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={25} color="#fff" />
            </TouchableOpacity>
            <Text style={AccountInfoStyles.headerTitle}>Hesabım</Text>
            <View style={{width: 40, height: 40}} />
          </View>
        </View>

        <View style={{paddingBottom: 80}}>
          <ScrollView showsVerticalScrollIndicator={false} style={{}}>
            <Text style={AccountInfoStyles.modalProfileGeneralText}>
              Bilgilerini güncelleyin ve kaydedin.
            </Text>

            <View style={AccountInfoStyles.modalProfileInput}>
              <Text
                style={{
                  ...AccountInfoStyles.modalProfileInputTitle,
                  marginTop: 0,
                }}>
                Ad - Soyad
              </Text>
              <View style={AccountInfoStyles.modalProfileInputArea}>
                <TextInput
                  value={name}
                  onChangeText={val => setName(val)}
                  placeholder={name}
                  placeholderTextColor="#888"
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <View style={AccountInfoStyles.modalProfileInputArea}>
                <TextInput
                  value={surname}
                  placeholder="Soyad"
                  onChangeText={val => setSurname(val)}
                  placeholderTextColor="#888"
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <Text style={AccountInfoStyles.modalProfileInputTitle}>
                E-posta adresi
              </Text>
              <View style={AccountInfoStyles.modalProfileInputArea}>
                <TextInput
                  value={mail}
                  placeholder="E-posta"
                  onChangeText={val => setMail(val)}
                  placeholderTextColor="#888"
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <Text style={AccountInfoStyles.modalProfileInputTitle}>
                Telefon
              </Text>
              <View style={AccountInfoStyles.modalProfileInputArea}>
                <TextInput
                  value={phone}
                  placeholder="Telefon"
                  onChangeText={val => setPhone(val)}
                  placeholderTextColor="#888"
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <Text style={AccountInfoStyles.modalProfileInputTitle}>
                Cinsiyet
              </Text>
              {gender === 'Kadın' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => setGender('Kadın')}
                    style={{
                      ...AccountInfoStyles.modalProfileGenderArea,
                      backgroundColor: '#FFD4D4',
                      borderWidth: 1,
                      borderColor: 'red',
                    }}>
                    <Ionicons name="female" size={20} color="#FF597B" />
                    <Text style={AccountInfoStyles.modalProfileGenderText}>
                      Kadın
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setGender('Erkek')}
                    style={{
                      ...AccountInfoStyles.modalProfileGenderArea,
                      backgroundColor: '#B9F3FC',
                    }}>
                    <Ionicons name="male" size={20} color="#0081B4" />
                    <Text style={AccountInfoStyles.modalProfileGenderText}>
                      Erkek
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => setGender('Kadın')}
                    style={{
                      ...AccountInfoStyles.modalProfileGenderArea,
                      backgroundColor: '#FFD4D4',
                    }}>
                    <Ionicons name="female" size={20} color="#FF597B" />
                    <Text style={AccountInfoStyles.modalProfileGenderText}>
                      Kadın
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setGender('Erkek')}
                    style={{
                      ...AccountInfoStyles.modalProfileGenderArea,
                      backgroundColor: '#B9F3FC',
                      borderWidth: 1,
                      borderColor: 'blue',
                    }}>
                    <Ionicons name="male" size={20} color="#0081B4" />
                    <Text style={AccountInfoStyles.modalProfileGenderText}>
                      Erkek
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <Text style={AccountInfoStyles.modalProfileInputTitle}>
                Adresiniz
              </Text>

              <View style={AccountInfoStyles.modalProfileInputArea}>
                <TextInput
                  value={city}
                  placeholder="Şehir"
                  onChangeText={val => setCity(val)}
                  placeholderTextColor="#888"
                  style={{width: '100%', height: '100%'}}
                />
              </View>

              <View style={AccountInfoStyles.modalProfileInputArea}>
                <TextInput
                  value={town}
                  placeholder="İlçe"
                  onChangeText={val => setTown(val)}
                  placeholderTextColor="#888"
                  style={{width: '100%', height: '100%'}}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => update(name)}
              style={AccountInfoStyles.modalProfileSaveButton}>
              <Text style={AccountInfoStyles.modalProfileSaveButtonText}>
                Değişiklikleri Kaydet
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AccountInfo;
