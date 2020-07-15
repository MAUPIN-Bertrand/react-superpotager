import React, { ReactElement } from "react";
import { RolesEnum, useChangeUserRolesMutation } from "../generated/graphql";
import { InputLabel, Select, FormControl } from "@material-ui/core";

interface Props {
  userID: string;
  roles: RolesEnum[];
  refetch: () => void;
}

export default function RolesEditor({
  userID,
  roles,
  refetch,
}: Props): ReactElement {
  const [changeUserRolesMutation] = useChangeUserRolesMutation();

  const handleChangeMultiple = async (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const { options } = event.target as HTMLSelectElement;
    const value: RolesEnum[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value as RolesEnum);
      }
    }
    console.log(options);
    try {
      await changeUserRolesMutation({
        variables: { userId: userID, roles: value },
      });
      refetch();
    } catch (error) {}

    // setPersonName(value);
  };

  const allRoles = Object.values(RolesEnum).filter(
    (value) => value !== RolesEnum.Owner
  );

  return (
    <FormControl>
      <InputLabel shrink htmlFor='select-multiple-native'>
        Roles
      </InputLabel>
      <Select
        multiple
        native
        value={roles}
        onChange={handleChangeMultiple}
        inputProps={{
          id: "select-multiple-native",
        }}
      >
        {allRoles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
