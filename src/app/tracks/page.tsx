import { getServerSession } from "next-auth";

import TopTracks from "@/components/categories/TopTracks";
import { TimeRange } from "@/types";

export default async function Tracks({
  searchParams = { t: TimeRange.Short },
}: {
  searchParams: { t: TimeRange } | {};
}) {
  const session = await getServerSession();

  if (!session) return <div></div>;

  /* @ts-expect-error Server Component */
  return <TopTracks timeRange={searchParams.t} />;
}
