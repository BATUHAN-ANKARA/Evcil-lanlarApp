import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TopTab from '../TabNavigation/TopNavigation';
import MyAddsScreen from '../../screens/MyAdds/MyAddsScreen';
import DetailScreen from '../../screens/PetDetails/DetailScreen';

const Stack = createStackNavigator();

const MyAddsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TopTab" component={TopTab} />
      <Stack.Screen name="MyAddsScreen" component={MyAddsScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
export default MyAddsStack;
