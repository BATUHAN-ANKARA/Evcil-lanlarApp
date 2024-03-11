import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PurchaseStep1 from '../../screens/CreateAdd/PurchaseStep1';

const Stack = createStackNavigator();

const PurchaseStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PurchaseStep1" component={PurchaseStep1} />
    </Stack.Navigator>
  );
};
export default PurchaseStack;
