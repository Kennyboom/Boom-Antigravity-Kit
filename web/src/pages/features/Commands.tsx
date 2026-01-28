import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../../components/ui'
import { CommandCard } from '../../components/features'
import { Terminal } from '../../components/terminal'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO, pageSEO } from '../../components/seo'
import { commandCategories, naturalLanguageExamples, totalCommands } from '../../data'

export default function Commands() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.commands} />
      
      {/* Hero Section */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="commands" />
        <PageSideDecorations theme="commands" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge variant="red" size="lg" className="mb-6">
              Powerful Workflows
            </Badge>
            <h1 className="heading-hero mb-6">
              Commands & Workflows
            </h1>
            <p className="text-body text-lg mb-8">
              {totalCommands}+ slash commands that trigger complete development workflows. 
              Each command orchestrates multiple agents for comprehensive results.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Command Syntax */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="Command Syntax" 
          description="All commands follow a consistent pattern."
        />

        <div className="max-w-2xl mx-auto">
          <Terminal
            command={[
              '/{command} {your request}',
              '/{command}:{variant} {your request}',
            ]}
            title="Syntax"
            showPrompt={false}
            className="mb-6"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent>
                <Badge variant="green" size="sm" className="mb-2">:fast</Badge>
                <p className="text-sm text-text-secondary">Quick execution, fewer phases</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Badge variant="red" size="sm" className="mb-2">:hard</Badge>
                <p className="text-sm text-text-secondary">Comprehensive, all phases</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Command Categories */}
      {commandCategories.map((category, catIndex) => (
        <Section 
          key={category.name}
          background={catIndex % 2 === 0 ? 'primary' : 'secondary'} 
          spacing="lg"
        >
          <SectionHeader 
            title={`${category.icon} ${category.name} Commands`}
            description={category.description}
            align="left"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {category.commands.map((command, index) => (
              <motion.div
                key={command.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CommandCard
                  command={command.name}
                  description={command.description}
                  example={command.example}
                  variants={command.variants}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </Section>
      ))}

      {/* Auto-Detection */}
      <Section background="gradient" spacing="lg">
        <SectionHeader 
          title="Natural Language Detection" 
          description="You don't always need slash commands. Agent Assistant understands intent."
        />

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent>
              <div className="space-y-4">
                {naturalLanguageExamples.map((item, index) => (
                  <motion.div
                    key={item.input}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="flex-1 p-3 rounded bg-bg-secondary font-mono text-sm">
                      {item.input}
                    </div>
                    <span className="text-text-muted">→</span>
                    <code className="text-text-accent font-mono">{item.detects}</code>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="secondary" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-6">Ready to Use Commands?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/installation">
              Install Now
            </Button>
            <Button variant="secondary" size="lg" href="/features/quality-gates">
              Learn About Quality Gates →
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
