import React from "react";
import Grow from "@material-ui/core/Grow";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import SignIn from "../AuthenticationPages/SignIn.js";
import SignUp from "../AuthenticationPages/SignUp.js";
import VerifyCode from "../AuthenticationPages/VerifyCode.js";
import RequestCode from "../AuthenticationPages/RequestCode.js";
import ResetPassword from "../AuthenticationPages/ResetPassword.js";
import SideImage from "../Pictures/SideImage.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${SideImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "#EFF0F4",
    backgroundSize: "contain",
    backgroundPosition: "center",
  },
  square: {
    backgroundColor: "#EFF0F4",
  },
  title: {
    margin: theme.spacing(4),
    fontSize: "2rem",
    color: "#233B6E",
    textAlign: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#B7BCC4",
  },
  subtitle: {
    color: "#233B6E",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  footertext: {
    color: "#233B6E",
  },
}));

function Copyright() {
  const classes = useStyles();

  return (
    <Typography variant="body2" align="center" className={classes.footertext}>
      {"Copyright © "} Grade Tracker {new Date().getFullYear()} {"."}
    </Typography>
  );
}

export default function AuthenticationMainPage(props) {
  const classes = useStyles();

  const AuthenticationComponent = () => {
    switch (props.authenticationFlow) {
      case "SignUp":
        return (
          <SignUp
            showGrowEffect={props.showGrowEffect}
            userAttributes={props.userAttributes}
            setUserAttributes={props.setUserAttributes}
            showValidation={props.showValidation}
            showValidationText={props.showValidationText}
            handleSignUp={props.handleSignUp}
            showSignIn={props.showSignIn}
            emailCheck={props.emailCheck}
            showPassword={props.showPassword}
            handleShowPassword={props.handleShowPassword}
            handleMouseDownPassword={props.handleMouseDownPassword}
            showMessage={props.showMessage}
            showMessageText={props.showMessageText}
          />
        );

      case "Verify":
        return (
          <VerifyCode
            showGrowEffect={props.showGrowEffect}
            userAttributes={props.userAttributes}
            setUserAttributes={props.setUserAttributes}
            showValidation={props.showValidation}
            showValidationText={props.showValidationText}
            handleVerifyCode={props.handleVerifyCode}
            showSignIn={props.showSignIn}
            showMessage={props.showMessage}
            showMessageText={props.showMessageText}
          />
        );

      case "SignIn":
        return (
          <SignIn
            showGrowEffect={props.showGrowEffect}
            startLoading={props.startLoading}
            userAttributes={props.userAttributes}
            setUserAttributes={props.setUserAttributes}
            showValidation={props.showValidation}
            showValidationText={props.showValidationText}
            handleSignIn={props.handleSignIn}
            showSignUp={props.showSignUp}
            showRequestCode={props.showResetCode}
            emailCheck={props.emailCheck}
            showPassword={props.showPassword}
            handleShowPassword={props.handleShowPassword}
            handleMouseDownPassword={props.handleMouseDownPassword}
            showMessage={props.showMessage}
            showMessageText={props.showMessageText}
          />
        );

      case "ResetCode":
        return (
          <RequestCode
            showGrowEffect={props.showGrowEffect}
            userAttributes={props.userAttributes}
            setUserAttributes={props.setUserAttributes}
            showValidation={props.showValidation}
            showValidationText={props.showValidationText}
            handleRequestCode={props.handleRequestCode}
            showSignIn={props.showSignIn}
            emailCheck={props.emailCheck}
            showMessage={props.showMessage}
            showMessageText={props.showMessageText}
          />
        );

      case "ResetPassword":
        return (
          <ResetPassword
            showGrowEffect={props.showGrowEffect}
            userAttributes={props.userAttributes}
            setUserAttributes={props.setUserAttributes}
            showValidation={props.showValidation}
            showValidationText={props.showValidationText}
            handleResetPassword={props.handleResetPassword}
            showSignIn={props.showSignIn}
            showPassword={props.showPassword}
            handleShowPassword={props.handleShowPassword}
            handleMouseDownPassword={props.handleMouseDownPassword}
            showMessage={props.showMessage}
            showMessageText={props.showMessageText}
          />
        );

      default:
        return (
          <SignIn
            showGrowEffect={props.showGrowEffect}
            startLoading={props.startLoading}
            userAttributes={props.userAttributes}
            setUserAttributes={props.setUserAttributes}
            showValidation={props.showValidation}
            showValidationText={props.showValidationText}
            handleSignIn={props.handleSignIn}
            showSignUp={props.showSignUp}
            showRequestCode={props.showResetCode}
            emailCheck={props.emailCheck}
            showPassword={props.showPassword}
            handleShowPassword={props.handleShowPassword}
            handleMouseDownPassword={props.handleMouseDownPassword}
            showMessage={props.showMessage}
            showMessageText={props.showMessageText}
          />
        );
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={false} sm={4} md={7} className={classes.image}></Grid>

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.square}
      >
        <Typography component="h1" variant="h5" className={classes.title}>
          Grade Tracker
        </Typography>

        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>

          <Grow in={true} timeout={1500}>
            <Typography
              component="h1"
              variant="h5"
              className={classes.subtitle}
            >
              {props.authenticationFlow === "SignIn"
                ? "Sign In"
                : props.authenticationFlow === "SignUp"
                ? "Sign Up"
                : props.authenticationFlow === "Verify"
                ? "Verify"
                : props.authenticationFlow === "ResetCode"
                ? "Get Verification Code"
                : props.authenticationFlow === "ResetPassword"
                ? "Create New Password"
                : ""}
            </Typography>
          </Grow>

          {AuthenticationComponent()}
        </div>

        <Box mt={5}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}
