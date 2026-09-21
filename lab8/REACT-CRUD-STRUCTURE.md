# React CRUD Project Structure — GRC Software (Frontend-Focused)

A frontend-heavy folder structure for a React app implementing Create, Read, Update, Delete for a **Governance, Risk & Compliance (GRC)** platform — e.g. managing Risks, Controls, Policies, and Audits. Backend/API is treated as a thin, swappable layer; the emphasis is on UI structure, state, and reusable domain components.

```
grc-frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/                          # Thin HTTP layer — kept minimal on purpose
│   │   ├── apiClient.js              # axios instance, interceptors, auth headers
│   │   ├── riskApi.js                # getRisks, createRisk, updateRisk, deleteRisk
│   │   ├── controlApi.js             # getControls, createControl, updateControl, deleteControl
│   │   ├── policyApi.js
│   │   └── auditApi.js
│   │
│   ├── components/                   # Reusable, presentation-only UI
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Drawer.jsx            # side panel for record details, common in GRC UIs
│   │   │   ├── Loader.jsx
│   │   │   ├── ConfirmDialog.jsx     # "Are you sure you want to delete this control?"
│   │   │   ├── Badge.jsx             # status/severity pills (High/Medium/Low, Open/Closed)
│   │   │   ├── Tooltip.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── forms/
│   │   │   ├── FormInput.jsx
│   │   │   ├── FormSelect.jsx
│   │   │   ├── FormDatePicker.jsx
│   │   │   ├── FormTextArea.jsx
│   │   │   ├── FileUploadField.jsx   # attach evidence/policy docs
│   │   │   └── OwnerPicker.jsx       # assign a risk/control owner (user lookup)
│   │   ├── table/
│   │   │   ├── DataTable.jsx         # sortable, paginated, filterable table (core CRUD list UI)
│   │   │   ├── TableFilters.jsx      # filter by status, severity, framework, owner
│   │   │   ├── TableColumnConfig.jsx # show/hide columns
│   │   │   └── BulkActionsBar.jsx    # bulk close/assign/export
│   │   └── visualizations/
│   │       ├── RiskHeatMap.jsx       # likelihood x impact matrix — signature GRC visual
│   │       ├── ComplianceProgressBar.jsx
│   │       └── StatusDonutChart.jsx
│   │
│   ├── features/                     # Feature-based modules by GRC entity
│   │   ├── risks/
│   │   │   ├── components/
│   │   │   │   ├── RiskList.jsx
│   │   │   │   ├── RiskCard.jsx
│   │   │   │   ├── RiskForm.jsx          # shared Create/Edit form
│   │   │   │   ├── RiskDetailPanel.jsx   # read view with linked controls, history
│   │   │   │   └── RiskScoreCalculator.jsx  # likelihood × impact → score, live in UI
│   │   │   ├── hooks/
│   │   │   │   └── useRisks.js           # list, create, update, delete + local cache
│   │   │   ├── pages/
│   │   │   │   ├── RiskRegisterPage.jsx  # the "list" page — GRC calls this a register
│   │   │   │   ├── RiskCreatePage.jsx
│   │   │   │   ├── RiskEditPage.jsx
│   │   │   │   └── RiskDetailPage.jsx
│   │   │   └── riskConstants.js          # severity levels, likelihood scale, categories
│   │   │
│   │   ├── controls/
│   │   │   ├── components/
│   │   │   │   ├── ControlList.jsx
│   │   │   │   ├── ControlForm.jsx
│   │   │   │   ├── ControlDetailPanel.jsx
│   │   │   │   └── ControlTestResultBadge.jsx  # pass/fail/not-tested indicator
│   │   │   ├── hooks/
│   │   │   │   └── useControls.js
│   │   │   └── pages/
│   │   │       ├── ControlLibraryPage.jsx
│   │   │       ├── ControlCreatePage.jsx
│   │   │       ├── ControlEditPage.jsx
│   │   │       └── ControlDetailPage.jsx
│   │   │
│   │   ├── policies/
│   │   │   ├── components/
│   │   │   │   ├── PolicyList.jsx
│   │   │   │   ├── PolicyForm.jsx
│   │   │   │   ├── PolicyVersionHistory.jsx   # policies are versioned documents
│   │   │   │   └── PolicyAcknowledgementTracker.jsx  # who has read/signed off
│   │   │   ├── hooks/
│   │   │   │   └── usePolicies.js
│   │   │   └── pages/
│   │   │       ├── PolicyListPage.jsx
│   │   │       ├── PolicyCreatePage.jsx
│   │   │       ├── PolicyEditPage.jsx
│   │   │       └── PolicyDetailPage.jsx
│   │   │
│   │   └── audits/
│   │       ├── components/
│   │       │   ├── AuditList.jsx
│   │       │   ├── AuditForm.jsx
│   │       │   ├── AuditFindingsList.jsx      # nested CRUD: findings within an audit
│   │       │   └── AuditTimeline.jsx
│   │       ├── hooks/
│   │       │   └── useAudits.js
│   │       └── pages/
│   │           ├── AuditListPage.jsx
│   │           ├── AuditCreatePage.jsx
│   │           ├── AuditEditPage.jsx
│   │           └── AuditDetailPage.jsx
│   │
│   ├── layouts/                      # App shell, distinct from feature pages
│   │   ├── DashboardLayout.jsx       # sidebar nav (Risks/Controls/Policies/Audits) + topbar
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx                # search, notifications, user menu
│   │
│   ├── dashboard/                    # Landing/overview page, cross-entity
│   │   ├── DashboardPage.jsx
│   │   ├── components/
│   │   │   ├── OpenRisksSummary.jsx
│   │   │   ├── UpcomingAuditsWidget.jsx
│   │   │   └── ComplianceScoreCard.jsx
│   │
│   ├── hooks/                        # App-wide reusable hooks
│   │   ├── useFetch.js
│   │   ├── useDebounce.js            # for table search inputs
│   │   └── usePagination.js
│   │
│   ├── context/                      # Cross-cutting UI state
│   │   ├── AuthContext.jsx
│   │   └── ToastContext.jsx          # success/error notifications on CRUD actions
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   └── PrivateRoute.jsx
│   │
│   ├── store/                        # Redux Toolkit / Zustand (if global state needed)
│   │   ├── store.js
│   │   ├── riskSlice.js
│   │   ├── controlSlice.js
│   │   └── policySlice.js
│   │
│   ├── types/                        # TypeScript types (recommended for GRC data models)
│   │   ├── risk.ts
│   │   ├── control.ts
│   │   ├── policy.ts
│   │   └── audit.ts
│   │
│   ├── utils/
│   │   ├── formatDate.js
│   │   ├── severityColor.js          # maps severity/status → color tokens
│   │   ├── exportToCsv.js            # common GRC need: export register to CSV/PDF
│   │   └── constants.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── tests/
│   ├── risks.test.jsx
│   └── controls.test.jsx
│
├── .env
├── package.json
└── vite.config.js
```

