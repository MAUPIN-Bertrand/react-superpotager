import { RolesEnum } from "../generated/graphql";
import { useAuthStatus } from "../components/Authentication/useAuthStatus";

export function useAuthorized(allowedRoles: RolesEnum[]): Boolean {
  let isAuthorized: Boolean = false;
  const [user] = useAuthStatus();
  if (user && user.roles) {
    let intersection = user.roles.filter((x) => allowedRoles.includes(x));
    isAuthorized = intersection.length > 0;
  }
  return isAuthorized;
}
