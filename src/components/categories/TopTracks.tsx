import { getServerSession } from "next-auth";

import { fetchApi } from "@/functions";
import { Track, TimeRange } from "@/types";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Element from "../Element";

export default async function TopTracks({
  timeRange = TimeRange.Short,
}: {
  timeRange: TimeRange;
}) {
  const session = await getServerSession(authOptions);

  const response = await fetchApi<Track>(
    session?.accessToken as string,
    `v1/me/top/tracks?time_range=${timeRange}&limit=50`
  );

  return (
    <div className="list">
      {response.items.map((track, index) => {
        return <Element data={track} place={index + 1} key={index} />;
      })}
    </div>
  );
}
