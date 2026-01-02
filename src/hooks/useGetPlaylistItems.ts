import { useInfiniteQuery } from "@tanstack/react-query";
import { getPlaylistItems } from "../apis/spotify/playlistApi";
import type { GetPlaylistItemRequest } from "../models/playlist";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetPlaylistItems = (params: GetPlaylistItemRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["playlist-items", params],
    enabled: !!clientCredentialToken && !!params.playlist_id,
    queryFn: ({ pageParam = 0 }) =>
      getPlaylistItems({
        ...params,
        token: clientCredentialToken!,
        offset: pageParam,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;

      const url = new URL(lastPage.next);
      const nextOffset = url.searchParams.get("offset");
      return nextOffset ? Number(nextOffset) : undefined;
    },
  });
};

export default useGetPlaylistItems;
