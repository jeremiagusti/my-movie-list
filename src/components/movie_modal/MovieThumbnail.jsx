import React from 'react';

const MovieThumbnail = (props) => {
  return (
    <div className="thumbnail">
      { console.log(props.img) }
      <img src={props.img} />
    </div>
  )
}

export default MovieThumbnail;