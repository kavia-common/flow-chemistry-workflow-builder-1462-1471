import React from "react";
import { useFormContext } from "../../context/FormContext";

/**
 * PUBLIC_INTERFACE
 * Review & Submit step: presents a summary and triggers submission (handled by parent).
 */
export default function ReviewSubmitStep() {
  const { details, reagents, parameters, notes } = useFormContext();

  return (
    <div className="card">
      <div className="kicker">Review</div>
      <div className="h1">Confirm and Submit</div>

      <div className="fields">
        <div className="field">
          <label>Details</label>
          <div className="table-wrapper">
            <table className="table">
              <tbody>
                <tr><th>Name</th><td>{details.name || "-"}</td></tr>
                <tr><th>Objective</th><td>{details.objective || "-"}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="field">
          <label>Reagents</label>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Concentration (M)</th>
                  <th>Volume (mL)</th>
                </tr>
              </thead>
              <tbody>
                {reagents.map((r, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{r.name || "-"}</td>
                    <td>{r.concentration || "-"}</td>
                    <td>{r.volume || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="field">
          <label>Parameters</label>
          <div className="table-wrapper">
            <table className="table">
              <tbody>
                <tr><th>Flow Rate (mL/min)</th><td>{parameters.flowRate || "-"}</td></tr>
                <tr><th>Temperature (°C)</th><td>{parameters.temperature || "-"}</td></tr>
                <tr><th>Pressure (bar)</th><td>{parameters.pressure || "-"}</td></tr>
                <tr><th>Residence Time (min)</th><td>{parameters.residenceTime || "-"}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="field">
          <label>Notes</label>
          <div className="card" style={{ background: "#f9fafb" }}>{notes || "-"}</div>
        </div>
      </div>
    </div>
  );
}
