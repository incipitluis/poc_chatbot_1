"use client";

import { ReachUsForm } from "@/components/new-date-picker-form";
import { useUnavailableTimestamps } from "@/app/lib/use-unavailable-timestamps";
import { Spinner } from "@/components/spinner";

export default function ContactPage() {
  const { unavailableTimestamps, isPending } = useUnavailableTimestamps();

  return (
    <main className="flex flex-col min-h-screen gap-8 items-center p-8">
      <div className="w-auto h-auto flex flex-col bg-stone-700/80 dark:bg-gray-800/80 p-8">
        <h1 className="mb-4 text-center text-2xl font-bold bg-gradient-to-r from-slate-200 dark:from-blue-900 via-yellow-700 dark:via-slate-200 to-black bg-clip-text text-transparent">
          Reach out!
        </h1>
        {isPending ? (
          <Spinner />
        ) : (
          <ReachUsForm unavailableTimestamps={unavailableTimestamps} />
        )}
      </div>
    </main>
  );
}
