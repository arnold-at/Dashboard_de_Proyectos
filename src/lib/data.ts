import { Project, TeamMember, Task, AppConfig } from "@/types";

export const initialProjects: Project[] = [
  { id: 1, title: "E-commerce Platform", description: "Plataforma con Next.js", status: "En progreso", progress: 65, members: ["María García", "Juan Pérez"] },
  { id: 2, title: "Mobile App", description: "Aplicación React Native", status: "En revisión", progress: 90, members: ["Ana López"] },
  { id: 3, title: "Dashboard Analytics", description: "Panel con visualizaciones", status: "Planificado", progress: 20, members: ["Carlos Ruiz", "Laura Martínez"] },
  { id: 4, title: "API Gateway", description: "Microservicios Node.js", status: "En progreso", progress: 45, members: ["Juan Pérez", "María García", "Carlos Ruiz"] },
  { id: 5, title: "Design System", description: "Librería de componentes", status: "Completado", progress: 100, members: ["Ana López"] },
  { id: 6, title: "Marketing Website", description: "Sitio institucional", status: "En progreso", progress: 75, members: ["Laura Martínez"] },
];

export const initialTeam: TeamMember[] = [
  { id: 1, userId: "u001", name: "María García", email: "maria@ex.com", role: "Frontend Developer", position: "Senior", birthdate: "1992-04-15", phone: "999-111-001", projectId: 1, isActive: true },
  { id: 2, userId: "u002", name: "Juan Pérez", email: "juan@ex.com", role: "Backend Developer", position: "Mid", birthdate: "1990-08-22", phone: "999-111-002", projectId: 1, isActive: true },
  { id: 3, userId: "u003", name: "Ana López", email: "ana@ex.com", role: "UI/UX Designer", position: "Senior", birthdate: "1994-01-10", phone: "999-111-003", projectId: 2, isActive: false },
  { id: 4, userId: "u004", name: "Carlos Ruiz", email: "carlos@ex.com", role: "DevOps Engineer", position: "Senior", birthdate: "1988-06-30", phone: "999-111-004", projectId: 3, isActive: true },
  { id: 5, userId: "u005", name: "Laura Martínez", email: "laura@ex.com", role: "Project Manager", position: "Lead", birthdate: "1986-11-05", phone: "999-111-005", projectId: 3, isActive: true },
];

export const initialTasks: Task[] = [
  { id: 1, description: "Implementar autenticación", projectId: 1, status: "En progreso", priority: "Alta", userId: 1, deadline: "2025-11-15" },
  { id: 2, description: "Diseñar pantalla de perfil", projectId: 2, status: "Pendiente", priority: "Media", userId: 3, deadline: "2025-11-20" },
  { id: 3, description: "Configurar CI/CD", projectId: 4, status: "Completado", priority: "Alta", userId: 4, deadline: "2025-11-10" },
  { id: 4, description: "Optimizar queries SQL", projectId: 1, status: "En progreso", priority: "Urgente", userId: 2, deadline: "2025-11-12" },
  { id: 5, description: "Documentar API endpoints", projectId: 4, status: "Pendiente", priority: "Baja", userId: 5, deadline: "2025-11-25" },
  { id: 6, description: "Pruebas de integración", projectId: 2, status: "Pendiente", priority: "Media", userId: 1, deadline: "2025-11-28" },
  { id: 7, description: "Revisión de diseño UI", projectId: 3, status: "En progreso", priority: "Alta", userId: 3, deadline: "2025-11-18" },
];

export const initialConfig: AppConfig = {
  notifications: true,
  weeklyReport: true,
  twoFactor: false,
  language: "es",
  timezone: "America/Lima",
  fullName: "",
  email: "",
};