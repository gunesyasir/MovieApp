type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
};

const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = 'YOUR_API_KEY_HERE';

export const fetchMovieData = async (
  movieId: number,
): Promise<Movie | null> => {
  try {
    const response = await fetch(
      `${TMDB_API_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`,
    );
    if (!response.ok) {
      throw new Error(`Server error. Status: ${response.status}`);
    }
    const movies: Movie = await response.json();
    return movies;
  } catch (error) {
    console.error('Failed to fetch movie data from TMDB API:', error);
    return null;
  }
};

// Example usage: Fetch movie data for movie with ID 12345
const movieId = 12345;
fetchMovieData(movieId)
  .then(response => {
    if (response) {
      console.log('Movie Title:', response.title);
      console.log('Release Date:', response.release_date);
      console.log('Overview:', response.overview);
    } else {
      console.log('Failed to fetch movie data.');
    }
  })
  .catch(error => {
    console.error('Failed to fetch movie data:', error);
  });
