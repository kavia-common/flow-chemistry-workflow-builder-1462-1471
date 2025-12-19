import React from "react";

/**
 * PUBLIC_INTERFACE
 * SideNav lists steps and highlights the active one. Clicking step buttons changes step.
 */
export default function SideNav({ steps, currentStep, onNavigate }) {
  return (
    <aside className="sidenav" aria-label="Step navigation">
      <div className="kicker">Steps</div>
      <div style={{ height: 8 }} />
      {steps.map((label, idx) => {
        const active = currentStep === idx;
        return (
          <button
            type="button"
            key={`${label}-${idx}`}
            className={`step ${active ? "active" : ""}`}
            onClick={() => onNavigate(idx)}
            aria-current={active ? "step" : undefined}
          >
            <span className="step-index">{idx + 1}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </aside>
  );
}
