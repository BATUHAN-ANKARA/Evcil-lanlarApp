import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AlertScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Alert Screen</Text>
    </View>
  );
};

export default AlertScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
