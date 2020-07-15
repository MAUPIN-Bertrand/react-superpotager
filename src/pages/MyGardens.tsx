import React, { ReactElement } from "react";
import { loader } from "graphql.macro";
import { useQuery } from "react-apollo";
import { LinearProgress } from "@material-ui/core";
import { useAuthStatus } from "../components/Authentication/useAuthStatus";
import Container from "@material-ui/core/Container";
import { UserGardensPreview } from "../components/UserGardensPreview";

interface Props {}

type Garden = {
  id: string;
  width: number;
  height: number;
};

const query = loader("../graphql/mygardens.graphql");

function MyGardens(props: Props): ReactElement {
  const [user] = useAuthStatus();
  const { loading, error, data, refetch } = useQuery(query);
  if (loading) return <LinearProgress variant='query' />;
  if (error) return <React.Fragment>{error}</React.Fragment>;
  return (
    <Container>
      {user && user.id && data.mygardens && (
        <UserGardensPreview
          gardens={data.mygardens}
          refetch={refetch}
          owner={user.id}
        />
      )}
    </Container>
  );
}

export default MyGardens;
