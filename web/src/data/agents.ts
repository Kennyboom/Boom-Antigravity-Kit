import type { LucideIcon } from 'lucide-react'
import {
  Server,
  Palette,
  Smartphone,
  Gamepad2,
  Building2,
  Database,
  TestTube,
  Eye,
  Bug,
  Shield,
  ClipboardList,
  Lightbulb,
  BarChart3,
  Target,
  Wrench,
  FileText,
  Gauge,
  Search,
  Map,
  TrendingUp,
} from 'lucide-react'

export interface Agent {
  id: string
  name: string
  role: string
  category: AgentCategory
  capabilities: string[]
  description?: string
  icon?: LucideIcon
}

export type AgentCategory = 'Implementation' | 'Architecture' | 'Quality' | 'Planning' | 'Support'

export interface AgentCategoryGroup {
  name: AgentCategory
  description: string
  color: 'orange' | 'purple' | 'green' | 'cyan' | 'red'
  agents: Agent[]
}

// All 20 agents
export const agents: Agent[] = [
  // Implementation (4)
  { 
    id: 'backend-engineer', 
    name: 'Backend Engineer', 
    role: 'Principal Backend Architect',
    category: 'Implementation', 
    capabilities: ['REST APIs', 'GraphQL', 'Microservices', 'Security'],
    description: 'APIs, databases, microservices, server-side logic',
    icon: Server,
  },
  { 
    id: 'frontend-engineer', 
    name: 'Frontend Engineer', 
    role: 'Principal Frontend Architect',
    category: 'Implementation', 
    capabilities: ['React', 'TypeScript', 'Accessibility', 'Performance'],
    description: 'UI/UX, React, accessibility, web performance',
    icon: Palette,
  },
  { 
    id: 'mobile-engineer', 
    name: 'Mobile Engineer', 
    role: 'Mobile Development Lead',
    category: 'Implementation', 
    capabilities: ['React Native', 'Flutter', 'iOS', 'Android'],
    description: 'iOS, Android, React Native, Flutter apps',
    icon: Smartphone,
  },
  { 
    id: 'game-engineer', 
    name: 'Game Engineer', 
    role: 'Game Development Specialist',
    category: 'Implementation', 
    capabilities: ['Unity', 'Unreal', 'WebGL', 'Physics'],
    description: 'Game logic, engines, graphics, multiplayer',
    icon: Gamepad2,
  },
  
  // Architecture (2)
  { 
    id: 'tech-lead', 
    name: 'Tech Lead', 
    role: 'Principal Architect',
    category: 'Architecture', 
    capabilities: ['System Design', 'ADRs', 'Strategy', 'Scalability'],
    description: 'System design, architecture decisions, technical strategy',
    icon: Building2,
  },
  { 
    id: 'database-architect', 
    name: 'Database Architect', 
    role: 'Data Architecture Lead',
    category: 'Architecture', 
    capabilities: ['SQL', 'NoSQL', 'Optimization', 'Migrations'],
    description: 'Schema design, optimization, data modeling',
    icon: Database,
  },
  
  // Quality (4)
  { 
    id: 'tester', 
    name: 'Tester', 
    role: 'QA Architect',
    category: 'Quality', 
    capabilities: ['Unit Tests', 'E2E', 'Integration', 'Coverage'],
    description: 'Unit tests, integration tests, E2E, test strategies',
    icon: TestTube,
  },
  { 
    id: 'reviewer', 
    name: 'Reviewer', 
    role: 'Code Quality Guardian',
    category: 'Quality', 
    capabilities: ['Code Review', 'Best Practices', 'Standards', 'Security'],
    description: 'Code review, best practices, security audit',
    icon: Eye,
  },
  { 
    id: 'debugger', 
    name: 'Debugger', 
    role: 'Root Cause Analyst',
    category: 'Quality', 
    capabilities: ['Root Cause', 'Debugging', 'Profiling', 'Logs'],
    description: 'Bug investigation, error analysis, troubleshooting',
    icon: Bug,
  },
  { 
    id: 'security-engineer', 
    name: 'Security Engineer', 
    role: 'Application Security Lead',
    category: 'Quality', 
    capabilities: ['OWASP', 'Pentesting', 'Hardening', 'Compliance'],
    description: 'Security audits, vulnerability assessment, hardening',
    icon: Shield,
  },
  
  // Planning (3)
  { 
    id: 'planner', 
    name: 'Planner', 
    role: 'Implementation Strategist',
    category: 'Planning', 
    capabilities: ['Planning', 'Milestones', 'Estimates', 'Dependencies'],
    description: 'Task breakdown, implementation plans, milestones',
    icon: ClipboardList,
  },
  { 
    id: 'brainstormer', 
    name: 'Brainstormer', 
    role: 'Creative Problem Solver',
    category: 'Planning', 
    capabilities: ['Ideas', 'Alternatives', 'Trade-offs', 'Innovation'],
    description: 'Ideas, approaches, solution exploration',
    icon: Lightbulb,
  },
  { 
    id: 'business-analyst', 
    name: 'Business Analyst', 
    role: 'Requirements Engineer',
    category: 'Planning', 
    capabilities: ['Requirements', 'User Stories', 'Analysis', 'Documentation'],
    description: 'Requirements, user stories, acceptance criteria',
    icon: BarChart3,
  },
  
  // Support (7)
  { 
    id: 'designer', 
    name: 'Designer', 
    role: 'UI/UX Architect',
    category: 'Support', 
    capabilities: ['UI/UX', 'Design Systems', 'Prototypes', 'Accessibility'],
    description: 'UI mockups, design systems, user experience',
    icon: Target,
  },
  { 
    id: 'devops-engineer', 
    name: 'DevOps Engineer', 
    role: 'Platform Engineer',
    category: 'Support', 
    capabilities: ['CI/CD', 'Docker', 'Kubernetes', 'Monitoring'],
    description: 'CI/CD, infrastructure, deployment, monitoring',
    icon: Wrench,
  },
  { 
    id: 'docs-manager', 
    name: 'Docs Manager', 
    role: 'Documentation Lead',
    category: 'Support', 
    capabilities: ['API Docs', 'Guides', 'README', 'OpenAPI'],
    description: 'API docs, guides, README, knowledge base',
    icon: FileText,
  },
  { 
    id: 'performance-engineer', 
    name: 'Performance Engineer', 
    role: 'Optimization Specialist',
    category: 'Support', 
    capabilities: ['Profiling', 'Optimization', 'Benchmarks', 'Load Testing'],
    description: 'Profiling, optimization, benchmarking',
    icon: Gauge,
  },
  { 
    id: 'researcher', 
    name: 'Researcher', 
    role: 'Technical Researcher',
    category: 'Support', 
    capabilities: ['Research', 'Analysis', 'Best Practices', 'Trends'],
    description: 'Technology research, best practices, analysis',
    icon: Search,
  },
  { 
    id: 'scouter', 
    name: 'Scouter', 
    role: 'Codebase Explorer',
    category: 'Support', 
    capabilities: ['Exploration', 'Dependencies', 'Patterns', 'Discovery'],
    description: 'Code analysis, dependency mapping, file discovery',
    icon: Map,
  },
  { 
    id: 'project-manager', 
    name: 'Project Manager', 
    role: 'Delivery Coordinator',
    category: 'Support', 
    capabilities: ['Timeline', 'Resources', 'Communication', 'Tracking'],
    description: 'Timeline, resources, stakeholder communication',
    icon: TrendingUp,
  },
]

