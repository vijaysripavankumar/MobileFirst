import React, { useState, useEffect, useRef } from "react";
import { X, Check, Calendar, AlertCircle } from "lucide-react";

/**
 * Reusable modal form for both creating and editing tasks
 */
export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  initialData = null
}) {
  const isEditing = Boolean(initialData && initialData.id);

  // Form field state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    status: "todo",
    priority: "medium",
    dueDate: ""
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const titleInputRef = useRef(null);

  // Synchronize initialData when modal opens or changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "General",
        status: initialData.status || "todo",
        priority: initialData.priority || "medium",
        dueDate: initialData.dueDate || ""
      });
    } else {
      // Default initial state for new task
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      const defaultDate = tomorrow.toISOString().split("T")[0];

      setFormData({
        title: "",
        description: "",
        category: "Development",
        status: "todo",
        priority: "medium",
        dueDate: defaultDate
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  // Auto-focus title input when modal opens
  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required.";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Task title must be at least 3 characters.";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Please select a due date.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...(initialData?.id ? { id: initialData.id } : {}),
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim() || "General",
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate
    });

    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
    >
      <div className="modal-container">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 id="task-form-title" className="modal-title">
            {isEditing ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close task form dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="task-form" noValidate>
          {/* Task Title */}
          <div className="form-group">
            <label htmlFor="form-task-title" className="form-label">
              Task Title <span className="required-star">*</span>
            </label>
            <input
              ref={titleInputRef}
              id="form-task-title"
              name="title"
              type="text"
              className={`form-input ${errors.title ? "form-input--error" : ""}`}
              placeholder="e.g. Design Onboarding Flow Wireframes"
              value={formData.title}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <span id="title-error" className="form-error-msg" role="alert">
                <AlertCircle size={13} aria-hidden="true" />
                {errors.title}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="form-task-desc" className="form-label">
              Description
            </label>
            <textarea
              id="form-task-desc"
              name="description"
              rows={3}
              className="form-textarea"
              placeholder="Provide context, acceptance criteria, or relevant links..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Category & Due Date Row */}
          <div className="form-grid-row">
            <div className="form-group">
              <label htmlFor="form-task-category" className="form-label">
                Category
              </label>
              <select
                id="form-task-category"
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Research">Research</option>
                <option value="Marketing">Marketing</option>
                <option value="Performance">Performance</option>
                <option value="DevOps">DevOps</option>
                <option value="Quality">Quality</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="form-task-duedate" className="form-label">
                Due Date <span className="required-star">*</span>
              </label>
              <input
                id="form-task-duedate"
                name="dueDate"
                type="date"
                className={`form-input ${errors.dueDate ? "form-input--error" : ""}`}
                value={formData.dueDate}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? "duedate-error" : undefined}
              />
              {errors.dueDate && (
                <span id="duedate-error" className="form-error-msg" role="alert">
                  <AlertCircle size={13} aria-hidden="true" />
                  {errors.dueDate}
                </span>
              )}
            </div>
          </div>

          {/* Status & Priority Row */}
          <div className="form-grid-row">
            <div className="form-group">
              <label htmlFor="form-task-status" className="form-label">
                Status
              </label>
              <select
                id="form-task-status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="form-task-priority" className="form-label">
                Priority
              </label>
              <select
                id="form-task-priority"
                name="priority"
                className="form-select"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>

          {/* Form Actions Footer */}
          <div className="modal-actions-footer">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
            >
              <Check size={16} aria-hidden="true" />
              <span>{isEditing ? "Save Changes" : "Create Task"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
