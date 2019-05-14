import React from 'react'; 
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal'; 
import Button from 'react-bootstrap/Button';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';

const MovieModal = (props) => {
  return (
    <Modal centered id={`show-${props.movie.id}`} show={props.isShowing} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>     
            <ResponsiveEmbed aspectRatio='16by9' allowFullScreen>
              <iframe
                title="ytEmbed"
                src={props.movie.trailer}
                allowFullScreen
                frameBorder="0" >
              </iframe>
            </ResponsiveEmbed>
              <div className="text" style={{margin: '10px 0 0 0'}}>
                <h6>Description: </h6>
                <p>{props.movie.overview}</p>
              </div>
      </Modal.Body>
      <Modal.Footer>
        {
          props.isLoggedIn ? 
            <Button variant="success" block onClick={props.handleClose}>Add to My Collection</Button>
            :
            <em style={{color: 'red'}}>Sign in to add to my collection</em>
        }
      </Modal.Footer>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
      isLoggedIn: state.authReducer.isLoggedIn
  }
}

export default connect(mapStateToProps)(MovieModal); 