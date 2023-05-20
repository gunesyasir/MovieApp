import {StackScreenProps} from '@react-navigation/stack';
import {StackParameterList} from '../StackParameterList';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Assets} from '../constants/Assets';

type DiscoverScreenProps = StackScreenProps<
  StackParameterList,
  'DiscoverScreen'
>;

const DiscoverScreen = (props: DiscoverScreenProps) => {
  const [searchText, setSearchText] = useState('');

  // const handleSearchTextChange = (text: string) => {
  //   setSearchText(text);
  // };

  const handleSearch = () => {
    // database().ref
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder={'Type here...'}
          style={styles.searchText}
          underlineColorAndroid="transparent"
          onChangeText={text => setSearchText(text)}
          // value={searchText}
          placeholderTextColor="gray"
        />
        {searchText !== '' ? (
          <TouchableOpacity onPress={handleSearch}>
            <View style={{padding: 10, backgroundColor: 'gray'}}>
              <Image
                source={Assets.starIcon}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default DiscoverScreen;
