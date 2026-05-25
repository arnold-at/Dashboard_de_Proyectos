"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { Task, TaskStatus, TaskPriority } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Calendar } from "@/components/ui/calendar";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
}

const STATUS_OPTIONS: TaskStatus[] = ["Pendiente", "En progreso", "Completado"];
const PRIORITY_OPTIONS: TaskPriority[] = ["Baja", "Media", "Alta", "Urgente"];

export function TaskFormModal({ open, onClose, task }: Props) {
  const { projects, team, addTask, updateTask } = useStore();
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [status, setStatus] = useState<TaskStatus>("Pendiente");
  const [priority, setPriority] = useState<TaskPriority>("Media");
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setDescription(task.description);
      setProjectId(task.projectId);
      setUserId(task.userId);
      setStatus(task.status);
      setPriority(task.priority);
      setDeadline(task.deadline && task.deadline !== "Sin fecha" ? new Date(task.deadline + " 12:00") : undefined);
    } else {
      setDescription(""); setProjectId(null); setUserId(null);
      setStatus("Pendiente"); setPriority("Media"); setDeadline(undefined);
    }
    setError(""); setLoading(false);
  }, [task, open]);

  function handleSubmit() {
    if (!description.trim()) {
      setError("La descripción es obligatoria.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      const data: Omit<Task, "id"> = {
        description: description.trim(),
        projectId,
        userId,
        status,
        priority,
        deadline: deadline ? format(deadline, "yyyy-MM-dd") : "Sin fecha",
      };
      if (task) updateTask(task.id, data);
      else addTask(data);
      setLoading(false);
      onClose();
    }, 700);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task ? "Editar tarea" : "Nueva tarea"}</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label>Descripción <span className="text-red-500">*</span></Label>
            <Input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe la tarea..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Proyecto</Label>
              <Select value={projectId ? String(projectId) : "none"} onValueChange={(v) => setProjectId(v === "none" ? null : Number(v))}>
                <SelectTrigger><SelectValue placeholder="Sin proyecto" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">— Sin proyecto —</SelectItem>
                  {projects.map((p) => <SelectItem key={p.id} value={String(p.id)}>{p.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Asignado a</Label>
              <Select value={userId ? String(userId) : "none"} onValueChange={(v) => setUserId(v === "none" ? null : Number(v))}>
                <SelectTrigger><SelectValue placeholder="Sin asignar" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">— Sin asignar —</SelectItem>
                  {team.map((m) => <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Estado</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as TaskStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Prioridad</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as TaskPriority)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{PRIORITY_OPTIONS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Fecha límite</Label>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <Calendar
                mode="single"
                selected={deadline}
                onSelect={setDeadline}
                locale={es}
                className="rounded-lg"
              />
            </div>
            {deadline && (
              <p className="text-xs text-emerald-700 font-medium">
                Seleccionado: {format(deadline, "dd 'de' MMMM, yyyy", { locale: es })}
              </p>
            )}
          </div>
        </div>

        {loading && <div className="flex justify-center py-2"><Spinner className="text-emerald-600" /></div>}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-emerald-700 hover:bg-emerald-800">
            {task ? "Actualizar" : "Crear tarea"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}