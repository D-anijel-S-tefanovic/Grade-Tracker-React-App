import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grow from "@material-ui/core/Grow";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
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
    backgroundColor: "#233B6E",
    color: "#B7BCC4",
  },
  textStyle: {
    fontSize: "1.15rem",
    color: "#B7BCC4",
  },
}));

export default function ListComponent(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <DialogTitle>
        <div className={classes.titleStyle}>Top 3 Courses</div>
      </DialogTitle>

      <Grow in={true} timeout={2500}>
        <List className={classes.rootStyle}>
          {props.courseDetailsList.map((courseDetails, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar alt="Course Name" className={classes.placeStyle}>
                  {index + 1}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                className={classes.subTitleStyle}
                primary=<div className={classes.textStyle}>
                  {courseDetails.courseName +
                    " - " +
                    courseDetails.courseGrade +
                    "%"}
                </div>
              />
            </ListItem>
          ))}
        </List>
      </Grow>
    </React.Fragment>
  );
}
