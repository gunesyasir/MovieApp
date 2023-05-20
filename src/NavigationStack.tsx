import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import DiscoverScreen from './DiscoverScreen';
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {Assets} from './constants/Assets';
import ProfileScreen from './ProfileScreen';
import LoginScreen from './LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getTabBarOptions = (route, insets) => ({
  tabBarShowLabel: false,
  tabBarStyle: {
    backgroundColor: '#F5F5F5',
    paddingBottom: insets.bottom,
    height: insets.bottom + 50,
  },
  tabBarIcon: ({focused, color}) => {
    if (route.name === 'HomeScreen') {
      return (
        <View style={styles.iconContainer}>
          <Image
            resizeMode="contain"
            source={Assets.homeIcon}
            style={{height: 25, width: 25}}
          />
        </View>
      );
    } else if (route.name === 'DiscoverScreen') {
      return (
        <View style={styles.iconContainer}>
          <Image
            resizeMode="contain"
            source={Assets.searchIcon}
            style={{height: 25, width: 25}}
          />
        </View>
      );
    } else if (route.name === 'ProfileScreen') {
      return (
        <View style={styles.iconContainer}>
          <Image
            resizeMode="contain"
            source={Assets.userIcon}
            style={{height: 25, width: 25}}
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
          initialRouteName={'HomeScreen'}
          screenOptions={({route}) => getTabBarOptions(route, insets)}>
          <Tab.Screen
            name={'HomeScreen'}
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name={'DiscoverScreen'}
            component={DiscoverScreen}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name={'ProfileScreen'}
            component={ProfileScreen}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

const setInitialScreen = async () => {
  const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

  let initialScreen = 'LoginScreen';

  if (isLoggedIn != null) {
    initialScreen = 'TabScreen';
  }

  return initialScreen;
};

const NavigationStack = () => {
  const [isResponseArrived, setIsResponseArrived] = useState<boolean>(false);
  const [initialScreenName, setInitialScreenName] = useState<string>('');
  setInitialScreen().then(result => {
    setInitialScreenName(result);
    setIsResponseArrived(true);
  });
  const Stack = createStackNavigator();
  return (
    <>
      {isResponseArrived && (
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={initialScreenName}>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="TabScreen" component={TabBar} />
              <Stack.Screen name="DetailScreen" component={DetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavigationStack;
