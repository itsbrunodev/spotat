import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth";

import "animate.css";
import "./globals.css";

import Providers from "./providers";
import Repo from "@/components/Repo";
import Profile, { description } from "@/components/Profile";
import Login from "@/components/profile/Login";
import Nav from "@/components/Nav";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Spotat",
  description,
  themeColor: "#fff",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`bg-black w-full h-screen relative center !items-start ${poppins.className}`}
      >
        <Repo />
        {session ? (
          <Providers session={session}>
            <div className="max-w-xl w-full h-full md:pt-20 pt-16 md:px-0 px-5">
              <div className="flex flex-col space-y-12">
                <div className="flex flex-col space-y-10 pb-12 border-b-2 border-b-zinc-800">
                  <Profile />
                  <Nav />
                </div>
                {children}
              </div>
            </div>
          </Providers>
        ) : (
          <div className="max-w-md w-full h-full flex flex-col center space-y-8 text-center welcome px-5">
            <h1 className="md:text-4xl text-2xl font-semibold animate__animated animate__fadeInUp animate__delay-1s">
              Welcome to Spotat
            </h1>
            <p className="md:text-lg text-zinc-300 animate__animated animate__fadeInUp animate__delay-1s">
              {description}
            </p>
            <div className="animate__animated animate__fadeInUp animate__delay-1s md:w-6/12 sm:w-6/12 w-10/12">
              <Login />
            </div>
            <div>{children}</div>
            {/**
             * this children prop is only here because if it wasn't here the UI
             * on mobile devices will be shrunk down to a ridiculous
             * size
             */}
          </div>
        )}
      </body>
    </html>
  );
}
