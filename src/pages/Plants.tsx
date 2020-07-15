import React, { ReactElement, useState } from "react";
import { loader } from "graphql.macro";
import { useQuery, useMutation } from "react-apollo";
import {
  LinearProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Input,
} from "@material-ui/core";
import Picker, { IEmojiData } from "emoji-picker-react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Container from "@material-ui/core/Container";

interface Props {}

const query = loader("../graphql/plants.graphql");
const createMutation = loader("../graphql/createPlant.graphql");
const deleteMutation = loader("../graphql/deletePlant.graphql");

export default function Plants(props: Props): ReactElement {
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);
  const [plantName, setPlantName] = useState<string>("");

  const onEmojiClick = (event: any, emojiObject: IEmojiData) => {
    setChosenEmoji(emojiObject);
    if (plantName === "" && emojiObject.names.length) {
      setPlantName(emojiObject.names[0]);
    }
  };

  const { loading, error, data, refetch } = useQuery(query);
  const [addPlant] = useMutation(createMutation);
  const [deletePlant] = useMutation(deleteMutation);

  if (loading) return <LinearProgress variant='query' />;
  if (error) return <React.Fragment>{error}</React.Fragment>;
  return (
    <Container>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.plants.map((plant: any) => (
              <TableRow key={plant.id}>
                <TableCell>{plant.id}</TableCell>
                <TableCell>{plant.name}</TableCell>
                <TableCell>{plant.icon}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label='delete'
                    onClick={async () => {
                      try {
                        await deletePlant({
                          variables: {
                            plantID: plant.id,
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
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Create new plant</TableCell>
              <TableCell>
                <Input
                  value={plantName}
                  onChange={(e) => setPlantName(e.target.value)}
                ></Input>
              </TableCell>
              <TableCell>
                {chosenEmoji ? (
                  <span>You chose: {chosenEmoji.emoji}</span>
                ) : (
                  <span>No emoji Chosen</span>
                )}
              </TableCell>
              {chosenEmoji && (
                <TableCell>
                  <IconButton
                    aria-label='add'
                    onClick={async () => {
                      try {
                        await addPlant({
                          variables: {
                            name: plantName,
                            icon: chosenEmoji.emoji,
                          },
                        });
                        setChosenEmoji(null);
                        setPlantName("");
                        refetch();
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Picker disableAutoFocus onEmojiClick={onEmojiClick} />
    </Container>
  );
}
