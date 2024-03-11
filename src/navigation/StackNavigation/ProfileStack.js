import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/Profile/ProfileScreen';
import AccountInfo from '../../screens/Profile/AccountInfo';
import OwnerInfo from '../../screens/Profile/OwnerInfo';
import Settings from '../../screens/Profile/Settings';
import Browser from '../../screens/Profile/Browser';
import Summary from '../../screens/Profile/Summary';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="AccountInfo"
        component={AccountInfo}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="OwnerInfo"
        component={OwnerInfo}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="Browser"
        component={Browser}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen
        name="Summary"
        component={Summary}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};
export default ProfileStack;
