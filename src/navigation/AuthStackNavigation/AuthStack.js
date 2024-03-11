import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from '../../screens/Auth/RegisterScreen';
import LoginScreen from '../../screens/Auth/LoginScreen';
import RegisterTypeScreen from '../../screens/Auth/RegisterTypeScreen';
import BottomTab from '../TabNavigation/BottomTab';
import SuccessRegisterScreen from '../../screens/Auth/SuccessRegisterScreen';
import RegisterVerification from '../../screens/Auth/RegisterVerification';
import ForgotPasswordScreen from '../../screens/Auth/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="RegisterTypeScreen" component={RegisterTypeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="SuccessRegister" component={SuccessRegisterScreen} />
      <Stack.Screen
        name="RegisterVerification"
        component={RegisterVerification}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="App" component={BottomTab} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
