import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePrefersReducedMotion, useIsMobile } from '../../hooks'
import { generateNeuralNetworkData, getNodeById, getConnectedEdges } from '../../data/neuralNetwork'
import type { NeuralNetworkProps, Node, Edge, NeuralNetworkData } from './types'

// SVG viewBox dimensions
const VIEW_BOX_WIDTH = 800
const VIEW_BOX_HEIGHT = 600

// Animation timing
const ANIMATION_STAGGER = 0.1
const NODE_ENTRANCE_DURATION = 0.5
const EDGE_DRAW_DURATION = 0.6
const PULSE_DURATION = 3
const PARTICLE_DURATION = 2.5

/**
 * Data flow particle animation along an edge
 */
function DataParticle({ 
  sourceNode, 
  targetNode,
  delay = 0,
}: { 
  sourceNode: Node
  targetNode: Node
  delay?: number
}) {
  return (
    <motion.circle
      r={3}
      fill="var(--color-text-accent)"
      initial={{ 
        cx: sourceNode.x, 
        cy: sourceNode.y,
        opacity: 0,
        scale: 0,
      }}
      animate={{ 
        cx: [sourceNode.x, targetNode.x],
        cy: [sourceNode.y, targetNode.y],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0],
      }}
      transition={{
        duration: PARTICLE_DURATION,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: 'linear',
        times: [0, 0.1, 0.9, 1],
      }}
      style={{ filter: 'drop-shadow(0 0 4px var(--color-text-accent))' }}
    />
  )
}

/**
 * Edge line component with gradient and draw animation
 */
function EdgeLine({
  edge,
  sourceNode,
  targetNode,
  isConnectedToHovered,
  prefersReducedMotion,
  delay = 0,
}: {
  edge: Edge
  sourceNode: Node
  targetNode: Node
  isConnectedToHovered: boolean
  prefersReducedMotion: boolean
  delay?: number
}) {
  const gradientId = `gradient-${edge.id}`
  
  return (
    <g>
      {/* Gradient definition */}
      <defs>
        <linearGradient
          id={gradientId}
          x1={sourceNode.x}
          y1={sourceNode.y}
          x2={targetNode.x}
          y2={targetNode.y}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={sourceNode.color} stopOpacity={0.6} />
          <stop offset="100%" stopColor={targetNode.color} stopOpacity={0.6} />
        </linearGradient>
      </defs>
      
      {/* Edge line */}
      <motion.line
        x1={sourceNode.x}
        y1={sourceNode.y}
        x2={targetNode.x}
        y2={targetNode.y}
        stroke={`url(#${gradientId})`}
        strokeWidth={isConnectedToHovered ? 2.5 : 1.5}
        strokeLinecap="round"
        initial={prefersReducedMotion ? { opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: isConnectedToHovered ? 0.8 : 0.4,
        }}
        transition={{
          pathLength: { duration: EDGE_DRAW_DURATION, delay, ease: 'easeOut' },
          opacity: { duration: 0.3 },
        }}
        style={{ 
          filter: isConnectedToHovered 
            ? 'drop-shadow(0 0 4px rgba(0, 255, 136, 0.3))' 
            : 'none',
        }}
      />
    </g>
  )
}

/**
 * Node circle component with hover and pulse animations
 */
function NodeCircle({
  node,
  isHovered,
  isDimmed,
  isFocused,
  prefersReducedMotion,
  delay = 0,
  onHoverStart,
  onHoverEnd,
  onFocus,
  onBlur,
  onKeyDown,
  onTap,
}: {
  node: Node
  isHovered: boolean
  isDimmed: boolean
  isFocused: boolean
  prefersReducedMotion: boolean
  delay?: number
  onHoverStart: () => void
  onHoverEnd: () => void
  onFocus: () => void
  onBlur: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onTap?: () => void
}) {
  const scale = isHovered ? 1.2 : 1
  const opacity = isDimmed ? 0.4 : 1
  
  // Pulse animation for metric nodes
  const pulseAnimation = !prefersReducedMotion && node.type === 'metric' 
    ? { scale: [1, 1.08, 1] }
    : !prefersReducedMotion && node.type === 'orchestrator'
    ? { scale: [1, 1.05, 1] }
    : {}
  
  return (
    <motion.g
      initial={prefersReducedMotion ? { opacity: 1 } : { scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: prefersReducedMotion ? 1 : scale, 
        opacity,
        ...pulseAnimation,
      }}
      transition={{
        scale: isHovered 
          ? { duration: 0.2 } 
          : pulseAnimation.scale 
          ? { duration: PULSE_DURATION, repeat: Infinity, ease: 'easeInOut' }
          : { duration: NODE_ENTRANCE_DURATION, delay },
        opacity: { duration: NODE_ENTRANCE_DURATION, delay },
      }}
      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
    >
      {/* Glow effect */}
      <circle
        cx={node.x}
        cy={node.y}
        r={node.size + 6}
        fill="none"
        stroke={node.color}
        strokeWidth={2}
        opacity={isHovered || isFocused ? 0.4 : 0.1}
        style={{ 
          filter: `blur(${isHovered || isFocused ? 4 : 2}px)`,
          transition: 'opacity 0.2s, filter 0.2s',
        }}
      />
      
      {/* Main node circle */}
      <circle
        cx={node.x}
        cy={node.y}
        r={node.size}
        fill={node.color}
        opacity={0.9}
        style={{ 
          filter: isHovered || isFocused 
            ? `drop-shadow(0 0 12px ${node.color})` 
            : `drop-shadow(0 0 6px ${node.color})`,
          transition: 'filter 0.2s',
        }}
      />
      
      {/* Inner highlight */}
      <circle
        cx={node.x}
        cy={node.y}
        r={node.size * 0.6}
        fill={node.color}
        opacity={0.3}
        style={{ mixBlendMode: 'overlay' }}
      />
      
      {/* Interactive hit area (invisible, larger for touch) */}
      <circle
        cx={node.x}
        cy={node.y}
        r={Math.max(node.size + 12, 22)} // Min 44px touch target
        fill="transparent"
        style={{ cursor: 'pointer' }}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onClick={onTap}
        tabIndex={0}
        role="button"
        aria-label={`${node.type === 'orchestrator' ? 'Orchestrator' : node.type === 'metric' ? 'Metric' : 'Agent'}: ${node.label}${node.agentInfo ? ` - ${node.agentInfo.description}` : ''}`}
      />
    </motion.g>
  )
}

