import { spotifyGet } from "./client";
import type { PlaylistTrackObject } from "../../models/playlist";

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
