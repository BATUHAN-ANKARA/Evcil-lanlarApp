import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const AboutMeCards = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.question}>
        <Text style={styles}></Text>
      </View>
      <View style={styles.card}>
        <TouchableOpacity>
          <Text>Cevap 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Cevap 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Cevap 1</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.question}>
        <Text style={styles}></Text>
      </View>
      <View style={styles.card}>
        <TouchableOpacity>
          <Text>Cevap 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Cevap 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Cevap 1</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutMeCards;

const styles = StyleSheet.create({
  card: {
    flex: 0.2,
    backgroundColor: '#fff',
    borderRadius: 15,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingLeft: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  question: {
    backgroundColor: 'red',
    height: 30,
  },
  text: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#333',
  },
});
