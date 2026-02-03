import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../../components/ui'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO, pageSEO } from '../../components/seo'
import {
  skillDomains,
  skillInjectionExample,
  skillDiscoverySteps,
  skillBenefits,
  hsolDecisionTable,
  hsolUniqueFeatures,
  findSkillsCta,
  totalSkills,
  totalDomains,
} from '../../data'

export default function MatrixSkills() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.matrixSkills} />

      {/* Hero Section */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="skills" />
        <PageSideDecorations theme="skills" />
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="purple" size="lg" className="mb-6">
              Hybrid Orchestration
            </Badge>
            <h1 className="heading-hero mb-6">
              Hybrid Skill Orchestration
            </h1>
            <p className="text-body text-lg mb-8">
              {totalSkills}+ matrix skills across {totalDomains} domains, plus on-demand community skills via find-skills.
              Agents get the right expertise automatically — matrix-first, dynamic when needed. Deep knowledge on demand.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* How Skill Resolution Works */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="How Skill Resolution Works"
          description="Matrix resolution first; optional dynamic discovery for hard/focus commands."
        />

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="heading-card mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎯</span> Agent Profile
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-bg-primary">
                      <p className="text-small text-text-muted">Agent</p>
                      <code className="text-text-accent">{skillInjectionExample.agent}</code>
                    </div>
                    <div className="p-3 rounded-lg bg-bg-primary">
                      <p className="text-small text-text-muted">Profile</p>
                      <code className="text-text-accent">{skillInjectionExample.profile}</code>
                    </div>
                    <div className="p-3 rounded-lg bg-bg-primary">
                      <p className="text-small text-text-muted">Domains</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {skillInjectionExample.domains.map((domain) => (
                          <Badge key={domain} variant="orange" size="sm">{domain}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="heading-card mb-4 flex items-center gap-2">
                    <span className="text-2xl">💉</span> Injected Skills (Matrix + Dynamic)
                  </h3>
                  <div className="space-y-2">
                    {skillInjectionExample.injectedSkills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        className="flex items-center gap-2 p-2 rounded bg-bg-primary"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <span className="text-gradient-green">✓</span>
                        <code className="text-sm text-text-secondary">{skill}</code>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg bg-bg-primary border border-border-accent">
                <p className="text-body text-sm">
                  <span className="text-text-accent font-semibold">HSOL:</span> When the backend-engineer
                  agent is invoked, the system resolves matrix skills from matching domains (&lt;10ms).
                  For hard/focus commands, if matrix fitness is below threshold, dynamic discovery (find-skills)
                  can install community skills and re-inject for the current task.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* When Does Dynamic Discovery Run? */}
      <Section background="primary" spacing="lg">
        <SectionHeader
          title="When Does Dynamic Discovery Run?"
          description="Variant and matrix fitness determine whether find-skills is skipped, run async, or run blocking."
        />

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <Card>
            <CardContent className="p-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-accent">
                    <th scope="col" className="p-4 text-small font-semibold text-text-muted uppercase tracking-wider">Scenario</th>
                    <th scope="col" className="p-4 text-small font-semibold text-text-muted uppercase tracking-wider">Variant</th>
                    <th scope="col" className="p-4 text-small font-semibold text-text-muted uppercase tracking-wider">Matrix fitness</th>
                    <th scope="col" className="p-4 text-small font-semibold text-text-muted uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {hsolDecisionTable.map((row) => (
                    <tr key={row.scenario} className="border-b border-border-subtle last:border-0">
                      <td className="p-4 text-body">{row.scenario}</td>
                      <td className="p-4"><code className="text-sm text-text-accent">{row.variant}</code></td>
                      <td className="p-4"><code className="text-sm text-text-secondary">{row.matrixFitness}</code></td>
                      <td className="p-4 text-body">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* What Makes HSOL Unique */}
      <Section background="secondary" spacing="lg">
        <SectionHeader
          title="What Makes HSOL Unique"
          description="Variant-aware discovery, fitness thresholds, and the best of matrix + community."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hsolUniqueFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full" hoverable>
                <CardContent className="p-4">
                  <div className="text-2xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-text-primary mb-2">{feature.title}</h3>
                  <p className="text-body text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Discover & Install Community Skills */}
      <Section background="primary" spacing="lg">
        <SectionHeader
          title={findSkillsCta.title}
          description={findSkillsCta.description}
        />

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="space-y-4">
              <div>
                <p className="text-small text-text-muted mb-1">Search</p>
                <code className="block p-3 rounded-lg bg-bg-secondary text-text-accent text-sm font-mono">
                  {findSkillsCta.searchCommand}
                </code>
              </div>
              <div>
                <p className="text-small text-text-muted mb-1">Install (current tool, skip confirm)</p>
                <code className="block p-3 rounded-lg bg-bg-secondary text-text-accent text-sm font-mono break-all">
                  {findSkillsCta.installCommand}
                </code>
              </div>
              <div className="pt-2">
                <Button variant="secondary" size="md" href={findSkillsCta.browseUrl} target="_blank" rel="noopener noreferrer">
                  Browse skills.sh →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Domain Categories */}
      <Section background="secondary" spacing="xl">
        <SectionHeader
          title={`${totalDomains} Skill Domains`}
          description={`${totalSkills}+ matrix skills organized by domain.`}
        />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skillDomains.map((domain, index) => (
            <motion.div
              key={domain.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
            >
              <Card hoverable className="h-full">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{domain.icon}</span>
                    <Badge variant="purple" size="sm">{domain.count} skills</Badge>
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{domain.name}</h3>
                  <div className="space-y-1">
                    {domain.examples.slice(0, 2).map((example) => (
                      <code key={example} className="text-xs text-text-muted block truncate">
                        {example}
                      </code>
                    ))}
                    {domain.examples.length > 2 && (
                      <span className="text-xs text-text-accent">+{domain.count - 2} more</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* How HSOL Resolves Skills (steps) */}
      <Section background="primary" spacing="lg">
        <SectionHeader
          title="How HSOL Resolves Skills"
          description="Resolution and optional dynamic discovery in order."
        />

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {skillDiscoverySteps.map((item, index) => (
              <motion.div
                key={item.step}
                className="flex gap-6 items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-gradient-purple to-gradient-cyan flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="heading-card mb-2">
                    <span className="text-text-accent mr-2">Step {item.step}:</span>
                    {item.title}
                  </h3>
                  <p className="text-body">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section background="gradient" spacing="lg">
        <SectionHeader title="Why Hybrid Skill Orchestration?" />

        <div className="grid gap-6 md:grid-cols-3">
          {skillBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full text-center">
                <CardContent>
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="heading-card mb-2">{benefit.title}</h3>
                  <p className="text-body">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="primary" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-6">Explore the Full Skill Library</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Button variant="primary" size="lg" href="/features/specialist-agents">
              Meet the Agents →
            </Button>
            <Button variant="secondary" size="lg" href="/docs">
              Browse Skills in Docs
            </Button>
            <Button variant="secondary" size="lg" href={findSkillsCta.browseUrl} target="_blank" rel="noopener noreferrer">
              Browse skills.sh
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
