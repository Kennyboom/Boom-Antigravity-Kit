# Agent Assistant — Feature Specifications

> **Document Type**: Feature Specifications  
> **Version**: 1.0  
> **Status**: Complete  
> **Last Updated**: 2026-01-26

---

## 1. Feature Overview

Agent Assistant provides a comprehensive feature set organized into six categories:

| Category | Feature Count | Description |
|----------|---------------|-------------|
| Specialist Agents | 20 | Domain expert personas |
| Command Workflows | 40+ | Development workflow automations |
| Domain Skills | 218 | On-demand knowledge modules |
| Quality Gates | 5 | Automated verification checkpoints |
| Orchestration Rules | 8 | Governance and coordination protocols |
| CLI Tools | 3 | Installation and management commands |

---

## 2. Specialist Agents

### 2.1 Implementation Agents

#### F-AGENT-001: Backend Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | `backend-engineer` |
| **Profile** | `backend:execution` |
| **Role** | Principal Backend Architect |
| **Inherited Domains** | backend, architecture, quality, data, languages |

**Capabilities:**
- Design and implement REST/GraphQL APIs
- Build server-side logic and business rules
- Implement data access layers
- Optimize database queries
- Apply security best practices

**Use Cases:**
- `/cook:hard` for backend features
- `/fix` for server-side bugs
- API endpoint implementation

---

#### F-AGENT-002: Frontend Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | `frontend-engineer` |
| **Profile** | `frontend:execution` |
| **Role** | Principal Frontend Architect |
| **Inherited Domains** | frontend, design, architecture |

**Capabilities:**
- Build React/Next.js applications
- Implement responsive UI components
- Ensure accessibility (WCAG compliance)
- Optimize frontend performance
- Apply modern CSS patterns

**Use Cases:**
- `/cook:hard` for UI features
- `/design` workflows
- Component library development

---

#### F-AGENT-003: Mobile Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | `mobile-engineer` |
| **Profile** | `mobile:execution` |
| **Role** | Mobile Development Specialist |
| **Inherited Domains** | mobile, design, frontend |

**Capabilities:**
- Build React Native applications
- Develop Flutter cross-platform apps
- Native iOS (Swift) development
- Native Android (Kotlin) development
- Mobile performance optimization

**Use Cases:**
- Mobile app development
- Cross-platform features
- Platform-specific implementations

---

#### F-AGENT-004: Game Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | `game-engineer` |
| **Profile** | `gaming:execution` |
| **Role** | Game Development Specialist |
| **Inherited Domains** | gaming, performance, frontend |

**Capabilities:**
- Implement game loops
- 3D graphics programming
- Physics and collision systems
- Game performance optimization
- Multiplayer networking

**Use Cases:**
- Game feature development
- Performance optimization
- 3D/2D game systems

---

### 2.2 Architecture Agents

#### F-AGENT-005: Tech Lead

| Attribute | Value |
|-----------|-------|
| **ID** | `tech-lead` |
| **Profile** | `architecture:orchestration` |
| **Role** | Implementation Orchestrator |
| **Inherited Domains** | architecture, quality, planning |

**Capabilities:**
- Route implementation tasks to specialists
- Ensure quality gate compliance
- Detect implementation drift
- Coordinate multi-agent workflows
- Make architectural decisions

**Use Cases:**
- `/cook:hard` workflow orchestration
- Implementation oversight
- Quality verification

---

#### F-AGENT-006: Database Architect

| Attribute | Value |
|-----------|-------|
| **ID** | `database-architect` |
| **Profile** | `data:execution` |
| **Role** | Data Architecture Specialist |
| **Inherited Domains** | data, performance, architecture |

**Capabilities:**
- Design database schemas
- Create and manage migrations
- Optimize query performance
- Implement data access patterns
- Design replication strategies

**Use Cases:**
- Schema design
- Query optimization
- Data modeling

---

### 2.3 Quality Agents

#### F-AGENT-007: Tester

| Attribute | Value |
|-----------|-------|
| **ID** | `tester` |
| **Profile** | `quality:validation` |
| **Role** | QA Specialist |
| **Inherited Domains** | quality |

