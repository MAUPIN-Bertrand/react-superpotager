import React, { ReactElement } from "react";
import { LinkProps, Link } from "react-router-dom";
import { useAuthStatus } from "./useAuthStatus";

export default function PrivateLink(props: LinkProps): ReactElement | null {
  const [isAuthenticated] = useAuthStatus();
  if (isAuthenticated) {
    return <Link {...props} />;
  } else return null;
}
