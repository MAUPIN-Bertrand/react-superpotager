import React, { ReactElement } from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function Copyright(): ReactElement {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {"Copyright © "}
      <Link color='inherit' href='https://material-ui.com/'>
        Super Potager
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
