import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PopularSearches = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.card3_title_area}>
        <Text style={styles.card3_title}>Popüler Aramalar</Text>
      </View>
      <View style={styles.card3_body}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity style={styles.card3_button_row}>
            <Ionicons name="search" size={15} />
            <Text style={styles.card3_button_text}>Yavru köpekler</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card3_button_row}>
            <Ionicons name="search" size={15} />
            <Text style={styles.card3_button_text}>Yavru kediler</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.card3_button}>
          <Ionicons name="search" size={15} />
          <Text style={styles.card3_button_text}>Küçük köpekler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card3_button}>
          <Ionicons name="search" size={15} />
          <Text style={styles.card3_button_text}>
            Çocuklarla anlaşan kediler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card3_button}>
          <Ionicons name="search" size={15} />
          <Text style={styles.card3_button_text}>
            Çocuklarla anlaşan köpekler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card3_button}>
          <Ionicons name="search" size={15} />
          <Text style={styles.card3_button_text}>
            Diğer kedilerle anlaşan kediler
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PopularSearches;

const styles = StyleSheet.create({
  card3_title_area: {
    alignItems: 'center',
  },
  card3_title: {
    fontFamily: 'Manrope-Regular',
    fontSize: 19,
    marginTop: 5,
    color: '#333',
  },
  card3_body: {
    margin: 10,
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  card3_button: {
    backgroundColor: '#CBEDD5',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 12,
  },
  card3_button_text: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    marginLeft: 5,
    marginRight: 5,
    color: '#333',
  },
  card3_button_row: {
    backgroundColor: '#CBEDD5',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 12,
  },
});
