import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const OnBoardFirst = ({title}) => {
  return (
    <View style={{}}>
      <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: 'white',
          marginTop: 10,
          borderRadius: 99,
        }}
      />
      <View
        style={{
          width: 100,
          height: 35,
          marginTop: 20,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text style={styles.name}>Harvey</Text>
      </View>
    </View>
  );
};

export default OnBoardFirst;

const styles = StyleSheet.create({
  footer_container: {
    flex: 0.2,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#fff',
  },
  name: {
    fontFamily: 'Manrope-Bold',
    fontSize: 22,
    color: '#fff',
    textAlign: 'center',
  },
  button_text: {
    color: '#fff',
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
  },
});
