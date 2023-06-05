import {StackScreenProps} from '@react-navigation/stack';
import {StackParameterList} from '../StackParameterList';
import {Text, TouchableOpacity, FlatList, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Movie} from '../RequestManager';

type ProfileScreenProps = StackScreenProps<StackParameterList, 'ProfileScreen'>;

const ProfileScreen = (props: ProfileScreenProps) => {
  const [friends, setFriends] = useState<string[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    findUser();
  }, []);

  useEffect(() => {
    if (username != '') {
      fetchFriends();
      fetchMovies();
    }
  }, [username]);

  const fetchMovies = () => {
    const ref = database().ref(`users/${username}/movies`);
    ref.on('value', snapshot => {
      const data = snapshot.val();
      if (data != null) {
        setMovies(Object.values(data));
      }
    });
  };

  const fetchFriends = () => {
    const ref = database().ref(`users/${username}/friends`);
    ref.on('value', snapshot => {
      const data = snapshot.val();
      if (data != null) {
        setFriends(Object.values(data));
      }
    });
  };

  const findUser = async () => {
    setUsername((await AsyncStorage.getItem('username')) ?? '');
  };

  const renderFriendItem = (friend: string) => {
    return (
      <View style={styles.itemCard}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('FriendScreen', {friend: friend})
          }>
          <Text style={[styles.text, {color: '#17181B'}]}>{friend}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderMovieItem = (item: Movie) => {
    return (
      <View style={styles.itemCard}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('DetailScreen', {movie: item})
          }>
          <Text style={[styles.text, {color: '#17181B'}]}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#17181B'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.text}>Welcome, {username}</Text>
      </View>

      <Text style={[styles.text, {marginStart: 16}]}>Movies you've liked</Text>
      <View style={styles.container}>
        <FlatList
          data={movies}
          renderItem={({item}) => renderMovieItem(item)}
          keyExtractor={(_, index) => index.toString()}
          style={{marginBottom: 10}}
        />
      </View>

      <Text style={[styles.text, {marginStart: 16}]}>Your friends</Text>
      <View style={styles.container}>
        <FlatList
          data={friends}
          renderItem={({item}) => renderFriendItem(item)}
          keyExtractor={item => item}
          style={{marginBottom: 10}}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;
