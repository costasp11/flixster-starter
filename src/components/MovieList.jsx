import MovieCard from './MovieCard'
import './MovieList.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const VITE_API_KEY = import.meta.env.VITE_API_KEY;

const MovieList = ({ searchQuery, filterValue, onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (pageNumber, append = false) => {
    try {
      setLoading(true);
      let url;
      
      // Determine which endpoint to use based on search vs filter
      if (searchQuery) {
        // If searching, use search endpoint (can't combine with sorting on API level)
        url = `https://api.themoviedb.org/3/search/movie?api_key=${VITE_API_KEY}&query=${searchQuery}&include_adult=false&language=en-US&page=${pageNumber}`;
      } else if (filterValue) {
        // If filtering (no search), use discover endpoint with sorting
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${VITE_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=${filterValue}`;
      } else {
        // Default: now playing movies
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${VITE_API_KEY}&language=en-US&page=${pageNumber}`;
      }

      const response = await axios.get(url);
      let results = response.data.results;

      // If we have both search and filter, sort the results client-side
      if (searchQuery && filterValue) {
        results = sortMoviesClientSide(results, filterValue);
      }

      // Append movies if the page is > 1, make a full list of movies, then sort then
      if (append) {
        setMovies(prevMovies => [...prevMovies, ...results]);

      } else {
        setMovies(results);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Client side sorting function for when we can't use API sorting
  const sortMoviesClientSide = (movies, sortBy) => {
    const sortedMovies = [...movies];
    
    switch (sortBy) {
      case 'title.asc':
        return sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
      case 'vote_average.desc':
        return sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
      case 'primary_release_date.desc':
        return sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      default:
        return sortedMovies;
    }
  };

  // Initial load and when search query or filter changes
  useEffect(() => {
    setPage(1); // Reset page when search or filter changes
    fetchMovies(1, false);
  }, [searchQuery, filterValue]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, true);
  };

  return (
    <>
      <div className="movie-container">
        {movies.map((movie) => (
          <MovieCard 
            key={movie.id}
            title={movie.title}
            ratings={movie.vote_average}
            image={movie.poster_path}
            movie={movie}
            onMovieClick={onMovieClick}
          />
        ))}

        {movies.length > 0 && (
          <button 
            onClick={handleLoadMore} 
            className="load-more-button"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        )}

      </div>
    </>
  )
}

export default MovieList