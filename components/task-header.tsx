import { CheckCircle2 } from "lucide-react"

export function TaskHeader() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
        <CheckCircle2 className="h-7 w-7 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">Gestor de Tareas</h1>
        <p className="text-sm text-muted-foreground">Organiza tu día de manera eficiente</p>
      </div>
    </div>
  )
}
