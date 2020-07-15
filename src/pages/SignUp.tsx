import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useSignupMutation } from "../generated/graphql";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useHistory, Link } from "react-router-dom";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [signUpMutation, { error }] = useSignupMutation();
  let history = useHistory();

  const onSignUpClick = async () => {
    try {
      await signUpMutation({
        variables: {
          email,
          password,
          username,
        },
      });
      history.push("/log-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='username'
                name='username'
                variant='outlined'
                required
                fullWidth
                id='username'
                label='User Name'
                value={username}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setUsername(ev.target.value)
                }
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={email}
                onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                  setEmail(ev.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
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
            </Grid>
          </Grid>
          <Button
            onClick={onSignUpClick}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
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
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/log-in'>Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
