import type { ApiResponse } from "./apiResponse";
import type { TrackObject } from "./track";
import type { Artist } from "./artist";
import type { SimplifiedAlbum } from "./album";
import type { SimplifiedPlaylistObject } from "./playlist";
import type { SimplifiedShow } from "./show";
import type {
  SimplifiedEpisodeObject,
  SimplifiedAudiobookObject,
} from "./show";

export const enum SEARCH_TYPE {
  Track = "track",
  Album = "album",
  Playlist = "playlist",
  Show = "show",
  Episode = "episode",
  AudioBook = "audiobook",
  Artist = "artist",
}

export interface SearchRequest {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: "audio";
}

export interface SearchResponse {
  tracks?: ApiResponse<TrackObject>;
  artists?: ApiResponse<Artist>;
  albums?: ApiResponse<SimplifiedAlbum>;
  playlists?: ApiResponse<SimplifiedPlaylistObject>;
  shows?: ApiResponse<SimplifiedShow>;
  episodes?: ApiResponse<SimplifiedEpisodeObject>;
  audiobooks?: ApiResponse<SimplifiedAudiobookObject>;
}
