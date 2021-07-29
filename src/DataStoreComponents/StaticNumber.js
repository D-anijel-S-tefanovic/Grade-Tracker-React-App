import { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textStyle: {
    fontSize: "2.75rem",
    color: "#233B6E",
  },
}));

export default function StaticNumber(props) {
  const classes = useStyles();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= props.computedValue
          ? props.computedValue
          : prevProgress + 1
      );
    }, 0.34);

    return () => {
      clearInterval(timer);
    };
  }, [props.computedValue]);

  return (
    <Typography variant="caption" className={classes.textStyle}>
      {" "}
      {`${Math.round(progress)}%`}{" "}
    </Typography>
  );
}
