import React, { useState, useEffect } from "react";
import {
  addMovieToMyCollection,
  deleteMovieFromCollection
} from "../../actions/movieAction";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";

const MovieModal = props => {
  const [isInMyCollection, setIsInMyCollection] = useState(false);

  useEffect(() => {
    for (let i = 0; i < props.movieCollection.length; i++) {
      const movieIdInCollection = props.movieCollection[i].id;
      if (props.movie.id === movieIdInCollection) {
        setIsInMyCollection(true);
      }
    }
  }, []);

  const addMovieToCollection = async () => {
    props.addMovieToMyCollection(
      props.movie,
      props.userId,
      props.movieCollection
    );
    setIsInMyCollection(true);
  };

  const removeMovieFromCollection = async () => {
    props.handleClose();
    props.deleteMovieFromCollection(
      props.movie,
      props.userId,
      props.movieCollection
    );
    setIsInMyCollection(false);
  };

  return (
    <Modal
      centered
      id={`movie-${props.movie.id}`}
      show={props.isShowing}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ResponsiveEmbed aspectRatio="16by9" allowFullScreen>
          <iframe
            title="ytEmbed"
            src={props.movie.trailer}
            allowFullScreen
            frameBorder="0"
          />
        </ResponsiveEmbed>
        <div className="text" style={{ margin: "10px 0 0 0" }}>
          <h6>Description: </h6>
          <p>{props.movie.overview}</p>
          <hr />
          <ul>
            <li>Year Released: {props.movie.year_released}</li>
            <li>Director: {props.movie.director}</li>
            <li>Casts: {props.movie.casts.join(", ")}</li>

            <li>Genre: {props.movie.genre}</li>
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isInMyCollection ? (
          <Button variant="danger" block onClick={removeMovieFromCollection}>
            Delete from My Collection
          </Button>
        ) : (
          <Button variant="success" block onClick={addMovieToCollection}>
            Add to My Collection
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    movieCollection: state.collectionReducer.movies,
    userId: state.authReducer.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMovieToMyCollection: (movie, userId, oldCollection) => {
      dispatch(addMovieToMyCollection(movie, userId, oldCollection));
    },

    deleteMovieFromCollection: (movie, userId, oldCollection) => {
      dispatch(deleteMovieFromCollection(movie, userId, oldCollection));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieModal);
