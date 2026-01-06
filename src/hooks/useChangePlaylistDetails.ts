import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePlaylistDetails } from "../apis/spotify/playlistApi";
import type { PlaylistDetailsPayload } from "../models/playlist";

const useChangePlaylistsDetails = (playlist_Id: string) => {
  const accessToken = localStorage.getItem("access_token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: PlaylistDetailsPayload) => {
      if (!accessToken) {
        return Promise.reject(new Error("No access token"));
      }
      return changePlaylistDetails(accessToken, playlist_Id, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist-detail", playlist_Id],
      });
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
    },
  });
};

export default useChangePlaylistsDetails;
