"use client";

import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <button
      className="bg-red-600 hover:opacity-75 px-5 py-2 rounded-full font-medium"
      onClick={() => signOut()}
    >
      Log out
    </button>
  );
}
