import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const OnBoardThird = ({title}) => {
  return (
    <View style={{alignItems: 'center'}}>
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
          paddingHorizontal: 10,
        }}
      />
      <Text style={styles.name}>
        Başlamadan önce bize birazcık kendinden bahset.
      </Text>
    </View>
  );
};

export default OnBoardThird;

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
