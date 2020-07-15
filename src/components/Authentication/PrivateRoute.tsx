import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthStatus } from "./useAuthStatus";

export function PrivateRoute({ children, ...rest }: RouteProps) {
  const [isAuthenticated] = useAuthStatus();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/log-in",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
