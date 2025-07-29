'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { 
  Brain, 
  Cpu, 
  Zap, 
  Activity,
  TrendingUp,
  Database,
  Network,
  Users
} from 'lucide-react'

interface Node {
  id: string
  x: number
  y: number
  radius: number
  connections: string[]
  layer: number
  activated: boolean
  type: 'input' | 'hidden' | 'output'
}

interface Connection {
  from: string
  to: string
  weight: number
  active: boolean
}

export default function NeuralNetworkViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [stats, setStats] = useState({
    requests: 0,
    models: 0,
    savings: 0,
    efficiency: 0
  })

  // Initialize neural network structure
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const width = canvas.width = 800
    canvas.height = 600

    // Create network layers
    const layers = [
      { count: 4, type: 'input' as const, y: 100 },
      { count: 6, type: 'hidden' as const, y: 200 },
      { count: 8, type: 'hidden' as const, y: 300 },
      { count: 6, type: 'hidden' as const, y: 400 },
      { count: 3, type: 'output' as const, y: 500 }
    ]

    const newNodes: Node[] = []
    const newConnections: Connection[] = []

    layers.forEach((layer, layerIndex) => {
      const startX = (width - (layer.count - 1) * 80) / 2
      
      for (let i = 0; i < layer.count; i++) {
        const nodeId = `layer${layerIndex}-node${i}`
        const node: Node = {
          id: nodeId,
          x: startX + i * 80,
          y: layer.y,
          radius: 15,
          connections: [],
          layer: layerIndex,
          activated: false,
          type: layer.type
        }
        
        newNodes.push(node)

        // Create connections to next layer
        if (layerIndex < layers.length - 1) {
          const nextLayer = layers[layerIndex + 1]
          for (let j = 0; j < nextLayer.count; j++) {
            const targetId = `layer${layerIndex + 1}-node${j}`
            node.connections.push(targetId)
            
            newConnections.push({
              from: nodeId,
              to: targetId,
              weight: ((nodeId.charCodeAt(0) + targetId.charCodeAt(0)) % 100) / 100,
              active: false
            })
          }
        }
      }
    })

    setNodes(newNodes)
    setConnections(newConnections)

    // Animate stats with anime.js
    anime({
      targets: stats as any,
      requests: 850000,
      models: 47,
      savings: 87,
      efficiency: 94,
      duration: 3000,
      easing: 'easeOutCubic',
      update: () => {
        setStats({...stats})
      }
    })
  }, [stats])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || nodes.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      connections.forEach(conn => {
        const fromNode = nodes.find(n => n.id === conn.from)
        const toNode = nodes.find(n => n.id === conn.to)
        
        if (fromNode && toNode) {
          const opacity = conn.active ? 0.8 : 0.2
          const gradient = ctx.createLinearGradient(
            fromNode.x, fromNode.y,
            toNode.x, toNode.y
          )
          gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
          gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`)

          ctx.strokeStyle = gradient
          ctx.lineWidth = conn.active ? 3 : 1
          ctx.beginPath()
          ctx.moveTo(fromNode.x, fromNode.y)
          ctx.lineTo(toNode.x, toNode.y)
          ctx.stroke()

          // Draw data flow particles
          if (conn.active) {
            const progress = (Date.now() / 1000) % 1
            const x = fromNode.x + (toNode.x - fromNode.x) * progress
            const y = fromNode.y + (toNode.y - fromNode.y) * progress

            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
            ctx.beginPath()
            ctx.arc(x, y, 3, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      })

      // Draw nodes
      nodes.forEach(node => {
        const activated = node.activated
        
        // Node glow effect
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 2
        )
        
        if (activated) {
          gradient.addColorStop(0, 'rgba(59, 130, 246, 1)')
          gradient.addColorStop(0.7, 'rgba(59, 130, 246, 0.6)')
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
        } else {
          gradient.addColorStop(0, 'rgba(100, 100, 100, 0.8)')
          gradient.addColorStop(1, 'rgba(100, 100, 100, 0)')
        }

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2)
        ctx.fill()

        // Node core
        ctx.fillStyle = activated ? '#3b82f6' : '#6b7280'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()

        // Node border
        ctx.strokeStyle = activated ? '#ffffff' : '#9ca3af'
        ctx.lineWidth = 2
        ctx.stroke()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Simulate network activity
    const activityInterval = setInterval(() => {
      // Random activation propagation
      const inputNodes = nodes.filter(n => n.type === 'input')
      const randomInput = inputNodes[Math.floor((Date.now() / 1000) % inputNodes.length)]
      
      if (randomInput) {
        // Propagate activation through network
        const propagateActivation = (nodeId: string, delay: number = 0) => {
          setTimeout(() => {
            setNodes(prev => prev.map(n => 
              n.id === nodeId ? { ...n, activated: true } : n
            ))
            
            setConnections(prev => prev.map(c => 
              c.from === nodeId ? { ...c, active: true } : c
            ))

            // Find connected nodes and continue propagation
            const node = nodes.find(n => n.id === nodeId)
            if (node) {
              node.connections.forEach(connId => {
                propagateActivation(connId, 200)
              })
            }

            // Deactivate after delay
            setTimeout(() => {
              setNodes(prev => prev.map(n => 
                n.id === nodeId ? { ...n, activated: false } : n
              ))
              
              setConnections(prev => prev.map(c => 
                c.from === nodeId ? { ...c, active: false } : c
              ))
            }, 1000)
          }, delay)
        }

        propagateActivation(randomInput.id)
      }
    }, 2000)

    return () => {
      cancelAnimationFrame(animationId)
      clearInterval(activityInterval)
    }
  }, [nodes, connections])

  return (
    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">AI Neural Network</h3>
              <p className="text-slate-400 text-sm">Real-time model orchestration</p>
            </div>
          </div>
          
          {/* Live status indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">LIVE</span>
          </div>
        </div>
      </div>

      {/* Network visualization */}
      <div ref={containerRef} className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-[600px] bg-transparent"
          style={{ maxWidth: '100%' }}
        />
        
        {/* Overlay stats */}
        <div className="absolute top-4 right-4 space-y-3">
          {[
            { icon: Activity, label: 'Requests/sec', value: Math.floor(stats.requests).toLocaleString(), color: 'text-blue-400' },
            { icon: Cpu, label: 'Active Models', value: Math.floor(stats.models), color: 'text-purple-400' },
            { icon: TrendingUp, label: 'Cost Savings', value: `${Math.floor(stats.savings)}%`, color: 'text-green-400' },
            { icon: Zap, label: 'Efficiency', value: `${Math.floor(stats.efficiency)}%`, color: 'text-yellow-400' }
          ].map((stat, index) => {
            const Icon = stat.icon
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 border border-slate-600"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <div>
                    <div className={`text-lg font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Network layer labels */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-12">
          {[
            { label: 'Input Layer', icon: Database, color: 'text-blue-400' },
            { label: 'Processing', icon: Cpu, color: 'text-purple-400' },
            { label: 'Optimization', icon: Zap, color: 'text-yellow-400' },
            { label: 'Routing', icon: Network, color: 'text-green-400' },
            { label: 'Output', icon: Users, color: 'text-pink-400' }
          ].map((layer, index) => {
            const Icon = layer.icon
            
            return (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3 }}
                className="flex items-center gap-2"
              >
                <Icon className={`w-4 h-4 ${layer.color}`} />
                <span className="text-sm text-slate-300 font-medium">
                  {layer.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bottom info */}
      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-400">
            Multi-agent orchestration with intelligent routing
          </span>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Latency: &lt;10ms</span>
            <span>Uptime: 99.99%</span>
            <span>Models: 50+</span>
          </div>
        </div>
      </div>
    </div>
  )
}