import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../../components/ui'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO, pageSEO } from '../../components/seo'
import { platforms } from '../../data'

const problems = [
  {
    icon: '😫',
    title: 'Repetitive Configuration',
    description: 'Copying the same .cursorrules or CLAUDE.md to every new project.',
  },
  {
    icon: '🔄',
    title: 'Inconsistent Setups',
    description: 'Different projects with different configurations leading to inconsistent AI behavior.',
  },
  {
    icon: '⏰',
    title: 'Time Wasted',
    description: 'Hours spent setting up and maintaining AI configurations across projects.',
  },
]

const benefits = [
  {
    icon: '✅',
    title: 'Configure Once',
    description: 'Set up your global configuration once in your home directory.',
  },
  {
    icon: '🔗',
    title: 'Use Everywhere',
    description: 'All projects automatically inherit your global configuration.',
  },
  {
    icon: '📦',
    title: 'Project Overrides',
    description: 'Local configs can extend or override global settings when needed.',
  },
  {
    icon: '🔄',
    title: 'Auto Updates',
    description: 'Update globally, and all projects get the latest agents and skills.',
  },
]

const howItWorks = [
  { step: 1, title: 'Install Globally', description: 'Run the npm install command to set up Agent Assistant in your home directory.' },
  { step: 2, title: 'Open Any Project', description: 'Navigate to any project directory and start your AI coding assistant.' },
  { step: 3, title: 'Start Using Commands', description: 'Use commands like /cook, /fix, /test and let specialized agents handle the work.' },
]

export default function OneTimeSetup() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.oneTimeSetup} />
      
      {/* Hero Section */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="setup" />
        <PageSideDecorations theme="setup" />
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="green" size="lg" className="mb-6">
              Global Configuration
            </Badge>
            <h1 className="heading-hero mb-6">
              One-Time Setup
            </h1>
            <p className="text-body text-lg mb-8">
              Configure Agent Assistant once globally, and use it across all your projects.
              No more copying configuration files. No more inconsistent setups.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Problem Section */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="The Problem" 
          description="Traditional AI assistant configuration is tedious and error-prone."
        />
        
        <div className="grid gap-6 md:grid-cols-3">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-gradient-red/20">
                <CardContent>
                  <div className="text-4xl mb-4">{problem.icon}</div>
                  <h3 className="heading-card mb-2 text-gradient-red">{problem.title}</h3>
                  <p className="text-body">{problem.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Solution Section */}
      <Section background="primary" spacing="xl">
        <SectionHeader 
          title="The Solution" 
          description="Install once globally, use everywhere automatically."
        />

        {/* Installation Command */}
        <motion.div
          className="mx-auto mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="terminal-glow rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--color-border-secondary)]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-text-muted">Global Installation</span>
            </div>
            <div className="px-4 py-4 font-mono text-sm md:text-base">
              <div className="mb-2">
                <span className="text-text-muted"># Install globally</span>
              </div>
              <div>
                <span className="text-text-muted">$</span>{' '}
                <span className="text-text-accent">npm install -g @namch/agent-assistant</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                  <p className="text-body text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Platform Specific Setup */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="Platform-Specific Installation" 
          description="Agent Assistant automatically configures itself for your platform."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{platform.icon}</span>
                    <h3 className="heading-card">{platform.name}</h3>
                    <Badge variant="green" size="sm">Full Support</Badge>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-small mb-1">Installation Path:</p>
                      <code className="text-sm text-text-accent font-mono bg-bg-primary px-2 py-1 rounded">
                        {platform.installPath}
                      </code>
                    </div>
                    <div>
                      <p className="text-small mb-1">Command:</p>
                      <code className="text-sm text-text-accent font-mono bg-bg-primary px-2 py-1 rounded block overflow-x-auto">
                        {platform.setup.map((step, index) => (
                          <div key={index}>
                            {step}
                          </div>
                        ))}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section background="gradient" spacing="lg">
        <SectionHeader 
          title="How It Works" 
          description="A simple three-step process to get started."
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                className="flex gap-6 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gradient-red to-gradient-purple flex items-center justify-center text-xl font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="heading-card mb-2">{item.title}</h3>
                  <p className="text-body">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="primary" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-6">Ready to Get Started?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/installation">
              Install Now
            </Button>
            <Button variant="secondary" size="lg" href="/features/sub-agent-orchestration">
              Learn About Orchestration →
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
