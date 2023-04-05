import { ApiResponse, Artist, Track } from "./types";

export async function fetchApi<ResponseType>(token: string, endpoint: string) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  return (await res.json()) as Promise<ApiResponse<ResponseType>>;
}

export function isTrack(obj: any): obj is Track {
  return "type" in obj && obj.type === "track";
}

export function isArtist(obj: any): obj is Artist {
  return "type" in obj && obj.type === "artist";
}
