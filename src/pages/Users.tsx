import React, { ReactElement } from "react";
import {
  Container,
  LinearProgress,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Table,
} from "@material-ui/core";
import { useUsersQuery, useDeleteUserMutation } from "../generated/graphql";
import Alert from "@material-ui/lab/Alert/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle/AlertTitle";
import TagLine from "../components/TagLine";
import DeleteIcon from "@material-ui/icons/Delete";
import RolesEditor from "../components/RolesEditor";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Routes } from "./Routes.enum";

interface Props {}

export default function Users({}: Props): ReactElement {
  const { data, loading, error, refetch } = useUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  if (loading) return <LinearProgress variant='query' />;
  if (error)
    return (
      <Alert severity='error' onClose={() => {}}>
        <AlertTitle>{error.name}</AlertTitle>
        <details>
          <summary>{error.message}</summary>
          <p>{error.extraInfo}</p>
        </details>
      </Alert>
    );
  return (
    <>
      <Container>
        <Typography variant='h3' gutterBottom>
          USERS
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Delete</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>TagLine</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Modify gardens</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data &&
                data.users &&
                data.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <IconButton
                        aria-label='delete'
                        onClick={async () => {
                          try {
                            await deleteUser({
                              variables: {
                                userID: user.id,
                              },
                            });
                            refetch();
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <TagLine
                        userID={user.id}
                        tagLine={user.tagLine}
                        alwaysDisplay
                      />
                    </TableCell>
                    <TableCell>
                      <RolesEditor
                        userID={user.id}
                        roles={user.roles}
                        refetch={refetch}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        color='primary'
                        component={Link}
                        to={Routes.Gardens.replace(":id", user.id)}
                      >
                        See gardens
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
