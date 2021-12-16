import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: "black",
    padding: "10px",
  },
  link: {
    textDecoration: "none",
  },
  title: {
    cursor: "pointer",
    color: "white",
  },
}));

const AppNavigator = () => {
  const classes = useStyle();
  return (
    <AppBar className={classes.AppBar} position="fixed">
      <Toolbar>
        <Link to="/" className={classes.link}>
          <Typography className={classes.title} variant="h6">
            Pokedex
          </Typography>
        </Link>
        <Link to="/favorites" className={classes.link}>
          <Typography
            className={classes.title}
            variant="h6"
            style={{ marginLeft: 15 }}
          >
            Favorites
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavigator;
