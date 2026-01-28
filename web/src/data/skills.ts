export interface SkillDomain {
  name: string
  count: number
  icon: string
  examples: string[]
}

export const skillDomains: SkillDomain[] = [
  { name: 'Frontend', count: 45, icon: '🎨', examples: ['react-expert', 'vue-expert', 'nextjs-developer'] },
  { name: 'Backend', count: 38, icon: '⚙️', examples: ['fastapi-expert', 'django-expert', 'nodejs-best-practices'] },
  { name: 'Languages', count: 25, icon: '📝', examples: ['typescript-pro', 'python-pro', 'golang-pro'] },
  { name: 'DevOps', count: 22, icon: '🔧', examples: ['docker-expert', 'kubernetes-specialist', 'terraform-engineer'] },
  { name: 'Cloud', count: 20, icon: '☁️', examples: ['aws-serverless-eda', 'azure-functions', 'gcp-cloud-run'] },
  { name: 'Data', count: 18, icon: '📊', examples: ['pandas-pro', 'sql-pro', 'postgres-pro'] },
  { name: 'AI/ML', count: 28, icon: '🤖', examples: ['prompt-engineering', 'rag-implementation', 'llm-app-patterns'] },
  { name: 'Security', count: 15, icon: '🔒', examples: ['api-security-best-practices', 'secure-code-guardian', 'vulnerability-scanner'] },
  { name: 'Testing', count: 12, icon: '🧪', examples: ['playwright-expert', 'test-master', 'tdd-workflow'] },
  { name: 'Mobile', count: 14, icon: '📱', examples: ['react-native-expert', 'flutter-expert', 'swift-expert'] },
  { name: 'Architecture', count: 16, icon: '🏗️', examples: ['microservices-architect', 'api-designer', 'database-optimizer'] },
  { name: 'Design', count: 10, icon: '🎯', examples: ['ui-design-system', 'frontend-design', 'aesthetic'] },
  { name: 'Tools', count: 8, icon: '🛠️', examples: ['git-pushing', 'chrome-devtools', 'repomix'] },
  { name: 'Management', count: 6, icon: '📋', examples: ['agile-product-owner', 'product-manager-toolkit', 'jira-issues'] },
  { name: 'Quality', count: 10, icon: '✅', examples: ['code-review', 'debugging', 'clean-code'] },
  { name: 'Planning', count: 8, icon: '📑', examples: ['brainstorming', 'plan-writing', 'sequential-thinking'] },
  { name: 'Performance', count: 6, icon: '⚡', examples: ['performance-profiling', 'database-optimizer', 'monitoring-expert'] },
  { name: 'Gaming', count: 12, icon: '🎮', examples: ['game-developer', '2d-games', '3d-games'] },
  { name: 'Research', count: 5, icon: '🔍', examples: ['docs-seeker', 'research', 'web-search'] },
]

// Skill injection example
export const skillInjectionExample = {
  agent: 'backend-engineer',
  profile: 'backend:execution',
  domains: ['backend', 'languages', 'data', 'architecture'],
  injectedSkills: [
    'fastapi-expert',
    'django-expert',
    'nodejs-best-practices',
    'python-pro',
    'typescript-pro',
    'postgres-pro',
    'prisma-expert',
    'api-designer',
    'database-optimizer',
  ],
}

// Skill discovery steps
export const skillDiscoverySteps = [
  {
    step: 1,
    title: 'Agent Activated',
    description: 'When an agent is invoked, the orchestrator reads its profile configuration.',
    icon: '🎭',
  },
  {
    step: 2,
    title: 'Domain Matching',
    description: "The system identifies which skill domains match the agent's expertise.",
    icon: '🔍',
  },
  {
    step: 3,
    title: 'Skill Injection',
    description: "Relevant skills are loaded into the agent's context for deep expertise.",
    icon: '💉',
  },
  {
    step: 4,
    title: 'Execution',
    description: 'The agent executes with specialized knowledge from its injected skills.',
    icon: '⚡',
  },
]

// Skill benefits
export const skillBenefits = [
  {
    icon: '🧠',
    title: 'Deep Expertise',
    description: 'Each skill contains specialized knowledge curated by experts in that domain.',
  },
  {
    icon: '⚡',
    title: 'Just-In-Time Loading',
    description: 'Skills are loaded only when needed, keeping context focused and efficient.',
  },
  {
    icon: '🔄',
    title: 'Always Updated',
    description: 'Skills are continuously updated with the latest best practices and patterns.',
  },
]

// Get total skill count
export const getTotalSkills = () => {
  return skillDomains.reduce((acc, domain) => acc + domain.count, 0)
}

export const totalSkills = getTotalSkills()
export const totalDomains = skillDomains.length
