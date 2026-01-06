import { useInfiniteQuery } from "@tanstack/react-query";
import { getPlaylistItems } from "../apis/spotify/playlistApi";
import type { GetPlaylistItemRequest } from "../models/playlist";

const useGetPlaylistItems = (params: GetPlaylistItemRequest) => {
  const accessToken = localStorage.getItem("access_token");

  return useInfiniteQuery({
    queryKey: ["playlist-items", params.playlist_id, params.limit],
    enabled: !!accessToken && !!params.playlist_id,
    queryFn: ({ pageParam = 0 }) =>
      getPlaylistItems({
        ...params,
        token: accessToken!,
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
