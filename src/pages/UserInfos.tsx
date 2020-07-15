import React, { ReactElement } from "react";
import { useAuthStatus } from "../components/Authentication/useAuthStatus";
import TagLine from "../components/TagLine";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";

export default function UserInfos(): ReactElement {
  const [user] = useAuthStatus();
  return (
    <Container>
      {user && (
        <Box>
          <Typography variant='h4' gutterBottom>
            {user.username}
          </Typography>
          <Box>
            You can change your catchphrase which is cool but mostly useless
          </Box>
          <TagLine alwaysDisplay={true}></TagLine>
        </Box>
      )}
    </Container>
  );
}
