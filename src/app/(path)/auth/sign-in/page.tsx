import { Suspense } from "react";
import { SignInContent } from "./SignInContent";

function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}

export default Page;
