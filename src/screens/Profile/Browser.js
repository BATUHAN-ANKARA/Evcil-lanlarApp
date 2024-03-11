import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class MyWeb extends Component {
  render() {
    return (
      <>
        <View
          style={{
            flex: 0.1,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="chevron-back" size={25} color="#000" />
          </TouchableOpacity>
        </View>
        <WebView
          source={{uri: 'https://www.evcililanlar.com/'}}
          style={{marginTop: 0}}
        />
      </>
    );
  }
}
export default MyWeb;
