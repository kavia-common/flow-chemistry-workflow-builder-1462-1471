import React, { createContext, useContext, useMemo, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Provides centralized state for the multi-step Flow Chemistry form.
 * Holds experiment details, reagents list, parameters, safety/notes, and validation helpers.
 */
const FormContext = createContext(null);

// PUBLIC_INTERFACE
export function useFormContext() {
  /** Access the shared form state and helpers. */
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used within <FormProvider>");
  return ctx;
}

// PUBLIC_INTERFACE
export function FormProvider({ children, initial }) {
  /**
   * Centralized state for the builder.
   * initial: optional initial data loaded from backend when editing an existing experiment.
   */
  const [details, setDetails] = useState(
    initial?.details || { name: "", objective: "" }
  );
  const [reagents, setReagents] = useState(
    initial?.reagents || [{ name: "", concentration: "", volume: "" }]
  );
  const [parameters, setParameters] = useState(
    initial?.parameters || { flowRate: "", temperature: "", pressure: "", residenceTime: "" }
  );
  const [notes, setNotes] = useState(initial?.notes || "");

  const [currentStep, setCurrentStep] = useState(0);

  // Validation rules
  const validators = {
    details: (d = details) => {
      const errors = {};
      if (!d.name?.trim()) errors.name = "Experiment name is required.";
      if (!d.objective?.trim()) errors.objective = "Objective is required.";
      return errors;
    },
    reagents: (list = reagents) => {
      const errors = list.map((r) => {
        const e = {};
        if (!r.name?.trim()) e.name = "Name is required.";
        const c = parseFloat(r.concentration);
        const v = parseFloat(r.volume);
        if (isNaN(c) || c <= 0) e.concentration = "Concentration must be > 0.";
        if (isNaN(v) || v <= 0) e.volume = "Volume must be > 0.";
        return e;
      });
      return errors;
    },
    parameters: (p = parameters) => {
      const errors = {};
      const mustPositive = (val, field) => {
        const n = parseFloat(val);
        if (isNaN(n) || n <= 0) errors[field] = "Must be a positive number.";
      };
      mustPositive(p.flowRate, "flowRate");
      mustPositive(p.temperature, "temperature");
      mustPositive(p.pressure, "pressure");
      mustPositive(p.residenceTime, "residenceTime");
      return errors;
    },
    notes: () => ({})
  };

  // PUBLIC_INTERFACE
  function toPayload() {
    /** Assemble API payload in a normalized shape */
    return {
      details,
      reagents,
      parameters,
      notes
    };
  }

  const value = useMemo(
    () => ({
      details, setDetails,
      reagents, setReagents,
      parameters, setParameters,
      notes, setNotes,
      currentStep, setCurrentStep,
      validators,
      toPayload
    }),
    [details, reagents, parameters, notes, currentStep]
  );

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
