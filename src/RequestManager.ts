type MovieBaseResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
};

const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = '16c5d8b160fe579cadf863e18dff9509';

export const fetchMovieDataBasedOnGenre = async (
  genreId: number,
): Promise<Movie[] | null> => {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`,
    );
    if (!response.ok) {
      throw new Error(`Server error. Status: ${response.status}`);
    }
    const movieResponse: MovieBaseResponse = await response.json();
    return movieResponse.results;
  } catch (error) {
    console.error('Failed to fetch movie data from TMDB API:', error);
    return null;
  }
};
