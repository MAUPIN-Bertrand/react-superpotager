import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
export function GardenPreview(props) {
  return (
    <div>
      <div>{props.id}</div>
      <div>{props.width}</div>
      <div>{props.height}</div>
      <Link b
        component={RouterLink}
        to={() => `/modify-garden/${props.id}`}
        color='textPrimary'
      >
        Modify
      </Link>
    </div>
  );
}
