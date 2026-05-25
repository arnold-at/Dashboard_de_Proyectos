"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/lib/utils-badges";
import { ProjectFormModal } from "./ProjectFormModal";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { Plus, Eye, Pencil, Trash2, User } from "lucide-react";

export function ProyectosTab() {
  const { projects, deleteProject } = useStore();
  const [formOpen, setFormOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [detailProject, setDetailProject] = useState<Project | null>(null);

  function handleEdit(p: Project) {
    setEditProject(p);
    setFormOpen(true);
  }

  function handleNew() {
    setEditProject(null);
    setFormOpen(true);
  }

  function handleDelete(id: number) {
    if (confirm("¿Eliminar este proyecto? Esta acción no se puede deshacer.")) {
      deleteProject(id);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Proyectos</h1>
          <p className="text-sm text-slate-500 mt-1">{projects.length} proyectos en total</p>
        </div>
        <Button onClick={handleNew} className="bg-emerald-700 hover:bg-emerald-800">
          <Plus className="h-4 w-4 mr-1" /> Nuevo proyecto
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p) => (
          <div key={p.id} className="bg-white border border-emerald-100 rounded-xl p-5 hover:border-emerald-300 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-slate-800 text-sm leading-tight pr-2">{p.title}</h3>
              <StatusBadge status={p.status} />
            </div>
            <p className="text-xs text-slate-400 mb-4">{p.description}</p>

            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">Progreso</span>
                <span className="font-semibold text-emerald-700">{p.progress}%</span>
              </div>
              <Progress value={p.progress} className="h-1.5" />
            </div>

            <div className="mb-4">
              <p className="text-xs text-slate-400 mb-1.5">Miembros ({p.members.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {p.members.map((m) => (
                  <Badge key={m} variant="secondary" className="text-xs flex items-center gap-1">
                    <User className="h-2.5 w-2.5" />{m.split(" ")[0]}
                  </Badge>
                ))}
                {p.members.length === 0 && <span className="text-xs text-slate-300">Sin miembros</span>}
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-50">
              <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => setDetailProject(p)}>
                <Eye className="h-3 w-3 mr-1" /> Ver
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => handleEdit(p)}>
                <Pencil className="h-3 w-3 mr-1" /> Editar
              </Button>
              <Button size="sm" variant="outline" className="text-red-500 hover:bg-red-50 hover:border-red-200 text-xs" onClick={() => handleDelete(p.id)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ProjectFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditProject(null); }}
        project={editProject}
      />
      <ProjectDetailModal
        open={!!detailProject}
        onClose={() => setDetailProject(null)}
        project={detailProject}
      />
    </div>
  );
}