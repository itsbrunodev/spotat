import TopArtists from "@/components/categories/TopArtists";
import { TimeRange } from "@/types";
import { getServerSession } from "next-auth";

export default async function App({
  searchParams = { t: TimeRange.Short },
}: {
  searchParams?: { t: TimeRange } | {};
}) {
  const session = await getServerSession();

  if (!session) return <div></div>;

  /* @ts-expect-error Server Component */
  return <TopArtists timeRange={searchParams.t} />;
}
