import React from "react";

/**
 * PUBLIC_INTERFACE
 * ProgressBar shows the overall completion percentage at the top of the form.
 */
export default function ProgressBar({ current, total }) {
  const pct = Math.min(100, Math.round(((current + 1) / total) * 100));
  return (
    <div className="progress" aria-label="Progress">
      <div className="progress-bar" style={{ width: `${pct}%` }} />
    </div>
  );
}
