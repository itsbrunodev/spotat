import TopTracks from "@/components/categories/TopTracks";

import { TimeRange } from "@/types";

export default async function Tracks({
  searchParams = { t: TimeRange.Short },
}: {
  searchParams: { t: TimeRange } | {};
}) {
  /* @ts-expect-error Server Component */
  return <TopTracks timeRange={searchParams.t} />;
}
