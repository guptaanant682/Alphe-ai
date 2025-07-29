'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import anime from 'animejs'
import {
  Brain,
  Network,
  Shield,
  Database,
  Cloud,
  Cpu,
} from 'lucide-react'

export default function TheatreAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentScene, setCurrentScene] = useState(0)
  const [stats, setStats] = useState({
    requests: 0,
    savings: 0,
    models: 0,
    uptime: 0
  })

  // Initialize theatre.js-like animation sequence
  useEffect(() => {
    const scenes = [
      { name: 'Request Processing', duration: 3000 },
      { name: 'Cost Optimization', duration: 2500 },
      { name: 'Model Routing', duration: 2000 },
      { name: 'Response Delivery', duration: 1500 }
    ]

    let sceneIndex = 0
    const sceneInterval = setInterval(() => {
      setCurrentScene(sceneIndex % scenes.length)
      sceneIndex++
    }, 3000)

    // Animate stats counters
    anime({
      targets: stats as any,
      requests: 847000,
      savings: 87,
      models: 47,
      uptime: 99.97,
      duration: 4000,
      easing: 'easeOutCubic',
      update: () => {
        setStats({...stats})
      }
    })

    return () => clearInterval(sceneInterval)
  }, [stats])

  // GSAP timeline for complex animations
  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({ repeat: -1 })

    // Scene 1: Data Flow
    tl.to('.data-particle', {
      duration: 2,
      x: 200,
      y: -50,
      scale: 1.2,
      opacity: 0.8,
      stagger: 0.2,
      ease: 'power2.inOut'
    })

    // Scene 2: Processing
    tl.to('.processing-ring', {
      duration: 1.5,
      rotation: 360,
      scale: 1.1,
      ease: 'power2.inOut'
    }, '-=1')

    // Scene 3: Optimization
    tl.to('.optimization-bar', {
      duration: 1,
      scaleX: 1,
      transformOrigin: 'left',
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.5')

    // Scene 4: Output
    tl.to('.output-glow', {
      duration: 0.8,
      opacity: 1,
      scale: 1.2,
      boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)',
      ease: 'easeOut'
    }, '-=0.3')

    return () => {
      tl.kill()
    }
  }, [])

  const FloatingIcon = ({ icon: Icon, delay = 0, position }: { icon: React.ComponentType<{ className?: string }>, delay?: number, position: { x: number, y: number } }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: [0.3, 0.8, 0.3],
        scale: [0.8, 1.2, 0.8],
        y: [0, -20, 0]
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute"
      style={{ left: position.x, top: position.y }}
    >
      <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
    </motion.div>
  )

  const DataStream = () => (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="data-particle absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          style={{
            left: ((i * 47) % 100) + '%',
            top: ((i * 31) % 100) + '%'
          }}
          animate={{
            x: [0, 100, 200],
            y: [0, -50, -100],
            opacity: [1, 0.5, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )

  const ProcessingRings = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="processing-ring absolute border-2 border-blue-400/30 rounded-full"
          style={{
            width: 100 + i * 80,
            height: 100 + i * 80
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: { duration: 8 + i * 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
          }}
        />
      ))}
    </div>
  )

  const OptimizationBars = () => (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="optimization-bar w-4 bg-gradient-to-t from-green-500 to-emerald-400 rounded-t"
          style={{ height: 20 + ((i * 13) % 40) }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )

  const sceneTitles = [
    'Processing Requests',
    'Optimizing Costs',
    'Routing Models',
    'Delivering Results'
  ]

  return (
    <div ref={containerRef} className="relative w-full h-96 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
        }} />
      </div>

      {/* Floating Icons */}
      <FloatingIcon icon={Brain} delay={0} position={{ x: 50, y: 50 }} />
      <FloatingIcon icon={Network} delay={0.5} position={{ x: 200, y: 80 }} />
      <FloatingIcon icon={Shield} delay={1} position={{ x: 350, y: 60 }} />
      <FloatingIcon icon={Database} delay={1.5} position={{ x: 150, y: 200 }} />
      <FloatingIcon icon={Cloud} delay={2} position={{ x: 300, y: 220 }} />
      <FloatingIcon icon={Cpu} delay={2.5} position={{ x: 400, y: 150 }} />

      {/* Animated Elements */}
      <DataStream />
      <ProcessingRings />
      <OptimizationBars />

      {/* Scene Title */}
      <div className="absolute top-6 left-6">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-600"
        >
          <span className="text-blue-400 font-medium text-sm">
            {sceneTitles[currentScene]}
          </span>
        </motion.div>
      </div>

      {/* Live Stats */}
      <div className="absolute top-6 right-6 space-y-2">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 border border-slate-600">
          <div className="text-xs text-slate-400 mb-1">Requests/sec</div>
          <div className="text-lg font-bold text-blue-400">
            {Math.floor(stats.requests).toLocaleString()}
          </div>
        </div>
        
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 border border-slate-600">
          <div className="text-xs text-slate-400 mb-1">Cost Savings</div>
          <div className="text-lg font-bold text-green-400">
            {Math.floor(stats.savings)}%
          </div>
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-lg p-4 border border-slate-600">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-sm font-bold text-white">{Math.floor(stats.models)}</div>
                <div className="text-xs text-slate-400">Models</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm font-bold text-white">{stats.uptime.toFixed(2)}%</div>
                <div className="text-xs text-slate-400">Uptime</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm font-bold text-white">&lt;10ms</div>
                <div className="text-xs text-slate-400">Latency</div>
              </div>
              
              <div className="text-center">
                <div className="text-sm font-bold text-white">25+</div>
                <div className="text-xs text-slate-400">Regions</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-medium">LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Central Glow Effect */}
      <motion.div
        className="output-glow absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.3, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
      </motion.div>
    </div>
  )
}