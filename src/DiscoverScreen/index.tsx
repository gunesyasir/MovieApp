import {StackScreenProps} from '@react-navigation/stack';
import {StackParameterList} from '../StackParameterList';
import {ScrollView} from 'react-native';
import React from 'react';

type DiscoverScreenProps = StackScreenProps<
  StackParameterList,
  'DiscoverScreen'
>;

const DiscoverScreen = (props: DiscoverScreenProps) => {
  return <ScrollView></ScrollView>;
};

export default DiscoverScreen;
