"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { TeamMember } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MemberFormModal } from "./MemberFormModal";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { getInitials } from "@/lib/utils-badges";

export function EquipoTab() {
  const { team, projects, updateMember, deleteMember } = useStore();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);

  const filtered = team.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase())
  );

  function handleEdit(m: TeamMember) {
    setEditMember(m);
    setFormOpen(true);
  }

  function handleNew() {
    setEditMember(null);
    setFormOpen(true);
  }

  function handleDelete(id: number) {
    if (confirm("¿Eliminar este miembro?")) deleteMember(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Equipo</h1>
          <p className="text-sm text-slate-500 mt-1">{team.length} miembros registrados</p>
        </div>
        <Button onClick={handleNew} className="bg-emerald-700 hover:bg-emerald-800">
          <Plus className="h-4 w-4 mr-1" /> Agregar miembro
        </Button>
      </div>

      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="text-base">Miembros del equipo</CardTitle>
          <CardDescription>Gestiona los miembros y sus roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 bg-emerald-50/60 rounded-lg px-3 py-2 mb-4">
            <Search className="h-4 w-4 text-slate-400" />
            <Input
              className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm placeholder:text-slate-400"
              placeholder="Buscar por nombre, email o rol..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            {filtered.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-8">Sin resultados</p>
            ) : (
              filtered.map((m) => {
                const proj = projects.find((p) => p.id === m.projectId);
                return (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-emerald-200 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 bg-emerald-100">
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-semibold">
                          {getInitials(m.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{m.name}</p>
                        <p className="text-xs text-slate-400">{m.email}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-slate-500">{m.role}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs text-slate-400">{m.position}</span>
                          {proj && (
                            <>
                              <span className="text-slate-300">·</span>
                              <span className="text-xs text-emerald-600">{proj.title}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{m.isActive ? "Activo" : "Inactivo"}</span>
                        <Switch
                          checked={m.isActive}
                          onCheckedChange={(v) => updateMember(m.id, { isActive: v })}
                          className="data-[state=checked]:bg-emerald-600"
                        />
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleEdit(m)}>
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(m.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      <MemberFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditMember(null); }}
        member={editMember}
      />
    </div>
  );
}