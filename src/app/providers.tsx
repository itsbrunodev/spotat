"use client";

import { ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface IProviders {
  session?: Session | null;
  children: ReactNode;
}

const Providers = ({ session, children }: IProviders) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
