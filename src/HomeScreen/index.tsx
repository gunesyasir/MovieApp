import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {StackParameterList} from '../StackParameterList';
import styles from './styles';
import ScrollableComponent from '../CustomFlatList';
import {Movie, fetchMovieDataBasedOnGenre} from '../RequestManager';
import { MovieGenreCodes } from '../constants/Enums';
import { StackScreenProps } from '@react-navigation/stack';

type HomeScreenProps = StackScreenProps<
  StackParameterList,
  'HomeScreen'
>;


const HomeScreen = (props: HomeScreenProps) => {
  const [actionMovies, setActionMovies] = useState<Movie[]>();
  const [dramaMovies, setDramaMovies] = useState<Movie[]>();
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>();

  useEffect(() => {
    fetchData(MovieGenreCodes.Horror, response => setHorrorMovies(response))
    fetchData(MovieGenreCodes.Drama, response => setDramaMovies(response))
    fetchData(MovieGenreCodes.Action, response => setActionMovies(response))
  }, []);

  const fetchData = async (genreId: number, onResponseReceived: (movies: Movie[]) => void ) => {
    fetchMovieDataBasedOnGenre(genreId)
      .then(response => {
        if (response) {
          onResponseReceived(response);
        } else {
          console.log('Failed to fetch movie data.');
        }
      })
      .catch(error => {
        console.error('Failed to fetch movie data:', error);
      });
  };

  return (
    <ScrollView style={styles.view}>
      {actionMovies && (
        <ScrollableComponent genre={'Action'} movies={actionMovies!} onMovieCardClick={movie => props.navigation.navigate('DetailScreen', {movie: movie})}/>
      )}
      {horrorMovies && (
        <ScrollableComponent genre={'Horror'} movies={horrorMovies!} onMovieCardClick={movie => props.navigation.navigate('DetailScreen', {movie: movie})}/>
      )}
      {dramaMovies && (
        <ScrollableComponent genre={'Drama'} movies={dramaMovies!} onMovieCardClick={movie => props.navigation.navigate('DetailScreen', {movie: movie})}/>
      )}
      
    </ScrollView>
  );
};

export default HomeScreen;
