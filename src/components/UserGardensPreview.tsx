import React, { ReactElement } from "react";
import CreateGarden from "./CreateGarden";
import DeleteGarden from "./DeleteGarden";
import {
  Typography,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Box,
  Table,
} from "@material-ui/core";
import { Garden } from "../generated/graphql";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

interface Props {
  gardens: Garden[];
  refetch: () => void;
  owner: string;
}

export function UserGardensPreview({
  gardens,
  refetch,
  owner,
}: Props): ReactElement {
  return (
    <>
      <Typography variant='h5' gutterBottom>
        Gardens:
      </Typography>

      {gardens.length ? (
        <Box>
          Manage your gardens here, you can create, delete or access gardens
          from this page
        </Box>
      ) : (
        <Box>First add a new garden</Box>
      )}

      {gardens.length !== 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Width</TableCell>
                <TableCell>Height</TableCell>
                <TableCell>Modify</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {gardens.map((garden) => (
                <TableRow key={garden.id}>
                  <TableCell>{garden.id}</TableCell>
                  <TableCell>{garden.width}</TableCell>
                  <TableCell>{garden.height}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={() => `/modify-garden/${garden.id}`}
                      color='primary'
                    >
                      Modify
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DeleteGarden gardenID={garden.id} onDelete={refetch} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box m={2} />
      <CreateGarden owner={owner} onCreate={refetch} />
    </>
  );
}
