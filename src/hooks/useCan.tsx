import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useCan() {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return false;
  }

  return user;
}