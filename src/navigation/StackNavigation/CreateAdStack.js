import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateAdScreen1 from '../../screens/CreateAdd/CreateAdScreen1';
import CreateAdScreen2 from '../../screens/CreateAdd/CreateAdScreen2';
import CreateAdScreen3 from '../../screens/CreateAdd/CreateAdScreen3';
import CreateAdScreen4 from '../../screens/CreateAdd/CreateAdScreen4';
import PurchaseStep1 from '../../screens/CreateAdd/PurchaseStep1';
import PurchaseStep2 from '../../screens/CreateAdd/PurchaseStep2';
import PurchaseStep3 from '../../screens/CreateAdd/PurchaseStep3';
import BottomTab from '../TabNavigation/BottomTab';

const Stack = createStackNavigator();

const CreateAdStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="CreateAd1">
      <Stack.Screen name="CreateAd1" component={CreateAdScreen1} />
      <Stack.Screen name="CreateAd2" component={CreateAdScreen2} />
      <Stack.Screen name="CreateAd3" component={CreateAdScreen3} />
      <Stack.Screen name="CreateAd4" component={CreateAdScreen4} />
      <Stack.Screen name="PurchaseStep1" component={PurchaseStep1} />
      <Stack.Screen name="PurchaseStep2" component={PurchaseStep2} />
      <Stack.Screen name="PurchaseStep3" component={PurchaseStep3} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
};
export default CreateAdStack;
