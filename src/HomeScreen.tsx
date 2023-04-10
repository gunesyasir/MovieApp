/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {StackParameterList} from './StackParameterList';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type HomeScreenProps = NativeStackScreenProps<
  StackParameterList,
  'DetailScreen'
>;
export const HomeScreen = (props: HomeScreenProps) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('DetailScreen')}>
        <Text>Go to Movieee</Text>
      </TouchableOpacity>
    </View>
  );
};
