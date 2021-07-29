import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { lighten } from "@material-ui/core/styles";
import clsx from "clsx";

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    rootStyle: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlightStyle:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.86),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    titleStyle: {
      flex: "1 1 100%",
    },
  }),
  { defaultTheme }
);

export default function EnhancedTableToolbar(props) {
  const classes = useStyles();

  const { selectionModel, handleDeleteCourse } = props;

  return (
    <Toolbar
      className={clsx(classes.rootStyle, {
        [classes.highlightStyle]: selectionModel.length > 0,
      })}
    >
      {selectionModel.length > 0 ? (
        <Typography
          className={classes.titleStyle}
          color="inherit"
          variant="subtitle1"
          component="div"
        />
      ) : (
        <GridToolbarContainer>
          <GridToolbarExport />
        </GridToolbarContainer>
      )}

      {selectionModel.length > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={handleDeleteCourse}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}
