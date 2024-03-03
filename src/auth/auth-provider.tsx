import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { User } from "../types/user";
import { Tokens } from "../types/tokens";
import { useFetchBase } from "../api/use-fetch-base";
import { AuthActionsContext, AuthContext, AuthTokensContext, TokensInfo } from "./auth-context";
import Cookies from "js-cookie";
import { AUTH_ME_URL } from "../api/config";
import { HTTP_CODES_ENUM } from "../types/http-codes";

export function AuthProvider(props: PropsWithChildren<object>) {
  const AUTH_TOKEN_KEY = "auth-token-data";
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const tokensInfoRef = useRef<Tokens>({
    accessToken: null,
    refreshToken: null,
  });
  const fetchBase = useFetchBase();

  const setTokensInfoRef = useCallback((tokens: TokensInfo) => {
    tokensInfoRef.current = tokens ?? {
      accessToken: null,
      refreshToken: null,
    };
  }, []);

  const setTokensInfo = useCallback(
    (tokensInfo: TokensInfo) => {
      setTokensInfoRef(tokensInfo);

      if (tokensInfo) {
        Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(tokensInfo));
      } else {
        Cookies.remove(AUTH_TOKEN_KEY);
        setUser(null);
      }
    },
    [setTokensInfoRef]
  );

  const logOut = useCallback(() => {
    setTokensInfo(null);
  }, [setTokensInfo]);

  const loadData = useCallback(async () => {
    const tokens = JSON.parse(
      Cookies.get(AUTH_TOKEN_KEY) ?? "null"
    ) as TokensInfo;

    setTokensInfoRef(tokens);

    try {
      if (tokens?.accessToken) {
        const response = await fetchBase(
          AUTH_ME_URL,
          {
            method: "GET",
          },
          {
            accessToken: tokensInfoRef.current.accessToken,
            refreshToken: tokensInfoRef.current.refreshToken,
            setTokensInfo,
          }
        );

        if (response.status === HTTP_CODES_ENUM.UNAUTHORIZED) {
          logOut();
          return;
        }

        const data = await response.json();
        setUser(data);
      }
    } catch {
      logOut();
    } finally {
      setIsLoaded(true);
    }
  }, [fetchBase, logOut, setTokensInfoRef, setTokensInfo]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
    }),
    [isLoaded, user]
  );

  const contextActionsValue = useMemo(
    () => ({
      setUser,
      logOut,
    }),
    [logOut]
  );

  const contextTokensValue = useMemo(
    () => ({
      tokensInfoRef,
      setTokensInfo,
    }),
    [setTokensInfo]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthActionsContext.Provider value={contextActionsValue}>
        <AuthTokensContext.Provider value={contextTokensValue}>
          {props.children}
        </AuthTokensContext.Provider>
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  )
}
