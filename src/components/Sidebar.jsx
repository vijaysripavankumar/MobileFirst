import React from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Sparkles,
  BarChart3,
  Settings,
  X,
  Target,
  Flame,
  LogOut,
  LogIn
} from "lucide-react";

/**
 * Sidebar navigation component
 * Supports desktop fixed sidebar, mobile slide-out drawer, and dynamic user profile/logout
 */
export default function Sidebar({
  isOpen,
  onClose,
  activeNav = "dashboard",
  setActiveNav,
  stats = { total: 0, completed: 0, percentage: 0 },
  currentUser = null,
  onLogout,
  onOpenLogin
}) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "My Tasks", icon: CheckSquare, badge: stats.total },
    { id: "focus", label: "Focus Notes", icon: Sparkles },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${isOpen ? "sidebar--open" : ""}`}
        aria-label="Main Navigation"
      >
        {/* Brand header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-logo" aria-hidden="true">
              <Target size={22} className="brand-icon" />
            </div>
            <div className="brand-text">
              <span className="brand-name">FocusBoard</span>
              <span className="brand-tag">Productivity Hub</span>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close navigation sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="sidebar-nav">
          <span className="nav-section-title">MAIN MENU</span>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    type="button"
                    className={`nav-link ${isActive ? "nav-link--active" : ""}`}
                    onClick={() => {
                      if (setActiveNav) setActiveNav(item.id);
                      if (isOpen) onClose();
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon size={19} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="nav-badge" aria-label={`${item.badge} tasks`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Productivity card in sidebar */}
        <div className="sidebar-productivity-card">
          <div className="productivity-card-header">
            <Flame size={18} className="flame-icon" />
            <span>Daily Focus Goal</span>
          </div>
          <p className="productivity-card-desc">
            {stats.completed} of {stats.total} tasks completed today.
          </p>
          <div
            className="progress-bar-track"
            role="progressbar"
            aria-valuenow={stats.percentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-bar-fill"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
          <span className="progress-percentage-label">{stats.percentage}% target reached</span>
        </div>

        {/* User profile footer with Login / Logout */}
        <div className="sidebar-footer">
          {currentUser ? (
            <>
              <div className="user-avatar" aria-hidden="true">
                <span>{currentUser.avatarInitials || "U"}</span>
                <span className="status-dot-online" title="Online" />
              </div>
              <div className="user-info">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role">{currentUser.role || "Member"}</span>
              </div>
              <button
                type="button"
                className="sidebar-logout-btn"
                onClick={onLogout}
                title="Log Out"
                aria-label="Log Out of FocusBoard"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <div className="sidebar-guest-box">
              <div className="guest-info">
                <span className="guest-label">Guest Preview</span>
              </div>
              <button
                type="button"
                className="sidebar-signin-btn"
                onClick={onOpenLogin}
              >
                <LogIn size={15} />
                <span>Sign In</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
