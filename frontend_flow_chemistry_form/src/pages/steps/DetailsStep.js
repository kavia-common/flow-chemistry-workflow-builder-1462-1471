import React, { useMemo } from "react";
import { useFormContext } from "../../context/FormContext";

/**
 * PUBLIC_INTERFACE
 * Experiment Details step (name, objective) with validation.
 */
export default function DetailsStep() {
  const { details, setDetails, validators } = useFormContext();
  const errors = useMemo(() => validators.details(details), [validators, details]);

  return (
    <div className="card">
      <div className="kicker">Experiment</div>
      <div className="h1">Details</div>
      <div className="fields">
        <div className="field">
          <label htmlFor="exp-name">Name</label>
          <input
            id="exp-name"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
            className={errors.name ? "error-input" : ""}
            placeholder="e.g., Nitration of toluene"
          />
          {errors.name ? <div className="error-text">{errors.name}</div> : <div className="helper">Provide a clear, descriptive name.</div>}
        </div>

        <div className="field">
          <label htmlFor="exp-objective">Objective</label>
          <textarea
            id="exp-objective"
            rows={4}
            value={details.objective}
            onChange={(e) => setDetails({ ...details, objective: e.target.value })}
            className={errors.objective ? "error-input" : ""}
            placeholder="Briefly describe the objective and expected outcome."
          />
          {errors.objective ? <div className="error-text">{errors.objective}</div> : <div className="helper">What are you trying to achieve?</div>}
        </div>
      </div>
    </div>
  );
}
