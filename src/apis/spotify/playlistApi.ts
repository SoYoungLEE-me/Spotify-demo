import { spotifyGet, spotifyPost } from "../../utils/clientTokenClient";
import type {
  PlaylistTrackObject,
  GetCurrentUserPlaylistsRequest,
  Playlists,
  Playlist,
  GetPlaylistItemRequest,
  CreatePlaylistRequest,
} from "../../models/playlist";

import { spotifyUserGet } from "../../utils/userTokenClient";
import type { Tracks } from "../../models/track";

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

export const getPlaylist = async (
  token: string,
  playlistId: string
): Promise<Playlist> => {
  const cleanId = playlistId.trim();

  return spotifyGet<Playlist>(`/playlists/${cleanId}`, token);
};

type GetPlaylistItemsParams = GetPlaylistItemRequest & { token: string };

export const getPlaylistItems = async (
  params: GetPlaylistItemsParams
): Promise<Tracks> => {
  const {
    token,
    playlist_id,
    limit = 20,
    offset = 0,
    market,
    fields,
    additional_types,
  } = params;

  const cleanId = playlist_id.trim();

  const searchParams = new URLSearchParams();
  searchParams.set("limit", String(limit));
  searchParams.set("offset", String(offset));
  if (market) searchParams.set("market", market);
  if (fields) searchParams.set("fields", fields);
  if (additional_types) searchParams.set("additional_types", additional_types);

  return spotifyGet<Tracks>(
    `/playlists/${cleanId}/tracks?${searchParams.toString()}`,
    token
  );
};

export const createPlaylist = async (
  token: string,
  userId: string,
  params: CreatePlaylistRequest
): Promise<Playlist> => {
  return spotifyPost<Playlist>(`/users/${userId}/playlists`, token, params);
};
