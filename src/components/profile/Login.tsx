"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <button
      className="bg-spotify text-black hover:opacity-75 w-6/12 py-2 rounded-full font-medium"
      onClick={() => signIn("spotify")}
    >
      Login with Spotify
    </button>
  );
}
