import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import {StackParameterList} from '../StackParameterList';
import {StackScreenProps} from '@react-navigation/stack';
import {IMAGE_BASE_URL} from '../CustomFlatList';
import {Assets} from '../constants/Assets';
import {MovieGenreCodes} from '../constants/Enums';

type Props = StackScreenProps<StackParameterList, "DetailScreen">;

const DetailScreen = (props: Props) => {
  props.navigation.setOptions({header: () => <View style={{height: 0}} />});
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  console.log(props.route.params.movie);

  const getGenreName = (value: number) => {
    return (
      <Text style={styles.genre}>
        {Object.keys(MovieGenreCodes).find(
          key => MovieGenreCodes[key] === value,
        )}
      </Text>
    );
  };

  return (
    <View style={styles.view}>
      <Image
        style={styles.image}
        source={{uri: IMAGE_BASE_URL + props.route.params.movie.backdrop_path}}
      />
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
          <TouchableOpacity onPress={() => setIsFavorited(!isFavorited)}>
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
            {props.route.params.movie.release_date.substring(0,4)}
          </Text>
        </View>
        <Text style={styles.overview}>
            {props.route.params.movie.overview}
          </Text>
      </View>
    </View>
  );
};

export default DetailScreen;
