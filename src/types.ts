export interface Album {
  external_urls: {
    spotify: string;
  };
  album_type: "ALBUM_TYPE" | string;
  artists: Artist[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  uri: string;
}

export interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
  images: Image[];
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Track {
  external_urls: {
    spotify: string;
  };
  album: Album;
  artists: Artist[];
  explicit: boolean;
  href: string;
  id: string;
  name: string;
  preview: string;
  type: string;
  uri: string;
}

export interface ApiResponse<ResponseType> {
  items: ResponseType[];
  total: number;
  limit: number;
  href: string;
  next: string | null;
  previous: string | null;
  error?: {
    status: number;
    message: string;
  };
}

/* enums */
export enum TimeRange {
  Long = "long_term" /* several years */,
  Medium = "medium_term" /* around 6 months */,
  Short = "short_term" /* around 4 weeks */,
}

declare module "next-auth" {
  interface Session {
    user?: {
      name: string;
    };
    accessToken: string;
  }
}
