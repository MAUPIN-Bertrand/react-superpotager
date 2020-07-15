import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { useUserQuery, Garden } from "../generated/graphql";
import RequestLoadingOrError from "../components/RequestLoadingOrError";
import Container from "@material-ui/core/Container";
import { UserGardensPreview } from "../components/UserGardensPreview";

interface Props {}

export default function Gardens({}: Props): ReactElement {
  const { id: userID } = useParams();
  const { loading, error, data, refetch } = useUserQuery({
    variables: { userId: userID },
  });
  if (loading || error)
    return <RequestLoadingOrError error={error} loading={loading} />;

  return (
    <Container>
      {userID && data && data.user && data.user.gardens && (
        <UserGardensPreview
          gardens={data.user.gardens as Garden[]}
          refetch={refetch}
          owner={data.user.id}
        />
      )}
    </Container>
  );
}
