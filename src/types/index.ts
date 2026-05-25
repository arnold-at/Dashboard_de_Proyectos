export type ProjectStatus = "Planificado" | "En progreso" | "En revisión" | "Completado";
export type TaskStatus = "Pendiente" | "En progreso" | "Completado";
export type TaskPriority = "Baja" | "Media" | "Alta" | "Urgente";
export type MemberPosition = "Junior" | "Mid" | "Senior" | "Lead" | "Principal";

export interface Project {
  id: number;
  title: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  members: string[];
}

export interface TeamMember {
  id: number;
  userId: string;
  name: string;
  email: string;
  role: string;
  position: MemberPosition;
  birthdate: string;
  phone: string;
  projectId: number | null;
  isActive: boolean;
}

export interface Task {
  id: number;
  description: string;
  projectId: number | null;
  status: TaskStatus;
  priority: TaskPriority;
  userId: number | null;
  deadline: string;
}

export interface AppConfig {
  notifications: boolean;
  weeklyReport: boolean;
  twoFactor: boolean;
  language: string;
  timezone: string;
  fullName: string;
  email: string;
}