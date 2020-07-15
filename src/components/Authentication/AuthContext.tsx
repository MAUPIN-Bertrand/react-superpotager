import React, { createContext, ReactNode, useReducer } from "react";
import { authReducer } from "./AuthReducer";
import { ApolloError } from "apollo-client";
import { QueryResult } from "react-apollo";
import { useWhoAmIQuery, RolesEnum } from "../../generated/graphql";

export type CurrentUserData = {
  id?: string;
  username?: string;
  tagLine?: string | null;
  roles?: RolesEnum[];
};
export type AuthContextState = {
  user?: CurrentUserData;
  query?: QueryResult;
};
export const authContextDefaultState: AuthContextState = {};

export enum AuthActionType {
  Login = "LOGIN",
  Logout = "LOGOUT",
  Refresh = "REFRESH",
  Update = "UPDATE",
}
export type AuthActionPayload = {
  user?: CurrentUserData;
  callback?: () => void;
  loading?: boolean;
  error?: ApolloError;
  data?: any;
};

export type AuthAction = {
  type: AuthActionType;
  payload?: AuthActionPayload;
};

export type AuthContextData = {
  state: AuthContextState;
  dispatchAuthContext: React.Dispatch<AuthAction>;
};

const authContextDefaultData: AuthContextData = {
  state: authContextDefaultState,
  dispatchAuthContext: () => null,
};

export const AuthContext = createContext<AuthContextData>(
  authContextDefaultData
);

type AuthProviderProps = {
  children: ReactNode;
};
const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const whoAmIQueryResult = useWhoAmIQuery({
    onCompleted: (data) => {
      authContextData.dispatchAuthContext({
        type: AuthActionType.Update,
        payload: {
          user: {
            id: data.whoami.id,
            username: data.whoami.username,
            tagLine: data.whoami.tagLine,
            roles: data.whoami.roles,
          },
        },
      });
    },
    onError: (error) => {
      authContextData.dispatchAuthContext({
        type: AuthActionType.Update,
      });
    },
    displayName: "whoami query",

    notifyOnNetworkStatusChange: true,
  });

  const [contextState, dispatchContext] = useReducer(authReducer, {
    ...authContextDefaultState,
    query: whoAmIQueryResult,
  });

  const authContextData: AuthContextData = {
    state: contextState,
    dispatchAuthContext: dispatchContext,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
