# Master Test Cases - Frontend (React + Vite)

## Scope
This document defines comprehensive frontend test cases for the React application.

Target frontend repository:
- https://github.com/Hashir-Akram/REACT_FRONTEND_API_TESTING.git

Backend dependency:
- API Backend should be running at `http://localhost:5000`

Covered modules:
- Authentication UI flows
- Route guards and role-based access
- Dashboard behavior (admin/user)
- Users, projects, tasks, comments, profile, activity logs
- About page content
- Error handling and API failures
- Responsiveness, accessibility, cross-browser

## Test Environment
- Frontend URL: `http://localhost:5173`
- Backend URL: `http://localhost:5000`
- Browser: Chrome (primary), Edge/Firefox (compatibility)
- Seed credentials:
  - admin@example.com / Admin@123
  - john@example.com / John@123
  - sara@example.com / Sara@123

## Priority Legend
- P0: critical
- P1: high
- P2: medium
- P3: low

## Type Legend
- Positive
- Negative
- Boundary
- Security
- Integration
- Reliability
- UX

---

## 1) App Boot & Configuration

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| CFG-001 | App load | Open app root URL | Positive | P0 | App loads without runtime errors |
| CFG-002 | API config | `VITE_API_URL` set correctly | Integration | P0 | Requests hit configured backend |
| CFG-003 | API config | Missing `VITE_API_URL` env | Reliability | P1 | Fallback behavior works or clear error shown |
| CFG-004 | Build | Production build | Integration | P1 | Build succeeds with no blocking errors |

---

## 2) Authentication (Login/Logout)

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| AUTH-FE-001 | Login | Valid admin credentials | Positive | P0 | Login success, token stored, redirect to dashboard |
| AUTH-FE-002 | Login | Valid user credentials | Positive | P0 | Login success, redirect to dashboard |
| AUTH-FE-003 | Login | Wrong password | Negative | P0 | Error shown, no redirect |
| AUTH-FE-004 | Login | Unknown email | Negative | P0 | Error shown, no token saved |
| AUTH-FE-005 | Login | Empty email | Boundary | P1 | Validation or API error displayed |
| AUTH-FE-006 | Login | Empty password | Boundary | P1 | Validation or API error displayed |
| AUTH-FE-007 | Login | Invalid email format | Boundary | P1 | Input/API validation shown |
| AUTH-FE-008 | Logout | Click logout button | Positive | P0 | Token removed and redirected to login |
| AUTH-FE-009 | Session | Refresh page with valid token | Integration | P0 | Session persists, user remains logged in |
| AUTH-FE-010 | Session | Expired token in storage | Security | P0 | Auto-logout and redirect to login |
| AUTH-FE-011 | Session | Corrupted token in storage | Security | P0 | Safe handling, logout flow |

---

## 3) Route Protection & Access Control

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| ROUTE-001 | Private route | Unauthenticated access to `/dashboard` | Security | P0 | Redirect to `/login` |
| ROUTE-002 | Private route | Unauthenticated access to `/projects` | Security | P0 | Redirect to `/login` |
| ROUTE-003 | Private route | Unauthenticated access to `/tasks` | Security | P0 | Redirect to `/login` |
| ROUTE-004 | Admin route | Normal user access to `/users` | Security | P0 | Access denied or redirected |
| ROUTE-005 | Admin route | Normal user access to `/activity-logs` | Security | P0 | Access denied or redirected |
| ROUTE-006 | Admin route | Admin access to `/users` | Positive | P0 | Users page loads |
| ROUTE-007 | Admin route | Admin access to `/activity-logs` | Positive | P1 | Activity logs page loads |
| ROUTE-008 | Not found | Unknown path | UX | P2 | Not Found page rendered |

---

## 4) Dashboard

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| DSH-001 | Dashboard | Admin dashboard widgets load | Positive | P1 | Admin-specific metrics/cards shown |
| DSH-002 | Dashboard | User dashboard widgets load | Positive | P1 | User-specific metrics/cards shown |
| DSH-003 | Dashboard | API failure on analytics | Reliability | P1 | Friendly error UI, no crash |
| DSH-004 | Dashboard | Loading state during API call | UX | P2 | Spinner/skeleton shown correctly |
| DSH-005 | Dashboard | Empty dataset response | Boundary | P2 | Empty state shown without layout break |

---

## 5) Profile Page

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| PRF-001 | Profile view | Open profile page authenticated | Positive | P1 | User details loaded |
| PRF-002 | Profile update | Update valid name/email/age | Positive | P1 | Success feedback and refreshed data |
| PRF-003 | Profile update | Duplicate email update | Negative | P1 | Error message shown |
| PRF-004 | Profile update | Invalid age format | Boundary | P2 | Validation/API error shown |
| PRF-005 | Profile update | Weak password update | Negative | P1 | Password policy error shown |
| PRF-006 | Security | Attempt role escalation via UI payload | Security | P0 | Role unchanged, no unauthorized elevation |

