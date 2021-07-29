import React from "react";
import Grow from "@material-ui/core/Grow";
import NameField from "../AuthenticationComponents/NameField.js";
import EmailField from "../AuthenticationComponents/EmailField.js";
import PasswordField from "../AuthenticationComponents/PasswordField.js";
import ButtonComponent from "../CommonComponents/ButtonComponent.js";
import PageLink from "../AuthenticationComponents/PageLink.js";
import SnackbarComponent from "../CommonComponents/SnackbarComponent.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formStyle: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grow in={props.showGrowEffect} timeout={1500}>
        <form className={classes.formStyle}>
          <NameField
            id="firstName"
            name="firstName"
            label="First Name"
            turnFocusOn={true}
            userAttributes={props.userAttributes.firstName}
            setUserAttributes={props.setUserAttributes}
            showValidation={props.showValidation.firstNameValidation}
            showValidationText={
              props.showValidationText.firstNameValidationText
            }
          />

          <NameField
            id="lastName"
            name="lastName"
            label="Last Name"
            userAttributes={props.userAttributes.lastName}
            setUserAttributes={props.setUserAttributes}
            showValidation={props.showValidation.lastNameValidation}
            showValidationText={props.showValidationText.lastNameValidationText}
          />

          <EmailField
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
            currentButtonName="Sign Up"
            currentButtonFunction={props.handleSignUp}
          />

          <PageLink
            currentAuthenticationStage={props.showSignIn}
            currentAuthenticationStageText="Have An Account? Sign In!"
          />
        </form>
      </Grow>

      <SnackbarComponent
        showMessage={props.showMessage}
        showMessageText={props.showMessageText}
      />
    </React.Fragment>
  );
}
