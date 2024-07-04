import { ArtieBot } from "@/components/artie-bot";
import { Link } from "lucide-react";
import RightArrow from "@/public/move-right.svg"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center md:space-y-20 space-y-6 p-4 pt-14 md:p-12">
      <ArtieBot />
      <div className="mb-12 flex flex-row-reverse items-center  md:w-screen md:pr-24">
      <a className="flex flex-row gap-2" href="/gallery">
        <p className="text-lg text-white md:text-2xl max-w-2xl text-center">
          Or meet our artists
        </p>
          <RightArrow className="text-white dark:text-white mt-1"></RightArrow>
        </a> 
      </div>
    </main>
  );
}
