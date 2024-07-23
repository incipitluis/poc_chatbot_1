import { ArtieBot } from "@/components/artie-bot";
import Introduction from "@/components/intro";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row gap-6 min-h-screen p-4 md:p-12">
      <SignedOut>
        <div className="flex flex-col items-center justify-center w-full min-h-screen space-y-6 md:space-y-20">
          <Introduction />
        </div>
      </SignedOut>

      <SignedIn>
        <div className="md:w-1/3 flex flex-col order-2 md:order-1 space-y-6 md:space-y-20">
          <Introduction />
        </div>
        <div className="md:w-2/3 flex order-1 md:order-2">
          <ArtieBot />
        </div>
      </SignedIn>
    </main>
  );
}
