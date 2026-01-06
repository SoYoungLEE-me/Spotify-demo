import type { ExternalUrls, Image, Owner } from "./commonType";
import type { TrackObject, Tracks } from "./track";
import type { SimplifiedEpisodeObject } from "./show";
import type { ApiResponse } from "./apiResponse";

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: string;
  uri?: string;
}

export type PlayableItem = TrackObject | SimplifiedEpisodeObject;

export interface PlaylistTrackObject {
  added_at?: string;
  added_by?: Owner;
  is_local?: boolean;
  track: PlayableItem;
}

export type Playlists = ApiResponse<SimplifiedPlaylistObject>;

export interface SimplifiedPlaylistObject extends BasePlaylist {
  tracks?: {
    href?: string;
    total?: number;
  };
}

export interface Playlist extends BasePlaylist {
  tracks?: Tracks;
}

export interface GetCurrentUserPlaylistsRequest {
  limit?: number;
  offset?: number;
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface GetPlaylistItemRequest extends GetPlaylistRequest {
  offset?: number;
  limit?: number;
}

export interface PlaylistDetailsPayload {
  name: string;
  public?: boolean;
  collaborative?: boolean;
  description?: string;
}

export interface AddItemsToPlaylistRequest {
  position?: number;
  uris?: string[];
}

export interface AddItemsToPlaylistResponse {
  snapshot_id: string;
}
