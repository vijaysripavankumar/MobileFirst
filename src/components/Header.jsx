import React from "react";
import { Menu, Plus, Calendar, Bell, Sparkles } from "lucide-react";

/**
 * Top header component with breadcrumbs, quick actions, and mobile toggle
 */
export default function Header({ onOpenSidebar, onAddTask }) {
  // Current date formatted e.g. "Monday, Nov 23, 2026"
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
          <div className="greeting-pill">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Workspace</span>
          </div>
          <h1 className="header-title">Dashboard Overview</h1>
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
