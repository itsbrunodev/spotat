import { getServerSession } from "next-auth";

import { fetchApi, getDataDb, getLastUpdated, setDataDb } from "@/functions";
import { Track, Item, TimeRange } from "@/types";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Element from "../Element";
import LastUpdated from "../LastUpdated";

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

  await setDataDb(session?.user?.id || "", "tracks", timeRange, response.items);

  const data = await getDataDb(session?.user?.id || "", "tracks", timeRange);
  const timestamp = await getLastUpdated(session?.user?.id || "");

  return (
    <div className="list">
      {response.items.length === 0 ? (
        <></>
      ) : (
        response.items.map((artist, index) => {
          const dataElement =
            data.find((x) => x.id === artist.id) ||
            ({
              id: artist.id,
              change: 0,
              new: false,
              hasChanged: false,
            } as Item);

          const { change, new: isNew, hasChanged } = dataElement;

          return (
            <Element
              data={artist}
              place={index + 1}
              change={change}
              isNew={isNew}
              hasChanged={hasChanged}
              key={index}
            />
          );
        })
      )}
      <LastUpdated timestamp={timestamp} />
    </div>
  );
}
