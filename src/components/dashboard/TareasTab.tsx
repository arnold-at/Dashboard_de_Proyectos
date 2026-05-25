"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";
import { StatusBadge, PriorityBadge, getInitials } from "@/lib/utils-badges";
import { TaskFormModal } from "./TaskFormModal";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";

const PER_PAGE = 5;

export function TareasTab() {
  const { tasks, projects, team, deleteTask } = useStore();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const filtered = tasks.filter((t) => {
    const user = team.find((m) => m.id === t.userId);
    return (
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      (user && user.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE) || 1;
  const safePage = Math.min(page, totalPages);
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  function handleEdit(t: Task) {
    setEditTask(t);
    setFormOpen(true);
  }

  function handleNew() {
    setEditTask(null);
    setFormOpen(true);
  }

  function handleDelete(id: number) {
    if (confirm("¿Eliminar esta tarea?")) deleteTask(id);
  }

  function handleSearch(v: string) {
    setSearch(v);
    setPage(1);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Tareas</h1>
          <p className="text-sm text-slate-500 mt-1">{tasks.length} tareas en total</p>
        </div>
        <Button onClick={handleNew} className="bg-emerald-700 hover:bg-emerald-800">
          <Plus className="h-4 w-4 mr-1" /> Nueva tarea
        </Button>
      </div>

      <Card className="border-emerald-100">
        <CardHeader>
          <CardTitle className="text-base">Gestión de tareas</CardTitle>
          <CardDescription>Administra todas las tareas de tus proyectos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 bg-emerald-50/60 rounded-lg px-3 py-2 mb-4">
            <Search className="h-4 w-4 text-slate-400" />
            <Input
              className="border-0 bg-transparent p-0 h-auto focus-visible:ring-0 text-sm placeholder:text-slate-400"
              placeholder="Buscar por descripción o asignado..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descripción</TableHead>
                <TableHead>Proyecto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Asignado</TableHead>
                <TableHead>Fecha límite</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paged.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-slate-400 py-12">
                    No hay tareas que mostrar
                  </TableCell>
                </TableRow>
              ) : (
                paged.map((t) => {
                  const proj = projects.find((p) => p.id === t.projectId);
                  const user = team.find((m) => m.id === t.userId);
                  return (
                    <TableRow key={t.id}>
                      <TableCell className="font-medium max-w-[180px] truncate">{t.description}</TableCell>
                      <TableCell className="text-xs text-slate-500">{proj?.title ?? "—"}</TableCell>
                      <TableCell><StatusBadge status={t.status} /></TableCell>
                      <TableCell><PriorityBadge priority={t.priority} /></TableCell>
                      <TableCell>
                        {user ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{user.name.split(" ")[0]}</span>
                          </div>
                        ) : "—"}
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">{t.deadline}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => handleEdit(t)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(t.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={safePage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <PaginationItem key={n}>
                    <PaginationLink
                      isActive={n === safePage}
                      onClick={() => setPage(n)}
                      className="cursor-pointer"
                    >
                      {n}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={safePage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>

      <TaskFormModal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditTask(null); }}
        task={editTask}
      />
    </div>
  );
}