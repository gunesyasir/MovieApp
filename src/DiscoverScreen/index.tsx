import {StackScreenProps} from '@react-navigation/stack';
import {StackParameterList} from '../StackParameterList';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import database from '@react-native-firebase/database';
import {FlatList} from 'react-native-gesture-handler';
import {Assets} from '../constants/Assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DiscoverScreenProps = StackScreenProps<
  StackParameterList,
  'DiscoverScreen'
>;

const DiscoverScreen = (props: DiscoverScreenProps) => {
  const [matchingUsernames, setMatchingUsernames] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    findUser();
  }, []);

  useEffect(() => {
    if (searchText !== '') {
      handleSearch(searchText);
    }
  }, [searchText]);

  const findUser = async () => {
    setUsername((await AsyncStorage.getItem('username')) ?? '');
  };

  const handleSearch = (text: string) => {
    const ref = database().ref('users');
    ref.on('value', snapshot => {
      const data = snapshot.val();
      const items: Array<{
        username: string;
      }> = Object.values(data);
      const filteredItems = items.filter(item =>
        item.username.toLowerCase().includes(text.toLowerCase()),
      );
      setMatchingUsernames(filteredItems.map(item => item.username));
    });
  };

  const sendFriendshipRequest = (name: string) => {
    database()
      .ref(`users/${username}/friends`)
      .child(name)
      .set(name);
  };

  const renderItem = (name: string, _: number) => {
    if (username != name) {
      return (
        <View style={styles.userCard}>
          <Text style={styles.username}>{name}</Text>
          <TouchableOpacity
            onPress={() => sendFriendshipRequest(name)}
            style={styles.addButton}>
            <Image
              style={styles.addIcon}
              source={Assets.addUser}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      );
    } else return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder={'Type here...'}
          style={styles.searchText}
          underlineColorAndroid="transparent"
          onChangeText={text => setSearchText(text)}
          placeholderTextColor="gray"
        />
      </View>
      <FlatList
        style={{marginTop: 10}}
        data={matchingUsernames}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default DiscoverScreen;
