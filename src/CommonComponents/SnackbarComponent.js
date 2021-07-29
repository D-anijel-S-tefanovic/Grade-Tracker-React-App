import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  snackbarStyle: {
    backgroundColor: "#233B6E",
    color: "#B7BCC4",
  },
}));

export default function SnackbarComponent(props) {
  const classes = useStyles();

  return (
    <Snackbar
      open={props.showMessage}
      ContentProps={{
        className: classes.snackbarStyle,
      }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={2500}
      message={props.showMessageText}
    />
  );
}
