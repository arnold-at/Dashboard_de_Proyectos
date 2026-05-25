"use client";

import { useStore } from "@/lib/store";
import { Project } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/lib/utils-badges";
import { User } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}

export function ProjectDetailModal({ open, onClose, project }: Props) {
  const { tasks } = useStore();
  if (!project) return null;
  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-slate-500">{project.description}</p>

        <div className="flex items-center gap-3">
          <StatusBadge status={project.status} />
          <span className="text-sm font-semibold text-emerald-700">{project.progress}% completado</span>
        </div>

        <Progress value={project.progress} className="h-2" />

        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Miembros ({project.members.length})</p>
          <div className="flex flex-wrap gap-2">
            {project.members.map((m) => (
              <Badge key={m} variant="secondary" className="flex items-center gap-1">
                <User className="h-3 w-3" /> {m}
              </Badge>
            ))}
            {project.members.length === 0 && <p className="text-sm text-slate-400">Sin miembros asignados</p>}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Tareas asignadas ({projectTasks.length})</p>
          {projectTasks.length > 0 ? (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {projectTasks.map((t) => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-slate-600">{t.description}</span>
                  <StatusBadge status={t.status} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400">Sin tareas asignadas</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}