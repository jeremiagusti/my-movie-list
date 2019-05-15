import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addShowToMyCollection,
  deleteShowFromCollection
} from "../../actions/movieAction";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ResponsiveEmbed from "react-bootstrap/ResponsiveEmbed";

const MovieModal = props => {
  const [isInMyCollection, setIsInMyCollection] = useState(false);

  useEffect(() => {
    for (let i = 0; i < props.showCollection.length; i++) {
      const showIdInCollection = props.showCollection[i].id;
      if (props.show.id === showIdInCollection) {
        setIsInMyCollection(true);
      }
    }
  }, []);

  const addShowToCollection = async () => {
    props.addShowToMyCollection(props.show, props.userId, props.showCollection);
    setIsInMyCollection(true);
  };

  const removeShowFromCollection = async () => {
    props.handleClose();
    props.deleteShowFromCollection(
      props.show,
      props.userId,
      props.showCollection
    );
    setIsInMyCollection(false);
  };

  return (
    <Modal
      centered
      id={`show-${props.show.id}`}
      show={props.isShowing}
      onHide={props.handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.show.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ResponsiveEmbed aspectRatio="16by9" allowFullScreen>
          <iframe
            title="ytEmbed"
            src={props.show.trailer}
            allowFullScreen
            frameBorder="0"
          />
        </ResponsiveEmbed>
        <div className="text" style={{ margin: "10px 0 0 0" }}>
          <h6>Description: </h6>
          <p>{props.show.overview}</p>
          <hr />
          <ul>
            <li>Years Active: {props.show.years_active}</li>
            <li>Seasons: {props.show.seasons}</li>
            <li>Casts: {props.show.casts.join(", ")}</li>
            <li>Genre: {props.show.genre}</li>
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {isInMyCollection ? (
          <Button variant="danger" block onClick={removeShowFromCollection}>
            Delete from My Collection
          </Button>
        ) : (
          <Button variant="success" block onClick={addShowToCollection}>
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
    showCollection: state.collectionReducer.shows,
    userId: state.authReducer.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addShowToMyCollection: (show, userId, oldCollection) => {
      dispatch(addShowToMyCollection(show, userId, oldCollection));
    },

    deleteShowFromCollection: (show, userId, oldCollection) => {
      dispatch(deleteShowFromCollection(show, userId, oldCollection));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieModal);
