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
    if (props.movieCollection.includes(props.movie.id)) {
      setIsInMyCollection(true);
    }
  }, []);

  const addMovieToCollection = async () => {
    await props.addMovieToMyCollection(
      props.movie.id,
      props.movieCollection,
      props.userId
    );
    setIsInMyCollection(true);
  };

  const removeMovieFromCollection = async () => {
    if (props.deleteFromMyList !== undefined) {
      // await props.deleteMovieFromCollection(props.movie.id, props.userId);
      await props.deleteFromMyList(props.movie.id, props.userId);
      setIsInMyCollection(false);
    } else {
      await props.deleteMovieFromCollection(props.movie.id, props.userId);
      setIsInMyCollection(false);
    }
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
    addMovieToMyCollection: (id, oldMovieCollection, userId) => {
      let newCollection = [...oldMovieCollection, id];
      dispatch(addMovieToMyCollection(id, newCollection, userId));
    },

    deleteMovieFromCollection: (movieId, userId) => {
      dispatch(deleteMovieFromCollection(movieId, userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieModal);