// Agents grouped by category
export const agentCategories: AgentCategoryGroup[] = [
  {
    name: 'Implementation',
    description: 'Agents that write production-quality code',
    color: 'orange',
    agents: agents.filter(a => a.category === 'Implementation'),
  },
  {
    name: 'Architecture',
    description: 'Agents that design system structure',
    color: 'purple',
    agents: agents.filter(a => a.category === 'Architecture'),
  },
  {
    name: 'Quality',
    description: 'Agents that ensure code quality',
    color: 'green',
    agents: agents.filter(a => a.category === 'Quality'),
  },
  {
    name: 'Planning',
    description: 'Agents that plan and strategize',
    color: 'cyan',
    agents: agents.filter(a => a.category === 'Planning'),
  },
  {
    name: 'Support',
    description: 'Agents that support the development process',
    color: 'red',
    agents: agents.filter(a => a.category === 'Support'),
  },
]

// Category color mapping for badges
export const categoryBadgeMap: Record<AgentCategory, 'Core' | 'Engineering' | 'Quality' | 'Support'> = {
  Implementation: 'Engineering',
  Architecture: 'Core',
  Quality: 'Quality',
  Planning: 'Core',
  Support: 'Support',
}

// Get agent count by category
export const getAgentCountByCategory = () => {
  const counts: Record<AgentCategory, number> = {
    Implementation: 0,
    Architecture: 0,
    Quality: 0,
    Planning: 0,
    Support: 0,
  }
  
  agents.forEach(agent => {
    counts[agent.category]++
  })
  
  return counts
}

// Total agent count
export const totalAgents = agents.length
