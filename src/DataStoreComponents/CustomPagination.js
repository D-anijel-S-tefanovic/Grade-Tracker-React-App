import Pagination from "@material-ui/lab/Pagination";
import { useGridSlotComponentProps } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  rootStyle: {
    display: "flex",
    outline: "none",
  },
}));

export default function CustomPagination() {
  const { state, apiRef } = useGridSlotComponentProps();

  const classes = useStyles();

  return (
    <Pagination
      className={classes.rootStyle}
      color="standard"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
