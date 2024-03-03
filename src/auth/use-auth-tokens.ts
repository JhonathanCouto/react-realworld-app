import { useContext } from "react";
import { AuthTokensContext } from "./auth-context";

export function useAuthTokens() {
  return useContext(AuthTokensContext);
}