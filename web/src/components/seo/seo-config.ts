/**
 * SEO configuration for pages
 * Separated from component for fast-refresh compatibility
 */

export const SITE_URL = 'https://agent-assistant.dev'
export const DEFAULT_IMAGE = '/assets/logo.png'
export const SITE_NAME = 'Agent Assistant'

// Pre-configured SEO for common pages
export const pageSEO = {
  home: {
    title: 'Agent Assistant',
    description: 'Multi-agent orchestration for AI coding assistants with 20 specialist agents, 310+ skills, and 40+ workflows. Multi-agent orchestration for AI coding assistants.',
    pathname: '/',
  },
  installation: {
    title: 'Installation Guide',
    description: 'Install Agent Assistant globally and start using specialized agents in all your projects. Quick setup for Cursor, Claude Code, GitHub Copilot, and Antigravity.',
    pathname: '/installation',
  },
  docs: {
    title: 'Documentation',
    description: 'Learn Agent Assistant - complete documentation for AI-powered development workflows with specialized agents and intelligent orchestration.',
    pathname: '/docs',
  },
  specialistAgents: {
    title: 'Specialist Agents',
    description: '20 pre-built specialist agents including backend engineers, frontend developers, testers, debuggers, and more. Each with unique expertise and thinking protocols.',
    pathname: '/features/specialist-agents',
  },
  commands: {
    title: 'Commands & Workflows',
    description: 'Powerful slash commands like /cook, /fix, /test, /review that trigger complete multi-phase development workflows with specialized agents.',
    pathname: '/features/commands-workflows',
  },
  matrixSkills: {
    title: 'Matrix Skills',
    description: '310+ specialized skills across 19 domains, automatically injected into agents based on their expertise profile for deep knowledge on demand.',
    pathname: '/features/matrix-skills',
  },
  multiPlatform: {
    title: 'Multi-Platform Support',
    description: 'Works seamlessly with Cursor, Claude Code, GitHub Copilot, and Antigravity. One configuration, multiple platforms.',
    pathname: '/features/multi-platform-support',
  },
  oneTimeSetup: {
    title: 'One-Time Setup',
    description: 'Install once, use everywhere. Global configuration that works across all your projects and AI coding assistants.',
    pathname: '/features/one-time-setup',
  },
  qualityGates: {
    title: 'Quality Gates',
    description: 'Built-in quality gates ensure every agent output meets production standards. Automatic verification, testing, and review workflows.',
    pathname: '/features/quality-gates',
  },
  subAgentOrchestration: {
    title: 'Sub-Agent Orchestration',
    description: 'Intelligent orchestration coordinates multiple specialist agents to complete complex tasks. The orchestrator delegates, coordinates, and synthesizes.',
    pathname: '/features/sub-agent-orchestration',
  },
} as const
