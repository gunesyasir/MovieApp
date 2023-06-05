import React, {useState} from 'react';
import {Image, TextInput, TouchableOpacity, View, Text} from 'react-native';
import {Assets} from '../constants/Assets';
import styles from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParameterList} from '../StackParameterList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

type LoginScreenProps = StackScreenProps<StackParameterList, 'ProfileScreen'>;

const LoginScreen = (props: LoginScreenProps) => {
  const [username, setUsername] = useState('');

  const sendUserInfo = async () => {
    if (username != '') {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('username', username);

      const ref = database().ref('users')

      ref.child(username).set({
        username: username
      }).then(() => {
        props.navigation.reset({
          index: 0,
          routes: [{name: 'TabScreen'}],
        });
      })
    };
  };

  return (
    <View style={styles.container}>
      <Image style={{flex: 1, width: '100%'}} source={Assets.splashImage} />
      <View>
        <TextInput
          placeholder="Username"
          placeholderTextColor={'#a7a7a7'}
          underlineColorAndroid={'#a7a7a7'}
          value={username}
          onChangeText={text => setUsername(text)}
          style={{color: '#a7a7a7'}}
        />
        <TouchableOpacity style={styles.button} onPress={sendUserInfo}>
          <Text style={styles.buttonText}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
