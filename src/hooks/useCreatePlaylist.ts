import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlaylist } from "../apis/spotify/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";
import type { PlaylistDetailsPayload } from "../models/playlist";

const useCreatePlaylist = () => {
  const access_token = localStorage.getItem("access_token");

  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();
  return useMutation({
    mutationFn: (params: PlaylistDetailsPayload) => {
      if (!user || !user.id || !access_token) {
        return Promise.reject(new Error("user or accessToken is not defined"));
      }

      return createPlaylist(access_token, user.id, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      console.log("성공");
    },
  });
};

export default useCreatePlaylist;