/**
 * Node label component
 */
function NodeLabel({
  node,
  isHovered,
  isDimmed,
  prefersReducedMotion,
  delay = 0,
}: {
  node: Node
  isHovered: boolean
  isDimmed: boolean
  prefersReducedMotion: boolean
  delay?: number
}) {
  // Metric nodes show value, others show label
  const displayLabel = node.type === 'metric' 
    ? node.label.split(' ').slice(1).join(' ') // Remove emoji for cleaner label
    : node.label
  
  return (
    <motion.text
      x={node.x}
      y={node.y + node.size + 16}
      textAnchor="middle"
      fill="var(--color-text-secondary)"
      fontSize={node.type === 'metric' ? 11 : 10}
      fontWeight={node.type === 'orchestrator' ? 600 : 500}
      fontFamily="var(--font-sans)"
      initial={prefersReducedMotion ? { opacity: 0.8 } : { opacity: 0, y: node.y + node.size + 10 }}
      animate={{ 
        opacity: isDimmed ? 0.3 : isHovered ? 1 : 0.8,
        y: node.y + node.size + 16,
      }}
      transition={{ duration: 0.3, delay: delay + 0.2 }}
      className="pointer-events-none select-none hidden md:block"
      aria-hidden="true"
    >
      {displayLabel}
    </motion.text>
  )
}

/**
 * Tooltip component for hovered nodes
 */
