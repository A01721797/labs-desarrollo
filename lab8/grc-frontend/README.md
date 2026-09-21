# GRC Frontend

React + Vite CRUD app for a Governance, Risk & Compliance platform (Risks, Controls, Policies, Audits).
Structure follows `../REACT-CRUD-STRUCTURE.md`.

```bash
npm install
npm run dev     # http://localhost:5173
npm test
npm run build
```

- **Data**: `src/api/*Api.js` use a localStorage mock (`mockStore.js`). Set `VITE_API_URL` and replace them with `apiClient` calls to use a real backend.
- **Generic CRUD**: each feature is a thin config (`*Constants.js`) plus domain components; the list/form/detail pages live in `src/features/shared/`.
- **Accessibility**: labelled fields with `aria-describedby` errors, focus-managed dialogs/drawer, keyboard-operable sortable table, live-region toasts, reduced-motion support.
