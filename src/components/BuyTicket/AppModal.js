import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import ModalContent from "./ModalContent";

const AppModal = ({ children, url }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div onClick={handleOpen}> {children} </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simpel-modal-description"
      >
        <ModalContent url={url}/>
      </Modal>
    </div>
  );
};

export default AppModal;
