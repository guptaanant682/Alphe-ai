'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import anime from 'animejs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Shield,
  Cpu,
  Network,
  BarChart3,
  CheckCircle,
  Activity,
  Users,
  Brain,
  Target,
  Route
} from 'lucide-react'

interface FlowNode {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  position: { x: number; y: number }
  status: 'active' | 'processing' | 'complete' | 'idle'
  connections: string[]
  category: 'input' | 'processing' | 'optimization' | 'output' | 'monitoring'
  metrics?: { label: string; value: string; trend?: 'up' | 'down' | 'stable' }[]
}

const flowNodes: FlowNode[] = [
  {
    id: 'user-request',
    title: 'User Request',
    description: 'API request received from client application',
    icon: Users,
    position: { x: 100, y: 100 },
    status: 'active',
    connections: ['intelligent-routing'],
    category: 'input',
    metrics: [
      { label: 'Requests/sec', value: '12,450', trend: 'up' },
      { label: 'Avg Latency', value: '8ms', trend: 'down' }
    ]
  },
  {
    id: 'intelligent-routing',
    title: 'Intelligent Routing',
    description: 'AI-powered request analysis and optimal model selection',
    icon: Route,
    position: { x: 400, y: 100 },
    status: 'processing',
    connections: ['cost-optimization', 'security-layer'],
    category: 'processing',
    metrics: [
      { label: 'Models Available', value: '47', trend: 'stable' },
      { label: 'Route Accuracy', value: '99.7%', trend: 'up' }
    ]
  },
  {
    id: 'cost-optimization',
    title: 'Cost Optimization',
    description: 'Dynamic cost analysis and provider selection',
    icon: BarChart3,
    position: { x: 700, y: 50 },
    status: 'active',
    connections: ['model-execution'],
    category: 'optimization',
    metrics: [
      { label: 'Cost Reduction', value: '87%', trend: 'up' },
      { label: 'Savings/month', value: '$47K', trend: 'up' }
    ]
  },
  {
    id: 'security-layer',
    title: 'Security Layer',
    description: 'Zero-trust security validation and encryption',
    icon: Shield,
    position: { x: 700, y: 150 },
    status: 'complete',
    connections: ['model-execution'],
    category: 'processing',
    metrics: [
      { label: 'Threats Blocked', value: '1,247', trend: 'up' },
      { label: 'Compliance Score', value: '100%', trend: 'stable' }
    ]
  },
  {
    id: 'model-execution',
    title: 'Model Execution',
    description: 'Parallel execution across multiple AI providers',
    icon: Cpu,
    position: { x: 1000, y: 100 },
    status: 'processing',
    connections: ['quality-assurance', 'load-balancer'],
    category: 'processing',
    metrics: [
      { label: 'Active Models', value: '12', trend: 'stable' },
      { label: 'Execution Time', value: '1.2s', trend: 'down' }
    ]
  },
  {
    id: 'quality-assurance',
    title: 'Quality Assurance',
    description: 'Multi-layer response validation and quality scoring',
    icon: CheckCircle,
    position: { x: 1300, y: 50 },
    status: 'active',
    connections: ['response-aggregation'],
    category: 'optimization',
    metrics: [
      { label: 'Quality Score', value: '97.8%', trend: 'up' },
      { label: 'Error Rate', value: '0.12%', trend: 'down' }
    ]
  },
  {
    id: 'load-balancer',
    title: 'Load Balancer',
    description: 'Dynamic load distribution and failover management',
    icon: Network,
    position: { x: 1300, y: 150 },
    status: 'active',
    connections: ['response-aggregation'],
    category: 'optimization',
    metrics: [
      { label: 'Load Distribution', value: '85%', trend: 'stable' },
      { label: 'Failover Time', value: '0.1s', trend: 'stable' }
    ]
  },
  {
    id: 'response-aggregation',
    title: 'Response Aggregation',
    description: 'Intelligent response combination and optimization',
    icon: Brain,
    position: { x: 1600, y: 100 },
    status: 'processing',
    connections: ['final-response'],
    category: 'optimization',
    metrics: [
      { label: 'Response Quality', value: '98.5%', trend: 'up' },
      { label: 'Aggregation Time', value: '45ms', trend: 'down' }
    ]
  },
  {
    id: 'final-response',
    title: 'Final Response',
    description: 'Optimized response delivered to client',
    icon: Target,
    position: { x: 1900, y: 100 },
    status: 'complete',
    connections: ['monitoring-analytics'],
    category: 'output',
    metrics: [
      { label: 'Response Time', value: '1.3s', trend: 'down' },
      { label: 'Success Rate', value: '99.97%', trend: 'up' }
    ]
  },
  {
    id: 'monitoring-analytics',
    title: 'Monitoring & Analytics',
    description: 'Real-time monitoring and performance analytics',
    icon: Activity,
    position: { x: 1600, y: 250 },
    status: 'active',
    connections: [],
    category: 'monitoring',
    metrics: [
      { label: 'Data Points/sec', value: '45K', trend: 'up' },
      { label: 'Alert Response', value: '0.5s', trend: 'stable' }
    ]
  }
]

