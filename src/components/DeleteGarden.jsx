import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { loader } from "graphql.macro";
import PropTypes from "prop-types";
import { Container, IconButton, Tooltip } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

const mutation = loader("../graphql/deleteGarden.graphql");

export default function DeleteGarden(props) {
  const [
    deleteGarden,
    { data, loading: mutationLoading, error: mutationError },
  ] = useMutation(mutation);
  return (
    <Container>
      <Tooltip title='Delete the garden' aria-label='Delete the garden'>
        <IconButton
          aria-label='delete'
          onClick={async (e) => {
            e.preventDefault();
            try {
              await deleteGarden({ variables: { gardenID: props.gardenID } });
              if (props.onDelete) props.onDelete();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </Container>
  );
}

DeleteGarden.defaultProps = {
  gardenID: "default ID",
};

DeleteGarden.propTypes = {
  gardenID: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};
