import { Suspense } from "react"

import { ReachUsForm } from "@/components/new-date-picker-form"

import { fetchUnavailableTimestamps } from "./data"

export default async function ContactPage() {
  const unavailableTimestamps = await fetchUnavailableTimestamps()
  return (
    <main className="flex flex-col min-h-screen gap-8 items-center p-8 text-white">
      <h1>Reach out!</h1>
      <Suspense
        fallback={<div className="text-red-700 text-9xl">Loading...</div>}
      >
        <ReachUsForm unavailableTimestamps={unavailableTimestamps} />
      </Suspense>
    </main>
  )
}
