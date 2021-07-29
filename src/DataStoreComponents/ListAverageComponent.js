import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grow from "@material-ui/core/Grow";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import ErrorIcon from "@material-ui/icons/Error";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    display: "inline",
  },
  titleStyle: {
    fontSize: "1.5rem",
    color: "#B7BCC4",
  },
  subTitleStyle: {
    fontSize: "1.25rem",
    color: "#B7BCC4",
  },
  placeStyle: {
    backgroundColor: "#EFF0F4",
    color: "#B7BCC4",
  },
  textStyle: {
    fontSize: "1.15rem",
    color: "#B7BCC4",
  },
  feedbackColorGreen: {
    backgroundColor: "green",
    color: "#B7BCC4",
  },
  feedbackColorOrange: {
    backgroundColor: "orange",
    color: "#B7BCC4",
  },
  feedbackColorRed: {
    backgroundColor: "red",
    color: "#B7BCC4",
  },
}));

export default function ListAverageComponent(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <DialogTitle>
        <div className={classes.titleStyle}>Feedback</div>
      </DialogTitle>

      <Grow in={true} timeout={2500}>
        <List className={classes.rootStyle}>
          <ListItem>
            <ListItemAvatar>
              {props.feedbackColorGreen === true ? (
                <Avatar
                  alt="Course Name"
                  className={classes.feedbackColorGreen}
                >
                  <CheckCircleIcon />
                </Avatar>
              ) : (
                <Avatar alt="Course Name" className={classes.placeStyle}>
                  <CheckCircleIcon />
                </Avatar>
              )}
            </ListItemAvatar>

            <ListItemText
              primary=<div className={classes.textStyle}>
                Keep Up The Good Work!
              </div>
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              {props.feedbackColorOrange === true ? (
                <Avatar
                  alt="Course Name"
                  className={classes.feedbackColorOrange}
                >
                  <WarningIcon />
                </Avatar>
              ) : (
                <Avatar alt="Course Name" className={classes.placeStyle}>
                  <WarningIcon />
                </Avatar>
              )}
            </ListItemAvatar>

            <ListItemText
              primary=<div className={classes.textStyle}>Try To Be Better!</div>
            />
          </ListItem>

          <ListItem>
            <ListItemAvatar>
              {props.feedbackColorRed === true ? (
                <Avatar alt="Course Name" className={classes.feedbackColorRed}>
                  <ErrorIcon />
                </Avatar>
              ) : (
                <Avatar alt="Course Name" className={classes.placeStyle}>
                  <ErrorIcon />
                </Avatar>
              )}
            </ListItemAvatar>

            <ListItemText
              primary=<div className={classes.textStyle}>Need To Improve!</div>
            />
          </ListItem>
        </List>
      </Grow>
    </React.Fragment>
  );
}
