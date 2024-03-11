/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PurchaseStep1 = ({navigation, route}) => {
  const nextStep = (name, cost) => {
    if (cost === null || name === null) {
      return;
    } else {
      navigation.navigate('PurchaseStep2', {
        packageName: name,
        cost: cost,
      });
    }
  };

  const status = route?.params?.status;

  useEffect(() => {
    console.log(status);
    if (status === 'zero') {
      alert('İlan hakkınız olmadığı için öncelikle ilan hakkı almalısınız.');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{width: 40, height: 40}} />
        <Text style={styles.headerTitle}>İlan Hakkı Al</Text>
        <View style={{width: 40, height: 40}} />
      </View>

      <View style={styles.body}>
        <Text style={styles.pageTitle}>İlan Hakkı Yükle</Text>

        <ScrollView style={{}}>
          <View style={{...styles.rowCards, marginTop: 0}}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Tekli İlan Paketi</Text>
              <Text style={styles.price}>20,00 ₺</Text>
              <Text style={styles.cardPriceText}>(1 İlan Fiyatı 20,00 ₺)</Text>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>Sınırsız Süre Kullanım</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>1 İlan Hakkı</Text>
              </View>

              <TouchableOpacity
                onPress={() => nextStep('Tekli İlan Paketi', '20,00')}
                style={styles.purchaseButton}>
                <Text style={styles.purchaseButtonText}>Satın Al</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>5'lik İlan Paketi</Text>
              <Text style={styles.price}>60,00 ₺</Text>
              <Text style={styles.cardPriceText}>(1 İlan Fiyatı 12,00 ₺)</Text>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>Sınırsız Süre Kullanım</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>5 İlan Hakkı</Text>
              </View>

              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={() => nextStep("5'lik İlan Paketi", '60,00')}>
                <Text style={styles.purchaseButtonText}>Satın Al</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rowCards}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>10'luk İlan Paketi</Text>
              <Text style={styles.price}>75,00 ₺</Text>
              <Text style={styles.cardPriceText}>(1 İlan Fiyatı 7,50 ₺)</Text>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>Sınırsız Süre Kullanım</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>10 İlan Hakkı</Text>
              </View>

              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={() => nextStep("10'luk İlan Paketi", '75,00')}>
                <Text style={styles.purchaseButtonText}>Satın Al</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Gümüş Paket</Text>
              <Text style={styles.price}>200,00 ₺</Text>
              <Text style={styles.cardPriceText}>(1 İlan Fiyatı 6,67 ₺)</Text>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>Sınırsız Süre Kullanım</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>30 İlan Hakkı</Text>
              </View>

              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={() => nextStep('Gümüş Paket', '200,00')}>
                <Text style={styles.purchaseButtonText}>Satın Al</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.rowCardsGold}>
            <View style={styles.goldCard}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>ÖNERİLEN</Text>
              </View>
              <Text style={styles.cardTitle}>Platin Paket</Text>
              <Text style={styles.price}>2.500,00 ₺</Text>
              <Text style={styles.cardPriceText}>(1 İlan Fiyatı 5,00 ₺)</Text>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>Sınırsız Süre Kullanım</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>70 Hediye İlan</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>330 İlan Hakkı</Text>
              </View>

              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={() => nextStep('Platin Paket', '2500,00')}>
                <Text style={styles.purchaseButtonText}>Satın Al</Text>
              </TouchableOpacity>
            </View>

            <View style={{...styles.goldCard, height: null}}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>ÖNERİLEN</Text>
              </View>
              <Text style={styles.cardTitle}>Süper Güvenlik Paketi</Text>
              <Text style={styles.price}>9.440,00 ₺</Text>
              <Text style={styles.cardPriceText}>(1 İlan Fiyatı 4,72 ₺)</Text>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>1600 İlan Hakkı</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>160 Hediye İlan</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>
                  Güvenli Üye Rozeti ( 1 Yıl )
                </Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>
                  9000 Kişiye Toplu mail reklam
                </Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="ellipse" color="#666666" />
                <Text style={styles.fieldText}>Sınırsız Süre Kullanım</Text>
              </View>

              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={() => nextStep('Süper Güvenlik Paketi', '9.440,00')}>
                <Text style={styles.purchaseButtonText}>Satın Al</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PurchaseStep1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 0.1,
    backgroundColor: '#1F5D44',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: 'Manrope-Bold',
    color: '#fff',
    fontSize: 20,
  },
  body: {
    flex: 1,
    padding: 10,
  },
  card: {
    width: '48%',
    backgroundColor: '#fefefe',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 15,
  },
  rowCards: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    height: null,
  },
  pageTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#444',
    lineHeight: 30,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  cardTitle: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    textAlign: 'center',
    color: '#222',
    lineHeight: 30,
  },
  price: {
    fontFamily: 'Manrope-Bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#14B219',
    lineHeight: 30,
  },
  cardPriceText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    textAlign: 'center',
    color: '#444',
    lineHeight: 30,
  },
  fieldText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 23,
    marginLeft: 5,
    width: '100%',
  },
  purchaseButton: {
    height: 40,
    width: 100,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F5D44',
  },
  purchaseButtonText: {
    fontFamily: 'Manrope-Bold',
    fontSize: 17,
    color: '#1F5D44',
  },
  rowCardsGold: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    height: null,
  },
  goldCard: {
    width: '48%',
    backgroundColor: '#fff7e1',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 15,
    height: 270,
  },
  badge: {
    position: 'absolute',
    width: 80,
    height: 30,
    backgroundColor: '#f8b64b',
    borderRadius: 5,
    alignSelf: 'center',
    top: -15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#986108',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 13,
  },
});
