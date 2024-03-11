import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import AboutMeScreen from '../../screens/Home/AboutMeScreen';
import DetailScreen from '../../screens/PetDetails/DetailScreen';
import BreedDetailScreen from '../../screens/Breeds/BreedDetailScreen';
import PetSearchScreen from '../../screens/Breeds/PetSearchScreen';
import NotificationScreen from '../../screens/Home/NotificationsScreen';
import MessagesStack from '../StackNavigation/MessagesStack';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AboutMe" component={AboutMeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="BreedDetail" component={BreedDetailScreen} />
      <Stack.Screen name="PetSearch" component={PetSearchScreen} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="MessagesStack" component={MessagesStack} />
    </Stack.Navigator>
  );
};
export default HomeStack;
