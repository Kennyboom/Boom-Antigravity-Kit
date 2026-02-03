import { useCallback, useMemo } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  type NodeTypes,
  type DefaultEdgeOptions,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import WorkflowNode from './WorkflowNode'
import { workflowNodes, workflowEdges } from '../../data/workflowArchitecture'

interface WorkflowDiagramProps {
  className?: string
}

const defaultEdgeOptions: DefaultEdgeOptions = {
  style: {
    strokeWidth: 2,
    stroke: '#333',
  },
  type: 'smoothstep',
}

export default function WorkflowDiagram({ className }: WorkflowDiagramProps) {
  const [nodes, , onNodesChange] = useNodesState(workflowNodes)
  const [edges, , onEdgesChange] = useEdgesState(workflowEdges)

  const nodeTypes: NodeTypes = useMemo(() => ({
    custom: WorkflowNode,
  }), [])

  const onInit = useCallback(() => {
    // Diagram initialized
  }, [])

  return (
    <div className={`w-full h-[800px] md:h-[900px] lg:h-[1000px] rounded-xl overflow-hidden ${className || ''}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        fitViewOptions={{
          padding: 0.1,
          maxZoom: 0.8,
          minZoom: 0.2,
        }}
        minZoom={0.15}
        maxZoom={1.5}
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        className="workflow-diagram"
      >
        <Controls 
          className="workflow-controls"
          showInteractive={false}
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          color="rgba(255,255,255,0.05)"
        />
      </ReactFlow>
    </div>
  )
}
