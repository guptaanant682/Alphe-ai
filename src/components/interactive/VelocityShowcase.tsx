'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import anime from 'animejs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Zap,
  TrendingUp,
  BarChart3,
  Activity,
  Cpu,
  Network,
  Database,
  Cloud,
  Shield,
  Globe,
  Play,
  Pause,
} from 'lucide-react'

interface PerformanceMetric {
  id: string
  label: string
  value: number
  target: number
  unit: string
  color: string
  icon: React.ComponentType<{ className?: string }>
  trend: 'up' | 'down' | 'stable'
}

const performanceMetrics: PerformanceMetric[] = [
  {
    id: 'throughput',
    label: 'Throughput',
    value: 0,
    target: 25000,
    unit: 'req/s',
    color: 'from-blue-500 to-cyan-500',
    icon: Activity,
    trend: 'up'
  },
  {
    id: 'latency',
    label: 'Latency',
    value: 250,
    target: 8,
    unit: 'ms',
    color: 'from-green-500 to-emerald-500',
    icon: Zap,
    trend: 'down'
  },
  {
    id: 'cost',
    label: 'Cost Savings',
    value: 0,
    target: 87,
    unit: '%',
    color: 'from-purple-500 to-pink-500',
    icon: TrendingUp,
    trend: 'up'
  },
  {
    id: 'efficiency',
    label: 'Efficiency',
    value: 0,
    target: 94,
    unit: '%',
    color: 'from-orange-500 to-red-500',
    icon: BarChart3,
    trend: 'up'
  },
  {
    id: 'uptime',
    label: 'Uptime',
    value: 95,
    target: 99.99,
    unit: '%',
    color: 'from-yellow-500 to-amber-500',
    icon: Shield,
    trend: 'up'
  },
  {
    id: 'models',
    label: 'Active Models',
    value: 0,
    target: 47,
    unit: '',
    color: 'from-indigo-500 to-purple-500',
    icon: Cpu,
    trend: 'stable'
  }
]

