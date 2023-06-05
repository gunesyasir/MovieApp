/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, FlatList, View} from 'react-native';
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
      <View
        style={{
          height: 50,
          backgroundColor: '#F6F2F2',
          marginVertical: 3,
          paddingHorizontal: 5,
          borderRadius: 5,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('DetailScreen', {movie: item})
          }>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 21,
              color: '#17181B',
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#17181B'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 32}}>
          {props.route.params.friend}
        </Text>
      </View>
      <View
        style={{
          flex: 7,
          borderWidth: 2,
          margin: 10,
          padding: 5,
          borderRadius: 10,
          backgroundColor: 'white',
        }}>
        <FlatList
          data={movies}
          renderItem={({item}) => renderMovieItem(item)}
          keyExtractor={(_: Movie, index: number) => index.toString()}
          style={{marginBottom: 10}}
        />
      </View>
    </View>
  );
};

export default FriendScreen;
