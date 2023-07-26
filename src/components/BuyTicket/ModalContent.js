import React from "react";
import { useEffect } from "react";
import YouTube from "react-youtube";
import "../../asset/css/main.css"
const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
const ModalContent = ({ url,onClose }) => {
  let id = 0;
  if (url) {
    id = url?.split("v=")[1].split("&")[0];
  }
  return (
    <div className="modal_trailer" onClick={()=>onClose()}>
      <YouTube videoId={id} opts={opts} />
    </div>
  );
};

export default ModalContent;
