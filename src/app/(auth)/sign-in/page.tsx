import BrandLogo from "@/components/BrandLogo";
import SignInwithGoogle from "./SignInwithGoogle";

function Page() {
  return (
    <div className="h-screen relative bg-[url('/bgimage2.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/40 z-10" />
      <div className="relative z-20 p-4 flex justify-center items-center h-screen">
        <div className="p-6 px-4 rounded-xl space-y-4 max-w-sm w-full bg-white text-center">
          <BrandLogo className="justify-center" />
          <h3 className="font-semibold text-xl">Admin Dashboard Login</h3>
          <p className="text-zinc-600">
            Sign in with Google to manage destinations, itineraries, and user
            activity with ease.
          </p>
          <SignInwithGoogle />
        </div>
      </div>
    </div>
  );
}

export default Page;
