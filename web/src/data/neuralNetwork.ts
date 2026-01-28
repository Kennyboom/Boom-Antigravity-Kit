import type { Node, Edge, HeroMetric, NeuralNetworkData } from '../components/neural-network/types'

// Design token colors (matching globals.css)
const COLORS = {
  purple: '#8844ff',
  red: '#ff4444',
  orange: '#ff8844',
  cyan: '#00d4ff',
  green: '#00ff88',
}

// Agent definitions with colors
const AGENTS = [
  { id: 'orchestrator', label: 'Orchestrator', color: COLORS.purple, role: 'Central Brain', description: 'Coordinates all agents and workflows' },
  { id: 'backend', label: 'Backend', color: COLORS.red, role: 'Backend Engineer', description: 'APIs, databases, server logic' },
  { id: 'frontend', label: 'Frontend', color: COLORS.orange, role: 'Frontend Engineer', description: 'UI components, styling, UX' },
  { id: 'tester', label: 'Tester', color: COLORS.cyan, role: 'QA Specialist', description: 'Testing, validation, quality' },
  { id: 'debugger', label: 'Debugger', color: COLORS.green, role: 'Debug Expert', description: 'Error analysis, fixes' },
  { id: 'reviewer', label: 'Reviewer', color: COLORS.purple, role: 'Code Reviewer', description: 'Quality checks, best practices' },
]

/**
 * Calculate position on a circle
 */
function circlePosition(
  centerX: number,
  centerY: number,
  radius: number,
  angle: number
): { x: number; y: number } {
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle),
  }
}

/**
 * Generate neural network visualization data
 * @param metrics - Hero metrics to display as nodes
 * @param isMobile - Adjust layout for mobile
 */
export function generateNeuralNetworkData(
  metrics: HeroMetric[] = [],
  isMobile = false
): NeuralNetworkData {
  const nodes: Node[] = []
  const edges: Edge[] = []

  // Viewport dimensions
  const viewBoxWidth = 800
  const viewBoxHeight = 600

  // Center point
  const centerX = viewBoxWidth / 2
  const centerY = isMobile ? viewBoxHeight * 0.4 : viewBoxHeight * 0.45

  // Radius for agent circle
  const agentRadius = isMobile ? 120 : 160

  // Node sizes
  const orchestratorSize = isMobile ? 28 : 36
  const agentSize = isMobile ? 20 : 24
  const metricSize = isMobile ? 24 : 28

  // 1. Add orchestrator node (center)
  nodes.push({
    id: 'orchestrator',
    label: 'Orchestrator',
    type: 'orchestrator',
    x: centerX,
    y: centerY,
    color: COLORS.purple,
    size: orchestratorSize,
    agentInfo: {
      role: 'Central Brain',
      description: 'Coordinates all agents and workflows',
    },
  })

  // 2. Add agent nodes (circle around orchestrator)
  const agentCount = AGENTS.length - 1 // Exclude orchestrator from agents array
  const startAngle = -Math.PI / 2 // Start from top

  AGENTS.slice(1).forEach((agent, index) => {
    const angle = startAngle + (index / agentCount) * Math.PI * 2
    const pos = circlePosition(centerX, centerY, agentRadius, angle)

    nodes.push({
      id: agent.id,
      label: agent.label,
      type: 'agent',
      x: pos.x,
      y: pos.y,
      color: agent.color,
      size: agentSize,
      agentInfo: {
        role: agent.role,
        description: agent.description,
      },
    })

    // Create edge from orchestrator to agent
    edges.push({
      id: `edge-orchestrator-${agent.id}`,
      source: 'orchestrator',
      target: agent.id,
      animated: true,
    })
  })

  // 3. Add metric nodes (bottom row)
  if (metrics.length > 0) {
    const metricY = isMobile ? viewBoxHeight * 0.85 : viewBoxHeight * 0.82
    const metricSpacing = isMobile ? 100 : 150
    const metricStartX = centerX - ((metrics.length - 1) * metricSpacing) / 2

    metrics.forEach((metric, index) => {
      const metricId = `metric-${index}`
      
      nodes.push({
        id: metricId,
        label: `${metric.emoji} ${metric.value}`,
        type: 'metric',
        x: metricStartX + index * metricSpacing,
        y: metricY,
        color: COLORS.green,
        size: metricSize,
        agentInfo: {
          role: metric.label,
          description: metric.value,
        },
      })

      // Connect metrics to nearby agents
      const agentIndices = [
        index % (AGENTS.length - 1) + 1,
        (index + 1) % (AGENTS.length - 1) + 1,
      ]
      
      agentIndices.forEach((agentIdx, edgeIdx) => {
        if (AGENTS[agentIdx]) {
          edges.push({
            id: `edge-${AGENTS[agentIdx].id}-metric-${index}-${edgeIdx}`,
            source: AGENTS[agentIdx].id,
            target: metricId,
            animated: false,
          })
        }
      })
    })
  }

  return { nodes, edges }
}

/**
 * Get node by ID from the network data
 */
export function getNodeById(data: NeuralNetworkData, id: string): Node | undefined {
  return data.nodes.find(node => node.id === id)
}

/**
 * Get edges connected to a node
 */
export function getConnectedEdges(data: NeuralNetworkData, nodeId: string): Edge[] {
  return data.edges.filter(edge => edge.source === nodeId || edge.target === nodeId)
}
