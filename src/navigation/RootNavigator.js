import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import OnBoardScreen from '../screens/OnBoardScreen';
import AuthStack from './AuthStackNavigation/AuthStack';
import SplashScreen from '../screens/SplashScreen';
import BottomTab from './TabNavigation/BottomTab';
import AlertScreen from '../screens/AlertScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoard" component={OnBoardScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="Login" component={AuthStack} />
        <Stack.Screen name="App" component={BottomTab} />
        <Stack.Screen name="AlertScreen" component={AlertScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
