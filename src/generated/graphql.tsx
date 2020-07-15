import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddPlantingInput = {
  gardenID: Scalars['String'];
  plantID: Scalars['String'];
  xPosition: Scalars['Int'];
  yPosition: Scalars['Int'];
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type ChangeInfosInput = {
  userId: Scalars['ID'];
  tagLine: Scalars['String'];
};

export type ChangeRolesInput = {
  userId: Scalars['ID'];
  roles: Array<RolesEnum>;
};

export type CreateGardenInput = {
  width: Scalars['Int'];
  height: Scalars['Int'];
  owner: Scalars['String'];
};

export type CreatePlantInput = {
  name: Scalars['String'];
  icon: Scalars['String'];
};

export type Garden = {
  __typename?: 'Garden';
  id: Scalars['ID'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  owner: User;
  plantings: Array<Planting>;
};

export type LogInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ModifyGardenInput = {
  id: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type ModifyPlantingInput = {
  gardenID: Scalars['String'];
  plantingID: Scalars['String'];
  xPosition: Scalars['Int'];
  yPosition: Scalars['Int'];
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeUserInfos: User;
  changeUserRoles: User;
  deleteUser: Scalars['Boolean'];
  createGarden: Garden;
  modifyGarden: Garden;
  deleteGarden: Scalars['Boolean'];
  addPlanting: Garden;
  modifyPlanting: Garden;
  removePlanting: Garden;
  createPlant: Plant;
  deletePlant: Scalars['Boolean'];
  login: User;
  signup: User;
};


export type MutationChangeUserInfosArgs = {
  changeInfosInput: ChangeInfosInput;
};


export type MutationChangeUserRolesArgs = {
  changeRolesInput: ChangeRolesInput;
};


export type MutationDeleteUserArgs = {
  userToDeleteID: Scalars['ID'];
};


export type MutationCreateGardenArgs = {
  createGardenInput: CreateGardenInput;
};


export type MutationModifyGardenArgs = {
  modifyGardenInput: ModifyGardenInput;
};


export type MutationDeleteGardenArgs = {
  gardenId: Scalars['String'];
};


export type MutationAddPlantingArgs = {
  addPlantingInput: AddPlantingInput;
};


export type MutationModifyPlantingArgs = {
  modifyPlantingInput: ModifyPlantingInput;
};


export type MutationRemovePlantingArgs = {
  removePlantingInput: RemovePlantingInput;
};


export type MutationCreatePlantArgs = {
  createPlantInput: CreatePlantInput;
};


export type MutationDeletePlantArgs = {
  plantId: Scalars['String'];
};


export type MutationLoginArgs = {
  loginInput: LogInInput;
};


export type MutationSignupArgs = {
  signUpInput: SignUpInput;
};

export type Plant = {
  __typename?: 'Plant';
  id: Scalars['ID'];
  name: Scalars['String'];
  icon: Scalars['String'];
};

export type Planting = {
  __typename?: 'Planting';
  id: Scalars['ID'];
  plantId: Scalars['ID'];
  icon: Scalars['String'];
  xPosition: Scalars['Int'];
  yPosition: Scalars['Int'];
  width: Scalars['Int'];
  height: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  user: User;
  mygardens: Array<Garden>;
  garden: Garden;
  plant: Plant;
  plants: Array<Plant>;
  whoami: User;
  logout: Scalars['Boolean'];
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};


export type QueryGardenArgs = {
  gardenId: Scalars['String'];
};


export type QueryPlantArgs = {
  plantId: Scalars['String'];
};

export type RemovePlantingInput = {
  gardenID: Scalars['String'];
  plantingIndex: Scalars['Int'];
};

export enum RolesEnum {
  Owner = 'OWNER',
  User = 'USER',
  Admin = 'ADMIN'
}

export type SignUpInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  roles: Array<RolesEnum>;
  username: Scalars['String'];
  tagLine?: Maybe<Scalars['String']>;
  gardens: Array<Garden>;
};

export type AddPlantingMutationVariables = {
  gardenID: Scalars['String'];
  plantID: Scalars['String'];
  xPosition: Scalars['Int'];
  yPosition: Scalars['Int'];
  width: Scalars['Int'];
  height: Scalars['Int'];
};


export type AddPlantingMutation = (
  { __typename?: 'Mutation' }
  & { addPlanting: (
    { __typename?: 'Garden' }
    & Pick<Garden, 'id'>
  ) }
);

export type Unnamed_1_MutationVariables = {
  owner: Scalars['ID'];
  tagLine: Scalars['String'];
};


export type Unnamed_1_Mutation = (
  { __typename?: 'Mutation' }
  & { changeUserInfos: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'tagLine'>
  ) }
);

export type ChangeUserRolesMutationVariables = {
  userId: Scalars['ID'];
  roles: Array<RolesEnum>;
};


export type ChangeUserRolesMutation = (
  { __typename?: 'Mutation' }
  & { changeUserRoles: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'roles'>
  ) }
);

