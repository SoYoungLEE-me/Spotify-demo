import { useQuery } from "@tanstack/react-query";

import { getPlaylist } from "../apis/spotify/playlistApi";
import type { GetPlaylistRequest } from "../models/playlist";

const useGetPlaylist = (params: GetPlaylistRequest) => {
  const accessToken = localStorage.getItem("access_token");

  return useQuery({
    queryKey: ["playlist-detail", params.playlist_id],
    enabled: !!accessToken && !!params.playlist_id,
    queryFn: async () => {
      if (!accessToken) {
        throw new Error("Spotify client credential token is missing");
      }

      return getPlaylist(accessToken, params.playlist_id);
    },
  });
};

export default useGetPlaylist;
