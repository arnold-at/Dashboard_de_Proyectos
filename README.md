# 📊 Dashboard de Proyectos

Una aplicación web de gestión de proyectos construida con **Next.js 15**, **shadcn/ui** y **TypeScript**. Permite gestionar proyectos, equipo, tareas y configuración desde un panel de control moderno y responsivo.

---

## 🖼️ Vista previa

> Dashboard principal con sidebar de navegación, métricas en tiempo real y gestión completa de datos en memoria.

---

## ✨ Funcionalidades

### 📋 Resumen
- Métricas dinámicas calculadas en tiempo real: total de proyectos, tareas completadas, miembros activos y proyectos en progreso
- Gráfico de progreso por proyecto
- Distribución de tareas por estado

### 📁 Proyectos
- CRUD completo de proyectos
- Campos: título, descripción, estado, progreso (%) y miembros del equipo
- Vista de detalle con tareas asignadas al proyecto
- Badges de estado visuales

### 👥 Equipo
- CRUD completo de miembros
- Campos: `userId`, `name`, `email`, `role`, `position`, `birthdate`, `phone`, `projectId`, `isActive`
- Toggle de activación/desactivación por miembro
- Búsqueda en tiempo real por nombre, email o rol

### ✅ Tareas
- CRUD completo de tareas
- Campos: `description`, `projectId`, `status`, `priority`, `userId`, `deadline`
- Paginación de 5 items por página
- Búsqueda por descripción o miembro asignado
- Selector de fecha con componente **Calendar**

### ⚙️ Configuración
- Gestión de notificaciones push, reporte semanal y autenticación de dos factores
- Preferencias de idioma y zona horaria
- Actualización de datos de cuenta
- Zona de peligro (exportar datos, eliminar cuenta)

---

## 🛠️ Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [Next.js](https://nextjs.org/) | 15 | Framework principal |
| [React](https://react.dev/) | 19 | UI |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipado estático |
| [shadcn/ui](https://ui.shadcn.com/) | latest | Componentes UI |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Estilos |
| [Lucide React](https://lucide.dev/) | latest | Iconografía |
| [date-fns](https://date-fns.org/) | latest | Manejo de fechas |

### Componentes shadcn/ui utilizados

`Alert` · `Avatar` · `Badge` · `Button` · `Calendar` · `Card` · `Dialog` · `Input` · `Label` · `Pagination` · `Progress` · `Select` · `Spinner` · `Switch` · `Table`

---

## 🚀 Instalación y uso

### Requisitos previos

- Node.js 18+
- npm o pnpm

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/dashboard-proyectos.git
cd dashboard-proyectos
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Instalar componentes de shadcn/ui

```bash
npx shadcn@latest init

npx shadcn@latest add alert avatar badge button calendar card \
  dialog input label pagination progress select spinner switch table
```

### 4. Instalar date-fns

```bash
npm install date-fns
```

### 5. Ejecutar en desarrollo

```bash
npm run dev
```

Accede a [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   └── dashboard/
│       └── page.tsx              # Página principal con sidebar
├── components/
│   ├── dashboard/
│   │   ├── ResumenTab.tsx        # Métricas y resumen general
│   │   ├── ProyectosTab.tsx      # Lista y grid de proyectos
│   │   ├── ProjectFormModal.tsx  # Modal crear/editar proyecto
│   │   ├── ProjectDetailModal.tsx# Modal detalle de proyecto
│   │   ├── EquipoTab.tsx         # Tabla de miembros del equipo
│   │   ├── MemberFormModal.tsx   # Modal crear/editar miembro
│   │   ├── TareasTab.tsx         # Tabla de tareas con paginación
│   │   ├── TaskFormModal.tsx     # Modal crear/editar tarea
│   │   └── ConfiguracionTab.tsx  # Formulario de configuración
│   └── ui/                       # Componentes shadcn/ui
├── lib/
│   ├── data.ts                   # Datos iniciales en memoria
│   ├── store.tsx                 # Context API (estado global)
│   └── utils-badges.tsx          # Helpers de badges y utilidades
└── types/
    └── index.ts                  # Tipos TypeScript globales
```

---

## 🏗️ Arquitectura

El proyecto utiliza **Context API** de React como gestor de estado global. Toda la lógica vive en `lib/store.tsx`, que expone un hook `useStore()` con las operaciones CRUD de cada entidad.

```
StoreProvider (page.tsx)
└── useStore() hook
    ├── projects  → addProject / updateProject / deleteProject
    ├── team      → addMember  / updateMember  / deleteMember
    ├── tasks     → addTask    / updateTask    / deleteTask
    └── config    → updateConfig
```

> El estado es **en memoria** — se reinicia al recargar la página. Está preparado para conectarse a un backend.

---

## 🔌 Conexión con backend (Spring Boot)

El proyecto está diseñado para conectarse fácilmente a la API REST en Spring Boot corriendo en `http://localhost:8080`.

Para conectar, reemplaza las funciones del store en `lib/store.tsx`. Ejemplo:

```ts
// Antes (en memoria)
const addProject = (p) => setProjects(prev => [...prev, { ...p, id: nextId++ }]);

// Después (con fetch al backend)
const addProject = async (p) => {
  const res = await fetch("http://localhost:8080/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(p),
  });
  const created = await res.json();
  setProjects(prev => [...prev, created]);
};
```

### Endpoints esperados

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/projects` | Listar proyectos |
| `POST` | `/api/projects` | Crear proyecto |
| `PUT` | `/api/projects/:id` | Actualizar proyecto |
| `DELETE` | `/api/projects/:id` | Eliminar proyecto |
| `GET` | `/api/team` | Listar miembros |
| `POST` | `/api/team` | Crear miembro |
| `PUT` | `/api/team/:id` | Actualizar miembro |
| `DELETE` | `/api/team/:id` | Eliminar miembro |
| `GET` | `/api/tasks` | Listar tareas |
| `POST` | `/api/tasks` | Crear tarea |
| `PUT` | `/api/tasks/:id` | Actualizar tarea |
| `DELETE` | `/api/tasks/:id` | Eliminar tarea |

---

## ⚠️ Solución de problemas frecuentes

**Error: `Module '@/lib/utils-badges' has no exported member`**

Verifica que el archivo exista en `src/lib/utils-badges.tsx` y que tu `tsconfig.json` tenga el alias `@/` configurado:
```json
"paths": { "@/*": ["./src/*"] }
```

**El componente `Spinner` no existe**

Algunas versiones de shadcn no incluyen `Spinner`. Créalo manualmente:
```tsx
// src/components/ui/spinner.tsx
import { cn } from "@/lib/utils";
export function Spinner({ className }: { className?: string }) {
  return (
    <div className={cn("animate-spin rounded-full border-2 border-current border-t-transparent h-5 w-5", className)} />
  );
}
```

---

## 📝 Licencia

Este proyecto fue desarrollado con fines educativos.

---

<div align="center">
  Hecho con Next.js 15 + shadcn/ui
</div>