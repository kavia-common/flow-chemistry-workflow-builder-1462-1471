import React from "react";

/**
 * PUBLIC_INTERFACE
 * A minimal health component that can be used for uptime checks.
 */
export default function Health() {
  return (
    <div className="container">
      <div className="card">
        <div className="kicker">Health</div>
        <div className="h1">OK</div>
        <div className="helper">Frontend is running.</div>
      </div>
    </div>
  );
}
