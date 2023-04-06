"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Error({ error }: { error: Error }) {
  const pathName = usePathname();

  return (
    <div className="center flex-col w-full space-y-6 animate__animated animate__fadeIn">
      <h1 className="text-2xl font-semibold text-red-600 text-center">
        {error.message}
      </h1>
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
