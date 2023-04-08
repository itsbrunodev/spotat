import Link from "next/link";
import Image from "next/image";

import { isArtist } from "@/functions";
import { Artist, Track } from "@/types";
import CaretUp from "./icons/CaretUp";
import CaretDown from "./icons/CaretDown";
import Neutral from "./icons/Neutral";

function Number({
  type,
  number,
  change,
  isNew,
  hasChanged,
}: {
  type: string;
  number: number;
  change: number;
  isNew: boolean;
  hasChanged: boolean;
}) {
  const changeNum = change.toString();

  return (
    <div
      className={`absolute -top-5 -left-5 z-10 center md:text-lg text-sm space-x-2 text-black`}
    >
      <div className="md:w-10 w-8 md:h-10 h-8 rounded-full bg-white font-bold center">
        <p>{number}</p>
      </div>
      {hasChanged ? (
        isNew ? (
          <p
            className="md:px-1.5 px-1 py-px md:text-base text-sm rounded-md bg-yellow-400 font-semibold center"
            title={`This ${type} is new in your ranking.`}
          >
            New
          </p>
        ) : (
          <div
            className="md:w-10 w-8 md:h-10 h-8 rounded-full bg-white font-bold center"
            title={
              changeNum.startsWith("-")
                ? changeNum
                : changeNum !== "0"
                ? `+${changeNum}`
                : `This ${type} hasn't changed a place in your ranking.`
            }
          >
            {change === 0 ? (
              <Neutral />
            ) : change > 0 ? (
              <CaretUp />
            ) : (
              <CaretDown />
            )}
          </div>
        )
      ) : (
        <></>
      )}
    </div>
  );
}

function BackgroundImage({
  src,
  alt,
  index,
}: {
  src: string;
  alt: string;
  index: number;
}) {
  return (
    <Image
      className="absolute w-full h-full object-cover md:rounded-2xl rounded-lg"
      src={src}
      alt={alt}
      priority={index < 4}
      quality={1}
      draggable={false}
      fill
    />
  );
}

function OuterElement({ children }: { children: React.ReactNode }) {
  return (
    <div className="hover:ring hover:ring-white md:rounded-2xl rounded-lg relative animate__animated animate__fadeIn">
      {children}
    </div>
  );
}

function InnerElement({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex space-x-6 items-center md:p-6 p-4 backdrop-blur-md md:rounded-2xl rounded-lg bg-zinc-900 bg-opacity-50">
      {children}
    </div>
  );
}

function ImageWrapper({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority: boolean;
}) {
  return (
    <div className="relative md:w-[100px] w-[65px] aspect-square">
      <Image
        className="md:rounded-xl rounded-md object-cover"
        src={src}
        alt={alt}
        priority={priority}
        draggable={false}
        fill
      />
    </div>
  );
}

function DataWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:space-y-1 space-y-px justify-center md:max-w-sm sm:max-w-[330px] max-w-[180px]">
      {children}
    </div>
  );
}

export default function Element({
  data,
  place,
  change,
  isNew,
  hasChanged,
}: {
  data: Artist | Track;
  place: number;
  change: number;
  isNew: boolean;
  hasChanged: boolean;
}) {
  if (isArtist(data)) {
    const artist = data;
    return (
      <Link href={artist.uri}>
        <OuterElement>
          <Number
            type={data.type}
            number={place}
            change={change}
            isNew={isNew}
            hasChanged={hasChanged}
          />
          <BackgroundImage
            src={artist.images[0].url}
            alt={artist.name}
            index={place - 1}
          />
          <InnerElement>
            <ImageWrapper
              src={artist.images[0].url}
              alt={artist.name}
              priority={place - 1 < 4}
            />
            <DataWrapper>
              <h1
                className="md:text-3xl text-xl font-medium truncate"
                title={artist.name}
              >
                {artist.name}
              </h1>
            </DataWrapper>
          </InnerElement>
        </OuterElement>
      </Link>
    );
  } else {
    const track = data;
    return (
      <Link href={track.uri}>
        <OuterElement>
          <Number
            type={data.type}
            number={place}
            change={change}
            isNew={isNew}
            hasChanged={hasChanged}
          />
          <BackgroundImage
            src={track.album.images[0].url}
            alt={track.name}
            index={place - 1}
          />
          <InnerElement>
            <ImageWrapper
              src={track.album.images[0].url}
              alt={track.name}
              priority={place - 1 < 4}
            />
            <DataWrapper>
              <h1
                className="md:text-2xl text-xl font-medium truncate"
                title={track.name}
              >
                {track.name}
              </h1>
              <div className="flex space-x-1">
                <h2 className="md:text-base text-sm truncate text-zinc-300">
                  {track.artists.map((artist, index) => artist.name).join(", ")}
                </h2>
              </div>
            </DataWrapper>
          </InnerElement>
        </OuterElement>
      </Link>
    );
  }
}
