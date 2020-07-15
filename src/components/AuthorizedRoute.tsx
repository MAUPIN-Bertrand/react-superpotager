import React from "react";
import { Redirect, RouteProps, Route } from "react-router-dom";
import { useAuthorized } from "../hooks/useAuthorized";
import { RolesEnum } from "../generated/graphql";
import { Routes } from "../pages/Routes.enum";

interface Props extends RouteProps {
  roles: RolesEnum[];
}

export function AuthorizedRoute({ roles, children, ...rest }: Props) {
  const isAuthorized = useAuthorized(roles);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: Routes.Home,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
