import { useCallback } from "react";
import { useAuthTokens } from "../auth/use-auth-tokens";
import { useFetchBase } from "./use-fetch-base";
import { FetchInitType, FetchInputType } from "../types/fetch-params";

export function useFetch() {
  const { tokensInfoRef, setTokensInfo } = useAuthTokens();
  const fetchBase = useFetchBase();

  const fetchWrapper = useCallback(
    async (input: FetchInputType, init?: FetchInitType) => {
      return fetchBase(input, init, {
        accessToken: tokensInfoRef.current?.accessToken,
        refreshToken: tokensInfoRef.current?.refreshToken,
        setTokensInfo,
      });
    },
    [fetchBase, setTokensInfo, tokensInfoRef]
  );

  return fetchWrapper;
}
