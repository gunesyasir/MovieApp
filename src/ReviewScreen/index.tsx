import React, {useState} from 'react';
import {Text, TextInput, Touchable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParameterList } from '../StackParameterList';

type Props = StackScreenProps<StackParameterList, 'ReviewScreen'>;

const ReviewScreen = (props: Props) => {
  const [text, setText] = useState<string>('');

  const onPressReview = () => {
    database()
        .ref('users')
        .child(props.route.params.userName)
        .child('reviews')
        .child(props.route.params.movieID)
        .set({
            movieId: props.route.params.movieID,
            review: text
        }).then(() => props.navigation.reset({
            index: 0,
            routes: [{name: 'TabScreen'}],
          }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Review</Text>
      <TextInput
        style={styles.textInput}
        editable
        multiline
        numberOfLines={12}
        textAlignVertical="top"
        onChangeText={text => setText(text)}
        value={text}
      />
      <TouchableOpacity style={styles.button} onPress={onPressReview}>
        <Text>Review</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ReviewScreen;
