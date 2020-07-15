import React, { ReactElement } from "react";
import { useAuthStatus } from "./Authentication/useAuthStatus";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import TagLine from "./TagLine";

interface Props {}

export default function CurrentUser(): ReactElement {
  const [user, , logout] = useAuthStatus();
  return (
    <React.Fragment>
      <TagLine useSecondaryTextColor={true} />
      {!user && (
        <Button color='inherit' component={Link} to='/log-in'>
          Login
        </Button>
      )}
      {user && (
        <Button
          color='inherit'
          onClick={() => {
            logout();
          }}
        >
          {user?.username}
        </Button>
      )}
    </React.Fragment>
  );
}
