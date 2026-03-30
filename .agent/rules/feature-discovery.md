# Feature Discovery Engine v2.0

> Systematic feature extraction to prevent omissions.
> MANDATORY before writing user stories or specs in `/plan`.

---

## Step 1: Entity Decomposition

Extract every data entity, then auto-generate operations:

```
Entity: [Name]
├── Create (form, validation, submit, success feedback)
├── Read List (table/grid, pagination, search, filter, sort)
├── Read Detail (single view, actions, breadcrumb)
├── Edit (pre-filled form, dirty check, save/cancel)
├── Delete (confirmation modal, soft delete, undo option)
├── Export (if applicable — format selection, progress)
└── Import (if applicable — file validation, preview)
```

> For EACH entity → generate 5-7 operations minimum.

---

## Step 2: Sub-feature Inference

For each feature, AUTOMATICALLY infer required sub-features:

| If Feature Has | Then MUST Plan |
|----------------|---------------|
| "Create" button | Form + field validation + submit API + success toast |
| "Upload" action | File picker + preview + progress bar + size limit |
| "List" view | Pagination + filter + sort + search + empty state |
| "Detail" view | Breadcrumb + actions + related items + back button |
| "Edit" form | Pre-fill data + dirty check + save/cancel + confirm |
| "Delete" action | Confirmation modal + undo option + cascade check |
| "Export" action | Format selection + progress + download + error |
| "Invite" action | Email input + role selection + send API + status |
| "Settings" page | Sections + save per section + reset to defaults |
| "Dashboard" | Stats cards + charts + date range + refresh |
| "Notification" | List + mark read + clear all + preferences |
| "Search" box | Suggestions + history + debounce + no results |

---

## Step 3: Cross-cutting Concerns

Infer hidden features based on app capabilities:

| If App Has | Then MUST Plan |
|------------|---------------|
| Login/Auth | Credentials management + password reset + 2FA |
| User data | Settings/Preferences page + profile edit |
| Events/Actions | Notification system (in-app + email + push) |
| Error states | Global error handling + recovery + retry |
| New users | Onboarding / first-run / welcome wizard |
| Multiple roles | Permission system + role management + access denied |
| File uploads | Storage management + cleanup + quotas |
| Search feature | Search index + suggestions + history + filters |
| Payment | Billing page + invoice history + plan comparison |
| Multi-language | Language selector + RTL support + locale files |
| Dark mode | Theme toggle + system detection + persistence |

---

## Step 4: Navigation & Layout Inference

```
IF app has multiple screens:
  → MUST plan: Navigation (sidebar, tabs, breadcrumbs)
  → MUST plan: Layout system (header, footer, content area)
  → MUST plan: Mobile responsive navigation
  → MUST plan: 404 / Not Found page
  → MUST plan: Loading skeleton for each page

IF app has auth:
  → MUST plan: Protected routes middleware
  → MUST plan: Login page + Register page
  → MUST plan: Forgot password flow
  → MUST plan: Session expiry handling
```

---

## Step 5: Output — Feature Inventory Table

```markdown
| # | Feature | Type | Module | Priority | Status |
|---|---------|------|--------|----------|--------|
| 1 | Create Profile | Form | Profile | P0 | Not planned |
| 2 | Profile List | Grid | Profile | P0 | Not planned |
| 3 | Profile Detail | View | Profile | P0 | Not planned |
| 4 | Edit Profile | Form | Profile | P1 | Not planned |
| 5 | Delete Profile | Action | Profile | P1 | Not planned |
| 6 | Login | Auth | Auth | P0 | Not planned |
| 7 | Settings | Page | System | P1 | Not planned |
```

> ⛔ DO NOT write user stories until Feature Inventory
> is approved by user.

---

## Verification Checklist

After Feature Discovery, verify ALL of these:

```
□ Every entity has 5+ operations (CRUD + extras)
□ Every button/action has sub-features inferred
□ Cross-cutting concerns are addressed
□ Navigation and layout are planned
□ Auth flow is complete (if applicable)
□ Error handling is planned globally
□ Feature Inventory Table is complete
□ Priorities (P0/P1/P2) are assigned
□ No feature from BRIEF/request is missing
```

---

## Common Omissions Checklist

These features are MOST FREQUENTLY forgotten:

```
□ Empty states for every list/table
□ Loading states for every data fetch
□ Error states for every API call
□ 404 page
□ Session expiry / token refresh
□ Mobile responsive design
□ Keyboard shortcuts (if desktop app)
□ Confirmation dialogs for destructive actions
□ Undo/redo for important actions
□ Form autosave / dirty check
□ Rate limiting feedback (429 handling)
□ Offline mode / connection status
```
