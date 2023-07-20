import React from "react";
import { useEffect } from "react";
import YouTube from "react-youtube";
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
const ModalContent = ({ url }) => {
  const id = url.split('v=')[1].split('&')[0];
  
  return <YouTube videoId={id} opts={opts} />;
};

export default ModalContent;
