import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, BackHandler} from 'react-native';
import styles from './styles';
import {StackParameterList} from '../StackParameterList';
import {StackScreenProps} from '@react-navigation/stack';
import {IMAGE_BASE_URL} from '../CustomFlatList';
import {Assets} from '../constants/Assets';
import {MovieGenreCodes} from '../constants/Enums';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = StackScreenProps<StackParameterList, 'DetailScreen'>;

const DetailScreen = (props: Props) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  useEffect(() => {
    checkPreviousStatus();
    findUser();
    const onBackPressed = () => {
      handleDismiss();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPressed,
    );

    return () => backHandler.remove();
  }, []);

  const checkPreviousStatus = () => {
    database()
      .ref(`users/${username}/movies/`)
      .child(props.route.params.movie.id.toString())
      .once('value', snap => {
        if (snap.val()){
          setIsFavorited(true);
        }
      })
  };

  const findUser = async () => {
    setUsername(await AsyncStorage.getItem('username') ?? '')
  };

  const getGenreName = (value: number) => {
    return (
      <Text style={styles.genre}>
        {Object.keys(MovieGenreCodes).find(
          key => MovieGenreCodes[key] === value,
        )}
      </Text>
    );
  };

  const handleDismiss = () => {
    if (props.navigation.canGoBack()) {
      props.navigation.goBack();
    }
  };

  const setFavorite = () => {
    if (isFavorited) {
      setIsFavorited(false);

      database()
      .ref('users')
      .child(username)
      .child('movies')
      .child(props.route.params.movie.id.toString())
      .remove();
    } else {
      setIsFavorited(true);

      database()
      .ref(`users/${username}/movies`)
      .child(props.route.params.movie.id.toString())
      .set(props.route.params.movie);
    }
  }

  return (
    <View style={styles.view}>
      <Image
        style={styles.image}
        source={{uri: IMAGE_BASE_URL + props.route.params.movie.backdrop_path}}
      />

      <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
        <Image style={styles.closeImage} source={Assets.closeIcon} />
      </TouchableOpacity>

      <View style={styles.movieInfoContainer}>
        <View style={styles.upperContainer}>
          <View style={styles.scoreContainer}>
            <Image style={styles.starIcon} source={Assets.starIcon} />
            <Text style={styles.scoreText}>
              {props.route.params.movie.vote_average} |
            </Text>
            <Text style={styles.voteCount}>
              {props.route.params.movie.vote_count}
            </Text>
          </View>
          <TouchableOpacity onPress={setFavorite}>
            <Image
              style={styles.heartIcon}
              source={isFavorited ? Assets.heartFilledIcon : Assets.heartIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{props.route.params.movie.title}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.genre}>•</Text>
          {props.route.params.movie.genre_ids.map(getGenreName)}
          <Text style={styles.genre}>•</Text>
          <Text style={styles.genre}>
            {props.route.params.movie.release_date.substring(0, 4)}
          </Text>
        </View>
        <Text style={styles.overview}>{props.route.params.movie.overview}</Text>
      </View>
    </View>
  );
};

export default DetailScreen;
