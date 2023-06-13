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
import {FlatList} from 'react-native-gesture-handler';

type Props = StackScreenProps<StackParameterList, 'DetailScreen'>;

const DetailScreen = (props: Props) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [reviews, setReviews] = useState<Array<any>>([]);

  useEffect(() => {
    checkPreviousStatus();
    findUser(checkReviews);
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
        if (snap.val()) {
          setIsFavorited(true);
        }
      });
  };

  const checkReviews = (username: string) => {
    if (username !== '') {
      database()
        .ref('users')
        .child(username)
        .child('friends')
        .once('value', snap => {
          Object.keys(snap.val()).map(username => {
            database()
              .ref('users')
              .child(username)
              .child('reviews')
              .once('value', snap => {
                if (snap.val()) {
                  if (snap.hasChild(props.route.params.movie.id.toString())) {
                    setReviews(prevState => [
                      ...prevState,
                      {
                        name: username,
                        review:
                          snap.val()[props.route.params.movie.id.toString()]
                            .review,
                      },
                    ]);
                  }
                }
              });
          });
        });

      database()
        .ref('users')
        .child(username)
        .child('reviews')
        .once('value', snap => {
          if (snap.val()) {
            if (snap.hasChild(props.route.params.movie.id.toString())) {
              setReviews(prevState => [
                ...prevState,
                {
                name: 'You',
                review:
                  snap.val()[props.route.params.movie.id.toString()].review,
                },
              ]);
            }
          }
        });
    }
  };

  const findUser = async (callback: (username: string) => void) => {
    const username = (await AsyncStorage.getItem('username')) ?? '';
    setUsername(username);
    callback(username);
  };

  const getGenreName = (value: number) => {
    return (
      <Text style={styles.genre} key={value}>
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

  const goToReviewScreen = () => {
    if (username != '') {
      props.navigation.navigate('ReviewScreen', {
        movieID: props.route.params.movie.id.toString(),
        userName: username,
      });
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
  };

  const renderReviewItem = (item: {name: string; review: string}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          height: 50,
        }}>
        <Text style={styles.reviewTitle}>{item.name}</Text>
        <Text style={styles.reviewText}>{item.review}</Text>
      </View>
    );
  };

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

        <View style={styles.upperContainer}>
          <Text style={styles.title}>{props.route.params.movie.title}</Text>
          <TouchableOpacity
            onPress={goToReviewScreen}
            style={styles.reviewButton}>
            <Text style={[styles.reviewTitle, {marginBottom: 10}]}>Review</Text>
          </TouchableOpacity>
        </View>

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

      {reviews.length !== 0 && (
        <View
          style={{
            flex: 1,
            margin: 10,
            backgroundColor: 'white',
            borderRadius: 30,
          }}>
          <FlatList
            data={reviews}
            renderItem={({item}) => renderReviewItem(item)}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default DetailScreen;
