import type { ExternalUrls, Image, Owner } from "./commonType";
import type { TrackObject } from "./track";
import type { EpisodeObject } from "./show";
import type { ApiResponse } from "./apiResponse";

export type PlayableItem = TrackObject | EpisodeObject;

export interface PlaylistTrackObject {
  added_at?: string;
  added_by?: Owner;
  is_local?: boolean;
  track: PlayableItem;
}

export type Playlists = ApiResponse<SimplifiedPlaylistObject>;

export interface SimplifiedPlaylistObject {
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
  tracks?: {
    href?: string;
    total?: number;
  };
  type?: string;
  uri?: string;
}

export interface GetCurrentUserPlaylistsRequest {
  limit?: number;
  offset?: number;
}
