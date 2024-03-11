import React, {useRef, useState, useEffect} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import slides from '../../slides';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';

const OnBoardScreen = ({navigation}) => {
  const [buttonName, setButtonName] = useState('İleri');
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    }
    navigate();
  };

  useEffect(() => {
    if (currentIndex === 2) {
      setButtonName('Kayıt Ol');
    } else {
      setButtonName('İleri');
    }
  }, [currentIndex]);

  const navigate = () => {
    if (buttonName === 'Kayıt Ol') {
      navigation.navigate('AuthStack', {screen: 'RegisterType'});
    } else {
      console.log('Navigate fonksiyonu => Buton adı kayıt ol değil');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/splash.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AuthStack', {screen: 'RegisterTypeScreen'})
          }
          style={{
            zIndex: 1,
            position: 'absolute',
            right: 10,
            top: 50,
            borderColor: '#14B219',
            borderWidth: 2,
            borderRadius: 20,
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 5,
            paddingBottom: 5,
          }}>
          <Text
            style={{
              color: '#14B219',
              fontFamily: 'Manrope-Bold',
              fontSize: 14,
            }}>
            Atla
          </Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <View
            style={{
              width: '100%',
              height: 50,
              marginTop: 80,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.title}>Gözünüze Çarpan Dostları</Text>
              <Text style={styles.title}>Arayın</Text>
            </View>
          </View>
        </View>

        <View style={styles.body_container}>
          <FlatList
            data={slides}
            renderItem={({item}) => <OnboardingItem item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={item => item.id}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {
                useNativeDriver: false,
              },
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
          <Paginator data={slides} scrollX={scrollX} />
        </View>

        <View style={styles.footer_container}>
          <TouchableOpacity onPress={scrollTo}>
            <View style={styles.button}>
              <Text style={styles.button_text}>{buttonName}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              height: 20,
              marginTop: 20,
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{color: '#fff', marginRight: 5}}>
              Zaten hesabınız mı var?
            </Text>
            <Text style={{color: '#14B219'}}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OnBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F5D44',
  },
  header: {
    flex: 0.2,
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  body_container: {
    flex: 1,
    marginBottom: 20,
    alignItems: 'center',
  },
  footer_container: {
    flex: 0.2,
    marginBottom: 20,
    margin: 20,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#fff',
  },
  name: {
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#fff',
  },
  button_text: {
    color: '#fff',
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
  },
  button: {
    height: 45,
    backgroundColor: '#1F5D44',
    marginTop: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    width: '100%',
  },
});