**Capabilities:**
- Design test strategies
- Write unit and integration tests
- Create E2E test suites
- Measure code coverage
- Identify edge cases

**Use Cases:**
- `/test` command workflows
- Test generation for features
- Coverage improvement

---

#### F-AGENT-008: Reviewer

| Attribute | Value |
|-----------|-------|
| **ID** | `reviewer` |
| **Profile** | `quality:review` |
| **Role** | Code Review Specialist |
| **Inherited Domains** | quality, security, architecture |

**Capabilities:**
- Review code for best practices
- Verify plan compliance
- Identify code smells
- Suggest improvements
- Ensure standards adherence

**Use Cases:**
- `/review` command workflows
- PR review automation
- Code quality verification

---

#### F-AGENT-009: Debugger

| Attribute | Value |
|-----------|-------|
| **ID** | `debugger` |
| **Profile** | `quality:debugging` |
| **Role** | Debug Specialist |
| **Inherited Domains** | quality, performance |

**Capabilities:**
- Reproduce issues systematically
- Formulate and test hypotheses
- Identify root causes
- Trace execution paths
- Analyze error logs

**Use Cases:**
- `/debug` command workflows
- Bug investigation
- Performance debugging

---

#### F-AGENT-010: Security Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | `security-engineer` |
| **Profile** | `security:validation` |
| **Role** | Security Specialist |
| **Inherited Domains** | security, architecture |

**Capabilities:**
- Identify security vulnerabilities
- Apply OWASP best practices
- Conduct threat modeling
- Implement secure coding patterns
- Review authentication/authorization

**Use Cases:**
- Security gate verification
- `/docs:audit` workflows
- Vulnerability assessment

---

### 2.4 Planning Agents

#### F-AGENT-011: Planner

| Attribute | Value |
|-----------|-------|
| **ID** | `planner` |
| **Profile** | `planning:analysis` |
| **Role** | Technical Planner |
| **Inherited Domains** | planning, architecture |

**Capabilities:**
- Create implementation plans
- Identify risks and mitigations
- Define task dependencies
- Estimate effort
- Plan rollback strategies

**Use Cases:**
- `/plan` command workflows
- Feature planning
- Sprint preparation

---

#### F-AGENT-012: Brainstormer

| Attribute | Value |
|-----------|-------|
| **ID** | `brainstormer` |
| **Profile** | `planning:discovery` |
| **Role** | Requirements Discovery Specialist |
| **Inherited Domains** | planning, research |

**Capabilities:**
- Discover requirements through questions
- Clarify ambiguous requests
- Identify edge cases
- Surface hidden requirements
- Document requirements

**Use Cases:**
- `/brainstorm` command workflows
- Requirements gathering
- Feature discovery

---

#### F-AGENT-013: Business Analyst

| Attribute | Value |
|-----------|-------|
| **ID** | `business-analyst` |
| **Profile** | `planning:business` |
| **Role** | Business Analysis Specialist |
| **Inherited Domains** | planning, management |

**Capabilities:**
- Write INVEST-compliant user stories
- Analyze stakeholder needs
- Create domain models
- Map business processes
- Define acceptance criteria

**Use Cases:**
- `/docs:business` workflows
- User story creation
- Business analysis

---

### 2.5 Support Agents

#### F-AGENT-014: Designer

| Attribute | Value |
|-----------|-------|
| **ID** | `designer` |
| **Profile** | `design:creative` |
| **Role** | UI/UX Design Specialist |
| **Inherited Domains** | design, frontend |

**Capabilities:**
- Design user interfaces
- Create design systems
- Ensure accessibility
- Apply visual design principles
- Define interaction patterns

**Use Cases:**
- `/design` command workflows
- UI component design
- Design system creation

---

#### F-AGENT-015: DevOps Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | `devops-engineer` |
| **Profile** | `devops:execution` |
| **Role** | DevOps Specialist |
| **Inherited Domains** | devops, security, cloud |

**Capabilities:**
- Configure CI/CD pipelines
- Manage infrastructure as code
- Containerize applications
- Deploy to cloud platforms
- Implement rollback strategies

