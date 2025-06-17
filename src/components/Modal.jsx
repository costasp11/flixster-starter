import './Modal.css'
import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Modal = ({ movie, onClose }) => {
  if (!movie) return null;
  const VITE_API_KEY = import.meta.env.VITE_API_KEY;
  const [movieDetails, setMovieDetails] = useState([]);
  const [videoKey, setVideoKey] = useState(null);

  // Fetch movie details when the modal opens (renders)
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const detailsUrl = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${VITE_API_KEY}`;
        const response = await axios.get(detailsUrl);
        const results = response.data;
        setMovieDetails(results);
        setVideoKey(videoResponse.data.results.key);
      }
      catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (movie.id) {
      fetchMovieDetails();
    }

}, [movie.id]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
            alt={`${movie.title} backdrop`}
            className="modal-backdrop"
          />
          <h2 className="modal-title">{movie.title}</h2>
        </div>

        <div className="modal-body">
          <div className="modal-info">
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movieDetails.runtime} minutes</p>
            <p><strong>Genres:</strong> {movieDetails.genres ? movieDetails.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
            <p><strong>Overview:</strong></p>
            <p className="modal-overview">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

