import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {OwnerInfoStyles} from '../../style/styles';
import moment from 'moment';

const OwnerInfo = ({navigation}) => {
  const [option1, setOption1] = useState(true);
  const [option2, setOption2] = useState(true);
  const [option3, setOption3] = useState(true);
  const [option4, setOption4] = useState(true);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState({});
  const [selectedEndTime, setSelectedEndTime] = useState({});
  const [currentDay, setCurrentDay] = useState('');
  const showDateTimePicker = dayOfWeek => {
    setCurrentDay(dayOfWeek);
    setShowStartTimePicker(true);
  };
  const showEndTime = dayOfWeek => {
    setCurrentDay(dayOfWeek);
    setShowEndTimePicker(true);
  };
  const hideDateTimePicker = () => {
    setShowStartTimePicker(false);
    setShowEndTimePicker(false);
  };
  const handleConfirm = time => {
    const formattedTime = moment(time).format('HH:mm');
    if (showStartTimePicker) {
      setSelectedStartTime({...selectedStartTime, [currentDay]: formattedTime});
    } else if (showEndTime) {
      if (formattedTime > selectedStartTime[currentDay]) {
        setSelectedEndTime({...selectedEndTime, [currentDay]: formattedTime});
      } else {
        alert('Bitiş saati, başlangıç saatinden önce olamaz');
      }
    }
    hideDateTimePicker();
  };
  const renderDay = dayOfWeek => {
    return (
      <>
        <View key={dayOfWeek}>
          <Text style={OwnerInfoStyles.ownerModaInputTitle}>{dayOfWeek}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => showDateTimePicker(dayOfWeek)}
              style={{
                ...OwnerInfoStyles.modalProfileGenderArea,
                backgroundColor: '#eee',
              }}>
              <Text style={OwnerInfoStyles.timeText}>
                Başlangıç {selectedStartTime[dayOfWeek]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => showEndTime(dayOfWeek)}
              style={{
                ...OwnerInfoStyles.modalProfileGenderArea,
                backgroundColor: '#eee',
              }}>
              <Text style={OwnerInfoStyles.timeText}>
                Bitiş {selectedEndTime[dayOfWeek]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      enabled>
      <SafeAreaView style={OwnerInfoStyles.modalProfileContainer}>
        <View style={OwnerInfoStyles.modalProfileHeader}>
          <TouchableOpacity
            style={OwnerInfoStyles.ownerModalCloseButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color="#fff" />
          </TouchableOpacity>
          <Text style={OwnerInfoStyles.headerTitle}>Satıcı Ayarları</Text>
          <View style={{width: 40, height: 40}} />
        </View>

        <View style={{paddingBottom: 80}}>
          <ScrollView style={{}}>
            <Text style={OwnerInfoStyles.modalProfileGeneralText}>
              Bilgilerini güncelleyin ve kaydedin.
            </Text>

            <View style={OwnerInfoStyles.modalProfileInput}>
              <Text style={OwnerInfoStyles.modalProfileInputTitle}>
                Cep Telefonum Vitrin Sayfamda
              </Text>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => setOption1(!option1)}
                  style={{
                    ...OwnerInfoStyles.modalProfileGenderArea,
                    backgroundColor: '#eee',
                  }}>
                  {option1 ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#14B219"
                    />
                  ) : (
                    <Ionicons name="ellipse-outline" size={20} color="#555" />
                  )}

                  <Text style={OwnerInfoStyles.modalProfileGenderText}>
                    Açık
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setOption1(!option1)}
                  style={{
                    ...OwnerInfoStyles.modalProfileGenderArea,
                    backgroundColor: '#eee',
                  }}>
                  {option1 ? (
                    <Ionicons name="ellipse-outline" size={20} color="#555" />
                  ) : (
                    <Ionicons name="close-circle" size={20} color="red" />
                  )}
                  <Text style={OwnerInfoStyles.modalProfileGenderText}>
                    Kapalı
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={OwnerInfoStyles.modalProfileInputTitle}>
                Ev / İş Telefonum Vitrin Sayfamda
              </Text>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => setOption2(!option2)}
                  style={{
                    ...OwnerInfoStyles.modalProfileGenderArea,
                    backgroundColor: '#eee',
                  }}>
                  {option2 ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#14B219"
                    />
                  ) : (
                    <Ionicons name="ellipse-outline" size={20} color="#555" />
                  )}

                  <Text style={OwnerInfoStyles.modalProfileGenderText}>
                    Açık
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setOption2(!option2)}
                  style={{
                    ...OwnerInfoStyles.modalProfileGenderArea,
                    backgroundColor: '#eee',
                  }}>
                  {option2 ? (
                    <Ionicons name="ellipse-outline" size={20} color="#555" />
                  ) : (
                    <Ionicons name="close-circle" size={20} color="red" />
                  )}
                  <Text style={OwnerInfoStyles.modalProfileGenderText}>
                    Kapalı
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={OwnerInfoStyles.modalProfileInputTitle}>
                İlan Mesajlarımı Telefon Mesajı Olarak Almak İstiyorum.
              </Text>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => setOption3(!option3)}
                  style={{
                    ...OwnerInfoStyles.modalProfileGenderArea,
                    backgroundColor: '#eee',
                  }}>
                  {option3 ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#14B219"
                    />
                  ) : (
                    <Ionicons name="ellipse-outline" size={20} color="#555" />
                  )}

                  <Text style={OwnerInfoStyles.modalProfileGenderText}>
                    Açık
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setOption3(!option3)}
                  style={{
                    ...OwnerInfoStyles.modalProfileGenderArea,
                    backgroundColor: '#eee',
                  }}>
                  {option3 ? (
                    <Ionicons name="ellipse-outline" size={20} color="#555" />
                  ) : (
                    <Ionicons name="close-circle" size={20} color="red" />
                  )}
                  <Text style={OwnerInfoStyles.modalProfileGenderText}>
                    Kapalı
                  </Text>
                </TouchableOpacity>
              </View>

              <Text style={OwnerInfoStyles.modalProfileInputTitle}>
                Whatsapp Mesaj Durumu
              </Text>

              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={() => setOption4(!option4)}
                  style={{
                    ...OwnerInfoStyles.modalProfileGenderArea,
                    backgroundColor: '#eee',
                  }}>
                  {option4 ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#14B219"
                    />
                  ) : (
                    <Ionicons name="ellipse-outline" size={20} color="#555" />
                  )}

                  <Text style={OwnerInfoStyles.modalProfileGenderText}>
                    Açık
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setOption4(!option4)}
                  style={{
                    ...OwnerInfoStyles.modalProfileGenderArea,
                    backgroundColor: '#eee',
                  }}>
                  {option4 ? (
                    <Ionicons name="ellipse-outline" size={20} color="#555" />
                  ) : (
                    <Ionicons name="close-circle" size={20} color="red" />
                  )}
                  <Text style={OwnerInfoStyles.modalProfileGenderText}>
                    Kapalı
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {option4 ? (
              <View style={{paddingHorizontal: 10}}>
                <View style={OwnerInfoStyles.ownerModalWpTitleArea}>
                  <Ionicons
                    name="logo-whatsapp"
                    size={40}
                    color="#1F5D44"
                    style={{marginRight: 0}}
                  />
                  <View>
                    <Text style={OwnerInfoStyles.ownerModalWpTitle}>
                      Whatsapp Mesaj Ayarları
                    </Text>

                    <Text
                      numberOfLines={3}
                      style={OwnerInfoStyles.ownerModalWpText}>
                      Whatsapp üzerinden gelen mesajlarınızı GÜN / SAAT şeklinde
                      planlayabilirsiniz.
                    </Text>
                  </View>
                </View>

                <View style={{marginTop: 10}}>
                  <DateTimePickerModal
                    isVisible={showStartTimePicker || showEndTimePicker}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDateTimePicker}
                    is24Hour={true}
                    locale="tr"
                    confirmTextIOS={'Onayla'}
                    cancelTextIOS={'İptal'}
                  />
                  {[
                    'Pazartesi',
                    'Salı',
                    'Çarşamba',
                    'Perşembe',
                    'Cuma',
                    'Cumartesi',
                    'Pazar',
                  ].map(renderDay)}
                </View>
              </View>
            ) : null}

            <TouchableOpacity style={OwnerInfoStyles.modalProfileSaveButton}>
              <Text style={OwnerInfoStyles.modalProfileSaveButtonText}>
                Değişiklikleri Kaydet
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default OwnerInfo;

const styles = StyleSheet.create({});
