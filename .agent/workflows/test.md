---
description: >-
  Test Engineer v3 — TDD workflow, test pyramid strategy,
  coverage targets, integration/E2E patterns, mutation testing.
---

# /test — Test Engineer v3.0

$ARGUMENTS

---

## Sub-commands

```
/test                  - Run all tests
/test [file/feature]   - Generate tests for target
/test coverage         - Show coverage report
/test tdd [feature]    - Start TDD cycle for feature
/test e2e              - Run end-to-end tests
```

---

## GOLDEN RULES

```
1. TEST BEHAVIOR, NOT IMPLEMENTATION — Refactor-proof tests
2. ONE ASSERTION PER TEST — Clear failure messages
3. ARRANGE-ACT-ASSERT — Consistent structure
4. TEST PYRAMID — Many unit, some integration, few E2E
5. NO FLAKY TESTS — Deterministic, no timing deps
6. REGRESSION FIRST — Add test for bugs BEFORE fixing
```

---

## Phase 1: Test Strategy Analysis

```
BEFORE writing tests:

1. SCAN project:
   □ Test framework detected (Jest/Vitest/Playwright?)
   □ Existing test count and coverage
   □ Test patterns already in use
   □ Mock/stub patterns

2. CLASSIFY target:
   □ Pure function → Unit test
   □ Component with state → Component test
   □ API endpoint → Integration test
   □ User flow → E2E test

Report:
  "🧪 TEST STRATEGY:
   Framework: [Jest/Vitest]
   Current: [X] tests | Coverage: [Y]%
   Target: [type] tests for [scope]"
```

### Phase 1.5: Spec Traceability (IF specs exist)

```
IF docs/specs/ exists:
  1. READ acceptance criteria from spec files
  2. MAP each AC → test file:

  | AC | Description | Test File | Status |
  |----|-------------|-----------|:------:|
  | AC1 | Login redirects to dashboard | auth.test.ts | ✅ |
  | AC2 | Invalid email shows error | auth.test.ts | ✅ |
  | AC3 | Rate limit after 5 attempts | NO TEST | ⚠️ |

  3. REPORT gaps: "AC3 has NO test → must create"

IF no specs → skip this phase.
```

---

## Phase 2: Coverage Targets

```
COVERAGE BUDGET:

| Layer | Target | Minimum | Tool |
|-------|:------:|:-------:|------|
| Statements | 80% | 70% | Jest --coverage |
| Branches | 75% | 65% | Jest --coverage |
| Functions | 85% | 75% | Jest --coverage |
| Lines | 80% | 70% | Jest --coverage |

PRIORITY (what to test FIRST):
1. Business logic / utils (highest ROI)
2. API route handlers
3. Complex components with state
4. Edge cases from bug history
5. Integration points (DB, external APIs)

SKIP (not worth testing):
- Simple getters/setters
- Framework boilerplate
- Generated code
- Constants/types
```

---

## Phase 3: TDD Workflow (Red → Green → Refactor)

```
🔴 RED — Write FAILING test first:
  1. Write test describing desired behavior
  2. Run → MUST FAIL (proves test works)
  3. Failure should be for RIGHT reason

🟢 GREEN — Minimal code to pass:
  1. Write MINIMUM code to make test pass
  2. No extra features, no "nice to have"
  3. Run → MUST PASS

🔵 REFACTOR — Clean without breaking:
  1. Improve code quality
  2. Run tests → MUST STILL PASS
  3. No new behavior, only structure changes

REPEAT for each behavior
```

---

## Phase 4: Test Generation (per type)

### Unit Test Pattern

```typescript
describe('[Module/Function]', () => {
  // Group by function
  describe('[functionName]', () => {
    // Happy path (tag with AC# if spec exists)
    it('[AC1] should [expected behavior] when [condition]', () => {
      // Arrange
      const input = { /* valid data */ };

      // Act
      const result = functionName(input);

      // Assert
      expect(result).toEqual(expectedOutput);
    });

    // Error case
    it('should throw [ErrorType] when [invalid condition]', () => {
      const invalidInput = { /* bad data */ };

      expect(
        () => functionName(invalidInput)
      ).toThrow(ExpectedError);
    });

    // Edge case
    it('should handle [edge case]', () => {
      const edgeInput = { /* boundary data */ };
      const result = functionName(edgeInput);
      expect(result).toBeDefined();
    });
  });
});
```

### Component Test Pattern

```typescript
describe('[ComponentName]', () => {
  it('renders in idle state', () => {
    render(<Component />);
    expect(screen.getByText('...')).toBeVisible();
  });

  it('shows loading state', () => {
    render(<Component isLoading />);
    expect(screen.getByRole('progressbar')).toBeVisible();
  });

  it('shows error state with retry', async () => {
    render(<Component error="Failed" />);
    expect(screen.getByText('Failed')).toBeVisible();
    expect(screen.getByRole('button', { name: /retry/i }))
      .toBeVisible();
  });

  it('shows empty state with CTA', () => {
    render(<Component data={[]} />);
    expect(screen.getByText(/no items/i)).toBeVisible();
  });
});
```

### API Integration Test Pattern

```typescript
describe('POST /api/v1/[resource]', () => {
  it('creates resource with valid input', async () => {
    const response = await request(app)
      .post('/api/v1/resource')
      .send(validPayload)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('rejects invalid input with 400', async () => {
    const response = await request(app)
      .post('/api/v1/resource')
      .send(invalidPayload);

    expect(response.status).toBe(400);
  });

  it('rejects unauthorized with 401', async () => {
    const response = await request(app)
      .post('/api/v1/resource')
      .send(validPayload);

    expect(response.status).toBe(401);
  });
});
```

---

## Phase 5: Test Quality Checklist

```
BEFORE submitting tests:

□ Each test has descriptive name
□ Tests are independent (no shared state)
□ No hardcoded waits (use waitFor/findBy)
□ Mocks reset between tests (afterEach)
□ Edge cases covered (null, empty, max, min)
□ Error paths covered (network, validation, auth)
□ All 5 UI states tested (if component)
□ No console.log left in tests
□ Tests pass in CI (not just locally)
□ Coverage meets targets
```

---

## Output Format

```markdown
## 🧪 Test Report: [Target]

### Strategy
| Metric | Value |
|--------|-------|
| Framework | [Jest/Vitest] |
| Tests written | [N] |
| Coverage | [X]% |

### Test Plan
| Test Case | Type | Status |
|-----------|------|:------:|
| Should [behavior] | Unit | ✅ |
| Should handle [error] | Unit | ✅ |
| Should render [state] | Component | ✅ |

### Coverage
Statements: [X]% | Branches: [Y]%
Functions: [X]% | Lines: [Y]%

### Next
1. Run tests: `npm test`
2. Check coverage: `npm test -- --coverage`
3. Review quality: `/review health`
4. Save context: `/save`
```
