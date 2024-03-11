import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MessagesScreen from '../../screens/Messages/MessagesScreen';
import MessagesDetailScreen from '../../screens/Messages/MessagesDetailScreen';
import DetailScreen from '../../screens/PetDetails/DetailScreen';

const Stack = createStackNavigator();

const MessagesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="MessagesDetail" component={MessagesDetailScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};
export default MessagesStack;
