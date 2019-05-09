import React, { useState } from 'react';
import MovieModal from './MovieModal';
import Image from 'react-bootstrap/Image';

const MovieThumbnail = (props) => {
  const [isModalShowing, setIsModalShowing] = useState(false); 

  const openModal = () => {
    setIsModalShowing(true);
  }

  const closeModal = () => {
    setIsModalShowing(false);
  }

  return (
    <div id={`gridItem-${props.movie.id}`}>
      <Image fluid src={props.movie.coverURL} onClick={openModal} />
      <MovieModal movie={props.movie} isShowing={isModalShowing} handleClose={closeModal} />
    </div>
  )
}

export default MovieThumbnail;