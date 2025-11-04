"use client"

import { useState } from "react"
import { useTasks, type Task } from "./task-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash2, Check, X } from "lucide-react"

type TaskItemProps = {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(task.title)
  const { toggleTask, deleteTask, editTask } = useTasks()

  const handleSave = () => {
    // Validar que el título no esté vacío
    if (!editedTitle.trim()) {
      setEditedTitle(task.title)
      setIsEditing(false)
      return
    }

    // Guardar cambios
    editTask(task.id, editedTitle)

    // Salir del modo edición
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Restaurar el título original
    setEditedTitle(task.title)

    // Salir del modo edición
    setIsEditing(false)
  }

  return (
    <Card className="border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} className="h-5 w-5" />

        {isEditing ? (
          // Modo edición
          <div className="flex flex-1 items-center gap-2">
            <Input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-1"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave()
                if (e.key === "Escape") handleCancel()
              }}
            />
            <Button size="icon" variant="ghost" onClick={handleSave} className="h-8 w-8">
              <Check className="h-4 w-4 text-success" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleCancel} className="h-8 w-8">
              <X className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ) : (
          // Modo visualización
          <>
            <span
              className={`flex-1 text-sm ${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}
            >
              {task.title}
            </span>
            <Button size="icon" variant="ghost" onClick={() => setIsEditing(true)} className="h-8 w-8">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => deleteTask(task.id)} className="h-8 w-8">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}
