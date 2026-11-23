import React from "react";
import {
  Calendar,
  AlertCircle,
  Pencil,
  Trash2,
  CheckCircle2,
  Clock,
  Circle,
  Tag
} from "lucide-react";

/**
 * TaskCard Component
 * Renders individual task item with status update, priority badge, and CRUD action buttons
 */
export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const { id, title, description, category, status, priority, dueDate } = task;

  // Determine if task is overdue
  const isOverdue = React.useMemo(() => {
    if (!dueDate || status === "completed") return false;
    const due = new Date(dueDate);
    const today = new Date();
    // Reset hours for accurate date comparison
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }, [dueDate, status]);

  // Format date readable
  const formattedDueDate = React.useMemo(() => {
    if (!dueDate) return "No due date";
    try {
      const parts = dueDate.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        return new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        }).format(new Date(year, month, day));
      }
      return dueDate;
    } catch {
      return dueDate;
    }
  }, [dueDate]);

  // Priority metadata
  const priorityConfig = {
    high: { label: "High", className: "badge-priority--high" },
    medium: { label: "Medium", className: "badge-priority--medium" },
    low: { label: "Low", className: "badge-priority--low" }
  };

  const currentPriority = priorityConfig[priority?.toLowerCase()] || priorityConfig.medium;

  // Status icon
  const getStatusIcon = (st) => {
    switch (st) {
      case "completed":
        return <CheckCircle2 size={14} className="status-icon-completed" />;
      case "in-progress":
        return <Clock size={14} className="status-icon-inprogress" />;
      default:
        return <Circle size={14} className="status-icon-todo" />;
    }
  };

  return (
    <article
      className={`task-card ${status === "completed" ? "task-card--completed" : ""}`}
      aria-labelledby={`task-title-${id}`}
    >
      {/* Top Meta: Category & Priority */}
      <div className="task-card-meta">
        <span className="task-category-badge">
          <Tag size={12} aria-hidden="true" />
          <span>{category || "General"}</span>
        </span>

        <span className={`task-priority-badge ${currentPriority.className}`}>
          <span className="priority-dot" />
          <span>{currentPriority.label}</span>
        </span>
      </div>

      {/* Task Content */}
      <h3 id={`task-title-${id}`} className="task-title">
        {title}
      </h3>

      <p className="task-desc">{description || "No description provided."}</p>

      {/* Footer: Due date, Status selector, Edit/Delete Actions */}
      <div className="task-card-footer">
        <div className="task-footer-left">
          {/* Due date */}
          <div
            className={`task-due-date ${isOverdue ? "task-due-date--overdue" : ""}`}
            title={isOverdue ? "Task is overdue!" : "Due date"}
          >
            {isOverdue ? (
              <AlertCircle size={14} className="due-icon due-icon--overdue" aria-hidden="true" />
            ) : (
              <Calendar size={14} className="due-icon" aria-hidden="true" />
            )}
            <span>{formattedDueDate}</span>
            {isOverdue && <span className="overdue-tag">Overdue</span>}
          </div>

          {/* Quick Status Select */}
          <div className="task-status-control">
            <label htmlFor={`status-select-${id}`} className="sr-only">
              Change status for task {title}
            </label>
            <div className="status-select-wrap">
              {getStatusIcon(status)}
              <select
                id={`status-select-${id}`}
                className={`task-status-select task-status-select--${status}`}
                value={status}
                onChange={(e) => onStatusChange(id, e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons: Edit & Delete */}
        <div className="task-actions">
          <button
            type="button"
            className="action-btn action-btn--edit"
            onClick={() => onEdit(task)}
            aria-label={`Edit task "${title}"`}
            title="Edit task"
          >
            <Pencil size={15} />
          </button>
          <button
            type="button"
            className="action-btn action-btn--delete"
            onClick={() => onDelete(id)}
            aria-label={`Delete task "${title}"`}
            title="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
