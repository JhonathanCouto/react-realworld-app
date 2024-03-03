import { useContext } from "react";
import { AuthActionsContext } from "./auth-context";

export function useAuthActions() {
  return useContext(AuthActionsContext);
}