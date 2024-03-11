/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import Loader from '../Loader';
import axios from 'axios';
import {CreateAdScreen1Style} from '../../style/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const CreateAdScreen1 = ({navigation}) => {
  const isFocused = useIsFocused();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [name, setName] = useState();
  const [category, setCategory] = useState('');
  const handleSingleIndexSelect = index => {
    setSelectedIndex(index);
    if (index === 0) {
      setName('Köpek');
    } else if (index === 1) {
      setName('Kedi');
    } else if (index === 2) {
      setName('Balık');
    } else {
      setName('Kuş');
    }
  };
  useEffect(() => {
    setCategory('');
  }, [isFocused]);
  const [dummyData, setDummyData] = useState([]);
  const [dummyData2, setDummyData2] = useState([]);
  const [dummyData3, setDummyData3] = useState([]);
  const [dummyData4, setDummyData4] = useState([]);
  const [loader, setLoader] = useState(true);
  // async function askStatus() {
  //   const response = await axios.get('https://dummyjson.com/test', {
  //     headers: {'Content-Type': 'multipart/form-data'},
  //   });
  //   if (response.data.status === 'ok') {
  //     return;
  //   } else {
  //     setTimeout(() => {
  //       alert('İlan hakkı satın almanız gerekli');
  //     }, 1500);
  //     navigation.replace('PurchaseStep1');
  //   }
  // }
  async function fetchData1() {
    await axios
      .get('https://reqres.in/api/users?page=1')
      .then(function (response) {
        setDummyData(response.data.data);
        setLoader(false);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function fetchData2() {
    await axios
      .get('https://reqres.in/api/users?page=2')
      .then(function (response) {
        setDummyData2(response.data.data);
        setLoader(false);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function fetchData3() {
    await axios
      .get('https://reqres.in/api/users?page=1')
      .then(function (response) {
        setDummyData3(response.data.data);
        setLoader(false);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function fetchData4() {
    await axios
      .get('https://reqres.in/api/users?page=2')
      .then(function (response) {
        setDummyData4(response.data.data);
        setLoader(false);
        console.log(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    // askStatus();
    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
  }, []);
  const renderItem = ({item, index}) => (
    <>
      {category === item.first_name ? (
        <TouchableOpacity
          onPress={() => setCategory(item.first_name)}
          style={CreateAdScreen1Style.categoryActiveButton}>
          <Text style={CreateAdScreen1Style.categoryActiveText}>
            {item.first_name}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setCategory(item.first_name)}
          style={CreateAdScreen1Style.categoryButton}>
          <Text style={CreateAdScreen1Style.categoryText}>
            {item.first_name}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );

  const [addRight, setAddRight] = useState(true);

  useEffect(() => {
    if (addRight) {
      return;
    } else {
      navigation.replace('PurchaseStep1', {status: 'zero'});
    }
  }, []);

  return (
    <SafeAreaView style={CreateAdScreen1Style.container}>
      <View style={CreateAdScreen1Style.header}>
        <View style={{width: 40, height: 40}} />
        <Text style={CreateAdScreen1Style.headerTitle}>İlan Ver</Text>
        <View style={{width: 40, height: 40}} />
      </View>

      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.infoArea}>
          <View style={styles.row}>
            <Text style={styles.infoText}>Kalan İlan Hakkı:</Text>
            <Text style={styles.infoNumber}> 5</Text>
          </View>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate('PurchaseStep1')}>
            <Text style={styles.infoText}>İlan Hakkı Satın Al</Text>
            <View style={{marginLeft: 5}}>
              <Ionicons name="add-circle-outline" size={22} color="#14B219" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={CreateAdScreen1Style.cardTitle}>Kategori Seçiniz</Text>
          <SegmentedControlTab
            values={['Köpek', 'Kedi', 'Balık', 'Kuş']}
            selectedIndex={selectedIndex}
            tabStyle={CreateAdScreen1Style.tabStyle}
            activeTabStyle={CreateAdScreen1Style.activeTabStyle}
            onTabPress={handleSingleIndexSelect}
            tabTextStyle={CreateAdScreen1Style.tabTextStyle}
            activeTabTextStyle={CreateAdScreen1Style.activeTabTextStyle}
            firstTabStyle={{marginRight: 0}}
          />
          {selectedIndex === 0 ? (
            <View
              style={{
                backgroundColor: '#eee',
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                flex: 1,
              }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={dummyData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}
          {selectedIndex === 1 ? (
            <View
              style={{
                backgroundColor: '#eee',
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                flex: 1,
              }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={dummyData2}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}
          {selectedIndex === 2 ? (
            <View
              style={{
                backgroundColor: '#eee',
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                flex: 1,
              }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={dummyData3}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}
          {selectedIndex === 3 ? (
            <View
              style={{
                backgroundColor: '#eee',
                marginTop: 10,
                borderRadius: 5,
                padding: 10,
                flex: 1,
              }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={dummyData4}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : null}
        </View>

        {category === '' ? null : (
          <View style={{flex: 0.4}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateAd2', {
                  name: name,
                  category: category,
                })
              }
              style={CreateAdScreen1Style.nextButton}>
              <Text style={CreateAdScreen1Style.nextButtonText}>İleri</Text>
            </TouchableOpacity>
            <Text style={CreateAdScreen1Style.chosenCategory}>
              Seçili Kategori: {category}
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default CreateAdScreen1;
const styles = StyleSheet.create({
  card: {
    width: screenWidth - 20,
    alignSelf: 'center',
    flex: 0.6,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    height: 400,
  },
  infoArea: {
    height: null,
    margin: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
  infoText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 15,
    lineHeight: 30,
    color: '#222',
  },
  infoNumber: {
    fontFamily: 'Manrope-Bold',
    fontSize: 17,
    color: '#14B219',
    marginLeft: 5,
    marginRight: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
