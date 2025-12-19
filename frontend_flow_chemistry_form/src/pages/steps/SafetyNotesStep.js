import React from "react";
import { useFormContext } from "../../context/FormContext";

/**
 * PUBLIC_INTERFACE
 * Safety and Notes step for additional context or warnings.
 */
export default function SafetyNotesStep() {
  const { notes, setNotes } = useFormContext();

  return (
    <div className="card">
      <div className="kicker">Experiment</div>
      <div className="h1">Safety & Notes</div>
      <div className="fields">
        <div className="field">
          <label htmlFor="notes">Notes / Safety Considerations</label>
          <textarea
            id="notes"
            rows={8}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add procedural notes, PPE requirements, hazards, etc."
          />
          <div className="helper">Optional, but recommended for documentation.</div>
        </div>
      </div>
    </div>
  );
}
