import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-view';
import MyAddsScreen from '../../screens/MyAdds/MyAddsScreen';
import FavoritesBreeds from '../../screens/Favorites/FavoritesBreeds';

const Tab = createMaterialTopTabNavigator();
function HomeTopTabs() {
  return (
    <Tab.Navigator
      tabBarPosition="top"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1F5D44',
        },
        tabBarActiveTintColor: '#14B219',
        tabBarLabelStyle: {
          fontSize: 15,
          fontFamily: 'Manrope-Regular',
          textTransform: 'none',
        },
        tabBarInactiveTintColor: '#fff',
        tabBarIndicatorStyle: {
          backgroundColor: '#14B219',
          height: 4,
          borderRadius: 99,
        },
      }}>
      <Tab.Screen name="İlanlarım" component={MyAddsScreen} />
      <Tab.Screen name="Favoriler" component={FavoritesBreeds} />
    </Tab.Navigator>
  );
}
const TopTab = () => {
  const safeArea = useSafeArea();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: safeArea.top,
        backgroundColor: '#1F5D44',
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>İlanlarım</Text>
      </View>
      <HomeTopTabs />
    </SafeAreaView>
  );
};
export default TopTab;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
  },
});
