import type { ExternalUrls, External_ids, Restriction } from "./commonType";
import type { SimplifiedAlbum } from "./album";
import type { Artist } from "./artist";
import type { PlaylistTrackObject } from "./playlist";
import type { ApiResponse } from "./apiResponse";
interface LinkedTrack {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export type Tracks = ApiResponse<PlaylistTrackObject>;

export interface TrackObject {
  album?: SimplifiedAlbum;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: External_ids;
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: LinkedTrack;
  restrictions?: Restriction;
  name?: string;
  popularity?: number;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}
