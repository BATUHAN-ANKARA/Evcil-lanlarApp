import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoritesBreeds from '../../screens/Favorites/FavoritesBreeds';
import DetailScreen from '../../screens/PetDetails/DetailScreen';

const Stack = createStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Favorites" component={FavoritesBreeds} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
export default FavoritesStack;
