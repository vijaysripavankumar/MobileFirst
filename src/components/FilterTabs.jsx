import React from "react";
import { Filter, SlidersHorizontal, CheckCircle2, Clock, ListTodo } from "lucide-react";

/**
 * FilterTabs component
 * Combines Status tabs and Priority dropdown/selector
 */
export default function FilterTabs({
  activeStatus,
  onStatusChange,
  activePriority,
  onPriorityChange,
  counts = { all: 0, todo: 0, "in-progress": 0, completed: 0 },
  onResetFilters
}) {
  const statusTabs = [
    { id: "all", label: "All Tasks", count: counts.all, icon: null },
    { id: "todo", label: "To Do", count: counts.todo, icon: ListTodo },
    { id: "in-progress", label: "In Progress", count: counts["in-progress"], icon: Clock },
    { id: "completed", label: "Completed", count: counts.completed, icon: CheckCircle2 }
  ];

  const priorityOptions = [
    { value: "all", label: "All Priorities" },
    { value: "high", label: "High Priority" },
    { value: "medium", label: "Medium Priority" },
    { value: "low", label: "Low Priority" }
  ];

  const isFiltered = activeStatus !== "all" || activePriority !== "all";

  return (
    <div className="filter-controls-bar">
      {/* Status Segmented Tabs */}
      <div className="status-tabs-list" role="tablist" aria-label="Task status filters">
        {statusTabs.map((tab) => {
          const isActive = activeStatus === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`status-tab ${isActive ? "status-tab--active" : ""}`}
              onClick={() => onStatusChange(tab.id)}
            >
              {Icon && <Icon size={15} className="status-tab-icon" aria-hidden="true" />}
              <span>{tab.label}</span>
              <span className={`status-tab-count ${isActive ? "status-tab-count--active" : ""}`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Priority Dropdown and Quick Reset */}
      <div className="filter-dropdown-group">
        <label htmlFor="priority-filter-select" className="filter-select-label">
          <SlidersHorizontal size={15} className="filter-label-icon" aria-hidden="true" />
          <span>Priority:</span>
        </label>
        <select
          id="priority-filter-select"
          className="priority-select"
          value={activePriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          aria-label="Filter tasks by priority"
        >
          {priorityOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {isFiltered && (
          <button
            type="button"
            className="filter-reset-btn"
            onClick={onResetFilters}
            title="Reset filters"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
