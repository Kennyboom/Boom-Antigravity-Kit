import { motion } from 'framer-motion'
import { ArrowRight, Zap, Brain, Layers, Target } from 'lucide-react'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../../components/ui'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO, pageSEO } from '../../components/seo'
import { WorkflowDiagram } from '../../components/workflow'
import { nodeTypeLegend, architectureConcepts } from '../../data/workflowArchitecture'

const conceptIcons = {
  '🧠': Brain,
  '⚡': Zap,
  '📋': Layers,
  '🎯': Target,
}

export default function Workflow() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.workflow} />
      
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
            <Badge variant="purple" size="lg" className="mb-6">
              System Architecture
            </Badge>
            <h1 className="heading-hero mb-6">
              Workflow Architecture
            </h1>
            <p className="text-body text-lg mb-8">
              Explore how Agent Assistant transforms a single AI into a coordinated team. 
              Interactive diagram showing the complete orchestration flow from user input to deliverables.
            </p>
            <div className="flex justify-center gap-4">
              <Button href="/features/sub-agent-orchestration" variant="secondary">
                Learn Orchestration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Interactive Diagram Section */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="System Flow Diagram" 
          description="Pan and zoom to explore the architecture. Click nodes to see details."
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] overflow-hidden">
            <WorkflowDiagram />
            
            {/* Diagram overlay hint */}
            <div className="absolute bottom-4 left-4 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)]/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
              💡 Drag to pan • Scroll to zoom • Click nodes for details
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Legend Section */}
      <Section background="primary" spacing="lg">
        <SectionHeader 
          title="Node Types" 
          description="Each component in the architecture has a specific role."
        />
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {nodeTypeLegend.map((item, index) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Card className="h-full" hoverable>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ 
                        backgroundColor: item.color,
                        boxShadow: `0 0 10px ${item.color}40`
                      }}
                    />
                    <h3 className="font-semibold text-text-primary text-sm">
                      {item.label}
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Key Concepts Section */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="Key Architectural Concepts" 
          description="The foundational patterns that power Agent Assistant."
        />
        
        <div className="grid gap-6 md:grid-cols-2">
          {architectureConcepts.map((concept, index) => {
            const IconComponent = conceptIcons[concept.icon as keyof typeof conceptIcons] || Brain
            
            return (
              <motion.div
                key={concept.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full" hoverable>
                  <CardContent className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-gradient-red)] to-[var(--color-gradient-purple)] flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary mb-2">
                        {concept.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {concept.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Section>

      {/* Data Flow Section */}
      <Section background="primary" spacing="lg">
        <SectionHeader 
          title="Execution Flow" 
          description="How a request flows through the system."
        />
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Flow steps */}
            {[
              { step: '1', title: 'User Request', desc: 'Natural language or /command input', color: '#00d4ff' },
              { step: '2', title: 'Command Router', desc: 'Parses input, selects workflow file', color: '#ff4444' },
              { step: '3', title: 'Workflow Engine', desc: 'Executes phases in sequence', color: '#ff4444' },
              { step: '4', title: 'Rule Engine', desc: 'Enforces orchestration protocols', color: '#ff8844' },
              { step: '5', title: 'Agent Delegation', desc: 'TIER 1 (sub-agent) or TIER 2 (embody)', color: '#00ff88' },
              { step: '6', title: 'Skill Injection', desc: 'Matrix resolves and injects skills', color: '#8844ff' },
              { step: '7', title: 'Specialist Execution', desc: '21 domain experts process tasks', color: '#ff8844' },
              { step: '8', title: 'Deliverables', desc: 'Code, plans, tests, documentation', color: '#00ff88' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-4 mb-6 last:mb-0"
              >
                {/* Step number */}
                <div className="flex-shrink-0 relative">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ 
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                      border: `2px solid ${item.color}`,
                    }}
                  >
                    {item.step}
                  </div>
                  {index < 7 && (
                    <div 
                      className="absolute top-10 left-1/2 w-0.5 h-6 -translate-x-1/2"
                      style={{ backgroundColor: `${item.color}40` }}
                    />
                  )}
                </div>
                
                {/* Content */}
                <div className="pt-1">
                  <h4 className="font-semibold text-text-primary mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="secondary" spacing="lg">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-section mb-4">Ready to Explore More?</h2>
            <p className="text-body text-lg mb-8">
              Dive deeper into Agent Assistant's features and start building with specialized agents.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/features/specialist-agents" variant="primary">
                Meet the Agents
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button href="/features/commands-workflows" variant="secondary">
                View Commands
              </Button>
              <Button href="/installation" variant="secondary">
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  )
}