**Use Cases:**
- `/deploy` command workflows
- Infrastructure setup
- Pipeline configuration

---

#### F-AGENT-016: Docs Manager

| Attribute | Value |
|-----------|-------|
| **ID** | `docs-manager` |
| **Profile** | `research:documentation` |
| **Role** | Documentation Specialist |
| **Inherited Domains** | research |

**Capabilities:**
- Write technical documentation
- Create API documentation
- Generate README files
- Maintain documentation standards
- Structure knowledge bases

**Use Cases:**
- `/docs` command workflows
- Documentation generation
- README updates

---

#### F-AGENT-017: Performance Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | `performance-engineer` |
| **Profile** | `performance:validation` |
| **Role** | Performance Specialist |
| **Inherited Domains** | performance, backend, frontend |

**Capabilities:**
- Profile application performance
- Identify bottlenecks
- Set performance budgets
- Optimize critical paths
- Benchmark systems

**Use Cases:**
- Performance optimization
- Load testing
- Profiling workflows

---

#### F-AGENT-018: Researcher

| Attribute | Value |
|-----------|-------|
| **ID** | `researcher` |
| **Profile** | `research:analysis` |
| **Role** | Technical Research Specialist |
| **Inherited Domains** | research, planning |

**Capabilities:**
- Research technical solutions
- Compare alternatives
- Analyze documentation
- Identify best practices
- Summarize findings

**Use Cases:**
- `/cook:hard` research phase
- Technology evaluation
- Pattern research

---

#### F-AGENT-019: Scouter

| Attribute | Value |
|-----------|-------|
| **ID** | `scouter` |
| **Profile** | `research:exploration` |
| **Role** | Codebase Exploration Specialist |
| **Inherited Domains** | research, architecture |

**Capabilities:**
- Explore codebase structure
- Identify patterns and conventions
- Map dependencies
- Locate relevant code
- Analyze tech stack

**Use Cases:**
- Codebase analysis
- Documentation generation
- Feature context gathering

---

#### F-AGENT-020: Project Manager

| Attribute | Value |
|-----------|-------|
| **ID** | `project-manager` |
| **Profile** | `management:orchestration` |
| **Role** | Project Delivery Specialist |
| **Inherited Domains** | management, planning |

**Capabilities:**
- Manage sprints and milestones
- Track risks and issues
- Coordinate delivery
- Facilitate communication
- Monitor progress

**Use Cases:**
- Sprint planning
- Delivery tracking
- Risk management

---

## 3. Command Workflows

### 3.1 Development Commands

#### F-CMD-001: /cook — Feature Implementation

| Variant | Agents Used | Phases | Quality Gates |
|---------|-------------|--------|---------------|
| `:fast` | 2-3 | 3-4 | Minimal |
| `:hard` | 5-8 | 7-8 | All 5 |

**Workflow (`:hard` variant):**
1. Brainstorm requirements
2. Research patterns
3. Scout codebase
4. Design (if UI)
5. Plan implementation
6. Implement code
7. Test
8. Review

**Deliverables:**
- Implementation code
- Test files
- Review approval

---

#### F-CMD-002: /code — Code Snippets

| Variant | Agents Used | Phases | Quality Gates |
|---------|-------------|--------|---------------|
| `:fast` | 1-2 | 2 | Minimal |
| `:hard` | 3-4 | 4 | Partial |

**Use Case:** Quick code generation with standards.

---

#### F-CMD-003: /fix — Bug Fixing

| Variant | Agents Used | Phases | Quality Gates |
|---------|-------------|--------|---------------|
| `:fast` | 2-3 | 3 | Minimal |
| `:hard` | 4-5 | 5 | All 5 |

**Workflow:**
1. Debug root cause
2. Plan fix
3. Implement fix
4. Test fix
5. Review

---

### 3.2 Quality Commands

#### F-CMD-004: /test — Test Generation

| Variant | Agents Used | Phases | Output |
|---------|-------------|--------|--------|
| `:fast` | 1-2 | 2 | Unit tests |
| `:hard` | 3-4 | 4 | Full test suite |

