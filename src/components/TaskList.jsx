import React from "react";
import TaskCard from "./TaskCard";
import { ClipboardList, Plus, SearchX, RotateCcw } from "lucide-react";

/**
 * TaskList Component
 * Displays grid of task cards or informative empty states
 */
export default function TaskList({
  tasks,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onAddTask,
  isFiltered,
  onResetFilters
}) {
  if (tasks.length === 0) {
    return (
      <div className="task-empty-state" role="status" aria-live="polite">
        <div className="empty-state-icon-wrap" aria-hidden="true">
          {isFiltered ? <SearchX size={36} /> : <ClipboardList size={36} />}
        </div>
        <h3 className="empty-state-title">
          {isFiltered ? "No matching tasks found" : "No tasks in your FocusBoard yet"}
        </h3>
        <p className="empty-state-desc">
          {isFiltered
            ? "Try adjusting your search keywords, status tabs, or priority filters to find what you're looking for."
            : "Kickstart your productivity by adding your first project task, milestone, or objective."}
        </p>
        <div className="empty-state-actions">
          {isFiltered ? (
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onResetFilters}
            >
              <RotateCcw size={16} aria-hidden="true" />
              <span>Reset Filters</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--primary"
              onClick={onAddTask}
            >
              <Plus size={16} aria-hidden="true" />
              <span>Create First Task</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-grid" role="region" aria-label="Tasks list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
