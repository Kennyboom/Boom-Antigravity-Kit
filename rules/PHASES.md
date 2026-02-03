# 🎭 PHASES

> **LOAD**: When running workflow phases | **PURPOSE**: Phase execution protocol

---

## REQUIREMENTS INTAKE (Before Phase 1)

### Parse ALL requirements into Registry

```markdown
### 📋 Requirements Registry
| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| R1 | {extracted} | {H/M/L} | ⏳ |
| R2 | {extracted} | {H/M/L} | ⏳ |
```

**Rule**: 100% fidelity — extract EVERY requirement, no assumptions, no omissions.

---

## PHASE OUTPUT FORMAT (SINGLE SOURCE OF TRUTH)

**⛔ This is the ONLY place phase output is defined. All other files reference here.**

### Emit progressively as you go:

```markdown
## 🎭 Phase {N}: {name}

### Sub-agent: `{agent}` — {role}     ← TIER 1 only
### Embodying: `{agent}` — {role}     ← TIER 2 only

{agent work / summary}

### Exit Criteria
- [x] {criterion_1}
- [x] {criterion_2}

### ✅ `{agent}` complete
**Deliverable**: {summary}
```

**Rules**:
- TIER 1 → "Sub-agent" line | TIER 2 → "Embodying" line (never both)
- Emit phase start **before** work, exit criteria **after**
- Continue to next phase immediately (same reply)

---

## PHASE EXECUTION RULES

### One Phase at a Time (No Batching)

```
FOR Phase N:
  1. EMIT "## 🎭 Phase N: {name}"
  2. LOAD only what Phase N needs (agent file, prior deliverables)
  3. DELEGATE via TIERED EXECUTION
  4. EMIT exit criteria + completion
  5. Write deliverable file if required
  6. CONTINUE to Phase N+1 (do not stop)
```

**⛔ Forbidden**: Loading agents for Phase 2, 3, ... while in Phase 1

### Prior Deliverables as Constraints

```
BEFORE Phase N:
  1. CHECK if prior deliverable exists
  2. IF exists:
     → READ completely
     → LOCK as IMMUTABLE constraint (L8)
     → DO NOT modify prior decisions
  3. IF missing but required:
     → HALT with notice
     → Create first via appropriate agent
     → Then resume
```

### Allowed Loads Per Phase

```
⛔ FORBIDDEN: Loading Phase 2's agents while in Phase 1
✅ ALLOWED: Load only what current phase needs
✅ ALLOWED: Read prior deliverables as input
```

---

## EXIT CRITERIA VERIFICATION

Before moving to next phase, verify:

```
□ Deliverable produced
□ Output matches agent's format
□ All exit criteria met
□ No scope creep
```

---

## WORKFLOW COMPLETION

After last phase:

```markdown
## ✅ Workflow Complete

### � User Request Verification
> {Quote user's original request from plan header}

### 📋 Acceptance Criteria Verification
| ID | Criterion | Status | Evidence |
|----|-----------|--------|----------|
| AC1 | {criterion from plan} | ✅ | {file:line or test} |
| AC2 | {criterion from plan} | ✅ | {proof of implementation} |

### 📋 Requirements Verification  
| ID | Requirement | Status | Evidence |
|----|-------------|--------|----------|
| R1 | {req} | ✅ | {file:line or deliverable} |
| R2 | {req} | ✅ | {proof of implementation} |

### 📦 Deliverables
- {list of outputs with paths}

### ⚠️ Notes
{any warnings, limitations, or follow-ups}
```

**Rules**: 
- Trace EVERY acceptance criterion to evidence
- Verify against ORIGINAL user request (not interpreted version)
- No silent drops

---

## SKILLS ANALYSIS (MANDATORY OUTPUT)

**⛔ You MUST output skills decision for every phase delegation.**

### Simple task:
```
🎯 Skills Analysis: Simple → Skipping (base knowledge sufficient)
```

### Complex task:
```
🎯 Skills Analysis: Complex → Using `skill1`, `skill2`
```

**🚫 Silent skipping is FORBIDDEN**
