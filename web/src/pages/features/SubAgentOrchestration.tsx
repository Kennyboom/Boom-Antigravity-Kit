import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../../components/ui'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO, pageSEO } from '../../components/seo'

const orchestrationSteps = [
  {
    phase: 'Phase 1',
    title: 'Research',
    agent: 'researcher',
    description: 'Gathers context, analyzes requirements, and identifies patterns.',
    icon: '🔍',
  },
  {
    phase: 'Phase 2',
    title: 'Scout',
    agent: 'scouter',
    description: 'Explores codebase, finds relevant files, and maps dependencies.',
    icon: '🗺️',
  },
  {
    phase: 'Phase 3',
    title: 'Plan',
    agent: 'planner',
    description: 'Creates detailed implementation plan with specific steps.',
    icon: '📋',
  },
  {
    phase: 'Phase 4',
    title: 'Implement',
    agent: 'backend-engineer / frontend-engineer',
    description: 'Writes production-quality code following the plan.',
    icon: '💻',
  },
  {
    phase: 'Phase 5',
    title: 'Test',
    agent: 'tester',
    description: 'Creates comprehensive tests to verify functionality.',
    icon: '🧪',
  },
  {
    phase: 'Phase 6',
    title: 'Review',
    agent: 'reviewer',
    description: 'Reviews code for quality, security, and best practices.',
    icon: '👁️',
  },
]

const benefits = [
  {
    icon: '🎯',
    title: 'Specialized Expertise',
    description: 'Each agent focuses on what it does best, providing deeper expertise than a generalist approach.',
  },
  {
    icon: '⚡',
    title: 'Parallel Execution',
    description: 'Independent tasks run in parallel, dramatically speeding up complex workflows.',
  },
  {
    icon: '🔄',
    title: 'Isolated Context',
    description: 'Each agent gets fresh context, preventing confusion from unrelated information.',
  },
  {
    icon: '✅',
    title: 'Quality Gates',
    description: 'Built-in verification at each phase ensures high-quality output.',
  },
]

const exampleWorkflow = {
  command: '/cook:hard add user authentication with JWT',
  phases: [
    { agent: 'researcher', task: 'Analyze auth requirements, security best practices' },
    { agent: 'scouter', task: 'Find existing auth code, user models, middleware' },
    { agent: 'planner', task: 'Design JWT flow, token storage, refresh mechanism' },
    { agent: 'backend-engineer', task: 'Implement auth endpoints, middleware, models' },
    { agent: 'frontend-engineer', task: 'Create login forms, auth context, protected routes' },
    { agent: 'tester', task: 'Write auth tests, security tests, integration tests' },
    { agent: 'reviewer', task: 'Security review, code quality check, documentation' },
  ],
}

export default function SubAgentOrchestration() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.subAgentOrchestration} />
      
      {/* Hero Section */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="orchestration" />
        <PageSideDecorations theme="orchestration" />
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="orange" size="lg" className="mb-6">
              Core Architecture
            </Badge>
            <h1 className="heading-hero mb-6">
              Sub-Agent Orchestration
            </h1>
            <p className="text-body text-lg mb-8">
              The Orchestrator delegates tasks to specialized agents, each with their own 
              expertise, thinking protocol, and isolated context. Like a conductor leading an orchestra.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Concept Explanation */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="How It Works" 
          description="The Orchestrator never writes code itself. It delegates to the right specialist."
        />

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gradient-red to-gradient-purple mb-4">
                  <span className="text-4xl">🎭</span>
                </div>
                <h3 className="heading-card">The Orchestrator</h3>
                <p className="text-body">Central brain that coordinates, delegates, and synthesizes</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {orchestrationSteps.map((step, index) => (
                  <motion.div
                    key={step.phase}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="p-4 h-[200px] rounded-lg bg-bg-primary border border-border-secondary">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{step.icon}</span>
                        <div>
                          <Badge variant="purple" size="sm">{step.phase}</Badge>
                          <h4 className="font-semibold text-text-primary">{step.title}</h4>
                        </div>
                      </div>
                      <p className="text-small mb-2">{step.description}</p>
                      <code className="text-xs text-text-accent">{step.agent}</code>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Parallel Execution Visual */}
      <Section background="primary" spacing="xl">
        <SectionHeader 
          title="Parallel Agent Execution" 
          description="Independent tasks run simultaneously for maximum efficiency."
        />

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent>
              <div className="space-y-6">
                {/* Timeline representation */}
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-px bg-border-primary" />
                  
                  <div className="space-y-6">
                    {/* Sequential phases */}
                    <div className="relative flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gradient-red to-gradient-orange flex items-center justify-center z-10">
                        <span className="text-2xl">🔍</span>
                      </div>
                      <div className="flex-1 p-4 rounded-lg bg-bg-secondary">
                        <Badge variant="red" size="sm" className="mb-2">Sequential</Badge>
                        <p className="text-sm">Research → Scout → Plan (must run in order)</p>
                      </div>
                    </div>

                    {/* Parallel phases */}
                    <div className="relative">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gradient-green to-gradient-cyan flex items-center justify-center z-10">
                          <span className="text-2xl">⚡</span>
                        </div>
                        <div className="flex-1">
                          <Badge variant="green" size="sm" className="mb-2">Parallel</Badge>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 rounded-lg bg-bg-secondary border border-gradient-green/30">
                              <span className="text-sm">Backend Implementation</span>
                            </div>
                            <div className="p-3 rounded-lg bg-bg-secondary border border-gradient-cyan/30">
                              <span className="text-sm">Frontend Implementation</span>
                            </div>
                          </div>
                          <p className="text-small mt-2">Independent tasks execute simultaneously</p>
                        </div>
                      </div>
                    </div>

                    {/* Final phases */}
                    <div className="relative flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gradient-purple to-gradient-cyan flex items-center justify-center z-10">
                        <span className="text-2xl">✅</span>
                      </div>
                      <div className="flex-1 p-4 rounded-lg bg-bg-secondary">
                        <Badge variant="purple" size="sm" className="mb-2">Sequential</Badge>
                        <p className="text-sm">Test → Review (depends on implementation)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

      {/* Example Workflow */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="Example: /cook:hard Workflow" 
          description="See how a complex feature request is broken down and executed."
        />

        <div className="max-w-3xl mx-auto">
          {/* Command */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="terminal-glow rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--color-border-secondary)]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="px-4 py-4 font-mono">
                <span className="text-text-accent">{exampleWorkflow.command}</span>
              </div>
            </div>
          </motion.div>

          {/* Phases */}
          <div className="space-y-4">
            {exampleWorkflow.phases.map((phase, index) => (
              <motion.div
                key={phase.agent}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gradient-red to-gradient-purple flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <Card className="flex-1">
                  <CardContent className="py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm text-text-accent">{phase.agent}</code>
                    </div>
                    <p className="text-small">{phase.task}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section background="primary" spacing="lg">
        <SectionHeader 
          title="Why Orchestration Matters" 
        />

        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hoverable className="h-full">
                <CardContent>
                  <div className="text-3xl mb-3">{benefit.icon}</div>
                  <h3 className="heading-card mb-2">{benefit.title}</h3>
                  <p className="text-body">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-6">Explore More Features</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/features/specialist-agents">
              Meet the Agents →
            </Button>
            <Button variant="secondary" size="lg" href="/features/commands-workflows">
              View All Commands
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
