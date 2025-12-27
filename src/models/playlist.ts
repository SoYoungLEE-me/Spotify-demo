import type { ExternalUrls, Image, Owner } from "./commonType";
import type { TrackObject, Tracks } from "./track";
import type { EpisodeObject } from "./show";

export type PlayableItem = TrackObject | EpisodeObject;

export interface PlaylistTrackObject {
  added_at?: string;
  added_by?: Owner;
  is_local?: boolean;
  track: PlayableItem;
}

export interface Playlists {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous?: string | null;
  total: number;
  items: SimplifiedPlaylistObject[];
}

export interface SimplifiedPlaylistObject {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: Tracks;
  type?: string;
  uri?: string;
}
