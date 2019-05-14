import React, { useState } from "react";
import MovieModal from "./MovieModal";
import ShowModal from "./ShowModal";
import Image from "react-bootstrap/Image";

export const MovieThumbnail = props => {
  const [isModalShowing, setIsModalShowing] = useState(false);

  const openModal = () => {
    setIsModalShowing(true);
  };

  const closeModal = () => {
    setIsModalShowing(false);
  };

  return (
    <div id={`thumbnail-${props.movie.id}`}>
      <Image fluid src={props.movie.coverURL} onClick={openModal} />
      <MovieModal
        movie={props.movie}
        isShowing={isModalShowing}
        handleClose={closeModal}
      />
    </div>
  );
};

export const ShowThumbnail = props => {
  const [isModalShowing, setIsModalShowing] = useState(false);

  const openModal = () => {
    setIsModalShowing(true);
  };

  const closeModal = () => {
    setIsModalShowing(false);
  };

  return (
    <div id={`thumbnail-${props.movie.id}`}>
      <Image fluid src={props.movie.coverURL} onClick={openModal} />
      <ShowModal
        movie={props.movie}
        isShowing={isModalShowing}
        handleClose={closeModal}
      />
    </div>
  );
};
