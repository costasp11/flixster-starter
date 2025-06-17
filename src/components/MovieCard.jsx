import './MovieCard.css'

const MovieCard = (props) => {
  const handleClick = () => {
    props.onMovieClick(props.movie);
  };

  return (
    <div className="movie-box" onClick={handleClick}>
      <div className="movie-details">
        <img 
          src={`https://image.tmdb.org/t/p/w200${props.image}`}  
          className="movie-image" 
          alt={props.title}
        />
        <div className="movie-details">
          <h2 className="movie-title">{props.title}</h2>
          <p className="movie-rating">Ratings: {props.ratings}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard