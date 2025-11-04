"use client"

import { TaskProvider } from "@/components/task-provider"
import { TaskHeader } from "@/components/task-header"
import { TaskStats } from "@/components/task-stats"
import { TaskFilters } from "@/components/task-filters"
import { TaskSearch } from "@/components/task-search"
import { TaskForm } from "@/components/task-form"
import { TaskList } from "@/components/task-list"

export default function Home() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <TaskHeader />

          <div className="mt-8 space-y-6">
            <TaskStats />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TaskFilters />
              <TaskSearch />
            </div>

            <TaskForm />

            <TaskList />
          </div>
        </div>
      </div>
    </TaskProvider>
  )
}
