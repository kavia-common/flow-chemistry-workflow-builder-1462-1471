import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useFormContext } from "../context/FormContext";
import ProgressBar from "../components/ProgressBar";
import SideNav from "../components/SideNav";
import WarningBanner from "../components/WarningBanner";
import DetailsStep from "./steps/DetailsStep";
import ReagentsStep from "./steps/ReagentsStep";
import ParametersStep from "./steps/ParametersStep";
import SafetyNotesStep from "./steps/SafetyNotesStep";
import ReviewSubmitStep from "./steps/ReviewSubmitStep";
import { createExperiment, shouldShowBackendWarning, updateExperiment } from "../services/api";

/**
 * Simple wrapper to consume context in the same file.
 */
function InnerBuilder({ isEdit }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const ctx = useFormContext();
  const warn = shouldShowBackendWarning();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const steps = useMemo(() => ([
    "Experiment Details",
    "Reagents",
    "Parameters",
    "Safety / Notes",
    "Review & Submit",
  ]), []);

  const total = steps.length;
  const { currentStep, setCurrentStep, validators, toPayload, details, reagents, parameters } = ctx;

  const canProceed = () => {
    if (currentStep === 0) return Object.keys(validators.details(details)).length === 0;
    if (currentStep === 1) return validators.reagents(reagents).every((e) => Object.keys(e).length === 0);
    if (currentStep === 2) return Object.keys(validators.parameters(parameters)).length === 0;
    if (currentStep === 3) return true;
    return true;
  };

  const next = () => setCurrentStep(Math.min(currentStep + 1, total - 1));
  const back = () => setCurrentStep(Math.max(currentStep - 1, 0));
  const go = (i) => setCurrentStep(i);

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const payload = toPayload();
      let response;
      if (isEdit && id) response = await updateExperiment(id, payload);
      else response = await createExperiment(payload);

      navigate("/results", { state: { payload: payload, response: response || null } });
    } catch (e) {
      setSubmitError(e.message || "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      {warn && <WarningBanner message={"Backend URL not configured (REACT_APP_BACKEND_URL). Submissions will attempt same-origin and may fail until backend is available."} />}

      <div className="card" style={{ marginBottom: 12 }}>
        <ProgressBar current={currentStep} total={total} />
      </div>

      <div className="app-shell">
        <SideNav steps={steps} currentStep={currentStep} onNavigate={go} />
        <div className="content">
          {currentStep === 0 && <DetailsStep />}
          {currentStep === 1 && <ReagentsStep />}
          {currentStep === 2 && <ParametersStep />}
          {currentStep === 3 && <SafetyNotesStep />}
          {currentStep === 4 && <ReviewSubmitStep />}

          <div className="btn-row">
            <button type="button" className="btn ghost" onClick={back} disabled={currentStep === 0}>Back</button>
            {currentStep < total - 1 ? (
              <button type="button" className="btn" onClick={next} disabled={!canProceed()}>
                Next
              </button>
            ) : (
              <button type="button" className="btn" onClick={handleSubmit} disabled={!canProceed() || submitting}>
                {submitting ? "Submitting..." : (isEdit ? "Update Experiment" : "Submit Experiment")}
              </button>
            )}
          </div>

          {submitError ? <div className="error-text" style={{ marginTop: 10 }}>{submitError}</div> : null}
        </div>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * ExperimentBuilder entry that mounts a FormProvider and renders the inner builder.
 * Supports "new" and ":id" routes; when integrating with backend, pass initial data to FormProvider.
 */
export default function ExperimentBuilder() {
  const params = useParams();
  const isEdit = !!params.id && params.id !== "new";
  return (
    <FormProvider initial={undefined}>
      <InnerBuilder isEdit={isEdit} />
    </FormProvider>
  );
}
