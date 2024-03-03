import { HTTP_CODES_ENUM } from "./http-codes";

export type FetchJsonResponse<T> =
  | { status: HTTP_CODES_ENUM.OK | HTTP_CODES_ENUM.CREATED; data: T }
  | { status: HTTP_CODES_ENUM.NO_CONTENT; data: undefined }
  | {
      status:
        | HTTP_CODES_ENUM.INTERNAL_SERVER_ERROR
        | HTTP_CODES_ENUM.SERVICE_UNAVAILABLE;
      data: undefined;
    }
  | {
      status:
        | HTTP_CODES_ENUM.BAD_REQUEST
        | HTTP_CODES_ENUM.UNAUTHORIZED
        | HTTP_CODES_ENUM.FORBIDDEN
        | HTTP_CODES_ENUM.NOT_FOUND
        | HTTP_CODES_ENUM.UNPROCESSABLE_ENTITY
        | HTTP_CODES_ENUM.INTERNAL_SERVER_ERROR
        | HTTP_CODES_ENUM.SERVICE_UNAVAILABLE
        | HTTP_CODES_ENUM.GATEWAY_TIMEOUT;
      data: string;
    };
