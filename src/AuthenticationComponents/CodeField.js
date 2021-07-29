import TextField from "@material-ui/core/TextField";
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
}));

export default function CodeField(props) {
  const classes = useStyles();

  return (
    <TextField
      autoComplete="current-code"
      variant="outlined"
      margin="normal"
      fullWidth
      type="number"
      id="userCode"
      name="userCode"
      label="User Code"
      className={classes.fieldStyle}
      autoFocus={props.turnFocusOn}
      value={props.userAttributes}
      onChange={props.setUserAttributes}
      error={props.showValidation}
      helperText={props.showValidationText}
    />
  );
}
