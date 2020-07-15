import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/LogIn";
import Users from "./pages/Users";
import ModifyGarden from "./pages/ModifyGarden";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import clsx from "clsx";
import { Box, Slide, Container } from "@material-ui/core";
import { PrivateRoute } from "./components/Authentication/PrivateRoute";
import CurrentUser from "./components/CurrentUser";
import UserInfos from "./pages/UserInfos";
import MyGardens from "./pages/MyGardens";
import Plants from "./pages/Plants";
import SignUp from "./pages/SignUp";
import Copyright from "./components/Copyright";

import { NagivationOptions } from "./components/NagivationOptions";
import { Routes } from "./pages/Routes.enum";
import Gardens from "./pages/Gardens";
import { AuthorizedRoute } from "./components/AuthorizedRoute";
import { RolesEnum } from "./generated/graphql";
import { CreatorLinks } from "./components/CreatorLinks";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
    },
  })
);

function App() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerChange = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={handleDrawerChange}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Super Potager
          </Typography>
          <CurrentUser />
        </Toolbar>
      </AppBar>
      <Box className={classes.root}>
        <Slide direction='right' in={open} mountOnEnter unmountOnExit>
          <Drawer
            variant='persistent'
            classes={{
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
            }}
            open={open}
          >
            <NagivationOptions />
          </Drawer>
        </Slide>
        <Container>
          <Box m={2} />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/log-in' component={Login} />
            <Route path='/sign-up'>
              <SignUp />
            </Route>
            <AuthorizedRoute roles={[RolesEnum.Admin]} path={Routes.Users}>
              <Users />
            </AuthorizedRoute>
            <AuthorizedRoute roles={[RolesEnum.Admin]} path={Routes.Plants}>
              <Plants />
            </AuthorizedRoute>
            <PrivateRoute path={Routes.MyGardens}>
              <MyGardens />
            </PrivateRoute>
            <PrivateRoute path={Routes.UserInfos}>
              <UserInfos />
            </PrivateRoute>
            <PrivateRoute path='/modify-garden/:id'>
              <ModifyGarden />
            </PrivateRoute>
            <PrivateRoute path={Routes.Gardens}>
              <Gardens />
            </PrivateRoute>
          </Switch>
        </Container>
      </Box>
      <Box mt={5}>
        <Copyright />
        <CreatorLinks></CreatorLinks>
      </Box>
    </Box>
  );
}

export default App;
