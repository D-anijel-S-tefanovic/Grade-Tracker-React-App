import React from "react";
import Grow from "@material-ui/core/Grow";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import LoadingModal from "../CommonComponents/LoadingModal.js";
import EmailField from "../AuthenticationComponents/EmailField.js";
import PasswordField from "../AuthenticationComponents/PasswordField.js";
import ButtonComponent from "../CommonComponents/ButtonComponent.js";
import SnackbarComponent from "../CommonComponents/SnackbarComponent.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formStyle: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  linkStyle: {
    color: "#233B6E",
  },
}));

export default function SignIn(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <LoadingModal startLoading={props.startLoading} />

      <Grow in={props.showGrowEffect} timeout={1500}>
        <form className={classes.formStyle}>
          <EmailField
            turnFocusOn={true}
            userAttributes={props.userAttributes.userEmail}
            setUserAttributes={props.setUserAttributes}
            showValidation={props.showValidation.userEmailValidation}
            showValidationText={
              props.showValidationText.userEmailValidationText
            }
            emailCheck={props.emailCheck}
          />

          <PasswordField
            userAttributes={props.userAttributes.userPassword}
            setUserAttributes={props.setUserAttributes}
            showValidation={props.showValidation.userPasswordValidation}
            showValidationText={
              props.showValidationText.userPasswordValidationText
            }
            showPassword={props.showPassword}
            handleShowPassword={props.handleShowPassword}
            handleMouseDownPassword={props.handleMouseDownPassword}
          />

          <ButtonComponent
            currentButtonName="Sign In"
            currentButtonFunction={props.handleSignIn}
          />

          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                onClick={props.showRequestCode}
                className={classes.linkStyle}
              >
                {"Forgot Password?"}
              </Link>
            </Grid>

            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={props.showSignUp}
                className={classes.linkStyle}
              >
                {"Don't Have An Account? Sign Up!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grow>

      <SnackbarComponent
        showMessage={props.showMessage}
        showMessageText={props.showMessageText}
      />
    </React.Fragment>
  );
}
