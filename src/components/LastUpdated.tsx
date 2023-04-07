export default function LastUpdated({ timestamp }: { timestamp: number }) {
  const date = new Date(timestamp);

  return (
    <p className="text-xs text-zinc-700 text-center font-medium">
      <span className="font-semibold">Last Updated:</span>{" "}
      {timestamp ? date.toUTCString() : "Unknown"}
    </p>
  );
}
