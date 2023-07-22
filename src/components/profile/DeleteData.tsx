"use client";

import { deleteData } from "@/actions";
import Trash from "../icons/Trash";
import { signOut } from "next-auth/react";

export default function DeleteData() {
  const del = () => {
    const message =
      "Are you sure you want to delete all your data? This action is irreversible.\n\nBy deleting your data, you will also be logged out.";

    return window.confirm(message);
  };

  return (
    <form
      action={() => {
        if (del()) {
          deleteData();
          signOut();
        }
      }}
    >
      <button
        className="bg-red-600 hover:opacity-75 md:p-3 p-2.5 rounded-full font-medium"
        type="submit"
      >
        <Trash />
      </button>
    </form>
  );
}
