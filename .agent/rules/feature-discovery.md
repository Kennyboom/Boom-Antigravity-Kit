# Feature Discovery Engine

> Systematic feature extraction to prevent omissions.
> MANDATORY before writing user stories or specs in `/plan`.

---

## Step 1: Entity Decomposition

Extract every entity, then auto-generate CRUD operations:

```
Entity: [Name]
├── Create (form, validation, submit)
├── Read List (table/grid, pagination, search)
├── Read Detail (single view, actions)
├── Edit (pre-filled form, save)
└── Delete (confirmation, soft delete)
```

> For EACH entity → generate 5 operations minimum.

---

## Step 2: Sub-feature Inference

For each feature, infer required sub-features:

| If Feature Has | Then MUST Plan |
|----------------|---------------|
| "Create" button | Form + field validation + submit API |
| "Upload" action | File picker + preview + progress bar |
| "List" view | Pagination + filter + sort + search |
| "Detail" view | Breadcrumb + actions + related items |
| "Edit" form | Pre-fill data + dirty check + save/cancel |
| "Delete" action | Confirmation modal + undo option |
| "Export" action | Format selection + progress + download |
| "Invite" action | Email input + role selection + send API |

---

## Step 3: Cross-cutting Concerns

Infer hidden features based on app capabilities:

| If App Has | Then MUST Plan |
|------------|---------------|
| Login/Auth | Credentials management + password reset |
| User data | Settings/Preferences page |
| Events/Actions | Notification system (in-app + email) |
| Error states | Global error handling + recovery |
| New users | Onboarding / first-run experience |
| Multiple roles | Permission system + role management |
| File uploads | Storage management + cleanup |
| Search feature | Search index + suggestions + history |

---

## Output: Feature Inventory Table

```markdown
| # | Feature | Type | Module | Priority | Status |
|---|---------|------|--------|----------|--------|
| 1 | Create Profile | Form | Profile | P0 | Not planned |
| 2 | Profile List | Grid | Profile | P0 | Not planned |
```

> ⛔ **DO NOT write user stories until Feature Inventory
> is approved by user.**

---

## Verification

After Feature Discovery, verify:

```
□ Every entity has CRUD operations listed
□ Every button/action has sub-features inferred
□ Cross-cutting concerns are addressed
□ Feature Inventory Table is complete
□ Priorities (P0/P1/P2) are assigned
```
