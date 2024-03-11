import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BreedsScreen from '../../screens/Breeds/BreedsScreen';
import BreedDetailScreen from '../../screens/Breeds/BreedDetailScreen';
import SubBreedScreen from '../../screens/Breeds/SubBreedScreen';
import PetSearchScreen from '../../screens/Breeds/PetSearchScreen';
import DetailScreen from '../../screens/PetDetails/DetailScreen';

const Stack = createStackNavigator();

const BreedsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Breeds" component={BreedsScreen} />
      <Stack.Screen name="BreedDetail" component={BreedDetailScreen} />
      <Stack.Screen name="SubBreed" component={SubBreedScreen} />
      <Stack.Screen name="PetSearch" component={PetSearchScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
export default BreedsStack;
