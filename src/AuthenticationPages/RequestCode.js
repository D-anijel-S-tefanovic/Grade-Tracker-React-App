import React from "react";
import Grow from "@material-ui/core/Grow";
import EmailField from "../AuthenticationComponents/EmailField.js";
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

export default function RequestCode(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
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

          <ButtonComponent
            currentButtonName="Request Code"
            currentButtonFunction={props.handleRequestCode}
          />

          <PageLink
            currentAuthenticationStage={props.showSignIn}
            currentAuthenticationStageText="Found Out Your Password? Go Back To Sign In!"
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