export default function InteractiveFlowchart() {
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [simulationRunning, setSimulationRunning] = useState(true)
  const [currentFlow, setCurrentFlow] = useState<string[]>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Flow simulation
  useEffect(() => {
    if (!simulationRunning) return

    const simulateFlow = () => {
      const flowPath = [
        'user-request',
        'intelligent-routing',
        'cost-optimization',
        'security-layer',
        'model-execution',
        'quality-assurance',
        'load-balancer',
        'response-aggregation',
        'final-response',
        'monitoring-analytics'
      ]

      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex < flowPath.length) {
          setCurrentFlow(prev => [...prev, flowPath[currentIndex]])
          
          // Animate node activation
          const nodeElement = document.querySelector(`[data-node-id="${flowPath[currentIndex]}"]`)
          if (nodeElement) {
            gsap.fromTo(nodeElement, 
              { scale: 1, boxShadow: 'none' },
              { 
                scale: 1.05, 
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
                duration: 0.3,
                yoyo: true,
                repeat: 1
              }
            )
          }
          
          currentIndex++
        } else {
          setCurrentFlow([])
          currentIndex = 0
        }
      }, 800)

      return interval
    }

    const interval = simulateFlow()
    return () => clearInterval(interval)
  }, [simulationRunning])

  // Connection lines animation
  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('.connection-path')
    
    paths.forEach((path, index) => {
      anime({
        targets: path,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: index * 200,
        loop: true,
        direction: 'alternate'
      })
    })
  }, [])

  const getConnectionPath = (from: FlowNode, to: FlowNode) => {
    const startX = from.position.x + 150 // Node width
    const startY = from.position.y + 60  // Node height / 2
    const endX = to.position.x
    const endY = to.position.y + 60

    // Create curved path for better visualization
    const midX = (startX + endX) / 2
    const midY = Math.min(startY, endY) - 50

    return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'input': return 'from-blue-500 to-cyan-500'
      case 'processing': return 'from-purple-500 to-pink-500'
      case 'optimization': return 'from-green-500 to-emerald-500'
      case 'output': return 'from-orange-500 to-red-500'
      case 'monitoring': return 'from-yellow-500 to-amber-500'
      default: return 'from-gray-500 to-slate-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'border-blue-400 shadow-blue-400/20'
      case 'processing': return 'border-purple-400 shadow-purple-400/20 animate-pulse'
      case 'complete': return 'border-green-400 shadow-green-400/20'
      case 'idle': return 'border-gray-400 shadow-gray-400/20'
      default: return 'border-gray-400'
    }
  }

  return (
    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
              <Network className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Alpha.AI Architecture Flow</h3>
              <p className="text-slate-400 text-sm">Interactive system architecture visualization</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSimulationRunning(!simulationRunning)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              {simulationRunning ? 'Pause' : 'Play'} Simulation
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-medium">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flowchart Container */}
      <div 
        ref={containerRef}
        className="relative overflow-auto p-8"
        style={{ height: '600px', width: '100%' }}
      >
        {/* SVG for connection lines */}
        <svg
          ref={svgRef}
          className="absolute inset-0 pointer-events-none"
          width="2100"
          height="400"
        >
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.6)" />
            </linearGradient>
            
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="rgba(59, 130, 246, 0.8)"
              />
            </marker>
          </defs>

          {/* Draw connection lines */}
          {flowNodes.map(node => 
            node.connections.map(connectionId => {
              const targetNode = flowNodes.find(n => n.id === connectionId)
              if (!targetNode) return null

              const isActive = currentFlow.includes(node.id) && currentFlow.includes(connectionId)

              return (
                <path
                  key={`${node.id}-${connectionId}`}
                  className="connection-path"
                  d={getConnectionPath(node, targetNode)}
                  stroke={isActive ? "rgba(59, 130, 246, 1)" : "url(#connectionGradient)"}
                  strokeWidth={isActive ? "3" : "2"}
                  strokeDasharray="8,4"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                />
              )
            })
          )}
        </svg>

        {/* Flow Nodes */}
        <div className="relative" style={{ width: '2100px', height: '400px' }}>
          {flowNodes.map((node, index) => {
            const Icon = node.icon
            const isActive = currentFlow.includes(node.id)
            const isSelected = activeNode === node.id

            return (
              <motion.div
                key={node.id}
                data-node-id={node.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="absolute cursor-pointer"
                style={{
                  left: node.position.x,
                  top: node.position.y,
                  width: '300px'
                }}
                onClick={() => setActiveNode(isSelected ? null : node.id)}
              >
                <Card className={`p-4 border-2 transition-all duration-300 ${
                  isActive 
                    ? 'border-blue-400 shadow-lg shadow-blue-400/30 bg-slate-800/90' 
                    : getStatusColor(node.status)
                } ${isSelected ? 'ring-2 ring-purple-400' : ''} bg-slate-800/80 backdrop-blur-sm`}>
                  
                  {/* Node Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(node.category)}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-white">{node.title}</h4>
                      <p className="text-xs text-slate-400">{node.description}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      node.status === 'active' ? 'bg-green-400 animate-pulse' :
                      node.status === 'processing' ? 'bg-yellow-400 animate-pulse' :
                      node.status === 'complete' ? 'bg-blue-400' : 'bg-gray-400'
                    }`} />
                  </div>

                  {/* Node Metrics */}
                  {isSelected && node.metrics && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 pt-3 border-t border-slate-600"
                    >
                      {node.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-xs text-slate-400">{metric.label}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-white">{metric.value}</span>
                            {metric.trend && (
                              <div className={`w-0 h-0 border-l-2 border-r-2 border-transparent ${
                                metric.trend === 'up' ? 'border-b-2 border-b-green-400' :
                                metric.trend === 'down' ? 'border-t-2 border-t-red-400' :
                                'border-2 border-gray-400'
                              }`} />
                            )}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Flow Legend */}
        <div className="absolute bottom-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 border border-slate-600">
          <h4 className="text-sm font-bold text-white mb-3">Flow Categories</h4>
          <div className="space-y-2">
            {[
              { category: 'input', label: 'Input Layer', color: 'from-blue-500 to-cyan-500' },
              { category: 'processing', label: 'Processing', color: 'from-purple-500 to-pink-500' },
              { category: 'optimization', label: 'Optimization', color: 'from-green-500 to-emerald-500' },
              { category: 'output', label: 'Output Layer', color: 'from-orange-500 to-red-500' },
              { category: 'monitoring', label: 'Monitoring', color: 'from-yellow-500 to-amber-500' }
            ].map(item => (
              <div key={item.category} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded bg-gradient-to-r ${item.color}`} />
                <span className="text-xs text-slate-300">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}