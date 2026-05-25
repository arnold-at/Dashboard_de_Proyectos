"use client";

import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { Project, ProjectStatus } from "@/types";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { X, AlertCircle } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  project?: Project | null;
}

const STATUS_OPTIONS: ProjectStatus[] = ["Planificado", "En progreso", "En revisión", "Completado"];

export function ProjectFormModal({ open, onClose, project }: Props) {
  const { team, addProject, updateProject } = useStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ProjectStatus>("Planificado");
  const [progress, setProgress] = useState(0);
  const [members, setMembers] = useState<string[]>([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setStatus(project.status);
      setProgress(project.progress);
      setMembers(project.members);
    } else {
      setTitle(""); setDescription(""); setStatus("Planificado");
      setProgress(0); setMembers([]);
    }
    setError(""); setLoading(false);
  }, [project, open]);

  function addMember() {
    if (!selectedMember || members.includes(selectedMember)) return;
    setMembers((prev) => [...prev, selectedMember]);
    setSelectedMember("");
  }

  function removeMember(name: string) {
    setMembers((prev) => prev.filter((m) => m !== name));
  }

  function handleSubmit() {
    if (!title.trim() || !description.trim()) {
      setError("El título y la descripción son obligatorios.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      const data = { title: title.trim(), description: description.trim(), status, progress: Math.min(100, Math.max(0, progress)), members };
      if (project) updateProject(project.id, data);
      else addProject(data);
      setLoading(false);
      onClose();
    }, 700);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{project ? "Editar proyecto" : "Nuevo proyecto"}</DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="p-title">Título <span className="text-red-500">*</span></Label>
            <Input id="p-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nombre del proyecto" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p-desc">Descripción <span className="text-red-500">*</span></Label>
            <Input id="p-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Breve descripción" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Estado</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as ProjectStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="p-progress">Progreso (%)</Label>
              <Input id="p-progress" type="number" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} />
            </div>
          </div>

          {/* Members */}
          <div className="space-y-1.5">
            <Label>Miembros del equipo</Label>
            <div className="flex gap-2">
              <Select value={selectedMember} onValueChange={setSelectedMember}>
                <SelectTrigger className="flex-1"><SelectValue placeholder="Seleccionar miembro" /></SelectTrigger>
                <SelectContent>
                  {team.map((m) => (
                    <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" onClick={addMember}>Agregar</Button>
            </div>
            {members.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {members.map((m) => (
                  <Badge key={m} variant="secondary" className="flex items-center gap-1">
                    {m}
                    <button onClick={() => removeMember(m)} className="ml-1 hover:text-red-500">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex justify-center py-2">
            <Spinner className="text-emerald-600" />
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-emerald-700 hover:bg-emerald-800">
            {project ? "Actualizar" : "Crear proyecto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}