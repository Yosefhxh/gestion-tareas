"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// PASO 1: Define el tipo de datos para una tarea
export type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: number
}

// PASO 2: Define el tipo de filtro
export type FilterType = "all" | "active" | "completed"

// PASO 3: Define el contexto con todas las funciones que necesitarás
type TaskContextType = {
  tasks: Task[]
  filter: FilterType
  searchQuery: string
  addTask: (title: string) => void
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
  editTask: (id: string, newTitle: string) => void
  setFilter: (filter: FilterType) => void
  setSearchQuery: (query: string) => void
  getFilteredTasks: () => Task[]
  getStats: () => { total: number; active: number; completed: number; percentage: number }
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<FilterType>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks")
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks)
        setTasks(parsedTasks)
      } catch (error) {
        console.error("Error loading tasks from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0 || localStorage.getItem("tasks")) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = (title: string) => {
    if (!title.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now(),
    }

    setTasks([...tasks, newTask])
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const editTask = (id: string, newTitle: string) => {
    if (!newTitle.trim()) return

    setTasks(tasks.map((task) => (task.id === id ? { ...task, title: newTitle.trim() } : task)))
  }

  const getFilteredTasks = () => {
    let filtered = tasks

    // Filtrar por estado (all, active, completed)
    if (filter === "active") {
      filtered = filtered.filter((task) => !task.completed)
    } else if (filter === "completed") {
      filtered = filtered.filter((task) => task.completed)
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      filtered = filtered.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return filtered
  }

  const getStats = () => {
    const total = tasks.length
    const completed = tasks.filter((task) => task.completed).length
    const active = total - completed
    const percentage = total > 0 ? (completed / total) * 100 : 0

    return {
      total,
      active,
      completed,
      percentage,
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filter,
        searchQuery,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        setFilter,
        setSearchQuery,
        getFilteredTasks,
        getStats,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider")
  }
  return context
}
