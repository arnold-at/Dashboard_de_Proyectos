"use client";

import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatusBadge } from "@/lib/utils-badges";
import { Progress } from "@/components/ui/progress";

export function ResumenTab() {
  const { projects, team, tasks } = useStore();

  const completed = projects.filter((p) => p.status === "Completado").length;
  const tasksDone = tasks.filter((t) => t.status === "Completado").length;
  const activeMembers = team.filter((m) => m.isActive).length;
  const inProgress = projects.filter((p) => p.status === "En progreso").length;

  const tasksByStatus = ["Pendiente", "En progreso", "Completado"].map((s) => ({
    status: s,
    count: tasks.filter((t) => t.status === s).length,
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Resumen del Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Vista general de todos los proyectos</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total proyectos", value: projects.length, sub: `${completed} completados` },
          { label: "Tareas completadas", value: tasksDone, sub: `de ${tasks.length} totales` },
          { label: "Miembros activos", value: activeMembers, sub: `de ${team.length} totales` },
          { label: "En progreso", value: inProgress, sub: "proyectos activos" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-emerald-50 rounded-xl p-4">
            <p className="text-xs text-emerald-700/70 mb-1">{label}</p>
            <p className="text-3xl font-semibold text-emerald-800">{value}</p>
            <p className="text-xs text-emerald-600/70 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent projects */}
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-base">Proyectos recientes</CardTitle>
            <CardDescription>Estado actual de proyectos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 mb-1 truncate">{p.title}</p>
                  <Progress value={p.progress} className="h-1.5" />
                </div>
                <span className="text-xs font-semibold text-emerald-700 shrink-0">{p.progress}%</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Task distribution */}
        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle className="text-base">Distribución de tareas</CardTitle>
            <CardDescription>Por estado actual</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasksByStatus.map(({ status, count }) => {
              const pct = tasks.length ? Math.round((count / tasks.length) * 100) : 0;
              return (
                <div key={status} className="flex items-center gap-3">
                  <div className="w-28 shrink-0">
                    <StatusBadge status={status as any} />
                  </div>
                  <Progress value={pct} className="flex-1 h-1.5" />
                  <span className="text-xs text-slate-500 w-16 text-right shrink-0">{count} tareas</span>
                </div>
              );
            })}
            <div className="pt-2 border-t border-emerald-50 flex justify-between text-sm">
              <span className="text-slate-500">Total tareas</span>
              <span className="font-semibold text-slate-700">{tasks.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}