export default function VelocityShowcase() {
  const [metrics, setMetrics] = useState(performanceMetrics)
  const [isAnimating, setIsAnimating] = useState(true)
  const [currentScene, setCurrentScene] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<SVGSVGElement>(null)

  const scenes = [
    'System Initialization',
    'Load Balancing',
    'Cost Optimization',
    'Performance Scaling',
    'Full Operation'
  ]

  // Velocity.js-like animations using GSAP and Anime.js
  useEffect(() => {
    if (!isAnimating) return

    // Scene progression
    const sceneInterval = setInterval(() => {
      setCurrentScene(prev => (prev + 1) % scenes.length)
    }, 4000)

    // Animate metrics with staggered timing (velocity.js style)
    const animateMetrics = () => {
      metrics.forEach((metric, index) => {
        anime({
          targets: metric as any,
          value: metric.target,
          duration: 2000 + index * 300,
          easing: 'easeOutCubic',
          delay: index * 200,
          update: () => {
            setMetrics([...metrics])
          }
        })
      })
    }

    // Initial animation
    animateMetrics()

    // Periodic updates for realism
    const updateInterval = setInterval(() => {
      setMetrics(prev => prev.map((metric, index) => ({
        ...metric,
        value: metric.target + (((Date.now() / 1000 + index) % 2) - 1) * metric.target * 0.05
      })))
    }, 3000)

    return () => {
      clearInterval(sceneInterval)
      clearInterval(updateInterval)
    }
  }, [isAnimating])

  // GSAP morphing animations
  useEffect(() => {
    if (!chartRef.current) return

    const paths = chartRef.current.querySelectorAll('.morph-path')
    
    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    
    paths.forEach((path, index) => {
      tl.to(path, {
        duration: 2,
        attr: {
          d: `M ${50 + index * 60} 200 Q ${100 + index * 60} ${100 + (index * 23) % 100} ${150 + index * 60} 200`
        },
        ease: 'power1.inOut'
      }, index * 0.2)
    })

    return () => {
      tl.kill()
    }
  }, [metrics, scenes.length])

  // Velocity.js inspired stagger animations
  const createStaggerAnimation = (elements: string, properties: Record<string, unknown>) => {
    if (!containerRef.current) return

    const targets = containerRef.current.querySelectorAll(elements)
    
    gsap.fromTo(targets, 
      { opacity: 0, y: 30, scale: 0.8 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        ...properties
      }
    )
  }

  useEffect(() => {
    createStaggerAnimation('.metric-card', { delay: 0.5 })
    createStaggerAnimation('.chart-element', { delay: 1 })
  }, [currentScene])

  const MetricCard = ({ metric, index }: { metric: PerformanceMetric, index: number }) => {
    const Icon = metric.icon
    const progress = Math.min((metric.value / metric.target) * 100, 100)

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ 
          delay: index * 0.1, 
          duration: 0.6,
          type: "spring",
          stiffness: 100
        }}
        className={`metric-card relative p-6 rounded-xl bg-gradient-to-br ${metric.color}/10 border border-white/10 backdrop-blur-sm overflow-hidden`}
      >
        {/* Animated background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${metric.color} opacity-5`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color}`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            
            <div className={`flex items-center gap-1 text-xs ${
              metric.trend === 'up' ? 'text-green-400' :
              metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
            }`}>
              <div className={`w-0 h-0 border-l-2 border-r-2 border-transparent ${
                metric.trend === 'up' ? 'border-b-2 border-b-green-400' :
                metric.trend === 'down' ? 'border-t-2 border-t-red-400' :
                'border-2 border-gray-400'
              }`} />
              {metric.trend}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm text-gray-300 font-medium">{metric.label}</h3>
            
            <div className="text-2xl font-bold text-white">
              {metric.id === 'latency' ? 
                Math.floor(metric.value) : 
                Math.floor(metric.value).toLocaleString()
              }
              <span className="text-sm text-gray-400 ml-1">{metric.unit}</span>
            </div>

            {/* Progress bar with velocity-like animation */}
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${metric.color} rounded-full relative`}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{
                  duration: 1.5,
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier (velocity.js style)
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full"
                  animate={{ x: ['0%', '100%'] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ width: '30%' }}
                />
              </motion.div>
            </div>

            <div className="text-xs text-gray-500">
              Target: {metric.target.toLocaleString()}{metric.unit}
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  const WaveformChart = () => (
    <svg
      ref={chartRef}
      className="chart-element w-full h-40"
      viewBox="0 0 400 200"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
          <stop offset="50%" stopColor="rgba(139, 92, 246, 0.8)" />
          <stop offset="100%" stopColor="rgba(236, 72, 153, 0.8)" />
        </linearGradient>
      </defs>

      {/* Animated waveform */}
      {[...Array(6)].map((_, i) => (
        <motion.path
          key={i}
          className="morph-path"
          d={`M ${50 + i * 60} 200 Q ${100 + i * 60} 150 ${150 + i * 60} 200`}
          stroke="url(#waveGradient)"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 2,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Grid lines */}
      {[...Array(5)].map((_, i) => (
        <motion.line
          key={i}
          x1="0"
          y1={40 + i * 40}
          x2="400"
          y2={40 + i * 40}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 + i * 0.1 }}
        />
      ))}
    </svg>
  )

  return (
    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden border border-slate-700">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Velocity Performance Monitor</h3>
              <p className="text-slate-400 text-sm">Real-time system metrics with velocity animations</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAnimating(!isAnimating)}
              className="text-slate-400 hover:text-white"
            >
              {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            
            <div className="px-3 py-1 bg-slate-800 rounded-full border border-slate-600">
              <span className="text-slate-300 text-sm">{scenes[currentScene]}</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="p-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} />
          ))}
        </div>

        {/* Waveform Visualization */}
        <Card className="p-6 bg-slate-800/50 border-slate-600">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-white">System Performance Wave</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              <span className="text-blue-400 text-sm">Real-time</span>
            </div>
          </div>
          
          <WaveformChart />
        </Card>

        {/* System Status */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Global Regions', value: '25+', icon: Globe, color: 'text-blue-400' },
            { label: 'Data Centers', value: '150+', icon: Database, color: 'text-green-400' },
            { label: 'Network Nodes', value: '500+', icon: Network, color: 'text-purple-400' },
            { label: 'Edge Locations', value: '1000+', icon: Cloud, color: 'text-orange-400' }
          ].map((stat, index) => {
            const Icon = stat.icon
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
                className="chart-element p-4 bg-slate-800/50 rounded-lg border border-slate-600"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <div>
                    <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-slate-400">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}