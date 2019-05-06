import React from 'react';
import Image from 'react-bootstrap/Image';

const MovieThumbnail = (props) => {
  return (
    <div className="thumbnail">
      <Image src={props.img} fluid/>
    </div>
  )
}

export default MovieThumbnail;