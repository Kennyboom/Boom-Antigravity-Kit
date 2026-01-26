# Skill Discovery Protocol

> **Purpose**: Runtime resolution of skills for agents using the Matrix Metadata system.
> **Source**: `~/.{TOOL}/skills/agent-assistant/matrix-skills/` (distributed by domain)
> **Total Skills**: 218 skills across 19 domains

---

## Overview

The Skill Discovery Protocol replaces hardcoded skill lists in agent files with dynamic resolution from a distributed matrix organized by domain. When an agent is activated, this protocol determines which skills to inject based on the agent's declared profile and inherited domains.

### Matrix Structure

```
matrix-skills/
├── _index.yaml          # Registry, agent profiles, resolution rules
├── backend.yaml         # 20 skills
├── frontend.yaml        # 18 skills
├── architecture.yaml    # 9 skills
├── quality.yaml         # 17 skills
├── security.yaml        # 6 skills
├── design.yaml          # 10 skills
├── planning.yaml        # 9 skills
├── devops.yaml          # 15 skills
├── data.yaml            # 7 skills
├── performance.yaml     # 1 skill
├── research.yaml        # 11 skills
├── mobile.yaml          # 8 skills
├── gaming.yaml          # 3 skills
├── management.yaml      # 4 skills
├── ai-ml.yaml           # 13 skills
├── cloud.yaml           # 11 skills
├── languages.yaml       # 17 skills
├── tools.yaml           # 31 skills
└── mcp.yaml             # 8 skills
```

---

## Resolution Algorithm

### Step 1: Parse Agent Profile

Extract from agent frontmatter:
```yaml
profile: "{domain}:{category}"
```

Example: `backend:execution` → domain=backend, category=execution

### Step 2: Load Domain Files

From `_index.yaml`, find agent's inherited domains:
```yaml
agent_profiles:
  backend-engineer:
    profile: "backend:execution"
    inherit_from: ["backend", "architecture", "quality", "data", "languages"]
```

Load each domain file: `backend.yaml`, `architecture.yaml`, `quality.yaml`, etc.

### Step 3: Resolve Skills

Execute in order of precedence:

```
1. DIRECT AGENT MATCH
   → Find skills where relevance_mapping.agents contains agent_id
   → Example: skill.relevance_mapping.agents: [backend-engineer]
   
2. PROFILE MATCH  
   → Find skills where relevance_mapping.profiles contains:
     - Exact match: "backend:execution"
     - Domain wildcard: "backend:*"
     - Category wildcard: "*:execution"
     - Universal: "*"
   
3. DOMAIN INHERITANCE
   → From agent_profiles.{agent_id}.inherit_from
   → Include skills from inherited domains
```

### Step 4: Apply Priority Filter

```yaml
thresholds:
  critical_priority: 9    # Always include (mandatory)
  core_priority: 7        # Standard include
  minimum_priority: 5     # Include if context matches
```

### Step 5: Apply Overrides

If agent declares `skill_overrides`:
```yaml
skill_overrides:
  include: [additional-skill]   # Force add
  exclude: [removed-skill]      # Force remove
  priority_threshold: 8         # Override minimum
```

### Step 6: Return Skill Set

Sorted by priority_score descending.

---

## Resolution Examples

### Example 1: Backend Engineer

**Input:**
```yaml
name: backend-engineer
profile: "backend:execution"
```

**Domain Files Loaded:**
- `backend.yaml`
- `architecture.yaml`
- `quality.yaml`
- `data.yaml`
- `languages.yaml`

**Resolution:**

| Step | Source File | Skills Found |
|------|-------------|--------------|
| 1 | backend.yaml | api-patterns, backend-development, microservices-architect |
| 2 | architecture.yaml | architecture, clean-code |
| 3 | data.yaml | database-design, sql-pro, prisma-expert |
| 4 | languages.yaml | typescript-expert, python-patterns |

**Output (sorted by priority):**
```
architecture (10)
api-patterns (9)
database-design (9)
clean-code (9)
backend-development (8)
typescript-expert (8)
microservices-architect (8)
...
```

### Example 2: Designer with Override

**Input:**
```yaml
name: designer
profile: "design:creative"
skill_overrides:
  exclude: [ux-researcher-designer]
  priority_threshold: 8
```

**Domain Files Loaded:**
- `design.yaml`
- `frontend.yaml`

**Resolution:**

| Step | Action |
|------|--------|
| 1 | Load skills from design.yaml |
| 2 | Load skills from frontend.yaml |
| 3 | Remove ux-researcher-designer (excluded) |
| 4 | Filter priority >= 8 only |

**Output:**
```
aesthetic (9)
ui-ux-pro-max (9)
frontend-design (9)
tailwind-patterns (8)
ui-design-system (8)
ui-styling (8)
```

