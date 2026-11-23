import React, { useState, useMemo } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import AuthView from "./components/AuthView";
import BottomNav from "./components/BottomNav";
import { SAMPLE_TASKS } from "./data/sampleTasks";
import { DEFAULT_USER } from "./data/defaultUser";
import useLocalStorage from "./hooks/useLocalStorage";
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  ListTodo,
  TrendingUp,
  AlertTriangle,
  Plus
} from "lucide-react";

const NAV_MODULES = {
  planner: {
    title: "AI Planner",
    description: "Plan work, prioritize outcomes, and turn ideas into actionable task sequences.",
    cards: ["Plan this week", "Suggested priorities", "Upcoming milestones"]
  },
  agents: {
    title: "AI Agents",
    description: "Manage automated assistants and review their active workflows.",
    cards: ["Active agents", "Agent requests", "Recent runs"]
  },
  team: {
    title: "Team Space",
    description: "Coordinate teammates, responsibilities, and shared projects.",
    cards: ["Team activity", "Assignments", "Shared projects"]
  },
  calendar: {
    title: "Calendar",
    description: "Review deadlines and scheduled focus time across your workspace.",
    cards: ["Today", "This week", "Upcoming deadlines"]
  },
  automation: {
    title: "Automation Hub",
    description: "Build and monitor workflows that keep routine work moving.",
    cards: ["Active automations", "Workflow health", "Recent triggers"]
  },
  integrations: {
    title: "Integrations",
    description: "Connect FocusBoard with the tools your team already uses.",
    cards: ["Connected apps", "Available integrations", "Sync history"]
  },
  ops: {
    title: "Platform Ops",
    description: "Monitor workspace operations, availability, and system activity.",
    cards: ["System health", "Active incidents", "Recent activity"]
  },
  intelligence: {
    title: "Data Intelligence",
    description: "Explore workspace trends and turn task activity into insights.",
    cards: ["Performance trends", "Team workload", "Completion forecast"]
  },
  security: {
    title: "Security SOC",
    description: "Review workspace security posture and recent audit events.",
    cards: ["Security overview", "Audit events", "Access reviews"]
  },
  lifecycle: {
    title: "Product Lifecycle",
    description: "Track work from planning and delivery through continuous improvement.",
    cards: ["Lifecycle stages", "Roadmap items", "Release readiness"]
  },
  insights: {
    title: "Intelligence",
    description: "View recommendations based on task, focus, and team performance.",
    cards: ["Smart insights", "Bottlenecks", "Recommendations"]
  },
  admin: {
    title: "Enterprise Admin",
    description: "Configure workspace access, policies, and organization settings.",
    cards: ["Members", "Roles & permissions", "Workspace settings"]
  },
  financial: {
    title: "Financial Intelligence",
    description: "Monitor budget activity and financial performance indicators.",
    cards: ["Budget overview", "Cost drivers", "Forecast"]
  }
};

