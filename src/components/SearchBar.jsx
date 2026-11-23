import React from "react";
import { Search, X } from "lucide-react";

/**
 * SearchBar component with clear button and accessible input
 */
export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-bar-container">
      <label htmlFor="task-search-input" className="sr-only">
        Search tasks by title
      </label>
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" aria-hidden="true" />
        <input
          id="task-search-input"
          type="search"
          className="search-input"
          placeholder="Search tasks by title..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={onClear}
            aria-label="Clear search input"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
