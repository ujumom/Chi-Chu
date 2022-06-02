import React from 'react';
import ReactPlayer from 'react-player';

function UCC() {
  return (
    <ReactPlayer
      url="https://www.youtube.com/watch?v=4GcdKajfOug"
      width="100%"
      height="100%"
      controls={true}
      playing={true}
    />
  );
}

export default UCC;
