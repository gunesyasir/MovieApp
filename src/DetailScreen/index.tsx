import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import { StackParameterList } from '../StackParameterList';
import { StackScreenProps } from '@react-navigation/stack';
import { IMAGE_BASE_URL } from '../CustomFlatList';

type Props = StackScreenProps<StackParameterList, 'DetailScreen'>;

export const DetailScreen = (props: Props) => {
  props.navigation.setOptions({header: () => <View style={{height: 0}}/>})
  return (
    <View style={styles.view}>
      <Image style={styles.image} source={{uri: IMAGE_BASE_URL + props.route.params.movie.backdrop_path}}  />
      <View style={styles.movieInfoContainer}>
        <View style={styles.movieScoreContainer}>

        </View>
      </View>
    </View>
  );
};
