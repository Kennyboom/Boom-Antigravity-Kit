import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import type { WorkflowNodeData } from '../../data/workflowArchitecture'

// Color mapping for node types
const nodeColors: Record<string, { bg: string; border: string; glow: string }> = {
  entry: {
    bg: 'rgba(0, 212, 255, 0.1)',
    border: '#00d4ff',
    glow: 'rgba(0, 212, 255, 0.3)',
  },
  core: {
    bg: 'rgba(255, 68, 68, 0.1)',
    border: '#ff4444',
    glow: 'rgba(255, 68, 68, 0.3)',
  },
  rule: {
    bg: 'rgba(255, 136, 68, 0.1)',
    border: '#ff8844',
    glow: 'rgba(255, 136, 68, 0.3)',
  },
  tier: {
    bg: 'rgba(0, 255, 136, 0.1)',
    border: '#00ff88',
    glow: 'rgba(0, 255, 136, 0.3)',
  },
  agent: {
    bg: 'rgba(255, 136, 68, 0.1)',
    border: '#ff8844',
    glow: 'rgba(255, 136, 68, 0.3)',
  },
  skill: {
    bg: 'rgba(136, 68, 255, 0.1)',
    border: '#8844ff',
    glow: 'rgba(136, 68, 255, 0.3)',
  },
  phase: {
    bg: 'rgba(255, 204, 0, 0.1)',
    border: '#ffcc00',
    glow: 'rgba(255, 204, 0, 0.3)',
  },
  output: {
    bg: 'rgba(0, 255, 136, 0.1)',
    border: '#00ff88',
    glow: 'rgba(0, 255, 136, 0.3)',
  },
}

function WorkflowNode({ data, selected }: NodeProps) {
  const nodeData = data as WorkflowNodeData
  const colors = nodeColors[nodeData.type] || nodeColors.core
  
  return (
    <div
      className="relative group"
      style={{
        minWidth: '180px',
        maxWidth: '220px',
      }}
    >
      {/* Handles for connections */}
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-[var(--color-bg-tertiary)] !border-2"
        style={{ borderColor: colors.border }}
      />
      
      {/* Node content */}
      <div
        className="relative rounded-xl p-4 transition-all duration-300"
        style={{
          backgroundColor: colors.bg,
          border: `1px solid ${colors.border}`,
          boxShadow: selected 
            ? `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}`
            : `0 4px 20px rgba(0,0,0,0.3)`,
        }}
      >
        {/* Icon and Label */}
        <div className="flex items-center gap-2 mb-2">
          {nodeData.icon && (
            <span className="text-xl" role="img" aria-hidden="true">
              {nodeData.icon}
            </span>
          )}
          <h3 
            className="font-semibold text-sm text-white leading-tight"
            style={{ color: colors.border }}
          >
            {nodeData.label}
          </h3>
        </div>
        
        {/* Description */}
        {nodeData.description && (
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-2">
            {nodeData.description}
          </p>
        )}
        
        {/* Items list (if any) */}
        {nodeData.items && nodeData.items.length > 0 && (
          <div className="mt-2 pt-2 border-t border-[var(--color-border-secondary)]">
            <ul className="text-xs text-[var(--color-text-muted)] space-y-0.5">
              {nodeData.items.slice(0, 4).map((item, index) => (
                <li key={index} className="flex items-center gap-1">
                  <span 
                    className="w-1 h-1 rounded-full flex-shrink-0"
                    style={{ backgroundColor: colors.border }}
                  />
                  <span className="truncate">{item}</span>
                </li>
              ))}
              {nodeData.items && nodeData.items.length > 4 && (
                <li className="text-[var(--color-text-muted)] italic">
                  +{nodeData.items.length - 4} more...
                </li>
              )}
            </ul>
          </div>
        )}
        
        {/* Hover glow effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `0 0 30px ${colors.glow}`,
          }}
        />
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-[var(--color-bg-tertiary)] !border-2"
        style={{ borderColor: colors.border }}
      />
    </div>
  )
}

export default memo(WorkflowNode)