---

## 6) Users Page (Admin)

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| USR-FE-001 | List users | Admin opens users page | Positive | P0 | Users table loads with pagination |
| USR-FE-002 | Search/filter | Apply role filter | Positive | P1 | Matching rows displayed |
| USR-FE-003 | Create user | Valid input | Positive | P1 | New row appears |
| USR-FE-004 | Create user | Invalid email | Negative | P1 | Validation error shown |
| USR-FE-005 | Create user | Duplicate email | Negative | P1 | Duplicate error shown |
| USR-FE-006 | Update user | Change name/age/role valid | Positive | P1 | Updated values shown |
| USR-FE-007 | Update user | Invalid age boundary | Boundary | P2 | Validation/API error |
| USR-FE-008 | Delete user | Confirm deletion | Positive | P1 | User removed from table |
| USR-FE-009 | Delete user | Cancel deletion | UX | P3 | No deletion happens |
| USR-FE-010 | API failure | Users endpoint 500 | Reliability | P1 | Error state shown gracefully |

---

## 7) Projects Page

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| PRJ-FE-001 | List projects | Load projects page | Positive | P0 | Projects rendered correctly |
| PRJ-FE-002 | Filter | Status filter active/archived | Positive | P1 | Filtered list correct |
| PRJ-FE-003 | Create | Valid project create | Positive | P1 | Project added to UI |
| PRJ-FE-004 | Create | Short title | Boundary | P2 | Validation/API error |
| PRJ-FE-005 | Create | Short description | Boundary | P2 | Validation/API error |
| PRJ-FE-006 | Edit | Owner updates project | Positive | P1 | Updated values appear |
| PRJ-FE-007 | Archive | Archive action success | Positive | P1 | Status changes to archived |
| PRJ-FE-008 | Delete | Owner/admin delete project | Positive | P1 | Project removed |
| PRJ-FE-009 | AuthZ UI | Non-owner restricted actions | Security | P1 | Controls hidden/disabled or backend error handled |
| PRJ-FE-010 | Error handling | Create/update/delete API failure | Reliability | P1 | User sees clear error message |

---

## 8) Tasks Page

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| TSK-FE-001 | List tasks | Open tasks page | Positive | P0 | Task list loads |
| TSK-FE-002 | Filters | Filter by status | Positive | P1 | Matching tasks displayed |
| TSK-FE-003 | Filters | Filter by priority | Positive | P1 | Matching tasks displayed |
| TSK-FE-004 | Filters | Filter by project/user | Positive | P2 | Matching tasks displayed |
| TSK-FE-005 | Create task | Valid payload | Positive | P1 | Task created and visible |
| TSK-FE-006 | Create task | Missing required fields | Negative | P1 | Error shown |
| TSK-FE-007 | Create task | Invalid date format | Boundary | P2 | Validation/API error |
| TSK-FE-008 | Create task | Invalid tags input | Negative | P2 | Validation/API error |
| TSK-FE-009 | Update task | Creator/admin full update | Positive | P1 | Changes persisted |
| TSK-FE-010 | Update status | Allowed user updates status | Positive | P1 | Status badge updates |
| TSK-FE-011 | Bulk update | Admin bulk update valid selection | Positive | P1 | Multiple tasks updated |
| TSK-FE-012 | Bulk update | Non-admin bulk update attempt | Security | P0 | Access blocked or API 403 handled |
| TSK-FE-013 | Delete task | Creator/admin deletion | Positive | P1 | Task removed from list |
| TSK-FE-014 | Error state | Tasks endpoint timeout/offline | Reliability | P0 | Error message and retry path |
| TSK-FE-015 | Empty state | No tasks returned | UX | P2 | Empty-state message shown |

---

## 9) Comments (Task-level)

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| CMT-FE-001 | View comments | Open task comments | Positive | P1 | Existing comments listed |
| CMT-FE-002 | Add comment | Valid content | Positive | P1 | Comment appears in list |
| CMT-FE-003 | Add comment | Too short content | Boundary | P2 | Validation/API error shown |
| CMT-FE-004 | Add comment | Too long content | Boundary | P2 | Validation/API error shown |
| CMT-FE-005 | Delete comment | Author deletes own comment | Positive | P1 | Comment removed |
| CMT-FE-006 | Delete comment | Non-author delete attempt | Security | P1 | Forbidden handled and shown |
| CMT-FE-007 | Error handling | Comments API fails | Reliability | P2 | Non-crashing error message |

