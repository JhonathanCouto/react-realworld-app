import { useCallback } from "react";
import { useFetchBase } from "../use-fetch-base";
import { API_URL } from "../config";
import { wrapperFetchJsonResponse } from "../wrapper-fetch-json-response";

export type TagsResponse = string[];

export function useGetTagsService() {
  const fetchBase = useFetchBase();

  return useCallback(() => {
    return fetchBase(`${API_URL}/tags`, {
      method: "GET",
    }).then(wrapperFetchJsonResponse<TagsResponse>);
  }, [fetchBase]);
}
