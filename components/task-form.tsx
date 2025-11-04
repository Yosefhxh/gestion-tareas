"use client"

import type React from "react"

import { useState } from "react"
import { useTasks } from "./task-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"

export function TaskForm() {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const { addTask } = useTasks()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validar que el título no esté vacío
    if (!newTaskTitle.trim()) return

    // Agregar la tarea
    addTask(newTaskTitle)

    // Limpiar el input
    setNewTaskTitle("")
  }

  return (
    <Card className="border-border bg-card p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Agregar nueva tarea..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
      </form>
    </Card>
  )
}