export type Unnamed_2_MutationVariables = {
  owner: Scalars['String'];
};


export type Unnamed_2_Mutation = (
  { __typename?: 'Mutation' }
  & { createGarden: (
    { __typename?: 'Garden' }
    & Pick<Garden, 'id'>
  ) }
);

export type Unnamed_3_MutationVariables = {
  name: Scalars['String'];
  icon: Scalars['String'];
};


export type Unnamed_3_Mutation = (
  { __typename?: 'Mutation' }
  & { createPlant: (
    { __typename?: 'Plant' }
    & Pick<Plant, 'id' | 'name' | 'icon'>
  ) }
);

export type Unnamed_4_MutationVariables = {
  gardenID: Scalars['String'];
};


export type Unnamed_4_Mutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteGarden'>
);

export type Unnamed_5_MutationVariables = {
  plantID: Scalars['String'];
};


export type Unnamed_5_Mutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePlant'>
);

export type DeleteUserMutationVariables = {
  userID: Scalars['ID'];
};


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type Unnamed_6_QueryVariables = {
  gardenId: Scalars['String'];
};


export type Unnamed_6_Query = (
  { __typename?: 'Query' }
  & { garden: (
    { __typename?: 'Garden' }
    & Pick<Garden, 'id' | 'width' | 'height'>
    & { plantings: Array<(
      { __typename?: 'Planting' }
      & Pick<Planting, 'id' | 'icon' | 'plantId' | 'xPosition' | 'yPosition' | 'width' | 'height'>
    )> }
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'tagLine'>
  ) }
);

export type LogoutQueryVariables = {};


export type LogoutQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'logout'>
);

export type Unnamed_7_MutationVariables = {
  gardenId: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
};


export type Unnamed_7_Mutation = (
  { __typename?: 'Mutation' }
  & { modifyGarden: (
    { __typename?: 'Garden' }
    & Pick<Garden, 'id' | 'width' | 'height'>
  ) }
);

export type ModifyPlantingMutationVariables = {
  gardenID: Scalars['String'];
  plantingID: Scalars['String'];
  xPosition: Scalars['Int'];
  yPosition: Scalars['Int'];
  width: Scalars['Int'];
  height: Scalars['Int'];
};


export type ModifyPlantingMutation = (
  { __typename?: 'Mutation' }
  & { modifyPlanting: (
    { __typename?: 'Garden' }
    & Pick<Garden, 'id'>
  ) }
);

export type Unnamed_8_QueryVariables = {};


export type Unnamed_8_Query = (
  { __typename?: 'Query' }
  & { mygardens: Array<(
    { __typename?: 'Garden' }
    & Pick<Garden, 'id' | 'width' | 'height'>
  )> }
);

export type PlantsQueryVariables = {};


export type PlantsQuery = (
  { __typename?: 'Query' }
  & { plants: Array<(
    { __typename?: 'Plant' }
    & Pick<Plant, 'id' | 'name' | 'icon'>
  )> }
);

