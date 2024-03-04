import { useCallback } from "react";
import { Tokens } from "../../types/tokens";
import { User } from "../../types/user";
import { useFetchBase } from "../use-fetch-base";
import { API_URL } from "../config";
import { wrapperFetchJsonResponse } from "../wrapper-fetch-json-response";
import { RequestConfigType } from "./types/request-config";
import { useFetch } from "../use-fetch";

export type AuthLoginRequest = {
  email: string;
  password: string;
};

export type AuthLoginResponse = Tokens & {
  user: User;
};

export function useAuthLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthLoginRequest) => {
      return fetchBase(`${API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse<AuthLoginResponse>);
    },
    [fetchBase]
  );
}

export type AuthRegisterRequest = {
  email: string;
  password: string;
};

export type AuthRegisterResponse = { message: string };

export function useAuthRegisterService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data: AuthRegisterRequest, requestConfig?: RequestConfigType) => {
      return fetchBase(`${API_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AuthRegisterResponse>);
    },
    [fetchBase]
  );
}

export type AuthPatchMeRequest = Pick<
  User,
  "bio" | "email" | "image" | "username"
>;

export type AuthPatchMeResponse = User;

export function useAuthPatchMeService() {
  const fetch = useFetch();

  return useCallback(
    (data: AuthPatchMeRequest, requestConfig?: RequestConfigType) => {
      return fetch(`${API_URL}/auth/me`, {
        method: "PATCH",
        body: JSON.stringify(data),
        ...requestConfig,
      }).then(wrapperFetchJsonResponse<AuthPatchMeResponse>);
    },
    [fetch]
  );
}
