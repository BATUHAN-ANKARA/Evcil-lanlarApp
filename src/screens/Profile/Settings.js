import React, {useState} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SettingsStyle} from '../../style/styles';

const Settings = ({navigation}) => {
  const [bowser, setBrowser] = useState(false);
  return (
    <SafeAreaView style={SettingsStyle.container}>
      <View style={SettingsStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={SettingsStyle.headerTitle}>Ayarlar ve Bilgiler</Text>
        <View style={{width: 40, height: 40}} />
      </View>

      <View style={SettingsStyle.settingsTitle}>
        <Text style={SettingsStyle.settingsTitleText}>AYARLAR</Text>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <TouchableOpacity style={SettingsStyle.settingsRow}>
          <View style={SettingsStyle.leftRow}>
            <Ionicons name="location" size={25} />
            <Text style={SettingsStyle.settingsRowText}>Konum Servisleri</Text>
          </View>
          <Ionicons name="chevron-forward" size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={SettingsStyle.settingsRow}>
          <View style={SettingsStyle.leftRow}>
            <Ionicons name="notifications" size={25} />
            <Text style={SettingsStyle.settingsRowText}>Bildirimler</Text>
          </View>
          <Ionicons name="chevron-forward" size={30} />
        </TouchableOpacity>
      </View>

      <View style={{...SettingsStyle.settingsTitle, marginTop: 5}}>
        <Text style={SettingsStyle.settingsTitleText}>BİLGİLER</Text>
      </View>

      <View style={{paddingHorizontal: 10}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Browser')}
          style={SettingsStyle.settingsRow}>
          <View style={SettingsStyle.leftRow}>
            <Ionicons name="document-text" size={25} />
            <Text style={SettingsStyle.settingsRowText}>
              Kullanım Koşulları
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={SettingsStyle.settingsRow}>
          <View style={SettingsStyle.leftRow}>
            <Ionicons name="document-text" size={25} />
            <Text style={SettingsStyle.settingsRowText}>
              Gizlilik Politikası
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={SettingsStyle.settingsRow}>
          <View style={SettingsStyle.leftRow}>
            <Ionicons name="document-text" size={25} />
            <Text style={SettingsStyle.settingsRowText}>Reklamlar</Text>
          </View>
          <Ionicons name="chevron-forward" size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={SettingsStyle.settingsRow}>
          <View style={SettingsStyle.leftRow}>
            <Ionicons name="trash" size={25} />
            <Text style={SettingsStyle.settingsRowText}>Hesabımı Kapat</Text>
          </View>
          <Ionicons name="chevron-forward" size={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
