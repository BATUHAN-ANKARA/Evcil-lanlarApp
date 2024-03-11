/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modalize} from 'react-native-modalize';
import axios from 'axios';
import {MyAddsStyles} from '../../style/styles';
import Loader from '../Loader';

const screenWidth = Dimensions.get('window').width;

const MyAddsScreen = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleSingleIndexSelect = index => {
    setSelectedIndex(index);
    if (index === 0) {
      setOption(1);
    } else if (index === 1) {
      setOption(2);
    } else {
      setOption(3);
    }
  };
  const [option, setOption] = useState(1);
  const [refreshing, setRefreshing] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [dataSource2, setDataSource2] = useState([]);
  const [dataSource3, setDataSource3] = useState([]);
  const [loader, setLoader] = useState(true);

  async function fetchData() {
    await axios
      .get('https://reqres.in/api/users?page=1')
      .then(function (response) {
        setDataSource(response.data.data);
        setRefreshing(false);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function fetchData2() {
    await axios
      .get('https://reqres.in/api/users?page=2')
      .then(function (response) {
        setDataSource2(response.data.data);
        setRefreshing(false);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function fetchData3() {
    await axios
      .get('https://reqres.in/api/users?page=1')
      .then(function (response) {
        setDataSource3(response.data.data);
        setRefreshing(false);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
    fetchData2();
    fetchData3();
    setLoader(false);
  }, []);

  const ItemViewAccepted = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {id: item.id})}
        style={styles.favoriteCard}>
        <Image style={MyAddsStyles.imgArea} source={{uri: item.avatar}} />

        <View style={MyAddsStyles.favoriteCardInfoArea}>
          <Text style={MyAddsStyles.favoriteCardTitle}>{item.first_name}</Text>
          <View style={{marginTop: 15}}>
            <View style={MyAddsStyles.favoriteCardRow}>
              <Text style={MyAddsStyles.favoriteCardInfoRow}>Yaş</Text>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: '#888',
                  borderRadius: 99,
                }}
              />
              <Text style={MyAddsStyles.favoriteCardInfoRow}>Irk</Text>
            </View>
            <Text style={MyAddsStyles.favoriteCardTimeInfo}>
              Yüklenme tarihi
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => openModal(item.id, item.first_name)}
          style={MyAddsStyles.favoriteCardOptions}>
          <Ionicons name="ellipsis-vertical" size={20} color="#555" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const ItemViewWaiting = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {id: item.id})}
        style={styles.favoriteCard}>
        <Image style={MyAddsStyles.imgArea} source={{uri: item.avatar}} />
        <View style={MyAddsStyles.favoriteCardInfoArea}>
          <Text style={MyAddsStyles.favoriteCardTitle}>{item.first_name}</Text>
          <View style={{marginTop: 15}}>
            <View style={MyAddsStyles.favoriteCardRow}>
              <Text style={MyAddsStyles.favoriteCardInfoRow}>Yaş</Text>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: '#888',
                  borderRadius: 99,
                }}
              />
              <Text style={MyAddsStyles.favoriteCardInfoRow}>Irk</Text>
            </View>
            <Text style={MyAddsStyles.favoriteCardTimeInfo}>
              Yüklenme tarihi
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => openModal(item.id, item.first_name)}
          style={MyAddsStyles.favoriteCardOptions}>
          <Ionicons name="ellipsis-vertical" size={20} color="#555" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const ItemViewDeclined = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {id: item.id})}
        style={styles.favoriteCard}>
        <Image style={MyAddsStyles.imgArea} source={{uri: item.avatar}} />
        <View style={MyAddsStyles.favoriteCardInfoArea}>
          <Text style={MyAddsStyles.favoriteCardTitle}>{item.first_name}</Text>
          <View style={{marginTop: 15}}>
            <View style={MyAddsStyles.favoriteCardRow}>
              <Text style={MyAddsStyles.favoriteCardInfoRow}>Yaş</Text>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: '#888',
                  borderRadius: 99,
                }}
              />
              <Text style={MyAddsStyles.favoriteCardInfoRow}>Irk</Text>
            </View>
            <Text style={MyAddsStyles.favoriteCardTimeInfo}>
              Yüklenme tarihi
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => openModal(item.id, item.first_name)}
          style={MyAddsStyles.favoriteCardOptions}>
          <Ionicons name="ellipsis-vertical" size={20} color="#555" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const onRefresh = () => {
    setDataSource([]);
    setDataSource2([]);
    setDataSource3([]);
    fetchData();
    fetchData2();
    fetchData3();
  };
  const optionModalRef = useRef();
  const optionAddModal = async () => {
    optionModalRef.current?.open();
  };
  const optionAddModalUserClose = async () => {
    optionModalRef.current?.close();
  };
  const ask = () => {
    Alert.alert('İlanı Paylaş', '', [
      {
        text: 'Evet',
        onPress: () => console.log('Evet Pressed'),
        style: 'cancel',
      },
      {text: 'Hayır', onPress: () => console.log('Hayır Pressed')},
    ]);
  };

  const [addName, setAddName] = useState(null);
  const [addId, setAddId] = useState(null);
  const openModal = (id, name) => {
    setAddName(name);
    setAddId(id);
    optionAddModal();
  };

  return (
    <SafeAreaView style={MyAddsStyles.container}>
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
      <View style={{flex: 1}}>
        <View>
          <SegmentedControlTab
            values={[
              'Onaylanan İlanlar',
              'Bekleyen İlanlar',
              'Red Alan İlanlar',
            ]}
            selectedIndex={selectedIndex}
            tabStyle={MyAddsStyles.tabStyle}
            activeTabStyle={MyAddsStyles.activeTabStyle}
            onTabPress={handleSingleIndexSelect}
            tabTextStyle={MyAddsStyles.tabTextStyle}
            activeTabTextStyle={MyAddsStyles.activeTabTextStyle}
            firstTabStyle={{marginRight: 0}}
          />
        </View>

        <View style={{flex: 1}}>
          {refreshing ? <ActivityIndicator /> : null}
          {option === 1 ? (
            <FlatList
              data={dataSource}
              keyExtractor={(item, index) => index.toString()}
              enableEmptySections={true}
              renderItem={ItemViewAccepted}
              refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          ) : null}

          {option === 2 ? (
            <FlatList
              data={dataSource2}
              keyExtractor={(item, index) => index.toString()}
              enableEmptySections={true}
              renderItem={ItemViewWaiting}
              refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          ) : null}

          {option === 3 ? (
            <FlatList
              data={dataSource3}
              keyExtractor={(item, index) => index.toString()}
              enableEmptySections={true}
              renderItem={ItemViewDeclined}
              refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          ) : null}
        </View>

        <Modalize
          withHandle={false}
          ref={optionModalRef}
          modalStyle={{flex: 0.35, padding: 5}}>
          <View
            style={{
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text style={MyAddsStyles.optionModalTitle}>{addName}</Text>

            <TouchableOpacity
              onPress={() => ask()}
              style={MyAddsStyles.optionModalRow}>
              <Text style={MyAddsStyles.optionModalText}>İLANI PAYLAŞ</Text>
              <Ionicons name="share-social" size={20} color="#14B219" />
            </TouchableOpacity>

            <TouchableOpacity style={MyAddsStyles.optionModalRow}>
              <Text style={MyAddsStyles.optionModalText}>İLANI KALDIR</Text>
              <Ionicons name="trash-outline" size={20} color="#14B219" />
            </TouchableOpacity>

            <TouchableOpacity
              style={MyAddsStyles.optionModalClose}
              onPress={optionAddModalUserClose}>
              <Ionicons name="chevron-down" size={22} />
            </TouchableOpacity>
          </View>
        </Modalize>
      </View>
    </SafeAreaView>
  );
};

export default MyAddsScreen;

const styles = StyleSheet.create({
  favoriteCard: {
    width: screenWidth - 20,
    height: 120,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#888',
    borderBottomWidth: 0.7,
    marginTop: 5,
    alignSelf: 'center',
  },
});
