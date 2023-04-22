import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {Movie} from '../RequestManager';

export type Category = {
  genre: string;
  movies: Movie[];
  onMovieCardClick: (movie: Movie) => void;
};

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const ScrollableComponent: React.FC<Category> = ({genre, movies, onMovieCardClick}) => {
  const onMovieItemClick = (movie: Movie) => {
    onMovieCardClick(movie)
  };

  const renderItem = (movie: Movie, index: number) => {
    return (
      <TouchableOpacity style={{flex: 1}} onPress={() => onMovieItemClick(movie)}>
        <Image
          style={styles.movieCard}
          source={{uri: IMAGE_BASE_URL + movie.poster_path}}
        />
        <Text style={styles.movieTitle}>{movie.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container} >
      <Text style={styles.categoryTitle}>{genre}</Text>
      <FlatList
        data={movies}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View> 
  );
};

export default ScrollableComponent;
