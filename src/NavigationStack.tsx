import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import DiscoverScreen from './DiscoverScreen';
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { Assets } from './constants/Assets';
import ProfileScreen from './ProfileScreen';

const getTabBarOptions = (route, insets) => ({
  title: 'Welcome',
  tabBarLabel: 'Anasayfa',
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: '#F5F5F5',
    paddingBottom: insets.bottom,
    height: insets.bottom + 50,
  },
  tabBarActiveTintColor: '#000',
  tabBarInactiveTintColor: 'gray',
  lazy: true,
  tabBarIcon: ({focused, color}) => {
    if (route.name === "HomeScreen") {
      return (
        <View style={styles.iconContainer}>
          <Image
            resizeMode='cover'
            source={Assets.heartIcon}
            style={{height: 20, width: 20}}
            />
        </View>
      );
    } else if (route.name === "DiscoverScreen") {
      return (
        <View style={styles.iconContainer}>
          <Image
            resizeMode='cover'
            source={Assets.heartIcon}
            style={{height: 20, width: 20}}
            />
        </View>
      );
    } else if (route.name === "Profile") {
      return (
        <View style={styles.iconContainer}>
          <Image
            resizeMode='cover'
            source={Assets.heartIcon}
            style={{height: 20, width: 20}}
            />
        </View>
      );
    }
  },
});


const TabBar = () => {
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaInsetsContext.Consumer>
      {insets => (
        <Tab.Navigator
          initialRouteName={"HomeScreen"}
          screenOptions={({route}) => getTabBarOptions(route, insets)}>
          <Tab.Screen
            name={"HomeScreen"}
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name={"DiscoverScreen"}
            component={DiscoverScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name={"ProfileScreen"}
            component={ProfileScreen}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
}

const NavigationStack = () => {
  const Stack = createStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabScreen" component={TabBar} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default NavigationStack;
