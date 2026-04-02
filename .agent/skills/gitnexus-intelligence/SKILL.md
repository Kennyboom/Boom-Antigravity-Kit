---
name: gitnexus-intelligence
description: >-
  Code Intelligence via GitNexus Knowledge Graph.
  Use when analyzing dependencies, blast radius,
  call chains, or planning safe refactors.
skills:
  - architecture
  - clean-code
---

# GitNexus Intelligence — Graph-Powered Code Analysis

> Use this skill when you need deep architectural
> awareness beyond simple text search.

---

## Prerequisites

GitNexus must be indexed on the target project:

```bash
npx -y gitnexus@latest analyze
```

MCP server registered in `.agent/mcp_config.json`.

---

## 7 MCP Tools Reference

### 1. `query` — Search the Knowledge Graph

**When:** Find symbols, modules, or concepts.

```
query({ query: "authentication", repo: "my-app" })
```

Returns matching files, functions, classes ranked
by graph relevance (not just text match).

### 2. `context` — Call Chain Analysis

**When:** Understand WHO calls a function and WHAT
it calls downstream.

```
context({ symbol: "parseRawData", repo: "my-app" })
```

Returns: callers, callees, containing module,
processes that include this symbol.

### 3. `impact` — Blast Radius Analysis

**When:** BEFORE modifying any shared function.
MANDATORY in `/create` and `/refactor` workflows.

```
impact({ symbol: "UserSession", repo: "my-app" })
```

Returns: upstream/downstream dependencies with
depth levels and risk summary.

### 4. `detect_changes` — Git Diff to Symbols

**When:** After commits, map changed lines to
affected symbols and processes.

```
detect_changes({ repo: "my-app" })
```

Returns: list of symbols touched, processes
disrupted, suggested test targets.

### 5. `rename` — Safe Rename with Preview

**When:** Renaming functions, classes, or variables
across the codebase.

```
rename({
  symbol: "oldName",
  new_name: "newName",
  dry_run: true,
  repo: "my-app"
})
```

Returns: all locations that would change,
confidence level (graph vs text_search).

### 6. `cypher` — Advanced Graph Query

**When:** Complex structural queries that simple
search cannot answer.

```
cypher({
  query: "MATCH (f:Function)-[:CALLS]->(g:Function) WHERE g.name = 'fetchUser' RETURN f",
  repo: "my-app"
})
```

Check schema first via resource:
`gitnexus://repo/{name}/schema`

### 7. `list_repos` — Discover Indexed Repos

**When:** Multiple repos indexed, need to specify
which one to query.

```
list_repos()
```

---

## Decision Matrix: Which Tool When?

| Situation | Tool |
|-----------|------|
| "What does function X do?" | `context` |
| "What breaks if I change X?" | `impact` |
| "Find all auth-related code" | `query` |
| "Safe rename across project" | `rename` |
| "What did last commit affect?" | `detect_changes` |
| "Complex dependency query" | `cypher` |
| "Which repo am I working on?" | `list_repos` |

---

## Integration Rules

```
RULE 1: IMPACT BEFORE EDIT
  Before modifying any shared/core function:
  → Run `impact` → review blast radius
  → If risk HIGH → warn user before proceeding

RULE 2: CONTEXT BEFORE DEBUG
  When tracing a bug through call chains:
  → Run `context` on the failing symbol
  → Trace upstream callers for root cause

RULE 3: DETECT AFTER COMMIT
  After completing a feature or fix:
  → Run `detect_changes` to verify
  → Ensure no unintended symbols affected

RULE 4: GRACEFUL FALLBACK
  If GitNexus is not indexed (no .gitnexus/):
  → Fall back to grep_search + view_file
  → Suggest: "Run `npx gitnexus analyze` first"
  → Do NOT block the workflow
```

---

## Resources (Read-Only Context)

```
gitnexus://repos                      — All indexed repos
gitnexus://repo/{name}/context        — Architecture overview
gitnexus://repo/{name}/clusters       — Code communities
gitnexus://repo/{name}/cluster/{name} — Specific cluster
gitnexus://repo/{name}/processes      — Execution flows
gitnexus://repo/{name}/process/{name} — Specific process
gitnexus://repo/{name}/schema         — Graph DB schema
```
