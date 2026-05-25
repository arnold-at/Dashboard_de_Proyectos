"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Project, TeamMember, Task, AppConfig } from "@/types";
import { initialProjects, initialTeam, initialTasks, initialConfig } from "@/lib/data";

let nextId = 20;

interface StoreCtx {
  projects: Project[];
  team: TeamMember[];
  tasks: Task[];
  config: AppConfig;
  addProject: (p: Omit<Project, "id">) => void;
  updateProject: (id: number, p: Partial<Project>) => void;
  deleteProject: (id: number) => void;
  addMember: (m: Omit<TeamMember, "id">) => void;
  updateMember: (id: number, m: Partial<TeamMember>) => void;
  deleteMember: (id: number) => void;
  addTask: (t: Omit<Task, "id">) => void;
  updateTask: (id: number, t: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  updateConfig: (c: Partial<AppConfig>) => void;
}

const Store = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [config, setConfig] = useState<AppConfig>(initialConfig);

  const addProject = useCallback((p: Omit<Project, "id">) => {
    setProjects((prev) => [...prev, { ...p, id: nextId++ }]);
  }, []);

  const updateProject = useCallback((id: number, p: Partial<Project>) => {
    setProjects((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));
  }, []);

  const deleteProject = useCallback((id: number) => {
    setProjects((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const addMember = useCallback((m: Omit<TeamMember, "id">) => {
    setTeam((prev) => [...prev, { ...m, id: nextId++ }]);
  }, []);

  const updateMember = useCallback((id: number, m: Partial<TeamMember>) => {
    setTeam((prev) => prev.map((x) => (x.id === id ? { ...x, ...m } : x)));
  }, []);

  const deleteMember = useCallback((id: number) => {
    setTeam((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const addTask = useCallback((t: Omit<Task, "id">) => {
    setTasks((prev) => [...prev, { ...t, id: nextId++ }]);
  }, []);

  const updateTask = useCallback((id: number, t: Partial<Task>) => {
    setTasks((prev) => prev.map((x) => (x.id === id ? { ...x, ...t } : x)));
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const updateConfig = useCallback((c: Partial<AppConfig>) => {
    setConfig((prev) => ({ ...prev, ...c }));
  }, []);

  return (
    <Store.Provider value={{ projects, team, tasks, config, addProject, updateProject, deleteProject, addMember, updateMember, deleteMember, addTask, updateTask, deleteTask, updateConfig }}>
      {children}
    </Store.Provider>
  );
}

export function useStore() {
  const ctx = useContext(Store);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}