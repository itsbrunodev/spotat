import TopArtists from "@/components/categories/TopArtists";
import { TimeRange } from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";

export default async function App({
  searchParams = { t: TimeRange.Short },
}: {
  searchParams: { t: TimeRange } | {};
}) {
  /* @ts-expect-error Server Component */
  return <TopArtists timeRange={searchParams.t} />;
}
