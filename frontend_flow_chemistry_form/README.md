# Flow Chemistry Frontend

A React application that provides a multi-step Flow Chemistry workflow builder with client-side validation, centralized state, API service layer, and results visualization.

## Routes

- `/` — List experiments (placeholder until backend is available)
- `/experiment/new` — Create new experiment (multi-step form)
- `/experiment/:id` — Edit experiment (form ready to accept initial data)
- `/results` — Results/Visualization page (shows summary from last submission)

## Environment Variables

- `REACT_APP_BACKEND_URL` — Base URL for API calls (e.g., https://api.example.com). If not provided, the app will show a non-blocking banner and attempt same-origin requests.

Other envs listed by the project may exist but are not required for this frontend step.

You can create a `.env` file (do not commit secrets) and add:
```
REACT_APP_BACKEND_URL=https://your-backend.example.com
```

## Development

- `npm start` — Start dev server
- `npm test` — Run tests
- `npm run build` — Build for production

## Implementation Notes

- Ocean Professional theme styling is implemented in `src/App.css`.
- Multi-step form shares state via `src/context/FormContext.js`.
- Steps:
  - Details: `src/pages/steps/DetailsStep.js`
  - Reagents: `src/pages/steps/ReagentsStep.js`
  - Parameters: `src/pages/steps/ParametersStep.js`
  - Safety/Notes: `src/pages/steps/SafetyNotesStep.js`
  - Review & Submit: `src/pages/steps/ReviewSubmitStep.js`
- Builder page and navigation: `src/pages/ExperimentBuilder.js`
- API service layer: `src/services/api.js` (uses `REACT_APP_BACKEND_URL`)
- Results page: `src/pages/ResultsVisualization.js`
- Router is configured in `src/App.js`.

When backend endpoints are ready:
- Implement fetching existing experiment by id and pass as `initial` into `FormProvider` in `ExperimentBuilder`.
- Replace placeholder list/submit behaviors with actual API responses.
