"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./pages/api/auth/[...nextauth]";
import User from "./models/User";

export async function deleteData() {
  const session = await getServerSession(authOptions);

  /**
   * can only be a string since the user can't access
   * this function unless they are logged in
   */
  const id = session?.user?.id as unknown as string;

  await User.deleteOne({ _id: id });
}
