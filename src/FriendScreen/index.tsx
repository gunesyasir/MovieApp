/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, FlatList} from 'react-native';
import {StackParameterList} from '../StackParameterList';
import {StackScreenProps} from '@react-navigation/stack';
import styles from './styles';
import {Movie} from '../RequestManager';
import database from '@react-native-firebase/database';

type FriendScreenProps = StackScreenProps<StackParameterList, 'FriendScreen'>;

const FriendScreen = (props: FriendScreenProps) => {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    fetchFriendsFavoriteFilms();
  }, []);

  const fetchFriendsFavoriteFilms = () => {
    const ref = database().ref(`users/${props.route.params.friend}/movies`);
    ref.on('value', snapshot => {
      const data = snapshot.val();
      if (data != null) {
        setMovies(Object.values(data));
      }
    });
  };

  const renderMovieItem = (item: Movie) => {
    return (
      <TouchableOpacity
        style={styles.movieItem}
        onPress={() => props.navigation.navigate('DetailScreen', {movie: item})}>
        <Text style={[styles.text, {color: '#17181B'}]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.view}
      data={movies}
      renderItem={({item}) => renderMovieItem(item)}
      keyExtractor={(_, index) => index.toString()}
    />
  );
};

export default FriendScreen;
