import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  textField: {
    color: "lightgrey",
  },

  title: {
    flexGrow: 1,
  },
}));

export default function AppLoginBar({
  user,
  signIn,
  signOut,
  setEmail,
  setPassword,
  email,
  password,
}) {
  const classes = useStyles();

  const onEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <form
            type="submit"
            className={classes.root}
            noValidate
            autoComplete="off"
          >
            <TextField
              
              id="standard-basic"
              type="email"
              label="email"
              onChange={onEmailChange}
              value={email}
              size="small"
            />
            <TextField
              id="standard-basic"
              type="password"
              label="password"
              onChange={onPasswordChange}
              value={password}
              size="small"
            />
          </form>
          <Button color="inherit" onClick={!user ? signIn : signOut}>
            {!user ? "Login" : "Logout"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
