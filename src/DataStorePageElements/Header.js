import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ScrollTop from "../DataStoreComponents/ScrollTop.js";
import Logo from "../Pictures/Logo.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  headerStyle: {
    backgroundColor: "#233B6E",
  },
  headerIconStyle: {
    marginRight: theme.spacing(0),
  },
  titleStyle: {
    flexGrow: 1,
    color: "#B7BCC4",
  },
  iconStyle: {
    color: "#B7BCC4",
  },
  menuStyle: {
    "& .MuiMenu-paper": {
      backgroundColor: "#B7BCC4",
      color: "#233B6E",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.headerStyle}>
        <Toolbar id="back-to-top-anchor">
          <IconButton
            edge="false"
            color="inherit"
            aria-label="menu"
            className={classes.headerIconStyle}
            disabled={true}
          >
            <img src={Logo} width="45" height="45" alt="" />
          </IconButton>

          <Typography variant="h6" className={classes.titleStyle}>
            Grade Tracker
          </Typography>

          <React.Fragment>
            <IconButton
              aria-label="current-user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={props.handleMenu}
            >
              <AccountCircle className={classes.iconStyle} />
            </IconButton>

            <Menu
              id="menu-appbar"
              className={classes.menuStyle}
              anchorEl={props.anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={props.openAnchorEl}
              onClose={props.handleClose}
            >
              <MenuItem onClick={props.handleOpenProfile}>Profile</MenuItem>
              <MenuItem onClick={props.handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </React.Fragment>
        </Toolbar>
      </AppBar>

      <ScrollTop {...props} />
    </React.Fragment>
  );
}
