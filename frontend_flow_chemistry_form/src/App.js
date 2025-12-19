import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import ExperimentsList from "./pages/ExperimentsList";
import ExperimentBuilder from "./pages/ExperimentBuilder";
import ResultsVisualization from "./pages/ResultsVisualization";
import Health from "./pages/Health";

// PUBLIC_INTERFACE
function App() {
  /**
   * Root application component with routing:
   * - /                 -> experiments list
   * - /experiment/new   -> builder (create)
   * - /experiment/:id   -> builder (edit)
   * - /results          -> visualization page
   * - /health           -> simple health check route
   */
  return (
    <BrowserRouter>
      <div className="navbar">
        <div className="navbar-inner">
          <div className="brand">Flow Chemistry Builder</div>
          <div className="nav-links">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/experiment/new">New</Link>
            <Link className="nav-link" to="/results">Results</Link>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<ExperimentsList />} />
        <Route path="/experiment/new" element={<ExperimentBuilder />} />
        <Route path="/experiment/:id" element={<ExperimentBuilder />} />
        <Route path="/results" element={<ResultsVisualization />} />
        <Route path="/health" element={<Health />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
