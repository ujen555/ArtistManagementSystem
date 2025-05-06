import { hasRole } from "../helpers/helpers";
import { useCurrentUser } from "../hooks/useCurrentUser";

export const RoleGuard = ({ roles, children }) => {
    const {data:currentUser}=useCurrentUser();
    return hasRole(currentUser, roles) ? children : null;
};