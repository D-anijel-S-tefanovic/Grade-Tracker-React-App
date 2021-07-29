import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import "./LoadingStyle.css";

const useStyles = makeStyles((theme) => ({
  modalStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function LoadingModal(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modalStyle}
        open={props.startLoading}
        closeAfterTransition
        disableAutoFocus={true}
        BackdropComponent={Backdrop}
      >
        <Fade in={true}>
          <div className="loader">
            <div className="loader-line"></div>
            <div className="loader-line"></div>
            <div className="loader-line"></div>
            <div className="loader-line"></div>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
