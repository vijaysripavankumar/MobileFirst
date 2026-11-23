/**
 * Sample initial tasks for FocusBoard
 * Loaded only on first launch if no tasks exist in localStorage
 */
export const SAMPLE_TASKS = [
  {
    id: "task-101",
    title: "Design System Tokens & Palette",
    description: "Create cohesive color tokens, typographic hierarchy, and component spacing scale for the new product dashboard.",
    category: "Design",
    status: "completed",
    priority: "high",
    dueDate: "2026-11-20"
  },
  {
    id: "task-102",
    title: "Implement Authentication Flow",
    description: "Build secure JWT token handling, OAuth provider integration, and refresh token interceptor in the API client.",
    category: "Development",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-11-26"
  },
  {
    id: "task-103",
    title: "User Interview Synthesizing",
    description: "Transcribe 8 qualitative user interviews, tag pain points, and build user persona affinity diagram.",
    category: "Research",
    status: "in-progress",
    priority: "medium",
    dueDate: "2026-11-28"
  },
  {
    id: "task-104",
    title: "Optimize LCP and Web Vitals",
    description: "Audit bundle chunks, implement image lazy loading, and defer non-critical third-party analytics scripts.",
    category: "Performance",
    status: "todo",
    priority: "medium",
    dueDate: "2026-12-02"
  },
  {
    id: "task-105",
    title: "Q4 Product Launch Campaign",
    description: "Draft announcement newsletter, coordinate social media banners, and schedule product hunt preview.",
    category: "Marketing",
    status: "todo",
    priority: "low",
    dueDate: "2026-12-05"
  },
  {
    id: "task-106",
    title: "Database Indexing & Query Tuning",
    description: "Analyze slow query logs on PostgreSQL, add composite indexes to high-frequency joined tables.",
    category: "DevOps",
    status: "completed",
    priority: "high",
    dueDate: "2026-11-18"
  },
  {
    id: "task-107",
    title: "Accessibility Audit (WCAG 2.1 AA)",
    description: "Test keyboard tab flows, ARIA roles, color contrast ratios, and screen reader announcements.",
    category: "Quality",
    status: "todo",
    priority: "high",
    dueDate: "2026-11-30"
  }
];
