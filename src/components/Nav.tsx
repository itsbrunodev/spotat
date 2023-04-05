"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { TimeRange } from "@/types";

export default function Nav() {
  const router = useRouter();
  const searchParams = useSearchParams()!;
  const pathName = usePathname();

  const redirect = (route: string) => {
    router.push(route);
  };

  /* https://beta.nextjs.org/docs/api-reference/use-search-params#updating-searchparams */
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="center flex-col space-y-2">
      <div className="w-full center md:flex-row flex-col md:space-x-2 md:space-y-0 space-y-4">
        <button
          className={`nav-button${pathName === "/" ? " selected" : ""}`}
          onClick={() => redirect("/")}
        >
          Top Artists
        </button>
        <button
          className={`nav-button${pathName === "/tracks" ? " selected" : ""}`}
          onClick={() => redirect("/tracks")}
        >
          Top Tracks
        </button>
      </div>
      <p className="font-medium">of</p>
      <div className="w-full center md:flex-row flex-col md:space-x-2 md:space-y-0 space-y-4">
        <button
          className={`nav-button${
            searchParams?.get("t") === null
              ? " selected"
              : searchParams?.get("t") === TimeRange.Short
              ? " selected"
              : ""
          }`}
          onClick={() =>
            router.push(
              pathName + "?" + createQueryString("t", TimeRange.Short)
            )
          }
        >
          Last Month
        </button>
        <button
          className={`nav-button${
            searchParams?.get("t") === TimeRange.Medium ? " selected" : ""
          }`}
          onClick={() =>
            router.push(
              pathName + "?" + createQueryString("t", TimeRange.Medium)
            )
          }
        >
          Last 6 Months
        </button>
        <button
          className={`nav-button${
            searchParams?.get("t") === TimeRange.Long ? " selected" : ""
          }`}
          onClick={() =>
            router.push(pathName + "?" + createQueryString("t", TimeRange.Long))
          }
        >
          All Time
        </button>
      </div>
    </div>
  );
}
