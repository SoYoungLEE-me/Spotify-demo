import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchForItem } from "../apis/spotify/searchApi";
import useClientCredentialToken from "./useClientCredentialToken";
import type { SearchRequest } from "../models/search";

const DEFAULT_LIMIT = 20;

const useSearchItems = (params: SearchRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["search", params],
    enabled: Boolean(clientCredentialToken) && params.q.trim().length > 0,
    initialPageParam: 0,

    queryFn: ({ pageParam }) => {
      if (!clientCredentialToken) {
        throw new Error("No client credential token");
      }

      return getSearchForItem(clientCredentialToken, {
        ...params,
        limit: params.limit ?? DEFAULT_LIMIT,
        offset: pageParam,
      });
    },
    getNextPageParam: (lastPage) => {
      const tracks = lastPage.tracks;
      if (!tracks) return undefined;

      const { offset, limit, total } = tracks;
      const nextOffset = offset + limit;
      return nextOffset < total ? nextOffset : undefined;
    },
  });
};

export default useSearchItems;
