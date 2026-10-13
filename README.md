# Security spec audit

| Requirement | Status | Why |
|---|---|---|
| SEC-001 | Not at all | The current build accepts any typed name and has no university SSO, no password-free identity check, and no real account creation flow. |
| SEC-002 | Not at all | There is no roster, professor list, TA list, or membership validation on sign-in, so role assignment and access denial are not enforced. |
| SEC-003 | Not at all | The prototype has no session system, no cookie flags, and no idle/absolute session expiry logic. |
| SEC-004 | Not at all | Removing a user from a roster would have no effect because there is no real authentication state or session revocation mechanism. |
| SEC-005 | Not at all | The app does not check user roles on the server for each request, and there is no access-denied audit trail. |
| SEC-006 | Not at all | All data is in-memory and shared in a single local prototype, so there is no student-owned data model or per-user privacy enforcement. |
| SEC-007 | Not at all | Staff cannot view student data in this prototype because there are no staff roles or chat records, but the required no-staff-access architecture is not implemented. |
| SEC-008 | Not at all | There are no database operators, audit logs, or restricted access rules in this build. |
| SEC-009 | Partly | The app stores only an in-memory name and current question/answer in a toy prototype, but it does not implement the real user-record minimization and retention model required by the spec. |
| SEC-010 | Not at all | There is no persistent chat database, delete workflow, or retention/deletion policy in the current prototype. |
| SEC-011 | Not at all | There is no semester-end deletion process, no account removal, and no professor confirmation logic in the current build. |
| SEC-012 | Not at all | The prototype does not use any approved university AI provider, does not enforce data-use contracts, and does not protect names or emails from AI calls. |
| SEC-013 | Partly | The deployed app runs over HTTPS via Vercel, but this prototype does not implement app-level encryption, key management, or stored-data-at-rest protections. |
| SEC-014 | Not at all | The build has no upload pipeline, PDF validation, hidden-text scanning, or warning/hold workflow for suspicious course materials. |
| SEC-015 | Partly | The app keeps answers grounded in a local knowledge base and does not expose tool actions, but it does not label retrieved content as untrusted reference material or include prompt-injection protections. |
| SEC-016 | Partly | The prototype has no AI tools or browser/file/email capabilities, but it also does not implement the formal tool restrictions and safety guardrails required by the security specification. |
| SEC-017 | Partly | This build renders plain text and has no script/image execution in the prototype, but it does not enforce a full allow-listed link policy or content-safety display controls. |
| SEC-018 | Not at all | There is no weekly summary feature, no anonymization step, and no aggregated reporting pipeline in the current app. |
| SEC-019 | Not at all | There is no answer-reporting feature, no pseudonymized reports, and no day-rounded record storage in the prototype. |
| SEC-020 | Partly | The sample app does not expose hidden instructions or private data because there is no true multi-user or secret material pipeline, but it does not implement the formal refusal and leakage controls described in the requirement. |
| SEC-021 | Partly | The current build keeps everything in a single in-memory knowledge base and avoids cross-student leakage by accident, but it does not enforce the formal three-part request boundary or per-student context isolation. |
| SEC-022 | Partly | The server rejects messages over 2,000 characters and enforces 40 questions per UTC calendar day and 10 per rolling minute for each typed name. Because the name is not verified, a student can bypass limits by changing it; in-memory counts also do not persist across restarts or synchronize across server instances. |
| SEC-023 | Not at all | The app has no AI spend tracking, no hard budget cap, and no provider-side spending limit enforcement. |
| SEC-024 | Not at all | There is no staff upload workflow or per-user upload quota enforcement in the current prototype. |
| SEC-025 | Not at all | There are no staff actions, denied-access attempts, or audit logs for uploads, roster changes, or operator access. |
| SEC-026 | Not at all | The app does not log technical errors with a separate safe logging policy, and there is no rule preventing chat content from entering diagnostics. |
| SEC-027 | Not at all | The prototype stores no secrets in code, but there is no secrets manager, environment guardrails, or production credential policy in place. |
| SEC-028 | Not at all | There is no uploaded-PDF storage model, no staff-only file access policy, and no restriction against student file access. |
| SEC-029 | Not at all | The app has no incident detection, no professor notification process, and no data-incident response workflow. |

## HW3 Scope and Non-Goals

- Real payments are a non-goal; use a "Simulated payment" button wherever a payment interaction is needed.
- Real authentication is a non-goal; use a name typed into a text box wherever a signed-in user is needed.
- Do not use a database. Keep data in memory on the server; it resets on every deploy.
