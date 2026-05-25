"use client";

import { useState } from "react";
import { StoreProvider } from "@/lib/store";
import { ResumenTab } from "@/components/dashboard/ResumenTab";
import { ProyectosTab } from "@/components/dashboard/ProyectosTab";
import { EquipoTab } from "@/components/dashboard/EquipoTab";
import { TareasTab } from "@/components/dashboard/TareasTab";
import { ConfiguracionTab } from "@/components/dashboard/ConfiguracionTab";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CheckSquare,
  Settings,
  Hexagon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "resumen" | "proyectos" | "equipo" | "tareas" | "config";

const NAV_ITEMS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "proyectos", label: "Proyectos", icon: FolderKanban },
  { id: "equipo", label: "Equipo", icon: Users },
  { id: "tareas", label: "Tareas", icon: CheckSquare },
  { id: "config", label: "Configuración", icon: Settings },
];

export default function DashboardPage() {
  const [tab, setTab] = useState<Tab>("resumen");

  return (
    <StoreProvider>
      <div className="flex min-h-screen bg-emerald-50/30">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 bg-white border-r border-emerald-100 flex flex-col py-6 px-3">
          <div className="flex items-center gap-2 px-3 mb-8">
            <Hexagon className="h-6 w-6 text-emerald-700 fill-emerald-100" />
            <span className="text-lg font-semibold text-emerald-800">Proyectos</span>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left",
                  tab === id
                    ? "bg-emerald-50 text-emerald-700 font-medium"
                    : "text-slate-500 hover:bg-emerald-50/60 hover:text-emerald-700"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          {tab === "resumen" && <ResumenTab />}
          {tab === "proyectos" && <ProyectosTab />}
          {tab === "equipo" && <EquipoTab />}
          {tab === "tareas" && <TareasTab />}
          {tab === "config" && <ConfiguracionTab />}
        </main>
      </div>
    </StoreProvider>
  );
}