---

## Wildcard Patterns

| Pattern | Meaning | Example Match |
|---------|---------|---------------|
| `backend:execution` | Exact match | backend:execution only |
| `backend:*` | Any backend category | backend:execution, backend:analysis |
| `*:execution` | Any domain, execution category | backend:execution, frontend:execution |
| `*:orchestration` | Any orchestrator | architecture:orchestration, management:orchestration |
| `*` | Universal (all agents) | Any agent |

---

## Domain Inheritance

Defined in `_index.yaml`:

```yaml
agent_profiles:
  backend-engineer:
    profile: "backend:execution"
    inherit_from: ["backend", "architecture", "quality", "data", "languages"]
    primary_domain: "backend"
```

When resolving skills for `backend-engineer`:
1. Load `backend.yaml` → filter matching skills
2. Load `architecture.yaml` → filter matching skills
3. Load `quality.yaml` → filter matching skills
4. Load `data.yaml` → filter matching skills
5. Load `languages.yaml` → filter matching skills

This enables cross-domain skill sharing without explicit agent declarations.

---

## Adding New Skills

### Workflow

1. **Create skill folder:**
   ```
   ~/.{TOOL}/skills/{skill-id}/
   └── SKILL.md
   ```

2. **Add to appropriate domain file:**
   ```yaml
   # matrix-skills/{domain}.yaml
   - skill_id: new-skill
     category: {core|expert|specialized|utility}
     priority_score: {1-10}
     relevance_mapping:
       agents: [{agent1}, {agent2}]
       profiles: ["{domain}:{category}"]
     description: "Brief AI-recognizable description"
   ```

3. **Update domain skill_count in _index.yaml** (optional but recommended)

4. **Verify resolution:**
   - Skill appears in target agent's resolved set
   - Priority ordering is correct
   - No conflicts with existing skills

### Priority Guidelines

| Score | Category | Usage |
|-------|----------|-------|
| 10 | Critical | Always required, never skip |
| 9 | Core | Standard for domain |
| 8 | Expert | Specialized but common |
| 7 | Core | Useful in most contexts |
| 6 | Utility | Context-dependent |
| 5 | Optional | Nice to have |
| 1-4 | Rare | Edge cases only |

---

## Validation Rules

### Pre-Deployment Checks

1. **Skill existence:**
   - Every `skill_id` in domain files has corresponding `~/.{TOOL}/skills/{skill_id}/SKILL.md`

2. **Agent coverage:**
   - Every agent has at least one matching skill
   - No orphan agents with empty skill sets

3. **Profile validity:**
   - All profiles reference valid domains
   - Domain inheritance forms no cycles

4. **Priority consistency:**
   - Critical skills (9-10) present for all core agents
   - No domain without core skills (7+)

### Runtime Validation

```
IF resolved_skills.length == 0:
  → ERROR: No skills found for agent
  → FALLBACK: Use agent's skill_overrides.include if present
  
IF critical_skill.missing:
  → WARNING: Agent missing critical skill
  → CONTINUE: May degrade performance
```

---

## Orchestrator Integration

When orchestrator activates an agent:

```
1. READ agent file → extract profile
2. LOAD _index.yaml → find inherited domains
3. LOAD domain files → collect matching skills
4. APPLY filters and overrides
5. INJECT resolved skills into agent context
6. EXECUTE agent with full skill set
```

The orchestrator never needs to know individual skills—it only needs the agent's profile.

---

## Performance Considerations

### Caching Strategy

- `_index.yaml` loaded once at orchestrator startup
- Domain files loaded on-demand per agent
- Skill resolution is cached per agent_id
- Cache invalidation on any matrix file change

### Complexity

- Resolution: O(D × S) where D=inherited domains, S=skills per domain
- Typical resolution: < 1ms
- Total Matrix size: ~218 skills = ~15KB across all YAML files

---

## Troubleshooting

| Symptom | Cause | Solution |
|---------|-------|----------|
| Agent has no skills | Profile not in _index.yaml | Add to agent_profiles |
| Wrong skills injected | Incorrect relevance_mapping | Fix mapping in domain file |
| Skill not appearing | Priority below threshold | Increase priority_score |
| Too many skills | Broad inheritance | Use skill_overrides.exclude |
| Skill conflict | Duplicate skill_id | Ensure unique IDs across all domain files |
| Domain file not loaded | Not in inherit_from | Add domain to agent's inherit_from |

---

## References

- **Matrix Index**: `~/.{TOOL}/skills/agent-assistant/matrix-skills/_index.yaml`
- **Domain files**: `~/.{TOOL}/skills/agent-assistant/matrix-skills/{domain}.yaml`
- **Agent template**: `AGENT-TEMPLATE.md`
- **Skills directory**: `~/.{TOOL}/skills/`