export default function App() {
  // Authentication session state (persisted in localStorage)
  const [currentUser, setCurrentUser] = useLocalStorage(
    "focusboard_auth_user",
    DEFAULT_USER
  );
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Persistent tasks state via custom hook (seeds with SAMPLE_TASKS on first load only)
  const [tasks, setTasks] = useLocalStorage("focusboard_tasks_v1", SAMPLE_TASKS);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [activePriority, setActivePriority] = useState("all");

  // UI Navigation & Modal states
  const [activeNav, setActiveNav] = useState("tasks");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Confirmation dialog state for deleting a task
  const [taskPendingDelete, setTaskPendingDelete] = useState(null);

  // Dynamic statistics calculation (Never hardcoded!)
  const stats = useMemo(() => {
    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === "todo").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      todo,
      inProgress,
      completed,
      percentage
    };
  }, [tasks]);

  // Combined Filtering: Search Query + Status Tab + Priority Dropdown
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Case-insensitive title search
      const matchesSearch =
        !searchQuery.trim() ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase().trim()));

      // 2. Status filter
      const matchesStatus =
        activeStatus === "all" || task.status === activeStatus;

      // 3. Priority filter
      const matchesPriority =
        activePriority === "all" ||
        task.priority.toLowerCase() === activePriority.toLowerCase();

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, activeStatus, activePriority]);

  const isFiltered =
    Boolean(searchQuery.trim()) ||
    activeStatus !== "all" ||
    activePriority !== "all";

  // Auth Operations
  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsGuestMode(false);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsGuestMode(false);
  };

  const handleContinueAsGuest = () => {
    setIsGuestMode(true);
    setIsAuthModalOpen(false);
  };

  // CRUD Operation: Create new task
  const handleCreateTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // CRUD Operation: Update existing task
  const handleUpdateTask = (taskData) => {
    setTasks((prev) =>
      prev.map((item) => (item.id === taskData.id ? { ...item, ...taskData } : item))
    );
  };

  // CRUD Operation: Fast status update from card dropdown
  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId ? { ...item, status: newStatus } : item
      )
    );
  };

  // CRUD Operation: Initiate delete with confirmation
  const handlePromptDelete = (taskId) => {
    const target = tasks.find((t) => t.id === taskId);
    if (target) {
      setTaskPendingDelete(target);
    }
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    if (taskPendingDelete) {
      setTasks((prev) => prev.filter((t) => t.id !== taskPendingDelete.id));
      setTaskPendingDelete(null);
    }
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setTaskPendingDelete(null);
  };

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  // Close form modal
  const handleCloseModal = () => {
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  // Reset all search and filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveStatus("all");
    setActivePriority("all");
  };

  const handleNavigation = (navId) => {
    setActiveNav(navId);
    const sectionId =
      navId === "tasks" ? "tasks-section" :
      navId === "planner" || navId === "focus" ? "focus-section" :
      navId === "dashboard" || navId === "analytics" ? "dashboard-top" :
      "dashboard-top";
    window.requestAnimationFrame(() => {
      if (NAV_MODULES[navId]) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  // If user is not logged in and hasn't chosen guest preview, show Auth view
  if (!currentUser && !isGuestMode) {
    return (
      <AuthView
        onLogin={handleLogin}
        onContinueAsGuest={handleContinueAsGuest}
      />
    );
  }

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeNav={activeNav}
        setActiveNav={handleNavigation}
        stats={stats}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenLogin={() => setIsAuthModalOpen(true)}
      />

      {/* Main Workspace Area */}
      <div className="main-wrapper">
        <Header
          onOpenSidebar={() => setIsSidebarOpen(true)}
          onAddTask={handleOpenCreateModal}
          activeNav={activeNav}
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenLogin={() => setIsAuthModalOpen(true)}
        />

        <main className="dashboard-content">
          {NAV_MODULES[activeNav] ? (
            <section className="module-page" aria-label={NAV_MODULES[activeNav].title}>
              <div className="module-page-header">
                <div>
                  <span className="module-eyebrow">Application</span>
                  <h1>{NAV_MODULES[activeNav].title}</h1>
                  <p>{NAV_MODULES[activeNav].description}</p>
                </div>
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={handleOpenCreateModal}
                >
                  <Plus size={16} aria-hidden="true" />
                  <span>Create</span>
                </button>
              </div>
              <div className="module-card-grid">
                {NAV_MODULES[activeNav].cards.map((card) => (
                  <button
                    type="button"
                    className="module-card"
                    key={card}
                    onClick={() => handleNavigation("tasks")}
                  >
                    <span className="module-card-title">{card}</span>
                    <span className="module-card-action">Open workspace</span>
                  </button>
                ))}
              </div>
            </section>
          ) : (
          <>
          {/* Section 1: Dynamic Statistics Cards */}
          <section id="dashboard-top" className="stats-section" aria-label="Dashboard Performance Statistics">
            <div className="stats-grid">
              <StatCard
                title="Total Tasks"
                value={stats.total}
                icon={CheckSquare}
                variant="primary"
                subtext="Active items in pipeline"
              />
              <StatCard
                title="To Do"
                value={stats.todo}
                icon={ListTodo}
                variant="blue"
                subtext="Pending start"
              />
              <StatCard
                title="In Progress"
                value={stats.inProgress}
                icon={Clock}
                variant="amber"
                subtext="Currently being worked on"
              />
              <StatCard
                title="Completed"
                value={stats.completed}
                icon={CheckCircle2}
                variant="green"
                subtext="Successfully finished"
              />
              <StatCard
                title="Completion Rate"
                value={`${stats.percentage}%`}
                icon={TrendingUp}
                variant="purple"
                subtext="Overall sprint goal"
                progressBar={stats.percentage}
              />
            </div>
          </section>

          {/* Section 2: Focus Notes Carousel */}
          <div id="focus-section">
            <FocusNotes />
          </div>

          {/* Section 3: Task Management Section */}
          <section id="tasks-section" className="tasks-management-section" aria-label="Task Management and Filters">
            {/* Controls Bar: Search & Quick Add */}
            <div className="tasks-top-bar">
              <div className="tasks-top-left">
                <h2 className="section-heading">Tasks Board</h2>
                <span className="section-subheading">
                  Showing {filteredTasks.length} of {tasks.length} total tasks
                </span>
              </div>
              <div className="tasks-top-actions">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onClear={() => setSearchQuery("")}
                />
                <button
                  type="button"
                  className="btn btn--primary btn--mobile-add"
                  onClick={handleOpenCreateModal}
                >
                  <Plus size={16} aria-hidden="true" />
                  <span>New Task</span>
                </button>
              </div>
            </div>

            {/* Status Tabs and Priority Filters */}
            <FilterTabs
              activeStatus={activeStatus}
              onStatusChange={setActiveStatus}
              activePriority={activePriority}
              onPriorityChange={setActivePriority}
              counts={{
                all: stats.total,
                todo: stats.todo,
                "in-progress": stats.inProgress,
                completed: stats.completed
              }}
              onResetFilters={handleResetFilters}
            />

            {/* Task Cards Grid or Empty State */}
            <TaskList
              tasks={filteredTasks}
              onEditTask={handleOpenEditModal}
              onDeleteTask={handlePromptDelete}
              onStatusChange={handleStatusChange}
              onAddTask={handleOpenCreateModal}
              isFiltered={isFiltered}
              onResetFilters={handleResetFilters}
            />
          </section>
          </>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (visible ≤768px) */}
      <BottomNav
        activeNav={activeNav}
        setActiveNav={handleNavigation}
        onAddTask={handleOpenCreateModal}
        taskCount={stats.total}
      />

      {/* Auth Modal for Switching Accounts or Logging in from Guest */}
      {isAuthModalOpen && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAuthModalOpen(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="auth-modal-wrapper">
            <AuthView
              onLogin={handleLogin}
              onContinueAsGuest={() => setIsAuthModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Reusable Create / Edit Task Modal */}
      <TaskForm
        isOpen={isTaskModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        initialData={editingTask}
      />

      {/* Delete Confirmation Modal Dialog */}
      {taskPendingDelete && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCancelDelete();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-delete-title"
        >
          <div className="modal-container modal-container--sm">
            <div className="confirm-delete-body">
              <div className="delete-icon-warning" aria-hidden="true">
                <AlertTriangle size={28} />
              </div>
              <h3 id="confirm-delete-title" className="confirm-delete-title">
                Delete Task?
              </h3>
              <p className="confirm-delete-desc">
                Are you sure you want to delete{" "}
                <strong>"{taskPendingDelete.title}"</strong>? This action will remove
                the task from your FocusBoard and cannot be undone.
              </p>
              <div className="confirm-delete-actions">
                <button
                  type="button"
                  className="btn btn--secondary"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn--danger"
                  onClick={handleConfirmDelete}
                >
                  Yes, Delete Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
