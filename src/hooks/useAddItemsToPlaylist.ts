import { useMutation } from "@tanstack/react-query";
import { addItemsToPlaylist } from "../apis/spotify/playlistApi";
import type { AddItemsToPlaylistRequest } from "../models/playlist";
import { useQueryClient } from "@tanstack/react-query";

const useAddItemsToPlaylist = (playlist_id: string) => {
  const access_token = localStorage.getItem("access_token");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: AddItemsToPlaylistRequest) => {
      if (!access_token || !playlist_id) {
        return Promise.reject(
          new Error("accessToken or playlist_id is not defined")
        );
      }
      return addItemsToPlaylist(access_token, playlist_id, body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["playlist-items", playlist_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["playlist-detail", playlist_id],
      });
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      console.log("플레이리스트에 트랙 추가 성공");
    },
  });
};

export default useAddItemsToPlaylist;
