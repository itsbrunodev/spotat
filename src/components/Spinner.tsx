export default function Spinner({ width = 40 }: { width?: number }) {
  return (
    <div className="w-full h-full center animate__animated animate__fadeIn">
      <div
        aria-hidden="true"
        className="inline-block border-white rounded-full border-2 border-b-black border-l-black animate-spin"
        style={{
          width,
          height: width,
        }}
      ></div>
    </div>
  );
}
