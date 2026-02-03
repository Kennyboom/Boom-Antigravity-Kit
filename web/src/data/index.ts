// Agents
export {
  agents,
  agentCategories,
  categoryBadgeMap,
  getAgentCountByCategory,
  totalAgents,
  type Agent,
  type AgentCategory,
  type AgentCategoryGroup,
} from './agents'

// Commands
export {
  commandCategories,
  quickReferenceCommands,
  naturalLanguageExamples,
  quickStartCommands,
  getTotalCommands,
  totalCommands,
  type Command,
  type CommandCategory,
  type CommandVariant,
} from './commands'

// Skills
export {
  skillDomains,
  skillInjectionExample,
  skillDiscoverySteps,
  skillBenefits,
  hsolDecisionTable,
  hsolUniqueFeatures,
  findSkillsCta,
  getTotalSkills,
  totalSkills,
  totalDomains,
  type SkillDomain,
  type HsolDecisionRow,
  type HsolUniqueFeature,
} from './skills'

// Platforms
export {
  platforms,
  platformComparisonFeatures,
  platformBadges,
  getPlatformById,
  totalPlatforms,
  type Platform,
  type PlatformStatus,
} from './platforms'

// Metrics
export {
  heroMetrics,
  quickStats,
  featureCards,
  prerequisites,
  agentCategorySummary,
  docSections,
  resources,
  agentCollaboration,
} from './metrics'

// Workflow Architecture
export {
  workflowNodes,
  workflowEdges,
  nodeTypeLegend,
  architectureConcepts,
  type WorkflowNodeType,
  type WorkflowNodeData,
} from './workflowArchitecture'
