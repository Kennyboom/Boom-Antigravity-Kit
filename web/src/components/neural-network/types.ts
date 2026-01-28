// Neural Network visualization types

export type NodeType = 'orchestrator' | 'agent' | 'metric'

export interface Node {
  id: string
  label: string
  type: NodeType
  x: number
  y: number
  color: string
  size: number
  /** Optional agent-specific info for tooltips */
  agentInfo?: {
    role: string
    description: string
  }
}

export interface Edge {
  id: string
  source: string
  target: string
  /** Whether to animate data flow particles on this edge */
  animated?: boolean
}

export interface HeroMetric {
  value: string
  label: string
  emoji: string
}

export interface NeuralNetworkData {
  nodes: Node[]
  edges: Edge[]
}

export interface NeuralNetworkProps {
  /** Hero metrics to display as metric nodes */
  metrics?: HeroMetric[]
  /** Additional CSS classes */
  className?: string
  /** Callback when a node is hovered */
  onNodeHover?: (nodeId: string | null) => void
  /** Animation delay before network starts appearing */
  animationDelay?: number
}
