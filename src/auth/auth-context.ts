import { MutableRefObject, createContext } from "react";
import { Tokens } from "../types/tokens";
import { User } from "../types/user";

export type TokensInfo = Tokens | null;

export const AuthContext = createContext<{
  user: User | null;
  isLoaded: boolean;
}>({
  user: null,
  isLoaded: true,
});

export const AuthActionsContext = createContext<{
  setUser: (user: User) => void;
  logOut: () => void;
}>({
  setUser: () => {},
  logOut: () => {},
});

export const AuthTokensContext = createContext<{
  tokensInfoRef: MutableRefObject<Tokens>;
  setTokensInfo: (tokensInfo: TokensInfo) => void;
}>({
  tokensInfoRef: {
    current: {
      accessToken: null,
      refreshToken: null,
    },
  },
  setTokensInfo: () => {},
});