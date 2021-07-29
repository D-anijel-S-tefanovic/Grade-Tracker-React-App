import React from "react";
import Grow from "@material-ui/core/Grow";
import CodeField from "../AuthenticationComponents/CodeField.js";
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

export default function VerifyCode(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grow in={props.showGrowEffect} timeout={1500}>
        <form className={classes.formStyle}>
          <CodeField
            turnFocusOn={true}
            userAttributes={props.userAttributes.userCode}
            setUserAttributes={props.setUserAttributes}
            showValidation={props.showValidation.userCodeValidation}
            showValidationText={props.showValidationText.userCodeValidationText}
          />

          <ButtonComponent
            currentButtonName="Verify Account"
            currentButtonFunction={props.handleVerifyCode}
          />

          <PageLink
            currentAuthenticationStage={props.showSignIn}
            currentAuthenticationStageText="Account Verified? Sign In!"
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