**Deliverables:**
- Unit tests
- Integration tests
- E2E tests (`:hard`)
- Coverage report

---

#### F-CMD-005: /review — Code Review

| Variant | Agents Used | Phases | Output |
|---------|-------------|--------|--------|
| `:fast` | 1 | 2 | Quick review |
| `:hard` | 2-3 | 4 | Comprehensive review |

**Review Aspects:**
- Code quality
- Security
- Performance
- Standards compliance

---

#### F-CMD-006: /debug — Systematic Debugging

| Variant | Agents Used | Phases | Output |
|---------|-------------|--------|--------|
| `:fast` | 1-2 | 3 | Root cause |
| `:hard` | 3-4 | 5 | Full analysis |

**Debugging Process:**
1. Reproduce issue
2. Formulate hypotheses
3. Test hypotheses
4. Identify root cause
5. Recommend fix

---

### 3.3 Planning Commands

#### F-CMD-007: /plan — Implementation Planning

| Variant | Agents Used | Phases | Output |
|---------|-------------|--------|--------|
| `:fast` | 2 | 3 | Quick plan |
| `:hard` | 4-5 | 6 | Detailed plan |

**Plan Contents:**
- Task breakdown
- Dependencies
- Risk assessment
- Rollback strategy
- Time estimates

---

#### F-CMD-008: /brainstorm — Requirements Discovery

| Variant | Agents Used | Phases | Output |
|---------|-------------|--------|--------|
| `:fast` | 1 | 2 | Quick requirements |
| `:hard` | 2-3 | 4 | Detailed requirements |

**Discovery Outputs:**
- Requirements list
- Edge cases
- Clarification questions
- Acceptance criteria

---

#### F-CMD-009: /design — UI/UX Design

| Variant | Agents Used | Phases | Output |
|---------|-------------|--------|--------|
| `:fast` | 1-2 | 2 | Quick design |
| `:hard` | 3-4 | 5 | Comprehensive design |

**Design Outputs:**
- Component specifications
- Layout designs
- Interaction patterns
- Accessibility requirements

---

### 3.4 Documentation Commands

#### F-CMD-010: /docs:core — Technical Documentation

| Agents Used | Phases | Output |
|-------------|--------|--------|
| scouter, docs-manager | 2 | 5 files |

**Generated Files:**
- `knowledge-overview.md`
- `knowledge-architecture.md`
- `knowledge-domain.md`
- `knowledge-source-base.md`
- `knowledge-standards.md`

---

#### F-CMD-011: /docs:business — Business Documentation

| Agents Used | Phases | Output |
|-------------|--------|--------|
| scouter, business-analyst, docs-manager | 3 | 4 files |

**Generated Files:**
- `business-prd.md`
- `business-features.md`
- `business-workflows.md`
- `business-glossary.md`

---

#### F-CMD-012: /docs:audit — Audit Documentation

| Agents Used | Phases | Output |
|-------------|--------|--------|
| scouter, security-engineer, docs-manager | 3 | 4 files |

**Generated Files:**
- `audit-security.md`
- `audit-compliance.md`
- `audit-dataflow.md`
- `audit-recommendations.md`

---

### 3.5 Deployment Commands

#### F-CMD-013: /deploy:check — Pre-Deployment Validation

| Agents Used | Output |
|-------------|--------|
| devops-engineer, security-engineer | Readiness report |

---

#### F-CMD-014: /deploy:preview — Staging Deployment

| Agents Used | Output |
|-------------|--------|
| devops-engineer | Staging URL |

---

#### F-CMD-015: /deploy:production — Production Deployment

| Agents Used | Output |
|-------------|--------|
| devops-engineer, security-engineer | Deployment confirmation |

---

#### F-CMD-016: /deploy:rollback — Deployment Rollback

| Agents Used | Output |
|-------------|--------|
| devops-engineer | Rollback confirmation |

---

### 3.6 Utility Commands

#### F-CMD-017: /ask — Codebase Q&A

| Variant | Agents Used | Output |
|---------|-------------|--------|
| `:fast` | scouter | Quick answer |
| `:hard` | scouter, researcher | Detailed answer |

