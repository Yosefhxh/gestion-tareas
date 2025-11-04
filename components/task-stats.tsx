"use client"

import { useTasks } from "./task-provider"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle, ListTodo } from "lucide-react"

export function TaskStats() {
  // PASO 13: Usa el hook useTasks para obtener getStats
  // TODO: Llama a getStats() para obtener las estadísticas
  const { getStats } = useTasks()
  const stats = getStats()

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card className="border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ListTodo className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </div>
      </Card>

      <Card className="border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
            <Circle className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.active}</p>
            <p className="text-sm text-muted-foreground">Activas</p>
          </div>
        </div>
      </Card>

      <Card className="border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <CheckCircle2 className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Completadas ({stats.percentage.toFixed(0)}%)</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
