import Link from "next/link";
import Image from "next/image";

import { isArtist } from "@/functions";
import { Artist, Track } from "@/types";

function Number({ number }: { number: number }) {
  return (
    <p className="absolute -top-3 -left-4 w-10 h-10 rounded-full bg-white text-black font-bold z-10 center text-lg">
      {number}
    </p>
  );
}

function BackgroundImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      className="absolute w-full h-full object-cover rounded-2xl"
      src={src}
      alt={alt}
      fill
    />
  );
}

export default function Element({
  data,
  place,
}: {
  data: Artist | Track;
  place: number;
}) {
  if (isArtist(data)) {
    const artist = data;
    return (
      <Link href={artist.uri}>
        <div className="hover:ring hover:ring-white rounded-2xl relative animate__animated animate__fadeIn">
          <Number number={place} />
          <BackgroundImage src={artist.images[0].url} alt={artist.name} />
          <div className="flex space-x-6 items-center p-10 backdrop-blur-md rounded-2xl bg-zinc-900 bg-opacity-50">
            <div className="relative w-cover aspect-square">
              <Image
                className="rounded-full object-cover"
                src={artist.images[0].url}
                alt={artist.name}
                fill
              />
            </div>
            <h1 className="text-3xl font-medium truncate" title={artist.name}>
              {artist.name}
            </h1>
          </div>
        </div>
      </Link>
    );
  } else {
    const track = data;
    return (
      <Link href={track.uri}>
        <div className="hover:ring hover:ring-white rounded-2xl relative animate__animated animate__fadeIn">
          <Number number={place} />
          <BackgroundImage src={track.album.images[0].url} alt={track.name} />
          <div className="flex space-x-6 items-center p-10 backdrop-blur-md rounded-2xl bg-zinc-900 bg-opacity-50">
            <div className="relative w-cover aspect-square">
              <Image
                className="rounded-lg object-cover"
                src={track.album.images[0].url}
                alt={track.name}
                fill
              />
            </div>
            <div className="flex flex-col space-y-1 justify-center md:max-w-sm max-w-[175px]">
              <h1 className="text-2xl font-medium truncate" title={track.name}>
                {track.name}
              </h1>
              <div className="flex space-x-1">
                <h2 className="truncate text-zinc-300">
                  {track.artists.map((artist, index) => artist.name).join(", ")}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
