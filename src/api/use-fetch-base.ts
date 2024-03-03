import { useCallback } from "react";
import { FetchInitType, FetchInputType } from "../types/fetch-params";
import { Tokens } from "../types/tokens";
import { TokensInfo } from "../auth/auth-context";

export function useFetchBase() {
  return useCallback(
    async (
      input: FetchInputType,
      init?: FetchInitType,
      tokens?: Tokens & {
        setTokensInfo?: (tokensInfo: TokensInfo) => void;
      }
    ) => {
      let headers: HeadersInit = {};

      if (!(init?.body instanceof FormData)) {
        headers = {
          ...headers,
          'Content-Type': 'application/json',
        };
      }

      if (tokens?.accessToken) {
        headers = {
          ...headers,
          Authorization: `Bearer ${tokens.accessToken}`,
        };
      }

      return fetch(input, {
        ...init,
        headers: {
          ...headers,
          ...init?.headers,
        },
      });
    }, []
  );
}