---

## 10) Activity Logs (Admin)

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| LOG-FE-001 | List logs | Admin opens logs page | Positive | P1 | Logs table loads |
| LOG-FE-002 | Filters | Filter by entity/action | Positive | P2 | Filtered logs shown |
| LOG-FE-003 | Pagination | Navigate pages | Positive | P2 | Correct next/prev behavior |
| LOG-FE-004 | Security | Non-admin opening logs route | Security | P0 | Access denied/redirect |
| LOG-FE-005 | Error handling | Logs API 500/timeout | Reliability | P2 | Safe UI error state |

---

## 11) About / Static Pages

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| ABT-001 | About page | Open About page | Positive | P3 | Page content renders correctly |
| ABT-002 | About page | Endpoint lists present | Integration | P3 | All endpoint groups visible |
| ABT-003 | NotFound page | Unknown route | UX | P2 | Proper 404 screen and navigation |

---

## 12) API Interceptor and Global Error Handling

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| INT-001 | Request interceptor | Token attached to protected requests | Integration | P0 | Authorization header present |
| INT-002 | Response interceptor | 401 from backend triggers logout | Security | P0 | Session cleared and redirected |
| INT-003 | Response interceptor | 403 response handling | Security | P1 | User-friendly forbidden message |
| INT-004 | Response interceptor | 500 response handling | Reliability | P1 | Generic error toast/message |
| INT-005 | Network errors | Backend unreachable | Reliability | P0 | Graceful network error UI |

---

## 13) UI/UX and Accessibility

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| UX-001 | Responsive | 320px mobile viewport | UX | P2 | No horizontal overflow on key pages |
| UX-002 | Responsive | Tablet viewport | UX | P2 | Layout and navigation usable |
| UX-003 | Responsive | Desktop viewport | UX | P2 | Balanced layout and readable spacing |
| UX-004 | Keyboard | Tab navigation through forms/buttons | Accessibility | P2 | Logical focus order |
| UX-005 | Keyboard | Enter submits login form | Accessibility | P2 | Form submits correctly |
| UX-006 | Contrast | Main text/buttons contrast | Accessibility | P2 | Readable UI contrast |
| UX-007 | Feedback | Loading indicators for async actions | UX | P2 | Visible loading state |
| UX-008 | Feedback | Success/error notifications clarity | UX | P2 | Clear actionable messages |

---

## 14) Cross-Browser and Reliability

| ID | Feature | Scenario | Type | Priority | Expected Result |
|---|---|---|---|---|---|
| BRW-001 | Browser | Chrome full smoke (auth + tasks + users) | Integration | P1 | All major flows pass |
| BRW-002 | Browser | Edge full smoke | Integration | P2 | All major flows pass |
| BRW-003 | Browser | Firefox full smoke | Integration | P2 | All major flows pass |
| REL-FE-001 | Refresh | Hard refresh on protected route | Reliability | P1 | State restored or redirected safely |
| REL-FE-002 | Multi-tab | Logout in one tab | Reliability | P2 | Other tab handles session correctly |
| REL-FE-003 | Slow API | Simulated delayed responses | Reliability | P2 | UI remains responsive, proper loading states |

---

## 15) End-to-End Frontend Flows

| ID | Flow | Steps | Priority | Expected Result |
|---|---|---|---|---|
| FE-E2E-001 | Admin main flow | Login admin -> dashboard -> users CRUD -> projects -> tasks -> logs -> logout | P0 | Entire admin journey works |
| FE-E2E-002 | User main flow | Login user -> dashboard -> profile update -> projects/tasks view -> comment add/delete -> logout | P0 | Entire user journey works |
| FE-E2E-003 | Access control flow | Login as user -> attempt admin routes -> verify denial | P0 | Access restriction enforced |
| FE-E2E-004 | Recovery flow | Backend goes down during action -> backend restored -> retry | P1 | Clear errors then successful retry |

---

## Suggested Automation Mapping

- Cypress/Playwright smoke:
  - AUTH-FE-001, ROUTE-001, DSH-001, USR-FE-001, TSK-FE-001, INT-002
- Regression pack:
  - All P0/P1 cases
- Visual/UX pack:
  - UX-001..UX-008, ABT-001
- Compatibility pack:
  - BRW-001..BRW-003

## Execution Notes

1. Run backend reset (`POST /reset`) before major regression runs.
2. Keep separate admin and user sessions for role testing.
3. Validate both API behavior and visible UI behavior.
4. Capture screenshots/video for failed UI cases.
5. Re-run all P0 cases on each release candidate.
