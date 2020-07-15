import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import PropTypes from "prop-types";
import { Container, Button } from "@material-ui/core";

const mutation = loader("../graphql/createGarden.graphql");

export default function CreateGarden(props) {
  const [
    addGarden,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(mutation);
  return (
    <Container>
      <Button
        color='primary'
        variant='contained'
        onClick={async (e) => {
          e.preventDefault();
          try {
            await addGarden({ variables: { owner: props.owner } });
            if (props.onCreate) props.onCreate();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Add new Garden
      </Button>

      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </Container>
  );
}

CreateGarden.propTypes = {
  owner: PropTypes.string.isRequired,
  onCreate: PropTypes.func,
};