## Why this shape fits a GRC frontend

- **Entity-per-feature (`risks/`, `controls/`, `policies/`, `audits/`)**: GRC platforms are built around a handful of core record types that are heavily interlinked (a risk links to controls, an audit produces findings, a policy has acknowledgements). Keeping each in its own feature folder with list/create/edit/detail pages keeps that complexity contained.
- **`table/` gets its own folder**: almost every GRC screen is a filterable, sortable register (risk register, control library, policy list). Building `DataTable.jsx` once and reusing it across features avoids rebuilding the same list UI four times.
- **`visualizations/` is first-class, not an afterthought**: risk heat maps, compliance progress bars, and status charts are core to how GRC users read data — these deserve dedicated, reusable components rather than being buried inside a single page file.
- **Drawer/side-panel pattern**: GRC users often want to peek at a record's detail without leaving the list (e.g. click a risk row → side panel slides in). `Drawer.jsx` plus `*DetailPanel.jsx` per entity supports that without a full page navigation.
- **Nested CRUD**: audits contain findings, which are themselves CRUD objects scoped to a parent audit — `AuditFindingsList.jsx` models that relationship inside the `audits` feature rather than as a separate top-level entity.
- **API layer stays thin and boring on purpose**: since the focus is frontend, `api/*.js` files are just typed wrappers around endpoints (`getRisks`, `createRisk`, etc.) — no backend logic, schema design, or server code is implied here. Swap the implementation (REST, GraphQL, mock JSON) without touching any component.
- **Export/reporting utilities**: `exportToCsv.js` reflects a very common GRC frontend requirement — users routinely need to export a register or findings list for auditors or regulators.

## Minimal variant (single-entity prototype)

If you're prototyping just one entity (e.g. only Risks) before scaling to the full suite:
```
src/
├── api/
│   └── riskApi.js
├── components/
│   ├── table/DataTable.jsx
│   └── forms/RiskForm.jsx
├── pages/
│   ├── RiskRegisterPage.jsx
│   ├── RiskCreatePage.jsx
│   ├── RiskEditPage.jsx
│   └── RiskDetailPage.jsx
└── App.jsx
```

Install this Agent Skill for me.

Skill page: https://skillsmp.com/creators/affaan-m/ecc/skills-frontend-a11y
Source URL: https://github.com/affaan-m/ECC/tree/main/skills/frontend-a11y
Skill name: frontend-a11y
Creator: affaan-m
Preferred install command: npx skills add https://github.com/affaan-m/ECC --skill frontend-a11y

Please open the skill page and source, review SKILL.md plus any companion files, and explain anything risky before installing.

If shell commands are available, prefer the install command above. If you install manually, copy the complete skill directory that contains SKILL.md, including scripts, references, assets, agents, and any other files shown on the skill page. Preserve the relative folder structure. Do not install SKILL.md alone. After installing, verify the target skills folder contains SKILL.md and all companion files needed by this skill.
