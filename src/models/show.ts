import type {
  ExternalUrls,
  Image,
  Copyright,
  Restriction,
  Authors,
  Narrator,
} from "./commonType";

export interface SimplifiedShow {
  available_markets: string[];
  copyrights: Copyright[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: "show";
  uri: string;
  total_episodes: number;
}

export interface SimplifiedEpisodeObject {
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: number;
  };
  type: "episode";
  uri: string;
  restrictions: Restriction;
  show: SimplifiedShow;
}

export interface SimplifiedAudiobookObject {
  author: Authors;
  available_markets: string[];
  copyright: Copyright[];
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_url: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: Narrator;
  publisher: string;
  type: string;
  uri: string;
  total_chapters: number;
}
