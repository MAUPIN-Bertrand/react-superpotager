import React, { ReactElement } from "react";
import { List, ListItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useAuthStatus } from "./Authentication/useAuthStatus";
import { useAuthorized } from "../hooks/useAuthorized";
import { RolesEnum } from "../generated/graphql";
import { Routes } from "../pages/Routes.enum";

interface Props {}

export function NagivationOptions(props: Props): ReactElement {
  const [isAuthenticated] = useAuthStatus();
  const isAdmin = useAuthorized([RolesEnum.Admin]);
  return (
    <List>
      <ListItem button component={Link} to='/'>
        Home
      </ListItem>
      {!isAuthenticated && (
        <>
          <ListItem button component={Link} to='/log-in'>
            Login
          </ListItem>
          <ListItem button component={Link} to='/sign-up'>
            SignUp
          </ListItem>
        </>
      )}
      {isAuthenticated && (
        <>
          <ListItem button component={Link} to={Routes.UserInfos}>
            User Infos
          </ListItem>
          <ListItem button component={Link} to={Routes.MyGardens}>
            My Gardens
          </ListItem>
        </>
      )}
      {isAdmin && (
        <>
          <ListItem button component={Link} to={Routes.Users}>
            Users
          </ListItem>
          <ListItem button component={Link} to={Routes.Plants}>
            Plants
          </ListItem>
        </>
      )}
    </List>
  );
}
