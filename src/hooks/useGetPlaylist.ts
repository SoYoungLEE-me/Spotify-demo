import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getPlaylist } from "../apis/spotify/playlistApi";
import type { GetPlaylistRequest } from "../models/playlist";

const useGetPlaylist = (params: GetPlaylistRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["playlist-detail", params.playlist_id],
    enabled: !!clientCredentialToken && !!params.playlist_id,
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("Spotify client credential token is missing");
      }

      return getPlaylist(clientCredentialToken, params.playlist_id);
    },
  });
};

export default useGetPlaylist;
