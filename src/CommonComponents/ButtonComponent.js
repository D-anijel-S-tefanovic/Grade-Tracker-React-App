import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#233B6E",
    color: "#B7BCC4",
    "&:hover": {
      backgroundColor: "#233B6E",
      color: "#B7BCC4",
    },
  },
}));

export default function ButtonComponent(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className={classes.buttonStyle}
        onClick={props.currentButtonFunction}
      >
        {props.currentButtonName}
      </Button>
    </React.Fragment>
  );
}
