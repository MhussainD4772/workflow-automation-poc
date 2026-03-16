# E2E Workflow Testing — Onboarding POC

Run the backend (e.g. Spring Boot on port 8080), then start the frontend (`npm run dev`). The app proxies `/onboarding` to the backend.

## Flows to verify

| # | Flow | Basic Info choices | Expected path |
|---|------|--------------------|----------------|
| 1 | **Start** | — | Click "Start Onboarding" → first task (e.g. Collect Basic Info) |
| 2 | **Citizen, employed** | citizenship: Citizen, employmentStatus: Employed | Collect Basic Info → Collect Citizen Details → Review Application → Process completed |
| 3 | **Citizen, unemployed** | citizenship: Citizen, employmentStatus: Unemployed | Collect Basic Info → Collect Citizen Details → Review Application → Process completed |
| 4 | **Non-citizen, employed** | citizenship: Non-citizen, employmentStatus: Employed | Collect Basic Info → Collect Non-Citizen Details → Review Application → Process completed |
| 5 | **Non-citizen, unemployed (reject)** | citizenship: Non-citizen, employmentStatus: Unemployed | Collect Basic Info → Application Rejected |
| 6 | **Review** | Any path that reaches Review | Review screen shows accumulated formData; Submit → next task from backend |
| 7 | **Completion** | Path that completes | Process completed screen with "Start again" |
| 8 | **Rejection** | Non-citizen + Unemployed | Application Rejected screen |

## Checks

- [ ] No hardcoded flow: next screen always comes from backend response.
- [ ] Loading overlay appears during API calls; buttons disabled.
- [ ] Error banner shows on API failure.
- [ ] Unknown task from backend shows Unknown step screen.
- [ ] Restart clears state and returns to Start screen.
