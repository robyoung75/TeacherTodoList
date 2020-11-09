import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Button from "@material-ui/core/Button";

import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  textField: {
    marginLeft: 20,
  },

  input: { color: "white" },

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
              label="Email"
              onChange={onEmailChange}
              value={email}
              size="small"
              className={classes.textField}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{ className: classes.input }}
            />
            <TextField
              id="standard-basic"
              type="password"
              label="Password"
              onChange={onPasswordChange}
              value={password}
              size="small"
              className={classes.textField}
              InputProps={{
                className: classes.input,
              }}
              InputLabelProps={{ className: classes.input }}
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
