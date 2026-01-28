import { motion } from 'framer-motion'
import { Button, Card, CardContent, Badge, Section, SectionHeader } from '../../components/ui'
import { PageSideDecorations, GradientBackground } from '../../components/decorations'
import { SEO, pageSEO } from '../../components/seo'
import { platforms, platformComparisonFeatures } from '../../data'

export default function MultiPlatform() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <SEO {...pageSEO.multiPlatform} />
      
      {/* Hero Section */}
      <Section background="primary" spacing="xl" className="relative overflow-hidden">
        <GradientBackground theme="platforms" />
        <PageSideDecorations theme="platforms" />
        <div className="text-center max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="cyan" size="lg" className="mb-6">
              Universal Compatibility
            </Badge>
            <h1 className="heading-hero mb-6">
              Multi-Platform Support
            </h1>
            <p className="text-body text-lg mb-8">
              One configuration, multiple platforms. Agent Assistant works seamlessly with 
              all major AI coding assistants through platform-specific adapters.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Platform Grid */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="Supported Platforms" 
          description="Full support across the AI coding assistant ecosystem."
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
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{platform.icon}</span>
                      <div>
                        <h3 className="heading-card">{platform.name}</h3>
                        <Badge variant="green" size="sm">✅ Full Support</Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-body mb-4">{platform.description}</p>

                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-small mb-1">Config File:</p>
                      <code className="text-sm text-text-accent font-mono bg-bg-primary px-2 py-1 rounded">
                        {platform.configFile}
                      </code>
                    </div>
                    <div>
                      <p className="text-small mb-1">Install Path:</p>
                      <code className="text-sm text-text-accent font-mono bg-bg-primary px-2 py-1 rounded">
                        {platform.installPath}
                      </code>
                    </div>
                  </div>

                  <div>
                    <p className="text-small mb-2">Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {platform.features.map((feature) => (
                        <Badge key={feature} variant="default" size="sm">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Comparison Table */}
      <Section background="primary" spacing="xl">
        <SectionHeader 
          title="Feature Comparison" 
          description="All platforms receive the same powerful features."
        />

        <motion.div
          className="max-w-4xl mx-auto overflow-x-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-primary">
                <th className="text-left py-4 px-4 text-text-secondary font-medium">Feature</th>
                <th className="text-center py-4 px-4 text-text-secondary font-medium">
                  <span className="flex items-center justify-center gap-2">
                    <span>⚡</span> Cursor
                  </span>
                </th>
                <th className="text-center py-4 px-4 text-text-secondary font-medium">
                  <span className="flex items-center justify-center gap-2">
                    <span>🤖</span> Claude
                  </span>
                </th>
                <th className="text-center py-4 px-4 text-text-secondary font-medium">
                  <span className="flex items-center justify-center gap-2">
                    <span>🐙</span> Copilot
                  </span>
                </th>
                <th className="text-center py-4 px-4 text-text-secondary font-medium">
                  <span className="flex items-center justify-center gap-2">
                    <span>🚀</span> Antigravity
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {platformComparisonFeatures.map((row, index) => (
                <tr 
                  key={row.feature}
                  className={`border-b border-border-secondary ${index % 2 === 0 ? 'bg-bg-secondary/50' : ''}`}
                >
                  <td className="py-3 px-4 text-text-primary">{row.feature}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-gradient-green text-xl">✓</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-gradient-green text-xl">✓</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-gradient-green text-xl">✓</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-gradient-green text-xl">✓</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Section>

      {/* Installation per Platform */}
      <Section background="secondary" spacing="lg">
        <SectionHeader 
          title="Quick Installation" 
          description="Get started on your platform in seconds."
        />

        <div className="max-w-3xl mx-auto space-y-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="terminal-glow rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--color-border-secondary)]">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-xs text-text-muted flex items-center gap-2">
                    <span>{platform.icon}</span> {platform.name}
                  </span>
                </div>
                <div className="px-4 py-4 font-mono text-sm">
                  <div className="text-text-muted mb-1"># Install Agent Assistant for {platform.name}</div>
                  <div>
                    <span className="text-text-accent">
                      {platform.setup.map((step, index) => (
                        <div key={index}>
                          {step}
                        </div>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="gradient" spacing="lg">
        <div className="text-center">
          <h2 className="heading-section mb-6">Ready to Get Started?</h2>
          <p className="text-body mb-8 max-w-xl mx-auto">
            Install Agent Assistant and start using specialized agents on your favorite platform today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" href="/installation">
              Install Now
            </Button>
            <Button variant="secondary" size="lg" href="/features/matrix-skills">
              Explore Matrix Skills →
            </Button>
          </div>
        </div>
      </Section>
    </main>
  )
}
