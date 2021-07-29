import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
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

export default function PasswordField(props) {
  const classes = useStyles();

  return (
    <TextField
      autoComplete="current-password"
      variant="outlined"
      margin="normal"
      fullWidth
      type={props.showPassword ? "text" : "password"}
      id="userPassword"
      name="userPassword"
      label="Password"
      className={classes.fieldStyle}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={props.handleShowPassword}
              onMouseDown={props.handleMouseDownPassword}
            >
              {props.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
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
