import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import StaticNumber from "../DataStoreComponents/StaticNumber.js";
import ListComponent from "../DataStoreComponents/ListComponent.js";
import ListAverageComponent from "../DataStoreComponents/ListAverageComponent.js";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  titleStyle: {
    fontSize: "2rem",
    color: "#B7BCC4",
  },
  subTitleStyle: {
    fontSize: "1.5rem",
    color: "#B7BCC4",
  },
  closeButtonStyle: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    backgroundColor: "#233B6E",
    color: "#B7BCC4",
    outline: "none",
  },
  ovalIconStyle: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    fontSize: "3.5rem",
    backgroundColor: "#233B6E",
    color: "#B7BCC4",
  },
}));

export default function ResponsiveDialog(props) {
  const theme = useTheme();

  const classes = useStyles();

  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={props.openProfile}
        aria-labelledby="responsive-dialog"
      >
        <Grid container style={{ height: "100%" }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{ height: "10%" }}
          >
            <DialogTitle id="responsive-dialog-title">
              <div className={classes.titleStyle}>Course Summary</div>
            </DialogTitle>

            <IconButton
              aria-label="close"
              className={classes.closeButtonStyle}
              onClick={props.handleCloseProfile}
            >
              <CloseIcon />
            </IconButton>
          </Grid>

          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{ height: "15%" }}
          >
            <Avatar alt="User Name" className={classes.ovalIconStyle}>
              <Grow in={true} timeout={2500}>
                <div>
                  {props.firstInitial}
                  {props.secondInitial}
                </div>
              </Grow>
            </Avatar>
          </Grid>

          <Grid
            container
            direction="column"
            alignItems="center"
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <DialogTitle>
              <div className={classes.subTitleStyle}>Maximum Grade</div>
            </DialogTitle>

            <StaticNumber computedValue={props.maximumNum} />

            <ListComponent courseDetailsList={props.maximumList} />
          </Grid>

          <Grid
            container
            direction="column"
            alignItems="center"
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <DialogTitle>
              <div className={classes.subTitleStyle}>Minimum Grade</div>
            </DialogTitle>

            <StaticNumber computedValue={props.minimumNum} />

            <ListComponent courseDetailsList={props.minimumList} />
          </Grid>

          <Grid
            container
            direction="column"
            alignItems="center"
            xs={12}
            sm={4}
            md={4}
            lg={4}
            xl={4}
          >
            <DialogTitle>
              <div className={classes.subTitleStyle}>Average Grade</div>
            </DialogTitle>

            <StaticNumber computedValue={props.averageNum} />

            <ListAverageComponent
              feedbackColorGreen={props.feedbackColorGreen}
              feedbackColorOrange={props.feedbackColorOrange}
              feedbackColorRed={props.feedbackColorRed}
            />
          </Grid>
        </Grid>
      </Dialog>
    </React.Fragment>
  );
}
