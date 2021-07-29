import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  linkStyle: {
    color: "#233B6E",
  },
}));

export default function PageLink(props) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs />

      <Grid item>
        <Link
          href="#"
          variant="body2"
          onClick={props.currentAuthenticationStage}
          className={classes.linkStyle}
        >
          {props.currentAuthenticationStageText}
        </Link>
      </Grid>
    </Grid>
  );
}
