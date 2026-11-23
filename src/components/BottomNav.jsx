import React from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  BarChart3,
  Plus
} from "lucide-react";

/**
 * Mobile bottom navigation bar
 * Visible only on tablet/mobile screens (≤768px)
 * Provides thumb-friendly quick access to key sections
 */
export default function BottomNav({
  activeNav = "dashboard",
  setActiveNav,
  onAddTask,
  taskCount = 0
}) {
  const navItems = [
    { id: "dashboard", label: "Home", icon: LayoutDashboard },
    { id: "tasks", label: "Tasks", icon: CheckSquare, badge: taskCount },
    { id: "add", label: "Add", icon: Plus, isAction: true },
    { id: "focus", label: "Focus", icon: Sparkles },
    { id: "analytics", label: "Stats", icon: BarChart3 }
  ];

  return (
    <nav className="bottom-nav" aria-label="Mobile bottom navigation">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = !item.isAction && activeNav === item.id;

        if (item.isAction) {
          return (
            <button
              key={item.id}
              type="button"
              className="bottom-nav-item bottom-nav-fab"
              onClick={onAddTask}
              aria-label="Create new task"
            >
              <div className="bottom-nav-fab-circle">
                <Icon size={22} />
              </div>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            className={`bottom-nav-item ${isActive ? "bottom-nav-item--active" : ""}`}
            onClick={() => setActiveNav(item.id)}
            aria-current={isActive ? "page" : undefined}
          >
            <div className="bottom-nav-icon-wrap">
              <Icon size={20} />
              {item.badge > 0 && (
                <span className="bottom-nav-badge">{item.badge > 9 ? "9+" : item.badge}</span>
              )}
            </div>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
