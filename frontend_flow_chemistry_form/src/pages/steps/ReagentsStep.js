import React, { useMemo } from "react";
import { useFormContext } from "../../context/FormContext";

/**
 * PUBLIC_INTERFACE
 * Reagents step: manage a list of reagents with name, concentration, volume.
 */
export default function ReagentsStep() {
  const { reagents, setReagents, validators } = useFormContext();
  const errorsList = useMemo(() => validators.reagents(reagents), [validators, reagents]);

  const update = (i, field, value) => {
    const next = reagents.map((r, idx) => (idx === i ? { ...r, [field]: value } : r));
    setReagents(next);
  };

  const add = () => setReagents([...reagents, { name: "", concentration: "", volume: "" }]);
  const remove = (i) => setReagents(reagents.filter((_, idx) => idx !== i));

  return (
    <div className="card">
      <div className="kicker">Experiment</div>
      <div className="h1">Reagents</div>

      <div className="fields">
        {reagents.map((r, i) => {
          const errs = errorsList[i] || {};
          return (
            <div key={i} className="card" style={{ padding: 14 }}>
              <div className="fields">
                <div className="field">
                  <label>Name</label>
                  <input
                    value={r.name}
                    onChange={(e) => update(i, "name", e.target.value)}
                    className={errs.name ? "error-input" : ""}
                    placeholder="e.g., Toluene"
                  />
                  {errs.name ? <div className="error-text">{errs.name}</div> : null}
                </div>
                <div className="field">
                  <label>Concentration (M)</label>
                  <input
                    type="number"
                    step="any"
                    value={r.concentration}
                    onChange={(e) => update(i, "concentration", e.target.value)}
                    className={errs.concentration ? "error-input" : ""}
                    placeholder="e.g., 0.5"
                  />
                  {errs.concentration ? <div className="error-text">{errs.concentration}</div> : <div className="helper">Positive numeric value.</div>}
                </div>
                <div className="field">
                  <label>Volume (mL)</label>
                  <input
                    type="number"
                    step="any"
                    value={r.volume}
                    onChange={(e) => update(i, "volume", e.target.value)}
                    className={errs.volume ? "error-input" : ""}
                    placeholder="e.g., 10"
                  />
                  {errs.volume ? <div className="error-text">{errs.volume}</div> : <div className="helper">Positive numeric value.</div>}
                </div>
                <div className="btn-row">
                  <button type="button" className="btn ghost" onClick={() => remove(i)} disabled={reagents.length <= 1}>
                    Remove
                  </button>
                  {i === reagents.length - 1 && (
                    <button type="button" className="btn secondary" onClick={add}>
                      + Add Reagent
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {reagents.length === 0 ? (
        <div className="helper">Add reagents to proceed.</div>
      ) : null}
    </div>
  );
}
