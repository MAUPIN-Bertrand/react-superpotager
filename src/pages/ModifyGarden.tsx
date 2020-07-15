import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { loader } from "graphql.macro";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";
import GardenPlantsEditor from "../components/GardenPlantsEditor";
import Select from "@material-ui/core/Select";
import { usePlantsQuery, useAddPlantingMutation } from "../generated/graphql";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";

import AddIcon from "@material-ui/icons/Add";
import { useCallback } from "react";
import { Tooltip } from "@material-ui/core";
import {
  Container,
  Typography,
  Box,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core";

const query = loader("../graphql/getGarden.graphql");
const mutation = loader("../graphql/modifyGarden.graphql");
const scale = 2.0;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      backgroundColor: theme.palette.primary.dark,
    },
  })
);

function ModifyGarden() {
  const classes = useStyles();
  let { id } = useParams();
  const { loading, error, data: dataQuery, refetch } = useQuery(query, {
    variables: { gardenId: id },
  });
  const [
    modifyGarden,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(mutation);

  const { data: plants } = usePlantsQuery();
  const [addPlantingMutation] = useAddPlantingMutation();
  const [plantingToAdd, setPlantingToAdd] = useState("");
  const refrechCallback = useCallback(() => {
    refetch();
  }, [refetch]);

  if (loading) return <div>"Loading..."</div>;
  if (error) return <div>`Error! ${error.message}`</div>;
  return (
    <Container>
      <Typography variant='h5' gutterBottom>
        {dataQuery.garden.id}
      </Typography>
      <Box>
        You can resize your garden, add new plant and rearrange them inside your
        garden
      </Box>
      <ResizableBox
        className={classes.box}
        width={dataQuery.garden.width}
        height={dataQuery.garden.height}
        draggableOpts={{ grid: [10, 10], scale: scale }}
        onResizeStop={async (e, data) => {
          try {
            const newWidth = Math.round(data.size.width / 10) * 10;
            const newHeight = Math.round(data.size.height / 10) * 10;
            modifyGarden({
              variables: { gardenId: id, width: newWidth, height: newHeight },
            });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <Box bgcolor='primary.main'>
          <GardenPlantsEditor
            plantings={dataQuery.garden.plantings}
            width={dataQuery.garden.width}
            height={dataQuery.garden.height}
            gardenID={dataQuery.garden.id}
            refetch={refrechCallback}
          ></GardenPlantsEditor>
        </Box>
      </ResizableBox>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error : ${mutationError.message}</p>}
      {plants && (
        <React.Fragment>
          <Tooltip
            title='Select a crop to add'
            aria-label='Select a crop to add'
          >
            <Select
              value={plantingToAdd}
              onChange={(e) => setPlantingToAdd(e.target.value as string)}
            >
              {plants?.plants.map((plant) => (
                <MenuItem key={plant.id} value={plant.id}>
                  {plant.name}
                  {plant.icon}
                </MenuItem>
              ))}
            </Select>
          </Tooltip>
          {plantingToAdd && (
            <Tooltip
              title='Add this crops to the garden'
              aria-label='Add this crops to the garden'
            >
              <IconButton
                aria-label='add'
                onClick={async () => {
                  try {
                    await addPlantingMutation({
                      variables: {
                        gardenID: id,
                        plantID: plantingToAdd,
                        height: 5,
                        width: 5,
                        xPosition: 0,
                        yPosition: 0,
                      },
                    });
                    refrechCallback();
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
        </React.Fragment>
      )}
    </Container>
  );
}

ModifyGarden.propTypes = {};

export default ModifyGarden;
