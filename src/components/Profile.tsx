import Hello from "./profile/Hello";
import Logout from "./profile/Logout";

export const description =
  "Spotat is a completely free tool that can check your top artists and tracks that you listen to.";

export default function Profile() {
  return (
    <div className="">
      <div className="flex flex-col space-y-6">
        <div className="flex w-full justify-between items-center">
          {/* @ts-expect-error Server Component */}
          <Hello />
          <Logout />
        </div>
        <p className="text-zinc-300">{description}</p>
      </div>
    </div>
  );
}
