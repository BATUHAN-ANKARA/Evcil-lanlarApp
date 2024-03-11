import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useIsFocused, StackActions} from '@react-navigation/native';
import {CreateAdScreen4Style} from '../../style/styles';

const CreateAdScreen4 = ({navigation}) => {
  const isFocused = useIsFocused();

  const handleSigninNavigation = () => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('İlanlarım');
  };

  useEffect(() => {}, [isFocused]);

  return (
    <SafeAreaView style={CreateAdScreen4Style.container}>
      <View style={CreateAdScreen4Style.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={CreateAdScreen4Style.headerButton}>
          <Ionicons name="chevron-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={CreateAdScreen4Style.headerTitle}>
          İlan Ekleme Başarılı
        </Text>
        <View style={{width: 40, height: 40}} />
      </View>

      <View style={CreateAdScreen4Style.body}>
        <View style={CreateAdScreen4Style.card}>
          <Ionicons name="checkmark-done" size={45} color="#14B219" />
          <Text style={CreateAdScreen4Style.mainText}>
            İlan Ekleme Başarılı
          </Text>
          <Text style={CreateAdScreen4Style.secondaryText}>
            İlan ekleme işleminiz başarılı, ilanınız kontrol edildikten sonra
            yayına alınacaktır.
          </Text>
          <TouchableOpacity
            onPress={() => handleSigninNavigation()}
            style={CreateAdScreen4Style.button}>
            <View style={CreateAdScreen4Style.buttonRow}>
              <Ionicons name="add-outline" size={20} color="#fff" />
              <Text style={CreateAdScreen4Style.buttonText}>
                Onay Bekleyen İlanlarım
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default CreateAdScreen4;
