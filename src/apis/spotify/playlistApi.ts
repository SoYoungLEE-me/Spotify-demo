import { spotifyGet } from "../../utils/clientTokenClient";
import type {
  PlaylistTrackObject,
  GetCurrentUserPlaylistsRequest,
  Playlists,
} from "../../models/playlist";

import { spotifyUserGet } from "../../utils/userTokenClient";

export interface PlaylistTracksResponse {
  items: PlaylistTrackObject[];
  limit: number;
  offset: number;
  total: number;
  next: string | null;
  previous: string | null;
}

export const getChartPlaylistTracks = async (
  token: string,
  playlistId: string
): Promise<PlaylistTracksResponse> => {
  const cleanId = playlistId.trim();

  const fields = "items(id,name,artists(name),album(images))";

  return spotifyGet<PlaylistTracksResponse>(
    `/playlists/${cleanId}?fields=${fields}`,
    token
  );
};

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistsRequest): Promise<Playlists> => {
  return spotifyUserGet("/me/playlists", {
    limit,
    offset,
  });
};
