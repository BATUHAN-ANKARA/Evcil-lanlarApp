/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modalize} from 'react-native-modalize';
import axios from 'axios';
import Loader from '../Loader';

const FavoritesBreeds = ({navigation}) => {
  const optionModalRef = useRef();
  const optionAddModal = async () => {
    optionModalRef.current?.open();
  };
  const optionAddModalUserClose = async () => {
    optionModalRef.current?.close();
  };

  const [dummyData, setDummyData] = useState([]);
  const [loader, setLoader] = useState(true);

  async function fetchData() {
    await axios
      .get('https://reqres.in/api/users?page=2')
      .then(function (response) {
        setDummyData(response.data.data);
        setLoader(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [addName, setAddName] = useState(null);
  const [addId, setAddId] = useState(null);
  const openModal = (id, name) => {
    setAddName(name);
    setAddId(id);
    optionAddModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={dummyData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', {id: item.id})}
              style={styles.favoriteCard}>
              <Image style={styles.imgArea} source={{uri: item.avatar}} />
              <View style={styles.favoriteCardInfoArea}>
                <Text style={styles.favoriteCardTitle}>{item.first_name}</Text>
                <View style={{marginTop: 15}}>
                  <View style={styles.favoriteCardRow}>
                    <Text style={styles.favoriteCardInfoRow}>Yaş</Text>
                    <View
                      style={{
                        borderWidth: 2,
                        borderColor: '#888',
                        borderRadius: 99,
                      }}
                    />
                    <Text style={styles.favoriteCardInfoRow}>Irk</Text>
                  </View>
                  <Text style={styles.favoriteCardTimeInfo}>
                    Yüklenme tarihi
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.favoriteCardOptions}
                onPress={() => openModal(item.id, item.first_name)}>
                <Ionicons name="ellipsis-vertical" size={20} color="#555" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

        {loader ? (
          <View
            style={{
              position: 'absolute',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'grey',
              width: '60%',
              height: '20%',
              borderRadius: 12,
              opacity: 0.8,
              top: Dimensions.get('screen').height / 4,
              padding: 20,
            }}>
            <Text style={{...styles.headerTitle, marginBottom: 5}}>
              Lütfen Bekleyin
            </Text>
            <Loader />
          </View>
        ) : null}
      </View>

      <Modalize
        withHandle={false}
        ref={optionModalRef}
        modalStyle={{flex: 0.35, padding: 10}}>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <Text style={styles.optionModalTitle}>{addName}</Text>
          <TouchableOpacity style={styles.optionModalRow}>
            <Text style={styles.optionModalText}>İLANI PAYLAŞ</Text>
            <Ionicons name="share-social" size={20} color="#14B219" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionModalRow}>
            <Text style={styles.optionModalText}>FAVORİLERDEN KALDIR</Text>
            <Ionicons name="return-up-back" size={20} color="#14B219" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionModalClose}
            onPress={optionAddModalUserClose}>
            <Ionicons name="chevron-down" size={22} />
          </TouchableOpacity>
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default FavoritesBreeds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.2,
    backgroundColor: '#1F5D44',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
  },
  optionModalClose: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'absolute',
    right: 10,
    top: -10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  optionModalText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    color: '#14B219',
  },
  optionModalTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  optionModalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    width: '100%',
    paddingHorizontal: 10,
  },
  favoriteCardOptions: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
  },
  favoriteCardTimeInfo: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  favoriteCardInfoRow: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 15,
    color: '#888',
  },
  favoriteCardTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  favoriteCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 80,
  },
  favoriteCardInfoArea: {
    width: 260,
    height: '100%',
    marginRight: 10,
    justifyContent: 'center',
  },
  favoriteCard: {
    width: '100%',
    height: 120,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#888',
    borderBottomWidth: 0.7,
  },
  imgArea: {
    height: 100,
    width: 100,
    backgroundColor: '#ddd',
    marginLeft: 10,
    borderRadius: 8,
  },
});
