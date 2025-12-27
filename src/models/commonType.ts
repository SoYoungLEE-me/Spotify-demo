export interface ExternalUrls {
  spotify?: string;
}

export interface External_ids {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Restriction {
  reason?: string;
}

export interface Copyright {
  text?: string;
  type?: string;
}

export interface Owner {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
  display_name?: string | null;
}
