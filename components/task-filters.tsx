"use client"

import { useTasks, type FilterType } from "./task-provider"
import { Button } from "@/components/ui/button"

export function TaskFilters() {
  // PASO 14: Implementa los filtros
  // TODO: Obtén filter y setFilter del contexto
  // TODO: Al hacer click en cada botón, llama a setFilter con el filtro correspondiente
  const { filter, setFilter } = useTasks()

  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "Todas" },
    { value: "active", label: "Activas" },
    { value: "completed", label: "Completadas" },
  ]

  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <Button
          key={f.value}
          variant={filter === f.value ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter(f.value)}
          className="text-sm"
        >
          {f.label}
        </Button>
      ))}
    </div>
  )
}
