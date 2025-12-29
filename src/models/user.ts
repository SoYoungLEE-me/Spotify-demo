import type {
  ExternalUrls,
  Image,
  Followers,
  ExplicitContents,
} from "./commonType";

export interface User {
  country?: string;
  display_name?: string;
  email?: string;
  explicit_contents?: ExplicitContents;
  external_urls?: ExternalUrls;
  followers?: Followers;
  href?: string;
  id?: string;
  images?: Image[];
  product?: string;
  type?: string;
  uri?: string;
}
