import {StackScreenProps} from '@react-navigation/stack';
import {StackParameterList} from '../StackParameterList';
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';

type ProfileScreenProps = StackScreenProps<StackParameterList, 'ProfileScreen'>;

interface Friend {
  name: string;
}

const ProfileScreen = (props: ProfileScreenProps) => {
  const [friends, setFriends] = useState<Friend[]>([
    {name: 'John'},
    {name: 'Jane'},
    {name: 'Mark'},
  ]);

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

  const renderFriendItem = (friend: Friend) => {
    return (
      <TouchableOpacity onPress={() => console.log(`${friend.name} clicked`)}>
        <Text>{friend.name}</Text>
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