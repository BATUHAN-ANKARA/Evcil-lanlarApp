import React, {useEffect, useCallback, useState} from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
  Dimensions,
  Text,
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PurchaseStep3 = ({navigation}) => {
  const onOpenLink = useCallback(async () => {
    await openLink('https://web.telegram.org/');
  }, []);

  const openLink = async (url, statusBarStyle, animated) => {
    try {
      const {width, height} = Dimensions.get('window');
      if (await InAppBrowser.isAvailable()) {
        // A delay to change the StatusBar when the browser is opened
        const delay = animated && Platform.OS === 'ios' ? 400 : 0;
        setTimeout(() => StatusBar.setBarStyle('light-content'), delay);
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: true,
          animated,
          modalPresentationStyle: 'formSheet',
          modalTransitionStyle: 'flipHorizontal',
          modalEnabled: true,
          enableBarCollapsing: true,
          formSheetPreferredContentSize: {
            width: width - width / 6,
            height: height - height / 6,
          },
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
          hasBackButton: true,
          browserPackage: undefined,
          showInRecents: true,
          includeReferrer: true,
        });
        // A delay to show an alert when the browser is closed
        // await sleep(800);
        Alert.alert('Response', JSON.stringify(result));
      } else {
        Linking.openURL(url);
      }
    } catch (error) {
      //   await sleep(50);
      const errorMessage = '(error as Error).message || (error as string)';
      Alert.alert(errorMessage);
    } finally {
      // Restore the previous StatusBar of the App
      StatusBar.setBarStyle(statusBarStyle);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.openButton}>
          <Button title="Open link" onPress={onOpenLink} />
        </View> */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={25} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ödeme</Text>
        <View style={{width: 40, height: 40}} />
      </View>
    </SafeAreaView>
  );
};

export default PurchaseStep3;

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
});
