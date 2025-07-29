'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { gsap } from 'gsap'
import anime from 'animejs'
import {
  Shield,
  Lock,
  Key,
  Eye,
  Server,
  AlertTriangle,
  CheckCircle,
  Zap,
  Globe,
  Database,
  Network,
  UserCheck,
  FileCheck,
  Cpu,
  Binary,
  Fingerprint,
  ShieldCheck
} from 'lucide-react'

interface SecurityFeature {
  id: string
  name: string
  description: string
  icon: any
  category: 'authentication' | 'encryption' | 'monitoring' | 'compliance'
  level: 'enterprise' | 'military' | 'quantum'
  details: string[]
}

const securityFeatures: SecurityFeature[] = [
  {
    id: 'zero-trust',
    name: 'Zero-Trust Architecture',
    description: 'Never trust, always verify - every request authenticated and authorized',
    icon: ShieldCheck,
    category: 'authentication',
    level: 'enterprise',
    details: [
      'Multi-factor authentication for all API access',
      'Continuous verification of user identity',
      'Risk-based adaptive authentication',
      'Session management with automatic timeout'
    ]
  },
  {
    id: 'mcp-2',
    name: 'MCP 2.0 Protocol',
    description: 'Next-generation secure model communication protocol',
    icon: Network,
    category: 'encryption',
    level: 'military',
    details: [
      'End-to-end encryption for all model communications',
      'Perfect forward secrecy with ephemeral keys',
      'Quantum-resistant cryptographic algorithms',
      'Hardware security module (HSM) integration'
    ]
  },
  {
    id: 'byok',
    name: 'Bring Your Own Keys (BYOK)',
    description: 'Complete control over your encryption keys and data sovereignty',
    icon: Key,
    category: 'encryption',
    level: 'enterprise',
    details: [
      'Customer-managed encryption keys',
      'Hardware security module support',
      'Key rotation and lifecycle management',
      'Audit trails for all key operations'
    ]
  },
  {
    id: 'realtime-monitoring',
    name: 'Real-time Threat Detection',
    description: 'AI-powered security monitoring with instant threat response',
    icon: Eye,
    category: 'monitoring',
    level: 'military',
    details: [
      'Behavioral analysis and anomaly detection',
      'Real-time security event correlation',
      'Automated incident response workflows',
      'Threat intelligence feed integration'
    ]
  },
  {
    id: 'compliance-suite',
    name: 'Compliance Automation',
    description: 'Automated compliance with SOC2, HIPAA, GDPR, and more',
    icon: FileCheck,
    category: 'compliance',
    level: 'enterprise',
    details: [
      'SOC2 Type II certification',
      'HIPAA compliance for healthcare data',
      'GDPR compliance for EU operations',
      'Automated audit reporting'
    ]
  },
  {
    id: 'quantum-crypto',
    name: 'Quantum-Safe Cryptography',
    description: 'Future-proof encryption resistant to quantum computing attacks',
    icon: Binary,
    category: 'encryption',
    level: 'quantum',
    details: [
      'Post-quantum cryptographic algorithms',
      'Lattice-based encryption schemes',
      'Quantum key distribution (QKD) ready',
      'Migration path to quantum-safe protocols'
    ]
  }
]

const complianceStandards = [
  { name: 'SOC2 Type II', status: 'certified', icon: Shield },
  { name: 'ISO 27001', status: 'certified', icon: Globe },
  { name: 'HIPAA', status: 'compliant', icon: UserCheck },
  { name: 'GDPR', status: 'compliant', icon: Lock },
  { name: 'FedRAMP', status: 'in-progress', icon: Server },
  { name: 'PCI DSS', status: 'certified', icon: Database }
]

