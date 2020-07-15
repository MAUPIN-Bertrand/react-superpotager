import React, { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useAuthStatus } from "../components/Authentication/useAuthStatus";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import { useLoginMutation } from "../generated/graphql";

import { Alert, AlertTitle } from "@material-ui/lab";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  let history = useHistory();
  let location = useLocation<{ from: { pathname: string } }>();
  const classes = useStyles();

  let { from } = location.state || { from: { pathname: "/" } };
  const [user, loginUpdate, , refresh] = useAuthStatus();

  const [login, { error }] = useLoginMutation({
    onError: (error) => {
      console.log("onError", error);
    },
    onCompleted: (data) => {
      loginUpdate(data.login);
    },
    errorPolicy: "all",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogInClick = async () => {
    try {
      await login({
        variables: { email: email, password: password },
      });
      history.replace(from);
    } catch (error) {
      console.log(error);
      refresh();
    }
  };

  useEffect(() => {
    if (user) {
      history.replace(from);
    }
  }, [user, history, from]);

  if (user) {
    return <div>{user.username}</div>;
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setEmail(ev.target.value)
            }
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            value={password}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
              setPassword(ev.target.value)
            }
          />
          <Button
            onClick={onLogInClick}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          {error && (
            <Alert severity='error' onClose={() => {}}>
              <AlertTitle>{error.name}</AlertTitle>
              <details>
                <summary>{error.message}</summary>
                <p>{error.extraInfo}</p>
              </details>
            </Alert>
          )}
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to='sign-up'>{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
