export default function Spinner() {
  return (
    <div className="w-full h-full center animate__animated animate__fadeIn">
      <div
        aria-hidden="true"
        className="inline-block border-white rounded-full border-2 border-b-black border-l-black w-10 h-10 animate-spin"
      ></div>
    </div>
  );
}
