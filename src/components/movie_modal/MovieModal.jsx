import React from 'react'; 
import Modal from 'react-bootstrap/Modal'; 
import MovieThumbnail from './MovieThumbnail';

const MovieModal = (props) => {
  return (
    <div id={`gridItem-${props.movie.id}`}>
      <p>{props.movie.title}</p>
      <MovieThumbnail img={props.movie.coverURL} />
    </div>
  )
}

export default MovieModal; 