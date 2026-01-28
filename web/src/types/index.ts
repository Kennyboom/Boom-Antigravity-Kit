/**
 * Common type definitions for Agent Assistant website
 */

// ========================================
// FEATURE TYPES
// ========================================

export interface Feature {
  id: string
  title: string
  description: string
  icon: string
  href: string
  category?: FeatureCategory
}

export type FeatureCategory =
  | 'orchestration'
  | 'agents'
  | 'workflows'
  | 'integration'
  | 'developer-experience'

// ========================================
// AGENT TYPES
// ========================================

export interface Agent {
  id: string
  name: string
  role: string
  category: AgentCategory
  capabilities: string[]
  description?: string
  icon?: string
  reportsTo?: string
  consults?: string[]
}

export type AgentCategory =
  | 'engineering'
  | 'design'
  | 'quality'
  | 'operations'
  | 'management'

// ========================================
// COMMAND TYPES
// ========================================

export interface Command {
  name: string
  description: string
  syntax: string
  example: string
  variants: string[]
  category: CommandCategory
}

export type CommandCategory =
  | 'build'
  | 'fix'
  | 'plan'
  | 'test'
  | 'review'
  | 'docs'
  | 'deploy'

export interface CommandVariant {
  name: string
  description: string
  usage: string
}

// ========================================
// PLATFORM TYPES
// ========================================

export interface Platform {
  id: string
  name: string
  status: PlatformStatus
  installCommand: string
  icon?: string
  description?: string
}

export type PlatformStatus = 'full' | 'partial' | 'coming'

// ========================================
// METRICS / STATS TYPES
// ========================================

export interface Metric {
  value: string
  label: string
  description?: string
  icon?: string
}

export interface Stat {
  label: string
  value: string | number
  prefix?: string
  suffix?: string
  icon?: string
}

// ========================================
// NAVIGATION TYPES
// ========================================

export interface NavItem {
  label: string
  href: string
  external?: boolean
  children?: NavItem[]
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

// ========================================
// TERMINAL DEMO TYPES
// ========================================

export interface TerminalLine {
  type: 'input' | 'output' | 'comment' | 'success' | 'error' | 'info'
  content: string
  delay?: number
}

export interface TerminalDemo {
  id: string
  title: string
  description?: string
  lines: TerminalLine[]
}

// ========================================
// UI COMPONENT TYPES
// ========================================

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'

export interface WithClassName {
  className?: string
}

export interface WithChildren {
  children: React.ReactNode
}

// ========================================
// DOCUMENTATION TYPES
// ========================================

export interface DocSection {
  id: string
  title: string
  content: string
  subsections?: DocSection[]
}

export interface SkillCard {
  id: string
  name: string
  description: string
  category: string
  triggers: string[]
}

// ========================================
// COMPARISON / TABLE TYPES
// ========================================

export interface ComparisonRow {
  feature: string
  traditional: string | boolean
  agentAssistant: string | boolean
  notes?: string
}

export interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
  ctaText?: string
  ctaHref?: string
}