export type SignupMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type SignupMutation = (
  { __typename?: 'Mutation' }
  & { signup: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type UserQueryVariables = {
  userId: Scalars['String'];
};


export type UserQuery = (
  { __typename?: 'Query' }
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username' | 'tagLine'>
    & { gardens: Array<(
      { __typename?: 'Garden' }
      & Pick<Garden, 'id' | 'width' | 'height'>
    )> }
  ) }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username' | 'tagLine' | 'roles'>
  )> }
);

export type WhoAmIQueryVariables = {};


export type WhoAmIQuery = (
  { __typename?: 'Query' }
  & { whoami: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'tagLine' | 'roles'>
  ) }
);


export const AddPlantingDocument = gql`
    mutation addPlanting($gardenID: String!, $plantID: String!, $xPosition: Int!, $yPosition: Int!, $width: Int!, $height: Int!) {
  addPlanting(addPlantingInput: {gardenID: $gardenID, plantID: $plantID, xPosition: $xPosition, yPosition: $yPosition, width: $width, height: $height}) {
    id
  }
}
    `;
export type AddPlantingMutationFn = ApolloReactCommon.MutationFunction<AddPlantingMutation, AddPlantingMutationVariables>;

/**
 * __useAddPlantingMutation__
 *
 * To run a mutation, you first call `useAddPlantingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPlantingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPlantingMutation, { data, loading, error }] = useAddPlantingMutation({
 *   variables: {
 *      gardenID: // value for 'gardenID'
 *      plantID: // value for 'plantID'
 *      xPosition: // value for 'xPosition'
 *      yPosition: // value for 'yPosition'
 *      width: // value for 'width'
 *      height: // value for 'height'
 *   },
 * });
 */
export function useAddPlantingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddPlantingMutation, AddPlantingMutationVariables>) {
        return ApolloReactHooks.useMutation<AddPlantingMutation, AddPlantingMutationVariables>(AddPlantingDocument, baseOptions);
      }
export type AddPlantingMutationHookResult = ReturnType<typeof useAddPlantingMutation>;
export type AddPlantingMutationResult = ApolloReactCommon.MutationResult<AddPlantingMutation>;
export type AddPlantingMutationOptions = ApolloReactCommon.BaseMutationOptions<AddPlantingMutation, AddPlantingMutationVariables>;
export const ChangeUserRolesDocument = gql`
    mutation changeUserRoles($userId: ID!, $roles: [RolesEnum!]!) {
  changeUserRoles(changeRolesInput: {userId: $userId, roles: $roles}) {
    id
    roles
  }
}
    `;
export type ChangeUserRolesMutationFn = ApolloReactCommon.MutationFunction<ChangeUserRolesMutation, ChangeUserRolesMutationVariables>;

/**
 * __useChangeUserRolesMutation__
 *
 * To run a mutation, you first call `useChangeUserRolesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeUserRolesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeUserRolesMutation, { data, loading, error }] = useChangeUserRolesMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      roles: // value for 'roles'
 *   },
 * });
 */
export function useChangeUserRolesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeUserRolesMutation, ChangeUserRolesMutationVariables>) {
        return ApolloReactHooks.useMutation<ChangeUserRolesMutation, ChangeUserRolesMutationVariables>(ChangeUserRolesDocument, baseOptions);
      }
export type ChangeUserRolesMutationHookResult = ReturnType<typeof useChangeUserRolesMutation>;
export type ChangeUserRolesMutationResult = ApolloReactCommon.MutationResult<ChangeUserRolesMutation>;
export type ChangeUserRolesMutationOptions = ApolloReactCommon.BaseMutationOptions<ChangeUserRolesMutation, ChangeUserRolesMutationVariables>;
export const DeleteUserDocument = gql`
    mutation deleteUser($userID: ID!) {
  deleteUser(userToDeleteID: $userID)
}
    `;
