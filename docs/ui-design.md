# Taskify UI Redesign

This document summarizes the proposed UI built around the existing Taskify application. It extracts the essential features of the current project and describes a modern interface using Next.js 14, TailwindCSS and TypeScript.

## 1. Technology Stack
- **Next.js 14** with a hybrid pages/app router for SEO and fast client-side navigation.
- **TypeScript** for all React components and API interfaces with `zod` for validation.
- **TailwindCSS** for styling and pure CSS animations.
- **Zustand** for UI state management.
- **SWR** for data fetching from the .NET API.
- **.NET Web API** backend with PostgreSQL and Prisma ORM.

## 2. Layout Overview
- **Header** with search bar, theme toggle, notifications and user menu.
- **Sidebar** listing dashboard, AI generated tasks, lists/labels, calendar and docs. Collapses to a drawer on small screens.
- **Content Area** with contextual controls such as view toggles, filters and sorting.
- **Footer** contains minimal links and optional API status indicator.

## 3. Key Features
- **AI Generated Tasks** using the OpenAI API.
- **Natural Language Processing** for quick task creation (`@mentions`, `#labels`, due dates) with inline confirmation.
- **Speech Recognition** using `react-speech-recognition`.
- **Subtasks and Recurrence** with `date-fns` utilities.
- **Drag and Drop** interactions powered by `dnd-kit` across list, kanban and calendar views.
- **Multiple Views**: list, kanban and calendar with a user preference stored via Zustand.
- **Dark/Light Mode** with CSS variables and persistent preference.
- **Responsive Drawers** for sidebar and modals on mobile devices.
- **Loading Skeletons** and error banners to communicate network state.

## 4. Pages
- **Landing Page** introducing the product with a hero section, feature overview and live demo embed.
- **Docs** containing getting started guides, feature explanations and interactive examples.
- **Authentication** pages for sign‑in and sign‑up.
- **Dashboard** presenting tasks in list/kanban/calendar modes.
- **Task Detail** page or modal showing full description, subtasks, comments and metadata.
- **Labels Management** page to create and edit labels.

## 5. Component Structure
```
/src
  /components
    /Layout (Header, Sidebar, Footer)
    /Task (TaskCard, TaskModal, TaskDetail, SubtaskList)
    /Lists (ListSidebar, LabelCard, LabelModal)
    /Views (ListView, KanbanView, CalendarView)
    /UI (Button, Input, Modal, Drawer, Spinner, Skeleton)
    /Widgets (AISuggestions, RecurrencePicker, SpeechInput)
  /pages
    index.tsx (Landing)
    /docs
    /auth
    dashboard.tsx
    /tasks/[id].tsx
    labels.tsx
  /state (Zustand store definitions)
  /utils (NLP helpers, date helpers, API fetchers)
  /styles (global Tailwind styles and animation keyframes)
```

## 6. Accessibility & Keyboard Shortcuts
- Global shortcuts for quick actions (`/` to search, `c` to create a task, `f` to open filters).
- ARIA labels on all interactive elements.
- Reduced motion preference supported.

## 7. Theme & Layout Customization
- Sidebar width and collapsed state stored in localStorage.
- Optional panels ("Today" overview, AI suggestions) can be collapsed.
- Mobile modals presented as full-screen drawers.

The goal of this UI redesign is to provide a sleek and intuitive experience while leveraging the robust .NET backend already present in this repository. Developers can use this document as a blueprint for implementing the new interface.
