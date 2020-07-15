import React, { ReactElement } from "react";
import { ApolloError } from "apollo-client";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";

interface Props {
  loading: boolean;
  error?: ApolloError;
}

export default function RequestLoadingOrError({
  loading,
  error,
}: Props): ReactElement {
  if (loading)
    return (
      <Container>
        <LinearProgress variant='query' />
      </Container>
    );
  if (error) return <Container>{error}</Container>;
  return <Container>This should not be visible</Container>;
}
