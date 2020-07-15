import React, { ReactElement, useState } from "react";
import { useAuthStatus } from "./Authentication/useAuthStatus";
import { TextField, makeStyles, Theme, createStyles } from "@material-ui/core";
import { loader } from "graphql.macro";
import { useMutation } from "@apollo/react-hooks";

interface Props {
  alwaysDisplay?: boolean;
  useSecondaryTextColor?: boolean;
  userID?: string;
  tagLine?: string | null;
}

const mutation = loader("../graphql/changeUserInfos.graphql");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    notchedOutline: {
      borderColor: (useSecondaryTextColor: boolean) =>
        useSecondaryTextColor
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
    },
    input: {
      color: (useSecondaryTextColor: boolean) =>
        useSecondaryTextColor
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
      textAlign: "right",
    },
  })
);

function TagLine({
  alwaysDisplay = false,
  useSecondaryTextColor = false,
  userID,
  tagLine,
}: Props): ReactElement {
  const styleClasses = useStyles(useSecondaryTextColor);
  const [
    changeUserInfos,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(mutation);

  const [user, , , refetch] = useAuthStatus();
  let currentUserId = userID ? userID : user?.id;
  let currentTagLine = userID ? tagLine : user?.tagLine;
  const [inputValue, setInputValue] = useState(currentTagLine || "");

  const onChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
    await changeUserInfos({
      variables: { owner: currentUserId, tagLine: event.target.value },
    });
    refetch();
  };

  if (currentTagLine || alwaysDisplay) {
    if (currentTagLine && inputValue !== currentTagLine) {
      setInputValue(currentTagLine);
    }
    return (
      <TextField
        value={inputValue}
        size='small'
        margin='none'
        variant='outlined'
        InputProps={{
          classes: {
            notchedOutline: styleClasses.notchedOutline,
            input: styleClasses.input,
          },
        }}
        onChange={(event) => onChange(event)}
      />
    );
  } else {
  }
  return <React.Fragment />;
}

export default TagLine;
