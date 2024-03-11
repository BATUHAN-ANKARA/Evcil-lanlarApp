import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Summary = ({navigation}) => {
  const [acceptedAddCount, setAcceptedAddCount] = useState(5);
  const [totalAddRight, setTotalAddRight] = useState(6);
  const [totalMessageCount, setMessageAddCount] = useState(7);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Özet</Text>
        <View style={styles.headerButton}></View>
      </View>

      <View style={styles.body}>
        <View style={styles.card}>
          <View style={styles.iconArea}>
            <Ionicons name="albums-outline" size={60} color="#bbb" />
            <Text style={styles.cardText}>Yayında olan ilan adedi</Text>
          </View>

          <Text style={styles.numberText}>{acceptedAddCount}</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('PurchaseStep1')}
          style={styles.card}>
          <View style={styles.iconArea}>
            <Ionicons name="add-circle-outline" size={60} color="#bbb" />
            <View>
              <Text style={styles.cardText}>Toplam mevcut ilan adediniz</Text>
              <Text style={styles.bracketText}>(İlan hakkı satın al)</Text>
            </View>
          </View>

          <Text style={styles.numberText}>{totalAddRight}</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.iconArea}>
            <Ionicons name="chatbox-ellipses-outline" size={60} color="#bbb" />
            <Text style={styles.cardText}>İlanlarınıza gelen mesaj adedi</Text>
          </View>

          <Text style={styles.numberText}>{totalMessageCount}</Text>
        </View>

        <View style={styles.createAddCard}>
          <View style={{...styles.iconArea, width: '100%'}}>
            <Ionicons name="add-circle-outline" size={60} color="#1F5D44" />
            <Text style={styles.longText}>
              Siz de evcililanlar.com a ilan verin, ilanınızın milyonlarca
              kullanıcı tarafından görüntülenmesini sağlayarak kısa sürede
              sonuca ulaşın.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('CreateAd1')}
            style={styles.createAddButton}>
            <Text style={styles.createAddButtonText}>
              İlan Vermek İstiyorum
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.1,
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
    fontFamily: 'Manrope-Bold',
    color: '#fff',
    fontSize: 20,
  },
  body: {
    padding: 10,
    flex: 1,
  },
  card: {
    width: '100%',
    height: 120,
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 0.8,
    borderColor: '#bbb',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
    color: '#222',
    textAlign: 'center',
    marginLeft: 5,
    lineHeight: 23,
  },
  numberText: {
    fontSize: 25,
    fontFamily: 'Manrope-SemiBold',
    color: '#14B219',
    marginRight: 20,
  },
  iconArea: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  bracketText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 23,
    fontFamily: 'Manrope-Regular',
    color: '#555',
  },
  createAddCard: {
    width: '100%',
    height: null,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FCD15C',
    borderWidth: 0.8,
    borderColor: '#bbb',
  },
  createAddCardTitle: {
    fontSize: 16,
    fontFamily: 'Manrope-Bold',
    color: '#1F5D44',
    lineHeight: 23,
  },
  longText: {
    fontFamily: 'Manrope-Regular',
    textAlign: 'left',
    lineHeight: 23,
    width: '80%',
  },
  createAddButton: {
    backgroundColor: '#14B219',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
  },
  createAddButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#fff',
  },
});