export default function SecuritySection() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [securityMetrics, setSecurityMetrics] = useState({
    threatsBlocked: 0,
    incidentsResolved: 0,
    uptime: 0,
    dataEncrypted: 0
  })
  
  const securityGridRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)

  // Animate security metrics with anime.js
  useEffect(() => {
    const metrics = [
      { target: 'threatsBlocked', end: 10247, duration: 3000 },
      { target: 'incidentsResolved', end: 99.97, duration: 2500 },
      { target: 'uptime', end: 99.99, duration: 2000 },
      { target: 'dataEncrypted', end: 100, duration: 1500 }
    ]

    metrics.forEach(metric => {
      anime({
        targets: securityMetrics,
        [metric.target]: metric.end,
        duration: metric.duration,
        easing: 'easeOutCubic',
        update: () => {
          setSecurityMetrics(prev => ({ ...prev }))
        }
      })
    })
  }, [])

  // GSAP animation for security grid
  useEffect(() => {
    if (securityGridRef.current) {
      const cards = securityGridRef.current.querySelectorAll('.security-card')
      
      gsap.fromTo(cards, 
        { 
          opacity: 0, 
          y: 50, 
          scale: 0.9,
          rotationY: -15 
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: securityGridRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }
  }, [activeCategory])

  const filteredFeatures = activeCategory === 'all' 
    ? securityFeatures 
    : securityFeatures.filter(feature => feature.category === activeCategory)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'enterprise': return 'from-blue-500 to-blue-600'
      case 'military': return 'from-red-500 to-red-600'
      case 'quantum': return 'from-purple-500 to-purple-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'enterprise': return '🏢 Enterprise'
      case 'military': return '🛡️ Military Grade'
      case 'quantum': return '⚛️ Quantum Safe'
      default: return 'Standard'
    }
  }

  const SecurityVisualization = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = 400
      canvas.height = 300

      // Create animated security layers
      const layers = [
        { radius: 80, color: '#3b82f6', opacity: 0.3, speed: 0.01 },
        { radius: 100, color: '#8b5cf6', opacity: 0.25, speed: 0.015 },
        { radius: 120, color: '#06d6a0', opacity: 0.2, speed: 0.02 }
      ]

      let rotation = 0

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        rotation += 0.005

        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        // Draw security layers
        layers.forEach((layer, index) => {
          const layerRotation = rotation + index * (Math.PI / 3)
          
          // Create gradient
          const gradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, layer.radius
          )
          gradient.addColorStop(0, `${layer.color}66`)
          gradient.addColorStop(1, `${layer.color}00`)

          ctx.save()
          ctx.translate(centerX, centerY)
          ctx.rotate(layerRotation)
          
          // Draw protective barrier
          ctx.beginPath()
          ctx.arc(0, 0, layer.radius, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
          
          // Draw scanning lines
          for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2) / 8 + layerRotation * 2
            const x1 = Math.cos(angle) * (layer.radius - 20)
            const y1 = Math.sin(angle) * (layer.radius - 20)
            const x2 = Math.cos(angle) * layer.radius
            const y2 = Math.sin(angle) * layer.radius
            
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.strokeStyle = `${layer.color}99`
            ctx.lineWidth = 2
            ctx.stroke()
          }
          
          ctx.restore()
        })

        // Draw central core
        const coreGradient = ctx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, 30
        )
        coreGradient.addColorStop(0, '#ffffff')
        coreGradient.addColorStop(1, '#3b82f6')
        
        ctx.beginPath()
        ctx.arc(centerX, centerY, 25, 0, Math.PI * 2)
        ctx.fillStyle = coreGradient
        ctx.fill()

        // Draw data streams
        for (let i = 0; i < 12; i++) {
          const angle = (i * Math.PI * 2) / 12 + rotation * 3
          const distance = 50 + Math.sin(rotation * 4 + i) * 10
          const x = centerX + Math.cos(angle) * distance
          const y = centerY + Math.sin(angle) * distance
          
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fillStyle = '#06d6a0'
          ctx.fill()
        }

        requestAnimationFrame(animate)
      }

      animate()
    }, [])

    return (
      <canvas 
        ref={canvasRef} 
        className="w-full h-auto rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-800/50"
      />
    )
  }

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background Security Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-sm">
              <Shield className="w-4 h-4 text-red-400" />
              <span className="text-red-400 font-medium">Enterprise Security</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold">
              <span className="text-gradient-ai">Military-Grade</span>
              <br />
              <span className="text-foreground">Security Architecture</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Zero-trust architecture with quantum-safe encryption, real-time threat detection,
              and automated compliance across all major security frameworks.
            </p>
          </motion.div>
        </div>

        {/* Security Metrics Dashboard */}
        <motion.div
          ref={metricsRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <Card className="p-6 text-center bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {Math.floor(securityMetrics.threatsBlocked).toLocaleString()}+
            </div>
            <div className="text-sm text-muted-foreground">Threats Blocked</div>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {securityMetrics.incidentsResolved.toFixed(2)}%
            </div>
            <div className="text-sm text-muted-foreground">Incident Resolution</div>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {securityMetrics.uptime.toFixed(2)}%
            </div>
            <div className="text-sm text-muted-foreground">Security Uptime</div>
          </Card>
          
          <Card className="p-6 text-center bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {Math.floor(securityMetrics.dataEncrypted)}%
            </div>
            <div className="text-sm text-muted-foreground">Data Encrypted</div>
          </Card>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Security Features */}
          <div className="lg:col-span-2">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['all', 'authentication', 'encryption', 'monitoring', 'compliance'].map(category => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'ai' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'All Features' : category}
                </Button>
              ))}
            </div>

            {/* Security Features Grid */}
            <div ref={securityGridRef} className="grid md:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  const isSelected = selectedFeature === feature.id
                  
                  return (
                    <motion.div
                      key={feature.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card 
                        className={`security-card p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                          isSelected 
                            ? 'border-primary shadow-lg shadow-primary/20 bg-primary/5' 
                            : 'hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedFeature(isSelected ? null : feature.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${getLevelColor(feature.level)} text-white`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-foreground">{feature.name}</h3>
                              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                                {getLevelBadge(feature.level)}
                              </span>
                            </div>
                            
                            <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                            
                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="space-y-2"
                                >
                                  {feature.details.map((detail, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.1 }}
                                      className="flex items-center gap-2"
                                    >
                                      <CheckCircle className="w-4 h-4 text-green-400" />
                                      <span className="text-sm text-foreground">{detail}</span>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Security Visualization & Compliance */}
          <div className="space-y-8">
            {/* Live Security Visualization */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Live Security Monitor</h3>
              <SecurityVisualization />
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span>All Systems Secure</span>
                </div>
              </div>
            </Card>

            {/* Compliance Standards */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Compliance Standards</h3>
              <div className="space-y-4">
                {complianceStandards.map((standard, index) => {
                  const Icon = standard.icon
                  const statusColor = standard.status === 'certified' ? 'text-green-400' :
                                     standard.status === 'compliant' ? 'text-blue-400' : 'text-yellow-400'
                  
                  return (
                    <motion.div
                      key={standard.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${statusColor}`} />
                        <span className="text-foreground font-medium">{standard.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          standard.status === 'certified' ? 'bg-green-500/20 text-green-400' :
                          standard.status === 'compliant' ? 'bg-blue-500/20 text-blue-400' : 
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {standard.status.toUpperCase()}
                        </span>
                        {standard.status === 'certified' && <CheckCircle className="w-4 h-4 text-green-400" />}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </Card>

            {/* Security Contact */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h4 className="font-semibold text-foreground mb-3">Security Team Contact</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-primary" />
                  <span className="text-foreground">security@alpha-ai.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-foreground">24/7 Security Operations Center</span>
                </div>
              </div>
              
              <Button variant="ai" size="sm" className="w-full mt-4">
                Report Security Issue
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}