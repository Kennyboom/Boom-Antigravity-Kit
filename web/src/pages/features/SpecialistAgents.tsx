import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../../components/ui'
import { AgentCard } from '../../components/features'
import { Terminal } from '../../components/terminal'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO, pageSEO } from '../../components/seo'
import { agentCategories, categoryBadgeMap, totalAgents, agentCollaboration } from '../../data'

export default function SpecialistAgents() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.specialistAgents} />
      
      {/* Hero Section */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="agents" />
        <PageSideDecorations theme="agents" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Badge variant="orange" size="lg" className="mb-6">
              Specialized Expertise
            </Badge>
            <h1 className="heading-hero mb-6">
              {totalAgents} Specialist Agents
            </h1>
            <p className="text-body text-lg mb-8">
              Each agent is a specialist with deep expertise in their domain. 
              They have unique thinking protocols, skill sets, and best practices.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Agent Categories */}
      {agentCategories.map((category, catIndex) => (
        <Section 
          key={category.name}
          background={catIndex % 2 === 0 ? 'secondary' : 'primary'} 
          spacing="lg"
        >
          <SectionHeader 
            title={`${category.name} Agents`}
            description={category.description}
            align="left"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AgentCard
                  icon={agent.icon!}
                  name={agent.name}
                  role={agent.role}
                  category={categoryBadgeMap[category.name]}
                  capabilities={agent.capabilities}
                />
              </motion.div>
            ))}
          </div>
        </Section>
      ))}

      {/* Agent Anatomy */}
      <Section background="gradient" spacing="lg">
        <SectionHeader 
          title="Anatomy of an Agent" 
          description="Each agent is defined with specific attributes that guide its behavior."
        />

        <div className="max-w-3xl mx-auto">
          <Terminal
            command=""
            title="backend-engineer.md"
            showPrompt={false}
            showCopy={true}
          >
            <div className="space-y-2 text-sm">
              <div className="text-text-muted"># Agent Definition: backend-engineer</div>
              <div className="border-l-2 border-gradient-red pl-4 space-y-1">
                <div><span className="text-text-accent">ID:</span> <span className="text-text-primary">agent:backend-engineer</span></div>
                <div><span className="text-text-accent">Role:</span> <span className="text-text-primary">Principal Backend Architect</span></div>
                <div><span className="text-text-accent">Profile:</span> <span className="text-text-primary">backend:execution</span></div>
                <div><span className="text-text-accent">Reports To:</span> <span className="text-text-primary">tech-lead</span></div>
                <div><span className="text-text-accent">Consults:</span> <span className="text-text-primary">database-architect, devops-engineer</span></div>
                <div><span className="text-text-accent">Confidence:</span> <span className="text-text-primary">85% (escalate if below)</span></div>
              </div>
              <div className="mt-4 text-text-muted"># Core Directive</div>
              <div className="border-l-2 border-gradient-orange pl-4">
                <p className="text-text-secondary">
                  Build robust, scalable backend systems. Every endpoint should be secure, 
                  efficient, and well-documented.
                </p>
              </div>
            </div>
          </Terminal>
        </div>
      </Section>

      {/* How Agents Work Together */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="How Agents Collaborate" 
          description="Agents work together through the orchestrator's coordination."
        />

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6 md:grid-cols-3">
            {agentCollaboration.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent>
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="heading-card mb-2">{item.title}</h3>
                    <p className="text-body">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="primary" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-6">See Agents in Action</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/features/commands-workflows">
              Explore Commands →
            </Button>
            <Button variant="secondary" size="lg" href="/installation">
              Install Agent Assistant
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
