import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OnBoradSecond = () => {
  return (
    <View style={{}}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View
          style={{
            width: 130,
            height: 130,
            backgroundColor: 'white',
            marginTop: 10,
            borderRadius: 99,
            marginRight: 5,
          }}
        />
        <View
          style={{
            width: 130,
            height: 130,
            backgroundColor: 'white',
            marginTop: 10,
            borderRadius: 99,
            marginLeft: 5,
          }}
        />
      </View>
      <View
        style={{
          height: 35,
          marginTop: 10,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={styles.name}>Sen</Text>
        <Text style={styles.name}>Oscar</Text>
      </View>
      <View
        style={{
          height: '100%',
          marginTop: 10,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 24,
            marginBottom: -15,
          }}>
          <View
            style={{
              height: 50,
              width: 130,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.matching_tex}>yetişkin köpek istiyor</Text>
          </View>
          <View
            style={{
              height: 50,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="checkmark-circle" size={20} color="#14B219" />
          </View>
          <View
            style={{
              height: 50,
              width: 130,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.matching_tex}>yetşkin bir köpek</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: -15,
          }}>
          <View
            style={{
              height: 50,
              width: 130,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.matching_tex}>kedileri var</Text>
          </View>
          <View
            style={{
              height: 50,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="checkmark-circle" size={20} color="#14B219" />
          </View>
          <View
            style={{
              height: 50,
              width: 130,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.matching_tex}>kedilerle anlaşır</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: -15,
          }}>
          <View
            style={{
              height: 50,
              width: 130,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.matching_tex}>çocukları var</Text>
          </View>
          <View
            style={{
              height: 50,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="checkmark-circle" size={20} color="#14B219" />
          </View>
          <View
            style={{
              height: 50,
              width: 130,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.matching_tex}>çocuklarla anlaşır</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              height: 50,
              width: 130,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.matching_tex}>oyuncu bir köpek arıyor</Text>
          </View>
          <View
            style={{
              height: 50,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="checkmark-circle" size={20} color="#14B219" />
          </View>
          <View
            style={{
              height: 50,
              width: 130,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.matching_tex}>oyuncu bir köpek</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OnBoradSecond;

const styles = StyleSheet.create({
  name: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#fff',
  },
  matching_tex: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    color: '#fff',
  },
});
