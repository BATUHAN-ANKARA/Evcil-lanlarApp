import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStack from '../StackNavigation/HomeStack';
import FavoritesStack from '../StackNavigation/FavoritesStack';
import BreedsStack from '../StackNavigation/BreedsStack';
import ProfileStack from '../StackNavigation/ProfileStack';
import {Platform} from 'react-native';
import MessagesStack from '../StackNavigation/MessagesStack';
import CreateAdStack from '../StackNavigation/CreateAdStack';
import MyAddsStack from '../StackNavigation/MyAddsStack';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: Platform.OS !== 'ios',
        headerShown: false,
        tabBarStyle: {backgroundColor: '#1F5D44', borderTopWidth: 0},
        tabBarActiveTintColor: '#14B219',
        tabBarInactiveTintColor: '#fff',
      }}>
      <Tab.Screen
        name="Anasayfa"
        component={HomeStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="İlanlarım"
        component={MyAddsStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Irklar"
        component={BreedsStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="paw" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="İlan Ver"
        component={CreateAdStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Mesajlar"
        component={MessagesStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbox-ellipses" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
