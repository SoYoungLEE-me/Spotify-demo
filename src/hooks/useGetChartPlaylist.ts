import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getChartPlaylistTracks } from "../apis/spotify/playlistApi";

export const useGetChartPlaylist = (playlistId: string) => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["chart-playlist-tracks", playlistId],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return getChartPlaylistTracks(clientCredentialToken, playlistId);
    },
    enabled: !!clientCredentialToken && !!playlistId,
  });
};

export default useGetChartPlaylist;
