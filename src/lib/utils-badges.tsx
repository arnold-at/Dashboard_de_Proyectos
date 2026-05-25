"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { TaskPriority, TaskStatus, ProjectStatus } from "@/types";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export function getStatusVariant(status: TaskStatus | ProjectStatus): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    "Completado": "default",
    "En progreso": "secondary",
    "Pendiente": "outline",
    "En revisión": "outline",
    "Planificado": "outline",
  };
  return map[status] ?? "outline";
}

export function getPriorityVariant(priority: TaskPriority): BadgeVariant {
  const map: Record<TaskPriority, BadgeVariant> = {
    Urgente: "destructive",
    Alta: "default",
    Media: "secondary",
    Baja: "outline",
  };
  return map[priority] ?? "outline";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function StatusBadge({ status }: { status: TaskStatus | ProjectStatus }) {
  return <Badge variant={getStatusVariant(status)}>{status}</Badge>;
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return <Badge variant={getPriorityVariant(priority)}>{priority}</Badge>;
}