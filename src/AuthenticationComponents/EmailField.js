import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fieldStyle: {
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#233B6E",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#233B6E",
    },
    "& .MuiOutlinedInput-input": {
      color: "#B7BCC4",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "#233B6E",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "#233B6E",
    },
    "& .MuiInputLabel-outlined": {
      color: "#B7BCC4",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "#233B6E",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#233B6E",
    },
  },
  formatGreen: {
    color: "green",
  },
  formatRed: {
    color: "red",
  },
}));

export default function EmailField(props) {
  const classes = useStyles();

  return (
    <TextField
      autoComplete="current-email"
      variant="outlined"
      margin="normal"
      fullWidth
      type="email"
      id="userEmail"
      name="userEmail"
      label="Email"
      className={classes.fieldStyle}
      autoFocus={props.turnFocusOn}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {props.emailCheck === "correctFormat" ? (
              <CheckCircleIcon className={classes.formatGreen} />
            ) : props.emailCheck === "incorrectFormat" ? (
              <ErrorIcon className={classes.formatRed} />
            ) : (
              ""
            )}
          </InputAdornment>
        ),
      }}
      value={props.userAttributes}
      onChange={props.setUserAttributes}
      error={props.showValidation}
      helperText={props.showValidationText}
    />
  );
}
