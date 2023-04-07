import { getServerSession } from "next-auth";

import { fetchApi, getDataDb, setDataDb } from "@/functions";
import { Artist, Item, TimeRange } from "@/types";
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

  await setDataDb(
    session?.user?.id || "",
    "artists",
    timeRange,
    response.items
  );

  const data = await getDataDb(session?.user?.id || "", "artists", timeRange);

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
    </div>
  );
}
