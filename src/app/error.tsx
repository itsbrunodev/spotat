"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const pathName = usePathname();

  return (
    <div className="center flex-col w-full space-y-6 animate__animated animate__fadeIn">
      <div className="center w-full space-x-3 text-red-600 text-center">
        <svg
          className="w-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
          <path d="M12 8v4"></path>
          <path d="M12 16h.01"></path>
        </svg>
        <h1 className="text-2xl font-semibold">{error.message}</h1>
      </div>
      <Link
        className="bg-red-600 hover:opacity-75 px-5 py-2 rounded-full font-medium"
        href={`https://github.com/brunolepis/spotat/issues/new?body=Pathname: \`${pathName}\`%0A\`\`\`%0A${error.stack?.replace(
          "\n",
          "%0A"
        )}%0A\`\`\``}
        target="_blank"
      >
        Report Bug
      </Link>
    </div>
  );
}
