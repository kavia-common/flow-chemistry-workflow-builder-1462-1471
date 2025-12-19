import React, { useMemo } from "react";
import { useFormContext } from "../../context/FormContext";

/**
 * PUBLIC_INTERFACE
 * Parameters step: flow rate, temperature, pressure, residence time.
 */
export default function ParametersStep() {
  const { parameters, setParameters, validators } = useFormContext();
  const errors = useMemo(() => validators.parameters(parameters), [validators, parameters]);

  const set = (k, v) => setParameters({ ...parameters, [k]: v });

  return (
    <div className="card">
      <div className="kicker">Experiment</div>
      <div className="h1">Parameters</div>
      <div className="fields">
        <div className="field">
          <label>Flow Rate (mL/min)</label>
          <input
            type="number"
            step="any"
            value={parameters.flowRate}
            onChange={(e) => set("flowRate", e.target.value)}
            className={errors.flowRate ? "error-input" : ""}
            placeholder="e.g., 0.5"
          />
          {errors.flowRate ? <div className="error-text">{errors.flowRate}</div> : <div className="helper">Positive numeric value.</div>}
        </div>
        <div className="field">
          <label>Temperature (°C)</label>
          <input
            type="number"
            step="any"
            value={parameters.temperature}
            onChange={(e) => set("temperature", e.target.value)}
            className={errors.temperature ? "error-input" : ""}
            placeholder="e.g., 25"
          />
          {errors.temperature ? <div className="error-text">{errors.temperature}</div> : <div className="helper">Positive numeric value.</div>}
        </div>
        <div className="field">
          <label>Pressure (bar)</label>
          <input
            type="number"
            step="any"
            value={parameters.pressure}
            onChange={(e) => set("pressure", e.target.value)}
            className={errors.pressure ? "error-input" : ""}
            placeholder="e.g., 1"
          />
          {errors.pressure ? <div className="error-text">{errors.pressure}</div> : <div className="helper">Positive numeric value.</div>}
        </div>
        <div className="field">
          <label>Residence Time (min)</label>
          <input
            type="number"
            step="any"
            value={parameters.residenceTime}
            onChange={(e) => set("residenceTime", e.target.value)}
            className={errors.residenceTime ? "error-input" : ""}
            placeholder="e.g., 10"
          />
          {errors.residenceTime ? <div className="error-text">{errors.residenceTime}</div> : <div className="helper">Positive numeric value.</div>}
        </div>
      </div>
    </div>
  );
}
