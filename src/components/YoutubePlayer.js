import React from 'react';
import YouTube from 'react-youtube';

const YoutubePlayer = () => {
  const videoId = 'tgbNymZ7vqY'; // Replace with your actual video ID
  
  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    console.log('ran')
    event.target.playVideo(); // autoplay when the player is ready
  };

  return (
    <YouTube videoId={videoId} opts={opts} onReady={onReady} />
  );
};

export default YoutubePlayer;