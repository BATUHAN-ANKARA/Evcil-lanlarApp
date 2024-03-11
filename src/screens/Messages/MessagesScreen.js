/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useEffect} from 'react';
import {MessagesStyle} from '../../style/styles';
import Loader from '../Loader';

const screenWidth = Dimensions.get('screen').width;

const MessagesScreen = ({navigation}) => {
  const [id, setId] = useState(true);
  const read = index => {
    setId(index);
  };

  const [dummyData, setDummyData] = useState([]);
  const [loader, setLoader] = useState(true);
  async function fetchData() {
    await axios
      .get('https://reqres.in/api/users?page=2')
      .then(function (response) {
        setDummyData(response.data.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
    setLoader(false);
  }, []);

  return (
    <SafeAreaView style={MessagesStyle.container}>
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
            top: screenWidth / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Loader />
          <Text style={{color: '#fff', fontSize: 18, alignSelf: 'center'}}>
            Lütfen Bekleyin
          </Text>
        </View>
      ) : null}

      <View style={MessagesStyle.header}>
        <View style={{width: 40, height: 40}} />
        <Text style={MessagesStyle.title}>Mesajlar</Text>
        <TouchableOpacity
          onPress={() => alert('Hepsini Okundu Olarak İşaretle')}
          style={MessagesStyle.headerButton}>
          <Ionicons name="mail-open" color="#fff" size={25} />
        </TouchableOpacity>
      </View>

      <View style={MessagesStyle.body}>
        <View style={{paddingBottom: 80}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={dummyData}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MessagesDetail', {id: item.id})
                }
                style={{
                  ...styles.card,
                  backgroundColor: item.id % 3 === 0 ? '#fff' : '#FFECEF',
                }}>
                <View style={MessagesStyle.avatar}>
                  <Image
                    source={{uri: item.avatar}}
                    style={{width: 50, height: 50, borderRadius: 8}}
                  />
                </View>
                <View style={styles.cardTextArea}>
                  <Text style={MessagesStyle.adName}>{item.first_name}</Text>
                  <View style={MessagesStyle.messageDetail}>
                    <Ionicons name="person" size={16} />
                    <Text style={MessagesStyle.personName}>
                      {item.last_name}
                    </Text>
                  </View>
                  <Text style={MessagesStyle.date}>
                    19 Mayıs 2022, 12:52:05
                  </Text>
                </View>
                {item.id % 3 === 0 ? (
                  <Text style={MessagesStyle.read}>Okundu</Text>
                ) : (
                  <Text style={MessagesStyle.unread}>Okunmadı</Text>
                )}
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  card: {
    width: screenWidth,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 0.7,
    borderBottomColor: '#aaa',
  },
  cardTextArea: {
    flexDirection: 'column',
    width: screenWidth - 80,
    height: 60,
  },
});
export default MessagesScreen;
