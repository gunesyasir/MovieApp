import {StackScreenProps} from '@react-navigation/stack';
import {StackParameterList} from '../StackParameterList';
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileScreenProps = StackScreenProps<StackParameterList, 'ProfileScreen'>;

const ProfileScreen = (props: ProfileScreenProps) => {
  const [friends, setFriends] = useState<string[]>([]);

  // make this Moviee
  const [movies, setMovies] = useState<string[]>([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 1',
    'Item 2',
    'Item 3',
  ]);
  const [username, setUsername] = useState<string>(''); 

  useEffect(() => {
    findUser();
  }, [])

  useEffect(() => {
    if (username != '') {
      fetchFriends();
    }
  }, [username])

  const fetchFriends = () => {
    const ref = database()
      .ref(`users/${username}/friends`)
      ref.on('value', snapshot => {
        const data = snapshot.val();
        setFriends(Object.values(data)); 
      })
  }

  const findUser = async () => {
    setUsername((await AsyncStorage.getItem('username')) ?? '');
  };

  const renderFriendItem = (friend: string) => {
    return (
      <TouchableOpacity onPress={() => console.log(`${friend} clicked`)}>
        <Text>{friend}</Text>
      </TouchableOpacity>
    );
  };

  const renderMovieItem = (item: string) => {
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.welcomeText}>Welcome, XXX</Text>
      </View>

      <View style={[styles.container, {borderColor: 'green'}]}>
        <Text>Movies:</Text>
        <FlatList
          data={movies}
          renderItem={({item}) => renderMovieItem(item)}
          keyExtractor={(item, index) => index.toString()}
          style={{marginBottom: 10}}
        />
      </View>

      <View style={[styles.container, {borderColor: 'red'}]}>
        <Text>Friends:</Text>
        <FlatList
          data={friends}
          renderItem={({item}) => renderFriendItem(item)}
          keyExtractor={item => item.name}
          style={{marginBottom: 10}}
        />
      </View>

    </View>
  );
};

export default ProfileScreen;
