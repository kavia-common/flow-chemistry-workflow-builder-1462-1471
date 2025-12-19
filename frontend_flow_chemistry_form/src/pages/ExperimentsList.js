import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listExperiments, shouldShowBackendWarning } from "../services/api";
import WarningBanner from "../components/WarningBanner";

/**
 * PUBLIC_INTERFACE
 * Landing page that lists experiments. Placeholder-friendly: shows message if backend not configured.
 */
export default function ExperimentsList() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const warn = shouldShowBackendWarning();

  useEffect(() => {
    let mounted = true;
    listExperiments()
      .then((data) => { if (mounted) setItems(Array.isArray(data) ? data : []); })
      .catch((e) => { if (mounted) setErr(e.message); });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="container">
      {warn && <WarningBanner message={"Backend URL not configured (REACT_APP_BACKEND_URL). The list below is a placeholder until the backend is available."} />}
      {err && <WarningBanner message={`Failed to load experiments: ${err}`} />}

      <div className="card">
        <div className="kicker">Flow Chemistry</div>
        <div className="h1">Experiments</div>
        <div className="btn-row">
          <Link to="/experiment/new" className="btn">+ New Experiment</Link>
          <Link to="/results" className="btn secondary">Results / Visualization</Link>
        </div>
        <div className="divider" />
        {items.length === 0 ? (
          <div className="helper">No experiments yet. Create one to get started.</div>
        ) : (
          <table className="table" style={{ marginTop: 12 }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Objective</th>
                <th>Open</th>
              </tr>
            </thead>
            <tbody>
              {items.map((e) => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.details?.name || "-"}</td>
                  <td>{e.details?.objective || "-"}</td>
                  <td><Link className="nav-link" to={`/experiment/${encodeURIComponent(e.id)}`}>Open</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
