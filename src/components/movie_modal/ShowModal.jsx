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
    if (props.showCollection.includes(props.show.id)) {
      setIsInMyCollection(true);
    }
  }, []);

  const addShowToCollection = async () => {
    await props.addShowToMyCollection(
      props.show.id,
      props.showCollection,
      props.userId
    );
    setIsInMyCollection(true);
  };

  const removeShowFromCollection = async () => {
    props.deleteShowFromCollection(props.show.id, props.userId);
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
    addShowToMyCollection: (id, oldShowCollection, userId) => {
      let newCollection = [...oldShowCollection, id];
      dispatch(addShowToMyCollection(id, newCollection, userId));
    },

    deleteShowFromCollection: (showId, userId) => {
      dispatch(deleteShowFromCollection(showId, userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieModal);
