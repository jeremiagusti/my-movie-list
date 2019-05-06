import React from 'react'; 
import Modal from 'react-bootstrap/Modal'; 

const MovieModal = (props) => {
  return (
    <div id={`gridItem-${props.id}`}>
      <h1>Title: {props.title}</h1>
    </div>
  )
}

export default MovieModal; 