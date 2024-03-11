import React, {Component} from 'react';
import {View, StatusBar, TextInput, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class FloatingLabelPassword extends Component {
  state = {
    isFocused: false,
  };

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  render() {
    const {label, ...props} = this.props;
    const {name, ...nameprops} = this.props;
    const {isFocused} = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 15,
      top: !isFocused ? 15 : 5,
      fontSize: !isFocused ? 20 : 14,
      color: !isFocused ? '#fff' : '#aaa',
    };
    return (
      <View style={{marginBottom: 30}}>
        <Text style={labelStyle}>{label}</Text>
        <View
          style={{
            backgroundColor: 'transparent',
            height: 54,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#14B219',
            color: '#fff',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            {...props}
            style={{
              backgroundColor: 'transparent',
              color: '#fff',
              flex: 0.95,
              padding: 15,
              fontSize: 18,
            }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blurOnSubmit
          />
          <TouchableOpacity {...props}>
            <Ionicons {...nameprops} name={name} size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
