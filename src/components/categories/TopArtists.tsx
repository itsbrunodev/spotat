import { getServerSession } from "next-auth";

import { fetchApi } from "@/functions";
import { Artist, TimeRange } from "@/types";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Element from "../Element";

export default async function TopArtists({
  timeRange = TimeRange.Short,
}: {
  timeRange: TimeRange;
}) {
  const session = await getServerSession(authOptions);

  const response = await fetchApi<Artist>(
    session?.accessToken as string,
    `v1/me/top/artists?time_range=${timeRange}&limit=50`
  );

  return (
    <div className="list">
      {response.items.length === 0 ? (
        <></>
      ) : (
        response.items.map((artist, index) => {
          return <Element data={artist} place={index + 1} key={index} />;
        })
      )}
    </div>
  );
}
