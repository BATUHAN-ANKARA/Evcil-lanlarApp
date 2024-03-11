/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import artists1 from './Data';
import {Modalize} from 'react-native-modalize';
import {MessagesDetailStyle} from '../../style/styles';
import axios from 'axios';

const screenWidth = Dimensions.get('screen').width;
const MessagesDetailScreen = ({navigation, route}) => {
  let itemId = route.params.id;
  const profileModalRef = useRef();
  const profileAddModal = async () => {
    profileModalRef.current?.open();
  };
  const profileAddModalUserClose = async () => {
    profileModalRef.current?.close();
  };
  const [name, setName] = useState('');
  const [nextId, setNextId] = useState(0);
  const [artists, setArtists] = useState(artists1);
  const addItem = () => {
    if (name === '') {
      alert('Lütfen mesaj girin');
    } else {
      setName('');
      artists.push({id: nextId, name: name});
      setNextId(nextId + 1);
      console.log(artists);
    }
  };
  const scrollViewRef = useRef();

  const empty = () => {
    setArtists([]);
  };

  const [firstName, setFirstName] = useState(null);
  const [img, setImg] = useState(null);

  async function fetchData() {
    await axios
      .get(`https://reqres.in/api/users/${itemId}`)
      .then(function (response) {
        setFirstName(response.data.data.first_name);
        setImg(response.data.data.avatar);
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <KeyboardAvoidingView
      style={MessagesDetailStyle.container}
      behavior="padding">
      <View style={MessagesDetailStyle.header}>
        <View style={MessagesDetailStyle.headerLeft}>
          <TouchableOpacity
            style={MessagesDetailStyle.headerButton}
            onPress={() => navigation.navigate('Messages')}>
            <Ionicons name="chevron-back" size={25} color="#fff" />
          </TouchableOpacity>
          <View style={{}}>
            <Text style={MessagesDetailStyle.personName}>{firstName}</Text>
            <Text style={MessagesDetailStyle.phoneNumber}>0555 555 5555</Text>
          </View>
        </View>

        <View style={MessagesDetailStyle.headerRight}>
          <TouchableOpacity style={MessagesDetailStyle.headerButton}>
            <Ionicons name="call" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Sohbeti Sil',
                'Sohbeti Silmek İstediğinize Emin Misiniz?',
                [
                  {
                    text: 'Hayır',
                    onPress: () => console.log('Cancel'),
                    style: 'cancel',
                  },
                  {text: 'Evet', onPress: () => empty()},
                ],
              )
            }
            style={MessagesDetailStyle.headerButton}>
            <Ionicons name="trash" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={MessagesDetailStyle.body}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Detail', {id: itemId})}
          style={styles.card}>
          <View>
            <Image
              source={{
                uri: img,
              }}
              style={MessagesDetailStyle.cardImg}
            />
          </View>

          <View style={styles.cardTextArea}>
            <Text style={MessagesDetailStyle.cardTitle}>İlan Başlığı</Text>
            <View style={MessagesDetailStyle.cardTextAreaRow}>
              <Text style={MessagesDetailStyle.date}>İlan Tarihi: </Text>
              <Text style={MessagesDetailStyle.date}>
                16 Mayıs 2022, 23:51:33
              </Text>
            </View>
            <View style={MessagesDetailStyle.cardTextAreaRow}>
              <Text style={MessagesDetailStyle.date}>Irk: </Text>
              <Text style={MessagesDetailStyle.date}>Malinois</Text>
            </View>
            <View style={MessagesDetailStyle.cardTextAreaRow}>
              <Text style={MessagesDetailStyle.date}>Cinsiyet: </Text>
              <Text style={MessagesDetailStyle.date}>Dişi</Text>
              <Text style={MessagesDetailStyle.type}>Satılık</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={profileAddModal}
          style={{
            alignSelf: 'center',
            marginVertical: 20,
            flexDirection: 'row',
          }}>
          <Text style={MessagesDetailStyle.termsText}>
            Kişisel verilerin işlenmesine dair
          </Text>
          <Text style={{...MessagesDetailStyle.termsText, color: '#222'}}>
            {' '}
            aydınlatma metni
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flex: 0.88,
            marginTop: 10,
          }}>
          {artists[0] ? (
            <ScrollView
              scrollsToTop={false}
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }
              style={{
                height: '100%',
                borderRadius: 5,
                backgroundColor: '#fff',
              }}>
              <View style={{}}>
                {artists.map(function ({name, id}) {
                  if (id % 2 === 0) {
                    return (
                      <View style={MessagesDetailStyle.messageBox}>
                        <Text style={MessagesDetailStyle.messageSend}>
                          {name}
                        </Text>
                        <Text style={MessagesDetailStyle.date}>
                          19 Mayıs 2022, 12:42:33
                        </Text>
                      </View>
                    );
                  } else {
                    return (
                      <View
                        style={{
                          ...MessagesDetailStyle.messageBox,
                          alignSelf: 'flex-start',
                          backgroundColor: '#ddd',
                        }}>
                        <Text style={MessagesDetailStyle.messageSend}>
                          {name}
                        </Text>
                        <Text style={MessagesDetailStyle.date}>
                          19 Mayıs 2022, 12:42:33
                        </Text>
                      </View>
                    );
                  }
                })}
              </View>
            </ScrollView>
          ) : (
            <View
              style={{
                height: '100%',
                borderRadius: 5,
                backgroundColor: '#fff',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <Text
                style={{
                  fontFamily: 'Manrope-Bold',
                  fontSize: 16,
                  color: 'red',
                }}>
                Henüz gösterilecek bir mesajınız bulunmamaktadır.
              </Text>
            </View>
          )}
        </View>

        <View style={styles.messageInputArea}>
          <TextInput
            placeholder="Mesajınızı buraya yazınız"
            multiline={true}
            placeholderTextColor="#888"
            style={{width: '90%'}}
            onChangeText={val => setName(val)}
            value={name}
          />
          <TouchableOpacity onPress={() => addItem()}>
            <Ionicons name="paper-plane-outline" size={22} color="#14B219" />
          </TouchableOpacity>
        </View>
      </View>

      <Modalize
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
        }}
        ref={profileModalRef}
        modalStyle={{flex: 0.3, padding: 10}}
        panGestureEnabled={false}
        withHandle={false}>
        <View style={MessagesDetailStyle.modalContainer}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={profileAddModalUserClose}
              style={MessagesDetailStyle.modalClose}>
              <Ionicons name="close" size={25} color="#000" />
            </TouchableOpacity>
            <Text style={MessagesDetailStyle.modalText}>Aydınlatma Metni</Text>
            <Text style={MessagesDetailStyle.modalRulesText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>
          </View>
        </View>
      </Modalize>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  card: {
    width: screenWidth - 20,
    alignSelf: 'center',
    height: 100,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.7,
    borderColor: '#bbb',
  },
  cardTextArea: {
    width: screenWidth - 130,
    height: 80,
    marginRight: 10,
  },
  messageInputArea: {
    flex: 0.1,
    backgroundColor: '#eee',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 0.8,
    paddingHorizontal: 10,
    borderColor: '#14B219',
  },
});
export default MessagesDetailScreen;