function NodeTooltip({ 
  node, 
  containerRef,
}: { 
  node: Node
  containerRef: React.RefObject<SVGSVGElement | null>
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    if (containerRef.current) {
      const svg = containerRef.current
      const rect = svg.getBoundingClientRect()
      const scaleX = rect.width / VIEW_BOX_WIDTH
      const scaleY = rect.height / VIEW_BOX_HEIGHT
      
      setPosition({
        x: node.x * scaleX,
        y: (node.y - node.size - 50) * scaleY,
      })
    }
  }, [node, containerRef])
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2 }}
      className="absolute z-20 pointer-events-none"
      style={{ 
        left: position.x,
        top: position.y,
        transform: 'translateX(-50%)',
      }}
      role="tooltip"
      aria-live="polite"
    >
      <div className="bg-bg-card border border-border-primary rounded-lg px-3 py-2 shadow-lg">
        <div className="text-sm font-semibold text-text-primary">
          {node.agentInfo?.role || node.label}
        </div>
        {node.agentInfo?.description && (
          <div className="text-xs text-text-secondary mt-0.5">
            {node.agentInfo.description}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/**
 * Neural Network visualization component
 * Displays an animated graph of agents, orchestrator, and metrics
 */
export function NeuralNetwork({
  metrics = [],
  className = '',
  onNodeHover,
  animationDelay = 0,
}: NeuralNetworkProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const isMobile = useIsMobile()
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const [focusedNodeId, setFocusedNodeId] = useState<string | null>(null)
  const [tappedNodeId, setTappedNodeId] = useState<string | null>(null)
  
  // Generate network data
  const networkData = useMemo<NeuralNetworkData>(
    () => generateNeuralNetworkData(metrics, isMobile),
    [metrics, isMobile]
  )
  
  // Get connected edges for highlighting
  const connectedEdgeIds = useMemo(() => {
    if (!hoveredNodeId && !focusedNodeId) return new Set<string>()
    const activeId = hoveredNodeId || focusedNodeId
    if (!activeId) return new Set<string>()
    return new Set(getConnectedEdges(networkData, activeId).map(e => e.id))
  }, [hoveredNodeId, focusedNodeId, networkData])
  
  // Handlers
  const handleHoverStart = useCallback((nodeId: string) => {
    setHoveredNodeId(nodeId)
    onNodeHover?.(nodeId)
  }, [onNodeHover])
  
  const handleHoverEnd = useCallback(() => {
    setHoveredNodeId(null)
    onNodeHover?.(null)
  }, [onNodeHover])
  
  const handleFocus = useCallback((nodeId: string) => {
    setFocusedNodeId(nodeId)
  }, [])
  
  const handleBlur = useCallback(() => {
    setFocusedNodeId(null)
  }, [])
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent, nodeId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setHoveredNodeId(prev => prev === nodeId ? null : nodeId)
      setTappedNodeId(prev => prev === nodeId ? null : nodeId)
    } else if (e.key === 'Escape') {
      setHoveredNodeId(null)
      setFocusedNodeId(null)
      setTappedNodeId(null)
    }
  }, [])
  
  // Handle tap on mobile (tap to show, tap again or outside to dismiss)
  const handleNodeTap = useCallback((nodeId: string) => {
    if (isMobile) {
      setTappedNodeId(prev => prev === nodeId ? null : nodeId)
    }
  }, [isMobile])
  
  // Dismiss tooltip when tapping outside on mobile
  useEffect(() => {
    if (!isMobile || !tappedNodeId) return
    
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target
      if (containerRef.current && target instanceof Node && !containerRef.current.contains(target)) {
        setTappedNodeId(null)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMobile, tappedNodeId])
  
  // Get active node for tooltip (hover on desktop, tap on mobile)
  const activeNodeId = isMobile ? tappedNodeId : (hoveredNodeId || focusedNodeId)
  const activeNode = activeNodeId ? getNodeById(networkData, activeNodeId) : null
  
  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <motion.svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_BOX_WIDTH} ${VIEW_BOX_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: animationDelay }}
        role="img"
        aria-label="Neural network visualization showing AI agent orchestration with connected nodes representing specialist agents and performance metrics"
      >
        {/* Edges layer (rendered first, behind nodes) */}
        <g className="edges-layer">
          {networkData.edges.map((edge, index) => {
            const sourceNode = getNodeById(networkData, edge.source)
            const targetNode = getNodeById(networkData, edge.target)
            
            if (!sourceNode || !targetNode) return null
            
            return (
              <EdgeLine
                key={edge.id}
                edge={edge}
                sourceNode={sourceNode}
                targetNode={targetNode}
                isConnectedToHovered={connectedEdgeIds.has(edge.id)}
                prefersReducedMotion={prefersReducedMotion}
                delay={animationDelay + 0.3 + index * 0.05}
              />
            )
          })}
        </g>
        
        {/* Data flow particles (only on animated edges, skip on reduced motion) */}
        {!prefersReducedMotion && (
          <g className="particles-layer">
            {networkData.edges
              .filter(edge => edge.animated)
              .map((edge, index) => {
                const sourceNode = getNodeById(networkData, edge.source)
                const targetNode = getNodeById(networkData, edge.target)
                
                if (!sourceNode || !targetNode) return null
                
                return (
                  <DataParticle
                    key={`particle-${edge.id}`}
                    sourceNode={sourceNode}
                    targetNode={targetNode}
                    delay={animationDelay + 1.5 + index * 0.3}
                  />
                )
              })}
          </g>
        )}
        
        {/* Nodes layer */}
        <g className="nodes-layer">
          {networkData.nodes.map((node, index) => (
            <NodeCircle
              key={node.id}
              node={node}
              isHovered={hoveredNodeId === node.id}
              isDimmed={!!hoveredNodeId && hoveredNodeId !== node.id && !connectedEdgeIds.has(`edge-${node.id}`) && !connectedEdgeIds.has(`edge-orchestrator-${node.id}`)}
              isFocused={focusedNodeId === node.id}
              prefersReducedMotion={prefersReducedMotion}
              delay={animationDelay + index * ANIMATION_STAGGER}
              onHoverStart={() => handleHoverStart(node.id)}
              onHoverEnd={handleHoverEnd}
              onFocus={() => handleFocus(node.id)}
              onBlur={handleBlur}
              onKeyDown={(e) => handleKeyDown(e, node.id)}
              onTap={() => handleNodeTap(node.id)}
            />
          ))}
        </g>
        
        {/* Labels layer (desktop only) */}
        <g className="labels-layer">
          {networkData.nodes.map((node, index) => (
            <NodeLabel
              key={`label-${node.id}`}
              node={node}
              isHovered={hoveredNodeId === node.id || focusedNodeId === node.id}
              isDimmed={!!hoveredNodeId && hoveredNodeId !== node.id}
              prefersReducedMotion={prefersReducedMotion}
              delay={animationDelay + index * ANIMATION_STAGGER}
            />
          ))}
        </g>
      </motion.svg>
      
      {/* Tooltip overlay */}
      <AnimatePresence>
        {activeNode && (
          <NodeTooltip 
            node={activeNode} 
            containerRef={svgRef}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
