import type { ExternalUrls } from "./commonType";
import type { Followers } from "./commonType";
import type { Image } from "./commonType";
export interface Artist {
  external_urls?: ExternalUrls;
  followers?: Followers;
  genres?: string[];
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  popularity?: number;
  type?: string;
  uri?: string;
}
