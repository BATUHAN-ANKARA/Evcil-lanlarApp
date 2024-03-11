import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../Loader';
import axios from 'axios';

const screenWidth = Dimensions.get('screen').width;

const NotificationsScreen = ({navigation}) => {
  const [dummyData, setDummyData] = useState([]);
  const [loader, setLoader] = useState(true);

  async function fetchData() {
    await axios
      .get('https://reqres.in/api/users?page=2')
      .then(function (response) {
        setDummyData(response.data.data);
        setLoader(false);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const ask = () => {
    Alert.alert('Tüm Bildirimleri Temizle', 'Bu İşlem Geri Alınamaz', [
      {
        text: 'Evet',
        onPress: () => console.log('Evet Pressed'),
        style: 'cancel',
      },
      {text: 'Hayır', onPress: () => console.log('Hayır Pressed')},
    ]);
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{uri: item.avatar}} style={styles.iconArea} />
      <View style={styles.cardTextArea}>
        <Text style={styles.cardTitle}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={styles.cardText}>{item.email}</Text>
        <Text style={{...styles.cardText, color: '#14B219'}}>{item.id}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}>
          <Ionicons name="chevron-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Bildirimler</Text>
        <Text onPress={() => ask()} style={styles.headerText}>
          Temizle
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  header: {
    backgroundColor: '#1F5D44',
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#fff',
    marginLeft: 20,
  },
  headerText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#fff',
  },
  card: {
    width: screenWidth - 20,
    height: 100,
    backgroundColor: '#C4E3CB',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  iconArea: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextArea: {
    width: screenWidth - 110,
    height: 100,
    flexDirection: 'column',
    paddingVertical: 5,
    marginLeft: 10,
  },
  cardTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  cardText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});
export default NotificationsScreen;
