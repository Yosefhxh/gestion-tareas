"use client"

import { useTasks } from "./task-provider"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function TaskSearch() {
  // PASO 15: Implementa la búsqueda en tiempo real
  // TODO: Obtén searchQuery y setSearchQuery del contexto
  // TODO: Conecta el input con el estado usando value y onChange
  const { searchQuery, setSearchQuery } = useTasks()

  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Buscar tareas..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9"
      />
    </div>
  )
}
