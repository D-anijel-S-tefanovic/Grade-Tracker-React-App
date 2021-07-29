import React from "react";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  scrollTopStyle: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  scrollStyle: {
    backgroundColor: "#233B6E",
    outline: "none",
  },
  topStyle: {
    color: "#B7BCC4",
  },
}));

export default function ScrollTop(props) {
  const classes = useStyles();

  const { window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <React.Fragment>
      <Zoom in={trigger}>
        <div onClick={handleClick} className={classes.scrollTopStyle}>
          <Fab
            size="small"
            aria-label="scroll-back-to-the-top"
            className={classes.scrollStyle}
          >
            <KeyboardArrowUpIcon className={classes.topStyle} />
          </Fab>
        </div>
      </Zoom>
    </React.Fragment>
  );
}
