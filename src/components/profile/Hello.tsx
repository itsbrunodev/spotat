import { getServerSession } from "next-auth";

export default async function LoggedIn() {
  const session = await getServerSession();

  return (
    <h1 className="text-4xl font-semibold">Hello, {session?.user?.name}</h1>
  );
}
