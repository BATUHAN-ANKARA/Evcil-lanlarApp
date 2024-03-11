import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modalize} from 'react-native-modalize';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {CreateAdScreen3Style} from '../../style/styles';

const screenWidth = Dimensions.get('window').width;

const CreateAdScreen3 = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [name, setName] = useState('');
  const handleSingleIndexSelect = index => {
    setSelectedIndex(index);
    if (index === 0) {
      setName('Kategori');
    } else if (index === 1) {
      setName('Anasayfa');
    }
  };
  const ageModalRef = useRef();
  const ageAddModal = async () => {
    ageModalRef.current?.open();
  };
  const ageAddModalUserClose = async () => {
    ageModalRef.current?.close();
  };

  return (
    <SafeAreaView style={CreateAdScreen3Style.container}>
      <View style={CreateAdScreen3Style.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={CreateAdScreen3Style.headerButton}>
          <Ionicons name="chevron-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={CreateAdScreen3Style.headerTitle}>İlan Doping</Text>
        <View style={{width: 40, height: 40}} />
      </View>

      <View style={{flex: 1}}>
        <View style={styles.mainTextArea}>
          <Text style={CreateAdScreen3Style.mainText}>
            Daha fazla alıcıya ulaşmak ister misiniz ?
          </Text>
          <Text style={CreateAdScreen3Style.secondaryText}>
            Doping alın, ilanınızın 1000 kat daha fazla görüntülenmesini
            sağlayın.
          </Text>
        </View>

        <View style={CreateAdScreen3Style.lineTextArea}>
          <View style={CreateAdScreen3Style.line}></View>
          <Text style={CreateAdScreen3Style.lineText}>
            Sizin İçin Seçtiklerimiz
          </Text>
          <View style={CreateAdScreen3Style.line}></View>
        </View>

        <TouchableOpacity
          onPress={ageAddModal}
          style={CreateAdScreen3Style.modalButton}>
          <Text style={CreateAdScreen3Style.modalButtonText}>
            Nasıl Görünür ?
          </Text>
        </TouchableOpacity>

        <View style={styles.calenderArea}>
          <Text>Takvim Alanı</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('CreateAd4')}
          style={styles.finishButton}>
          <Text style={CreateAdScreen3Style.buttonText}>
            Doping Alma İşlemini Bitir
          </Text>
        </TouchableOpacity>
      </View>

      <Modalize
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          scrollEnabled: false,
        }}
        withHandle={false}
        panGestureEnabled={false}
        disableScrollIfPossible={false}
        ref={ageModalRef}
        modalStyle={{flex: 0.35}}>
        <TouchableOpacity
          onPress={ageAddModalUserClose}
          style={CreateAdScreen3Style.modalCloseButton}>
          <Ionicons name="close" size={25} />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            height: 200,
            marginVertical: 30,
          }}>
          <Text style={CreateAdScreen3Style.modalTitle}>
            Doping Türü Seçiniz
          </Text>
          <SegmentedControlTab
            values={['Kategori Dopingi', 'Anasayfa Dopingi']}
            selectedIndex={selectedIndex}
            tabStyle={CreateAdScreen3Style.tabStyle}
            activeTabStyle={CreateAdScreen3Style.activeTabStyle}
            onTabPress={handleSingleIndexSelect}
            tabTextStyle={CreateAdScreen3Style.tabTextStyle}
            activeTabTextStyle={CreateAdScreen3Style.activeTabTextStyle}
            firstTabStyle={{marginRight: 0}}
          />
        </View>
      </Modalize>
    </SafeAreaView>
  );
};
export default CreateAdScreen3;

const styles = StyleSheet.create({
  mainTextArea: {
    width: screenWidth - 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  calenderArea: {
    width: screenWidth - 20,
    alignSelf: 'center',
    height: 200,
    backgroundColor: '#bbb',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  finishButton: {
    width: screenWidth / 2,
    height: 45,
    backgroundColor: '#14B219',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
    borderRadius: 5,
  },
});
