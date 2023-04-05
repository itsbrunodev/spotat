"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

import Spinner from "../Spinner";

export default function Login() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      className="bg-spotify text-black hover:opacity-75 w-6/12 py-2 rounded-full font-medium disabled:opacity-75 disabled:cursor-default"
      disabled={loading}
      onClick={() => {
        setLoading(true);
        signIn("spotify");
      }}
    >
      {loading ? <Spinner width={24} /> : <p>Login with Spotify</p>}
    </button>
  );
}
