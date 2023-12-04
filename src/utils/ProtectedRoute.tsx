import { useContext } from "react";
import { UserContext } from "../hooks/useAuth";

interface SomeType {
  children: any;
}
// eslint-disable-next-line react/prop-types
export default function ProtectedRoutes(obj: SomeType) {
  const { user } = useContext(UserContext);
  if (user?.auth) {
    return obj.children;
  }
  return window.location.replace("/login");
}
