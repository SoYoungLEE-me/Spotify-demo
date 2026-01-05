import { spotifyGet, spotifyPost } from "../../utils/clientTokenClient";
import type {
  GetCurrentUserPlaylistsRequest,
  Playlists,
  Playlist,
  GetPlaylistItemRequest,
  CreatePlaylistRequest,
  AddItemsToPlaylistRequest,
  AddItemsToPlaylistResponse,
} from "../../models/playlist";

import { spotifyUserGet } from "../../utils/userTokenClient";
import type { Tracks } from "../../models/track";

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
  return spotifyGet<Tracks>(
    `/playlists/${params.playlist_id.trim()}/tracks`,
    params.token,
    {
      limit: params.limit ?? 20,
      offset: params.offset ?? 0,
      market: params.market,
      fields: params.fields,
      additional_types: params.additional_types,
    }
  );
};

export const createPlaylist = async (
  token: string,
  userId: string,
  params: CreatePlaylistRequest
): Promise<Playlist> => {
  return spotifyPost<Playlist>(`/users/${userId}/playlists`, token, params);
};

export const addItemsToPlaylist = async (
  token: string,
  playlistId: string,
  body: AddItemsToPlaylistRequest
): Promise<AddItemsToPlaylistResponse> => {
  return spotifyPost<AddItemsToPlaylistResponse>(
    `/playlists/${playlistId}/tracks`,
    token,
    body
  );
};