---

#### F-CMD-018: /auto — Auto-Detect Command

| Agents Used | Output |
|-------------|--------|
| Orchestrator | Routed to appropriate command |

---

## 4. Quality Gates

### 4.1 Gate Specifications

#### F-GATE-001: Compile Gate

| Attribute | Value |
|-----------|-------|
| **Purpose** | Verify code compiles/builds successfully |
| **Trigger** | Before lint gate |
| **Pass Criteria** | Zero build errors |
| **Failure Action** | Block and report errors |

---

#### F-GATE-002: Lint Gate

| Attribute | Value |
|-----------|-------|
| **Purpose** | Verify code style compliance |
| **Trigger** | After compile gate |
| **Pass Criteria** | Zero lint errors |
| **Failure Action** | Block and report violations |

---

#### F-GATE-003: Test Gate

| Attribute | Value |
|-----------|-------|
| **Purpose** | Verify tests pass |
| **Trigger** | After lint gate |
| **Pass Criteria** | All tests pass, coverage met |
| **Failure Action** | Block and report failures |

---

#### F-GATE-004: Security Gate

| Attribute | Value |
|-----------|-------|
| **Purpose** | Verify no security vulnerabilities |
| **Trigger** | After test gate |
| **Pass Criteria** | No critical/high vulnerabilities |
| **Failure Action** | Block and report issues |

---

#### F-GATE-005: Review Gate

| Attribute | Value |
|-----------|-------|
| **Purpose** | Verify code review approval |
| **Trigger** | After security gate |
| **Pass Criteria** | Reviewer approval |
| **Failure Action** | Block and request changes |

---

## 5. Matrix Skill Discovery

### 5.1 Skill Domains

| Domain | Skills | Description |
|--------|--------|-------------|
| `backend` | 20 | Server-side development |
| `frontend` | 18 | Client-side development |
| `architecture` | 9 | System design |
| `quality` | 17 | Testing and QA |
| `security` | 6 | Security engineering |
| `design` | 10 | UI/UX design |
| `planning` | 9 | Planning and analysis |
| `devops` | 15 | DevOps and deployment |
| `data` | 7 | Database and data |
| `performance` | 1 | Performance optimization |
| `research` | 11 | Research and documentation |
| `mobile` | 8 | Mobile development |
| `gaming` | 3 | Game development |
| `management` | 4 | Project management |
| `ai_ml` | 13 | AI/ML engineering |
| `cloud` | 11 | Cloud infrastructure |
| `languages` | 17 | Programming languages |
| `tools` | 31 | Utilities and tools |
| `mcp` | 8 | Model Context Protocol |

### 5.2 Skill Resolution

Skills are resolved based on:
1. **Direct agent match** — skill.agents contains agent ID
2. **Profile match** — skill.profiles matches agent profile
3. **Domain inheritance** — domain in agent's inherit_from

### 5.3 Priority Scoring

| Priority | Range | Injection |
|----------|-------|-----------|
| Critical | 9-10 | Always injected |
| Core | 7-8 | Standard injection |
| Optional | 5-6 | Context-dependent |
| Low | 1-4 | Rarely injected |

---

## 6. CLI Tools

### 6.1 Installation Command

```bash
agent-assistant install [tool]
```

| Option | Description |
|--------|-------------|
| `cursor` | Install for Cursor |
| `copilot` | Install for GitHub Copilot |
| `antigravity` | Install for Antigravity/Gemini |
| `claude` | Install for Claude Code |
| `--all` | Install for all tools |

### 6.2 Uninstallation Command

```bash
agent-assistant uninstall [tool]
```

### 6.3 List Command

```bash
agent-assistant list
```

Shows installation status for all tools.

---

## 7. Related Documentation

| Document | Purpose |
|----------|---------|
| `business-prd.md` | Product requirements |
| `business-workflows.md` | User journeys |
| `business-glossary.md` | Term definitions |
| `knowledge-architecture.md` | Technical architecture |

---

**Document Classification**: Feature Specifications  
**Completeness**: 100%  
**Review Status**: Complete
