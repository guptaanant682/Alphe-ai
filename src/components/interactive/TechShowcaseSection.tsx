'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { gsap } from 'gsap'
import anime from 'animejs'
import NeuralNetworkViz from './NeuralNetworkViz'
import InteractiveFlowchart from './InteractiveFlowchart'
import VelocityShowcase from './VelocityShowcase'
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Code,
  Database,
  Brain,
  Network,
  Shield,
  BarChart3,
  Activity,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Settings,
  Monitor,
  Terminal
} from 'lucide-react'

interface TechDemo {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  component: React.ComponentType
  category: 'visualization' | 'architecture' | 'analytics' | 'interactive'
  technologies: string[]
  metrics: {
    performance: number
    efficiency: number
    accuracy: number
    scalability: number
  }
}

const techDemos: TechDemo[] = [
  {
    id: 'neural-network',
    title: 'AI Neural Network Visualization',
    subtitle: 'Real-time multi-agent orchestration',
    description: 'Interactive visualization of our AI neural network showing real-time model routing, cost optimization, and performance metrics. Watch as requests flow through our intelligent orchestration layer.',
    icon: Brain,
    component: NeuralNetworkViz,
    category: 'visualization',
    technologies: ['Neural Networks', 'Real-time Rendering', 'Canvas API', 'GSAP', 'Anime.js'],
    metrics: {
      performance: 98,
      efficiency: 94,
      accuracy: 97,
      scalability: 96
    }
  },
  {
    id: 'architecture-flow',
    title: 'Interactive Architecture Flow',
    subtitle: 'System architecture deep-dive',
    description: 'Explore Alpha.AI\'s complete architecture flow from request ingestion to response delivery. Click on any component to see detailed metrics and understand the data flow through our 7-layer stack.',
    icon: Network,
    component: InteractiveFlowchart,
    category: 'architecture',
    technologies: ['SVG Animations', 'Interactive Components', 'Real-time Metrics', 'Flow Simulation'],
    metrics: {
      performance: 99,
      efficiency: 97,
      accuracy: 98,
      scalability: 99
    }
  },
  {
    id: 'velocity-performance',
    title: 'Velocity Performance Monitor',
    subtitle: 'Advanced animation showcase',
    description: 'Experience cutting-edge velocity.js-inspired animations with real-time performance metrics, morphing charts, and staggered transitions that demonstrate our system\'s lightning-fast responsiveness.',
    icon: Activity,
    component: VelocityShowcase,
    category: 'analytics',
    technologies: ['Velocity.js', 'Morphing SVG', 'Stagger Animations', 'Real-time Charts', 'GSAP Timeline'],
    metrics: {
      performance: 96,
      efficiency: 98,
      accuracy: 95,
      scalability: 97
    }
  }
]

