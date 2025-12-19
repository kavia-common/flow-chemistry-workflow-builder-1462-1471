import React from "react";
import { useLocation } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * Visualization page shows a simple schematic and tabular summary of the submitted workflow.
 * It accepts state from navigation (e.g., after submit), but works with placeholders as well.
 */
export default function ResultsVisualization() {
  const location = useLocation();
  const data = location.state?.payload;

  return (
    <div className="container">
      <div className="card">
        <div className="kicker">Results</div>
        <div className="h1">Workflow Visualization</div>

        {!data ? (
          <div className="helper">
            No submission data found in navigation state. Submit an experiment to see visualization, or integrate with backend GET /experiments/:id to load data here.
          </div>
        ) : (
          <>
            <div className="badge">Summary</div>
            <div className="divider" />
            <div className="fields">
              <div className="field">
                <label>Experiment</label>
                <div className="card" style={{ background: "#f9fafb" }}>
                  <strong>{data.details?.name || "-"}</strong> — {data.details?.objective || "-"}
                </div>
              </div>

              <div className="field">
                <label>Simple Flow Schematic</label>
                <div className="card" style={{ background: "#f8fafc" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <div className="badge">Reagents</div>
                    <span>➡️</span>
                    <div className="badge">Mixer</div>
                    <span>➡️</span>
                    <div className="badge">Reactor</div>
                    <span>➡️</span>
                    <div className="badge">Output</div>
                  </div>
                  <div className="helper">This is a placeholder schematic. Enhance as the backend and domain model evolves.</div>
                </div>
              </div>

              <div className="field">
                <label>Reagents</label>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th><th>Name</th><th>Conc. (M)</th><th>Vol. (mL)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(data.reagents || []).map((r, i) => (
                      <tr key={i}><td>{i+1}</td><td>{r.name}</td><td>{r.concentration}</td><td>{r.volume}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="field">
                <label>Parameters</label>
                <table className="table">
                  <tbody>
                    <tr><th>Flow Rate</th><td>{data.parameters?.flowRate}</td></tr>
                    <tr><th>Temperature</th><td>{data.parameters?.temperature}</td></tr>
                    <tr><th>Pressure</th><td>{data.parameters?.pressure}</td></tr>
                    <tr><th>Residence Time</th><td>{data.parameters?.residenceTime}</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="field">
                <label>Notes</label>
                <div className="card" style={{ background: "#f9fafb" }}>{data.notes || "-"}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
