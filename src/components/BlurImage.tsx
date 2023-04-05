import Image from "next/image";

export default function BlurImage({
  className = "",
  src,
  alt,
}: {
  className?: string;
  width?: number;
  src: string;
  alt: string;
}) {
  return (
    <div
      className={`relative aspect-square w-[150px] ${className}`}
    >
      <Image
        className="absolute rounded-full h-full w-full blur-xl -z-10"
        src={src}
        alt="Blurred Image"
        fill
      />
      <Image
        className="rounded-full h-full w-full object-cover"
        src={src}
        alt={alt}
        fill
        unoptimized
      />
    </div>
  );
}
