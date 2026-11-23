import React from "react";
import {
  Menu,
  Plus,
  Calendar,
  Bell,
  Sparkles,
  LogOut,
  LogIn,
  User
} from "lucide-react";

/**
 * Top header component with breadcrumbs, user session controls, and quick actions
 */
export default function Header({
  onOpenSidebar,
  onAddTask,
  activeNav = "tasks",
  currentUser = null,
  onLogout,
  onOpenLogin
}) {
  const navLabels = {
    dashboard: "Application Overview",
    focus: "Focus Notes",
    analytics: "Analytics",
    tasks: "Task Management",
    planner: "AI Planner",
    agents: "AI Agents",
    team: "Team Space",
    calendar: "Calendar",
    automation: "Automation Hub",
    integrations: "Integrations",
    ops: "Platform Ops",
    intelligence: "Data Intelligence",
    security: "Security SOC",
    lifecycle: "Product Lifecycle",
    insights: "Intelligence",
    admin: "Enterprise Admin",
    financial: "Financial Intelligence"
  };
  const activeLabel = navLabels[activeNav] || "Task Management";
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date());

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onOpenSidebar}
          aria-label="Open sidebar navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="header-greeting">
          <nav className="header-breadcrumb" aria-label="Breadcrumb">
            <span>Application</span>
            <span className="breadcrumb-separator" aria-hidden="true">/</span>
            <strong>{activeLabel}</strong>
          </nav>
        </div>
      </div>

      <div className="header-right">
        {/* Date display */}
        <div className="header-date-badge" aria-label={`Today's date: ${formattedDate}`}>
          <Calendar size={16} className="date-icon" />
          <span>{formattedDate}</span>
        </div>

        {/* Notifications mock button */}
        <button
          type="button"
          className="header-icon-btn"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="notification-dot" />
        </button>

        {/* User Session Profile & Log In / Out Button */}
        {currentUser ? (
          <div className="header-user-profile" title={`Logged in as ${currentUser.name} (${currentUser.email})`}>
            <div className="header-user-avatar" aria-hidden="true">
              <span>{currentUser.avatarInitials || "U"}</span>
            </div>
            <button
              type="button"
              className="header-logout-btn"
              onClick={onLogout}
              aria-label="Log Out of FocusBoard"
              title="Log Out"
            >
              <LogOut size={16} aria-hidden="true" />
              <span className="logout-text">Logout</span>
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn btn--secondary header-signin-btn"
            onClick={onOpenLogin}
          >
            <LogIn size={16} aria-hidden="true" />
            <span>Sign In</span>
          </button>
        )}

        {/* Primary Action Button: Add Task */}
        <button
          type="button"
          className="btn btn--primary add-task-btn"
          onClick={onAddTask}
          id="btn-add-task-header"
        >
          <Plus size={18} aria-hidden="true" />
          <span>Add Task</span>
        </button>
      </div>
    </header>
  );
}
