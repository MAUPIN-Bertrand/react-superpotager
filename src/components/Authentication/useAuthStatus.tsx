import { useContext, useCallback } from "react";
import {
  AuthContext,
  CurrentUserData,
  AuthContextData,
  AuthActionType,
} from "./AuthContext";

import { ApolloError } from "apollo-client";
import { useLogoutLazyQuery } from "../../generated/graphql";

export function useAuthStatus(): [
  CurrentUserData | undefined,
  (user: CurrentUserData) => void,
  () => void,
  () => void
] {
  try {
  } catch (error) {
    console.log(error);
  }
  const authContextData: AuthContextData = useContext(AuthContext);

  const { loading, error, data, refetch } = authContextData.state.query
    ? authContextData.state.query
    : {
        loading: false,
        error: undefined,
        data: undefined,
        refetch: () => {},
      };

  const safeRefetch = useCallback(async () => {
    try {
      await refetch();
    } catch (error) {
      const errorApollo = error as ApolloError;
      if (
        errorApollo &&
        errorApollo.graphQLErrors[0].extensions?.exception?.status === 403
      ) {
        console.log(JSON.stringify(errorApollo, null, 2));
      } else {
        console.log(JSON.stringify(error, null, 2));
        throw error;
      }
    }
  }, [refetch]);

  const [callLogout] = useLogoutLazyQuery({
    onCompleted: (data) => {
      safeRefetch();
    },
    onError: (error) => {
      safeRefetch();
    },
    notifyOnNetworkStatusChange: true,
  });

  const logout = useCallback(() => {
    authContextData.dispatchAuthContext({
      type: AuthActionType.Logout,
      payload: {
        callback: () => {
          callLogout();
        },
      },
    });
  }, [authContextData, callLogout]);

  const refresh = useCallback(() => {
    authContextData.dispatchAuthContext({
      type: AuthActionType.Refresh,
      payload: { callback: () => safeRefetch(), loading, error, data },
    });
  }, [authContextData, safeRefetch, loading, error, data]);

  const login = useCallback(
    (user: CurrentUserData) => {
      authContextData.dispatchAuthContext({
        type: AuthActionType.Login,
        payload: { user: user, callback: () => safeRefetch() },
      });
    },
    [authContextData, safeRefetch]
  );

  return [authContextData.state.user, login, logout, refresh];
}
