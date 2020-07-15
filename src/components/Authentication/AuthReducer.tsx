import Cookies from "js-cookie";

import {
  AuthAction,
  AuthContextState,
  AuthActionType,
  authContextDefaultState,
  CurrentUserData,
} from "./AuthContext";

const userCookieName = "user";

export const authReducer = (
  state: AuthContextState,
  action: AuthAction
): AuthContextState => {
  try {
    switch (action.type) {
      case AuthActionType.Logout:
        if (action.payload?.callback) {
          action.payload.callback();
        }
        return { ...authContextDefaultState, query: state.query };
      case AuthActionType.Login:
        if (action.payload?.callback) {
          action.payload.callback();
        }
        return { ...state, user: action.payload?.user };
      case AuthActionType.Refresh:
        if (action.payload?.callback) {
          action.payload.callback();
        }
        if (action.payload?.loading) {
          const currentUserInCookie: CurrentUserData = Cookies.getJSON(
            userCookieName
          );
          if (currentUserInCookie) {
            return { ...state, user: currentUserInCookie };
          }
          return state;
        }
        if (action.payload?.error) {
          return { ...authContextDefaultState, query: state.query };
        }
        if (action.payload?.data) {
          return { user: action.payload?.data.whoami };
        }
        return state;
      case AuthActionType.Update:
        if (action.payload?.user) {
          Cookies.set(userCookieName, action.payload.user, {
            sameSite: "strict",
          });
          return { ...state, user: action.payload.user };
        } else {
          Cookies.remove(userCookieName);
          return { ...authContextDefaultState, query: state.query };
        }
      default:
        return state;
    }
  } catch (error) {
    console.log(error);
  }
  return state;
};
