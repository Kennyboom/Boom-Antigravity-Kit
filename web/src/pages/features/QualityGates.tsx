import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../../components/ui'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO, pageSEO } from '../../components/seo'

const qualityGates = [
  {
    number: 1,
    name: 'Research Gate',
    icon: '🔍',
    description: 'Ensures requirements are fully understood before planning begins.',
    checks: [
      'Requirements clarified',
      'Context gathered',
      'Constraints identified',
      'Dependencies mapped',
    ],
    failAction: 'Return to user for clarification',
  },
  {
    number: 2,
    name: 'Plan Gate',
    icon: '📋',
    description: 'Validates the implementation plan before coding starts.',
    checks: [
      'Plan is complete and detailed',
      'All steps are actionable',
      'Edge cases considered',
      'Testing strategy defined',
    ],
    failAction: 'Refine plan with more detail',
  },
  {
    number: 3,
    name: 'Implementation Gate',
    icon: '💻',
    description: 'Verifies code meets quality standards before testing.',
    checks: [
      'Code compiles/runs',
      'Follows existing patterns',
      'No obvious bugs',
      'Documentation added',
    ],
    failAction: 'Fix issues before proceeding',
  },
  {
    number: 4,
    name: 'Test Gate',
    icon: '🧪',
    description: 'Ensures adequate test coverage before review.',
    checks: [
      'Unit tests passing',
      'Integration tests added',
      'Edge cases tested',
      'Coverage threshold met',
    ],
    failAction: 'Add missing tests',
  },
  {
    number: 5,
    name: 'Review Gate',
    icon: '👁️',
    description: 'Final quality check before delivery.',
    checks: [
      'Code review passed',
      'Security review completed',
      'Performance acceptable',
      'Ready for production',
    ],
    failAction: 'Address review feedback',
  },
]

const benefits = [
  {
    icon: '🛡️',
    title: 'Catch Issues Early',
    description: "Problems are identified at each phase, not at the end when they're expensive to fix.",
  },
  {
    icon: '📈',
    title: 'Consistent Quality',
    description: 'Every feature goes through the same rigorous process, ensuring uniform quality.',
  },
  {
    icon: '⚡',
    title: 'Faster Feedback',
    description: 'Quick iterations at each gate mean less rework and faster delivery.',
  },
  {
    icon: '📝',
    title: 'Clear Accountability',
    description: 'Each gate has specific criteria, making it clear what needs to pass.',
  },
]

export default function QualityGates() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.qualityGates} />
      
      {/* Hero Section */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="quality" />
        <PageSideDecorations theme="quality" />
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="green" size="lg" className="mb-6">
              Built-in Quality
            </Badge>
            <h1 className="heading-hero mb-6">
              5 Quality Gates
            </h1>
            <p className="text-body text-lg mb-8">
              Every workflow passes through mandatory quality gates that ensure 
              high-quality output at each phase. No shortcuts, no exceptions.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Visual Workflow */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="The Quality Gate Flow" 
          description="Each phase must pass its gate before proceeding to the next."
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gradient-red via-gradient-orange to-gradient-green hidden md:block" />

            <div className="space-y-8">
              {qualityGates.map((gate, index) => (
                <motion.div
                  key={gate.name}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex gap-6">
                    {/* Gate number */}
                    <div className="flex-shrink-0 z-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gradient-red to-gradient-purple flex items-center justify-center">
                        <span className="text-2xl">{gate.icon}</span>
                      </div>
                    </div>

                    {/* Gate content */}
                    <Card className="flex-1">
                      <CardContent>
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="purple" size="sm">Gate {gate.number}</Badge>
                          <h3 className="heading-card">{gate.name}</h3>
                        </div>
                        <p className="text-body mb-4">{gate.description}</p>

                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Checks */}
                          <div>
                            <p className="text-small text-text-accent mb-2">Must Pass:</p>
                            <ul className="space-y-1">
                              {gate.checks.map((check) => (
                                <li key={check} className="flex items-center gap-2 text-sm text-text-secondary">
                                  <span className="text-gradient-green">✓</span>
                                  {check}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Fail action */}
                          <div>
                            <p className="text-small text-gradient-red mb-2">On Failure:</p>
                            <p className="text-sm text-text-secondary">
                              {gate.failAction}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}

              {/* Success state */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0 z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gradient-green to-gradient-cyan flex items-center justify-center">
                      <span className="text-2xl">✅</span>
                    </div>
                  </div>
                  <div className="flex-1 p-6 rounded-xl bg-gradient-to-r from-gradient-green/10 to-gradient-cyan/10 border border-gradient-green/30">
                    <h3 className="heading-card text-gradient-green mb-2">All Gates Passed!</h3>
                    <p className="text-body">Feature is ready for delivery with confidence.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section background="primary" spacing="lg">
        <SectionHeader 
          title="Why Quality Gates?" 
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

      {/* Comparison */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="With vs Without Quality Gates" 
        />

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Without */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-gradient-red/30">
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">❌</span>
                    <h3 className="heading-card text-gradient-red">Without Gates</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="text-body">• Bugs found late in process</li>
                    <li className="text-body">• Incomplete implementations</li>
                    <li className="text-body">• Missing edge cases</li>
                    <li className="text-body">• Inconsistent quality</li>
                    <li className="text-body">• Expensive rework</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* With */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-gradient-green/30">
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">✅</span>
                    <h3 className="heading-card text-gradient-green">With Gates</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="text-body">• Issues caught early</li>
                    <li className="text-body">• Complete, tested features</li>
                    <li className="text-body">• Edge cases covered</li>
                    <li className="text-body">• Consistent high quality</li>
                    <li className="text-body">• Ship with confidence</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-6">Experience Quality-First Development</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/installation">
              Get Started
            </Button>
            <Button variant="secondary" size="lg" href="/docs">
              Read the Docs
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
