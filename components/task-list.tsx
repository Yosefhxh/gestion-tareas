"use client"

import { useTasks } from "./task-provider"
import { TaskItem } from "./task-item"
import { Card } from "@/components/ui/card"

export function TaskList() {
  // PASO 17: Muestra la lista de tareas filtradas
  // TODO: Obtén getFilteredTasks del contexto
  // TODO: Llama a getFilteredTasks() para obtener las tareas a mostrar
  const { getFilteredTasks } = useTasks()
  const filteredTasks = getFilteredTasks()

  if (filteredTasks.length === 0) {
    return (
      <Card className="border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">No hay tareas para mostrar</p>
      </Card>
    )
  }

  return (
    <div className="space-y-2">
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
