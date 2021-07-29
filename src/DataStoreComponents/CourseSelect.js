import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  selectStyle: {
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

export default function CourseSelect(props) {
  const classes = useStyles();

  return (
    <FormControl
      variant="outlined"
      className={classes.selectStyle}
      fullWidth
      error={props.showCourseValidation}
    >
      <InputLabel id="simple-select-outlined">{props.name}</InputLabel>

      <Select
        labelId="simple-select-outlined-label"
        id="simple-select-outlined"
        value={props.courseDetails}
        onChange={props.setCourseDetails}
        label={props.label}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={props.firstValue}>{props.firstValue}</MenuItem>
        <MenuItem value={props.secondValue}>{props.secondValue}</MenuItem>
        <MenuItem value={props.thirdValue}>{props.thirdValue}</MenuItem>
        <MenuItem value={props.fourthValue}>{props.fourthValue}</MenuItem>
        {props.fifthValue !== "" ? (
          <MenuItem value={props.fifthValue}>{props.fifthValue}</MenuItem>
        ) : null}
      </Select>

      <FormHelperText id="component-helper-text">
        {props.showCourseValidationText}
      </FormHelperText>
    </FormControl>
  );
}