export default function TechShowcaseSection() {
  const [activeDemo, setActiveDemo] = useState(techDemos[0])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showMetrics, setShowMetrics] = useState(true)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const sectionRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)

  // Initialize section animations
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.children,
        { 
          opacity: 0, 
          y: 60,
          stagger: 0.2 
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2
        }
      )
    }
  }, [])

  // Animate metrics bars
  useEffect(() => {
    if (metricsRef.current && showMetrics) {
      const bars = metricsRef.current.querySelectorAll('.metric-bar')
      
      anime({
        targets: bars,
        width: (el: Element) => `${(el as HTMLElement).dataset.value}%`,
        duration: 1500,
        easing: 'easeOutCubic',
        delay: anime.stagger(200)
      })
    }
  }, [activeDemo, showMetrics])

  const ActiveComponent = activeDemo.component

  const getMetricColor = (value: number) => {
    if (value >= 95) return 'from-green-500 to-emerald-400'
    if (value >= 90) return 'from-blue-500 to-cyan-400'
    if (value >= 85) return 'from-yellow-500 to-orange-400'
    return 'from-red-500 to-pink-400'
  }

  const MetricsPanel = () => (
    <motion.div
      ref={metricsRef}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-6 border border-slate-600"
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-white">Performance Metrics</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowMetrics(!showMetrics)}
          className="text-slate-400 hover:text-white"
        >
          {showMetrics ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      <AnimatePresence>
        {showMetrics && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {Object.entries(activeDemo.metrics).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-300 capitalize">{key}</span>
                  <span className="text-sm font-bold text-white">{value}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`metric-bar h-full bg-gradient-to-r ${getMetricColor(value)} rounded-full transition-all duration-300`}
                    data-value={value}
                    style={{ width: '0%' }}
                  />
                </div>
              </div>
            ))}

            {/* Real-time stats */}
            <div className="pt-4 border-t border-slate-600 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Live Requests</span>
                <span className="text-green-400 font-mono">12,847/sec</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Active Models</span>
                <span className="text-blue-400 font-mono">47</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Cost Savings</span>
                <span className="text-purple-400 font-mono">87.3%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Uptime</span>
                <span className="text-yellow-400 font-mono">99.997%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  const TechStack = () => (
    <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
      <h4 className="text-lg font-bold text-white mb-4">Technologies Used</h4>
      <div className="flex flex-wrap gap-2">
        {activeDemo.technologies.map((tech, index) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300 font-medium"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </div>
  )

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div ref={sectionRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-sm">
              <Monitor className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">Interactive Technology Showcase</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold">
              <span className="text-gradient-ai">Experience</span>
              <br />
              <span className="text-white">Alpha.AI in Action</span>
            </h2>
            
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Explore our cutting-edge AI infrastructure through interactive visualizations,
              real-time data flows, and immersive architecture diagrams.
            </p>
          </motion.div>
        </div>

        {/* Demo Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 rounded-lg bg-slate-800 border border-slate-600">
            {techDemos.map(demo => {
              const Icon = demo.icon
              const isActive = activeDemo.id === demo.id

              return (
                <Button
                  key={demo.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveDemo(demo)}
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {demo.title}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Main Demo Area */}
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Demo Visualization */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-slate-800/50 backdrop-blur-xl border-slate-600 relative overflow-hidden">
              {/* Demo Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{activeDemo.title}</h3>
                  <p className="text-slate-400">{activeDemo.subtitle}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Interactive Component */}
              <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900' : ''}`}>
                <ActiveComponent />
              </div>

              {/* Demo Description */}
              <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                <p className="text-slate-300 text-sm leading-relaxed">
                  {activeDemo.description}
                </p>
                
                <div className="flex items-center gap-4 mt-4">
                  <Button variant="ai" size="sm" className="group">
                    Explore Code
                    <Code className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button variant="ai-outline" size="sm">
                    Documentation
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Controls */}
          <div className="space-y-6">
            <MetricsPanel />
            <TechStack />
            
            {/* Control Panel */}
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg p-6 border border-slate-600">
              <h4 className="text-lg font-bold text-white mb-4">Controls</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-slate-300 mb-2 block">Animation Speed</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={animationSpeed}
                    onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <div className="text-xs text-slate-400 mt-1">{animationSpeed}x</div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1 text-slate-400 hover:text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-slate-400 hover:text-white">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm" className="w-full text-slate-400 hover:text-white">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Terminal,
              title: 'Live Terminal',
              description: 'Interactive command interface',
              color: 'from-green-500 to-emerald-500'
            },
            {
              icon: BarChart3,
              title: 'Real-time Analytics',
              description: 'Live performance metrics',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: Database,
              title: 'Data Flow Visualization',
              description: 'Watch data traverse the system',
              color: 'from-purple-500 to-pink-500'
            },
            {
              icon: Shield,
              title: 'Security Monitor',
              description: 'Zero-trust validation in action',
              color: 'from-orange-500 to-red-500'
            }
          ].map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Card className="p-6 bg-slate-800/50 backdrop-blur-xl border-slate-600 hover:border-purple-500/50 transition-all duration-300">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} mb-4 w-fit`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.description}</p>
                  
                  <div className="mt-4 flex items-center gap-2 text-purple-400 text-sm font-medium">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Experience Alpha.AI?
            </h3>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              See how our cutting-edge AI infrastructure can transform your applications
              with real-time cost optimization and intelligent model routing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-2xl mx-auto">
              <Button 
                variant="ai" 
                size="lg" 
                className="group flex-1 sm:flex-none min-w-0 px-4 sm:px-6 lg:px-8 h-12 sm:h-14 text-sm sm:text-base whitespace-nowrap"
              >
                <span className="truncate">Start Interactive Demo</span>
                <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="ai-outline" 
                size="lg"
                className="flex-1 sm:flex-none min-w-0 px-4 sm:px-6 lg:px-8 h-12 sm:h-14 text-sm sm:text-base whitespace-nowrap"
              >
                <span className="truncate">Schedule Live Demo</span>
              </Button>
            </div>

            <div className="mt-6 text-sm text-slate-500">
              No signup required • Full feature access • Free trial available
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}