export type DeleteUserMutationFn = ApolloReactCommon.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userID: // value for 'userID'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = ApolloReactCommon.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(loginInput: {email: $email, password: $password}) {
    id
    username
    tagLine
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    query logout {
  logout
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        return ApolloReactHooks.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, baseOptions);
      }
export function useLogoutLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, baseOptions);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutQueryResult = ApolloReactCommon.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const ModifyPlantingDocument = gql`
    mutation modifyPlanting($gardenID: String!, $plantingID: String!, $xPosition: Int!, $yPosition: Int!, $width: Int!, $height: Int!) {
  modifyPlanting(modifyPlantingInput: {gardenID: $gardenID, plantingID: $plantingID, xPosition: $xPosition, yPosition: $yPosition, width: $width, height: $height}) {
    id
  }
}
    `;
export type ModifyPlantingMutationFn = ApolloReactCommon.MutationFunction<ModifyPlantingMutation, ModifyPlantingMutationVariables>;

/**
 * __useModifyPlantingMutation__
 *
 * To run a mutation, you first call `useModifyPlantingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyPlantingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyPlantingMutation, { data, loading, error }] = useModifyPlantingMutation({
 *   variables: {
 *      gardenID: // value for 'gardenID'
 *      plantingID: // value for 'plantingID'
 *      xPosition: // value for 'xPosition'
 *      yPosition: // value for 'yPosition'
 *      width: // value for 'width'
 *      height: // value for 'height'
 *   },
 * });
 */
export function useModifyPlantingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ModifyPlantingMutation, ModifyPlantingMutationVariables>) {
        return ApolloReactHooks.useMutation<ModifyPlantingMutation, ModifyPlantingMutationVariables>(ModifyPlantingDocument, baseOptions);
      }
export type ModifyPlantingMutationHookResult = ReturnType<typeof useModifyPlantingMutation>;
export type ModifyPlantingMutationResult = ApolloReactCommon.MutationResult<ModifyPlantingMutation>;
export type ModifyPlantingMutationOptions = ApolloReactCommon.BaseMutationOptions<ModifyPlantingMutation, ModifyPlantingMutationVariables>;
export const PlantsDocument = gql`
    query plants {
  plants {
    id
    name
    icon
  }
}
    `;

/**
 * __usePlantsQuery__
 *
 * To run a query within a React component, call `usePlantsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlantsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePlantsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PlantsQuery, PlantsQueryVariables>) {
        return ApolloReactHooks.useQuery<PlantsQuery, PlantsQueryVariables>(PlantsDocument, baseOptions);
      }
export function usePlantsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PlantsQuery, PlantsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PlantsQuery, PlantsQueryVariables>(PlantsDocument, baseOptions);
        }
export type PlantsQueryHookResult = ReturnType<typeof usePlantsQuery>;
export type PlantsLazyQueryHookResult = ReturnType<typeof usePlantsLazyQuery>;
export type PlantsQueryResult = ApolloReactCommon.QueryResult<PlantsQuery, PlantsQueryVariables>;
export const SignupDocument = gql`
    mutation signup($username: String!, $password: String!, $email: String!) {
  signup(signUpInput: {email: $email, password: $password, username: $username}) {
    id
  }
}
    `;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, baseOptions);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<SignupMutation>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UserDocument = gql`
    query user($userId: String!) {
  user(userId: $userId) {
    id
    email
    username
    tagLine
    gardens {
      id
      width
      height
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query users {
  users {
    id
    email
    username
    tagLine
    roles
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const WhoAmIDocument = gql`
    query whoAmI {
  whoami {
    id
    username
    tagLine
    roles
  }
}
    `;

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a React component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAmIQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
        return ApolloReactHooks.useQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, baseOptions);
      }
export function useWhoAmILazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, baseOptions);
        }
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>;
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>;
export type WhoAmIQueryResult = ApolloReactCommon.QueryResult<WhoAmIQuery, WhoAmIQueryVariables>;

      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    