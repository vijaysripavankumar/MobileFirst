import React from "react";

/**
 * StatCard Component
 * Displays a single dynamic metric with an icon, value, change indicator, and progress bar
 */
export default function StatCard({
  title,
  value,
  icon: Icon,
  variant = "primary", // primary | amber | green | purple
  subtext,
  progressBar
}) {
  return (
    <div className={`stat-card stat-card--${variant}`}>
      <div className="stat-card-top">
        <div className="stat-card-info">
          <span className="stat-card-title">{title}</span>
          <div className="stat-card-value">{value}</div>
        </div>
        <div className={`stat-card-icon-wrap stat-card-icon-wrap--${variant}`} aria-hidden="true">
          {Icon && <Icon size={22} />}
        </div>
      </div>

      {progressBar !== undefined && (
        <div className="stat-card-progress">
          <div
            className="stat-progress-bar-track"
            role="progressbar"
            aria-valuenow={progressBar}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className={`stat-progress-bar-fill stat-progress-bar-fill--${variant}`}
              style={{ width: `${Math.min(100, Math.max(0, progressBar))}%` }}
            />
          </div>
        </div>
      )}

      {subtext && <div className="stat-card-subtext">{subtext}</div>}
    </div>
  );
}
