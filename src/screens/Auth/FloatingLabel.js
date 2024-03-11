import React, {Component} from 'react';
import {View, StatusBar, TextInput, Text} from 'react-native';

export default class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  handleFocus = () => this.setState({isFocused: true});
  handleBlur = () => this.setState({isFocused: false});

  render() {
    const {label, ...props} = this.props;
    const {isFocused} = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 15,
      top: !isFocused ? 15 : 5,
      fontSize: !isFocused ? 20 : 14,
      color: !isFocused ? '#fff' : '#aaa',
    };
    return (
      <View style={{}}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          {...props}
          style={{
            backgroundColor: 'tramsparent',
            height: 54,
            borderRadius: 10,
            padding: 15,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#14B219',
            color: '#fff',
            flex: 1,
            marginBottom: 30,
            fontSize: 18,
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
    );
  }
}
