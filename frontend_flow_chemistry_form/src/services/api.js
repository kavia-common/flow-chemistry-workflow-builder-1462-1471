/**
 * API service for backend integration.
 * Uses REACT_APP_BACKEND_URL as base URL. If not defined, calls will point to "" (same origin),
 * and a consumer can show a non-blocking banner via shouldShowBackendWarning().
 */

// PUBLIC_INTERFACE
export function getApiBase() {
  /** Returns the configured API base URL or empty string if not provided. */
  return process.env.REACT_APP_BACKEND_URL || "";
}

// PUBLIC_INTERFACE
export function shouldShowBackendWarning() {
  /** Indicates whether a warning banner should be displayed due to missing API base URL. */
  return !process.env.REACT_APP_BACKEND_URL;
}

// Helper for fetch with JSON
async function http(path, options = {}) {
  const base = getApiBase();
  const url = `${base}${path}`;
  const resp = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`API ${resp.status}: ${text || resp.statusText}`);
  }
  if (resp.status === 204) return null;
  return resp.json();
}

// PUBLIC_INTERFACE
export async function createExperiment(payload) {
  /** Create a new experiment in backend. Expects payload from FormContext.toPayload(). */
  return http("/experiments", { method: "POST", body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function updateExperiment(id, payload) {
  /** Update an existing experiment with id. */
  return http(`/experiments/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(payload) });
}

// PUBLIC_INTERFACE
export async function getExperiment(id) {
  /** Retrieve one experiment by id. */
  return http(`/experiments/${encodeURIComponent(id)}`, { method: "GET" });
}

// PUBLIC_INTERFACE
export async function listExperiments() {
  /** List experiments. */
  return http("/experiments", { method: "GET" });
}
