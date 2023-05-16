import {StackScreenProps} from '@react-navigation/stack';
import {StackParameterList} from '../StackParameterList';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import { Assets } from '../constants/Assets';

type ProfileScreenProps = StackScreenProps<StackParameterList, 'ProfileScreen'>;

const ProfileScreen = (props: ProfileScreenProps) => {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  const handleClearSearch = () => {
    setSearchText('');
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder={'Type here...'}
          style={styles.searchText}
          underlineColorAndroid="transparent"
          onChangeText={handleSearchTextChange}
          value={searchText}
          placeholderTextColor="gray"
        />
        {/* {searchText !== '' ? (
          <TouchableOpacity onPress={handleSearch}>
            <View style={{padding: 10, backgroundColor: 'white'}}>
              <Image source={Assets.starIcon} resizeMode='contain' style={{width: 20, height: 20}}/>
              <Text >sel</Text>
            </View>
          </TouchableOpacity>
        ) : null} */}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
