'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Shield,
  Zap,
  Database,
  Cloud,
  Cpu,
  Network,
  CheckCircle,
  ArrowDown,
  Settings,
  BarChart3,
  Brain,
  Globe,
  Server
} from 'lucide-react'

interface ArchitectureLayer {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  features: string[]
  dataFlow: 'input' | 'processing' | 'output' | 'infrastructure'
}

const architectureLayers: ArchitectureLayer[] = [
  {
    id: 'api-gateway',
    name: 'API Gateway & Load Balancer',
    description: 'Enterprise-grade request routing and authentication',
    icon: Globe,
    color: 'from-blue-500 to-blue-600',
    features: ['Rate Limiting', 'Authentication', 'Load Balancing', 'SSL/TLS'],
    dataFlow: 'input'
  },
  {
    id: 'orchestration',
    name: 'AI Orchestration Engine',
    description: 'Intelligent model selection and request optimization',
    icon: Brain,
    color: 'from-purple-500 to-purple-600',
    features: ['Model Selection', 'Cost Optimization', 'Quality Scoring', 'Fallback Logic'],
    dataFlow: 'processing'
  },
  {
    id: 'routing',
    name: 'Smart Routing Layer',
    description: 'Multi-model routing with real-time optimization',
    icon: Network,
    color: 'from-green-500 to-green-600',
    features: ['Dynamic Routing', 'A/B Testing', 'Performance Monitoring', 'Auto-scaling'],
    dataFlow: 'processing'
  },
  {
    id: 'model-layer',
    name: 'Model Abstraction Layer',
    description: 'Unified interface for 50+ AI models and providers',
    icon: Cpu,
    color: 'from-yellow-500 to-yellow-600',
    features: ['Model Normalization', 'Response Formatting', 'Error Handling', 'Streaming'],
    dataFlow: 'processing'
  },
  {
    id: 'caching',
    name: 'Intelligent Caching',
    description: 'Multi-tier caching with semantic similarity matching',
    icon: Database,
    color: 'from-cyan-500 to-cyan-600',
    features: ['Semantic Cache', 'Redis Cluster', 'TTL Management', 'Cache Warming'],
    dataFlow: 'infrastructure'
  },
  {
    id: 'security',
    name: 'Security & Compliance',
    description: 'Zero-trust architecture with enterprise compliance',
    icon: Shield,
    color: 'from-red-500 to-red-600',
    features: ['Zero Trust', 'SOC2 Compliance', 'Data Encryption', 'Audit Logging'],
    dataFlow: 'infrastructure'
  },
  {
    id: 'monitoring',
    name: 'Observability & Analytics',
    description: 'Real-time monitoring and performance analytics',
    icon: BarChart3,
    color: 'from-indigo-500 to-indigo-600',
    features: ['Real-time Metrics', 'Cost Analytics', 'Performance Tracking', 'Alerting'],
    dataFlow: 'output'
  }
]

const dataFlowSteps = [
  'Incoming API Request',
  'Authentication & Rate Limiting',
  'Orchestration Analysis',
  'Model Selection',
  'Request Processing',
  'Response Caching',
  'Analytics & Logging',
  'Response Delivery'
]

export default function ArchitectureDiagram() {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null)
  const [animationStep, setAnimationStep] = useState(0)
  const [isFlowActive, setIsFlowActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isFlowActive) {
      interval = setInterval(() => {
        setAnimationStep(prev => (prev + 1) % dataFlowSteps.length)
      }, 1500)
    }
    return () => clearInterval(interval)
  }, [isFlowActive])

  const startDataFlow = () => {
    setIsFlowActive(true)
    setAnimationStep(0)
  }

  const stopDataFlow = () => {
    setIsFlowActive(false)
    setAnimationStep(0)
  }

  const DataFlowAnimation = () => (
    <div className="absolute inset-0 pointer-events-none">
      {isFlowActive && (
        <motion.div
          key={animationStep}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium shadow-lg"
        >
          {dataFlowSteps[animationStep]}
        </motion.div>
      )}
    </div>
  )

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
              <Server className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Enterprise Architecture</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold">
              <span className="text-gradient-ai">7-Layer</span>
              <br />
              <span className="text-foreground">AI Infrastructure</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for enterprise scale with military-grade security, sub-second latency,
              and 99.99% uptime SLA. Click any layer to explore its capabilities.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Architecture Diagram */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-gradient-to-br from-background to-primary/5 border-primary/20 relative overflow-hidden min-h-[600px]">
              <DataFlowAnimation />
              
              {/* Control Panel */}
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-foreground">Alpha.AI Architecture</h3>
                <div className="flex gap-2">
                  <Button
                    onClick={startDataFlow}
                    variant={isFlowActive ? "default" : "outline"}
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Zap className="w-4 h-4" />
                    {isFlowActive ? 'Flow Active' : 'Start Flow'}
                  </Button>
                  {isFlowActive && (
                    <Button onClick={stopDataFlow} variant="outline" size="sm">
                      Stop
                    </Button>
                  )}
                </div>
              </div>

              {/* Architecture Layers */}
              <div className="space-y-4 relative">
                {architectureLayers.map((layer, index) => {
                  const Icon = layer.icon
                  const isSelected = selectedLayer === layer.id
                  const isHighlighted = isFlowActive && (
                    (animationStep === 1 && layer.id === 'api-gateway') ||
                    (animationStep === 2 && layer.id === 'orchestration') ||
                    (animationStep === 3 && layer.id === 'routing') ||
                    (animationStep === 4 && layer.id === 'model-layer') ||
                    (animationStep === 5 && layer.id === 'caching') ||
                    (animationStep === 6 && layer.id === 'monitoring') ||
                    (animationStep === 7 && layer.id === 'security')
                  )

                  return (
                    <motion.div
                      key={layer.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <motion.button
                        onClick={() => setSelectedLayer(isSelected ? null : layer.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        animate={{
                          scale: isHighlighted ? 1.05 : 1,
                          boxShadow: isHighlighted ? '0 0 30px rgba(59, 130, 246, 0.5)' : '0 0 0px rgba(0, 0, 0, 0)'
                        }}
                        className={`
                          w-full p-6 rounded-lg border-2 text-left transition-all duration-300
                          ${isSelected || isHighlighted
                            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
                            : 'border-border hover:border-primary/50 bg-card'
                          }
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`
                            p-3 rounded-lg bg-gradient-to-r ${layer.color} text-white
                            ${isHighlighted ? 'animate-pulse' : ''}
                          `}>
                            <Icon className="w-6 h-6" />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-foreground mb-1">
                              {layer.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {layer.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            {isSelected && <CheckCircle className="w-5 h-5 text-primary" />}
                            <ArrowDown className={`
                              w-4 h-4 text-muted-foreground transition-transform duration-300
                              ${isSelected ? 'rotate-180' : ''}
                            `} />
                          </div>
                        </div>

                        {/* Data Flow Indicators */}
                        {index < architectureLayers.length - 1 && (
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <motion.div
                              animate={{
                                opacity: isFlowActive ? [0.3, 1, 0.3] : 0.3,
                                scale: isFlowActive ? [1, 1.2, 1] : 1
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: isFlowActive ? Infinity : 0,
                                delay: index * 0.2
                              }}
                              className="w-2 h-2 bg-primary rounded-full"
                            />
                          </div>
                        )}
                      </motion.button>
                    </motion.div>
                  )
                })}
              </div>
            </Card>
          </div>

          {/* Layer Details */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {selectedLayer ? (
                <motion.div
                  key={selectedLayer}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {(() => {
                    const layer = architectureLayers.find(l => l.id === selectedLayer)
                    if (!layer) return null
                    
                    const Icon = layer.icon
                    
                    return (
                      <>
                        <Card className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${layer.color} text-white`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-foreground">{layer.name}</h3>
                              <p className="text-sm text-muted-foreground">{layer.description}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="font-semibold text-foreground">Key Features</h4>
                            <div className="space-y-2">
                              {layer.features.map((feature, index) => (
                                <motion.div
                                  key={feature}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  className="flex items-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  <span className="text-sm text-foreground">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </Card>

                        {/* Technical Specs */}
                        <Card className="p-6 bg-gradient-to-br from-muted/50 to-background">
                          <h4 className="font-semibold text-foreground mb-3">Technical Specifications</h4>
                          <div className="space-y-2 text-sm">
                            {layer.id === 'api-gateway' && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Throughput:</span>
                                  <span className="text-foreground">100K+ req/sec</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Latency:</span>
                                  <span className="text-foreground">&lt; 5ms</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Availability:</span>
                                  <span className="text-foreground">99.99% SLA</span>
                                </div>
                              </>
                            )}
                            {layer.id === 'orchestration' && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Decision Time:</span>
                                  <span className="text-foreground">&lt; 10ms</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Models Supported:</span>
                                  <span className="text-foreground">50+</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Cost Optimization:</span>
                                  <span className="text-foreground">70-90%</span>
                                </div>
                              </>
                            )}
                            {layer.id === 'caching' && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Hit Rate:</span>
                                  <span className="text-foreground">85%+</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Cache Size:</span>
                                  <span className="text-foreground">Multi-TB</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Response Time:</span>
                                  <span className="text-foreground">&lt; 1ms</span>
                                </div>
                              </>
                            )}
                            {(layer.id === 'routing' || layer.id === 'model-layer' || layer.id === 'security' || layer.id === 'monitoring') && (
                              <>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Processing Time:</span>
                                  <span className="text-foreground">&lt; 50ms</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Scalability:</span>
                                  <span className="text-foreground">Auto-scaling</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Monitoring:</span>
                                  <span className="text-foreground">Real-time</span>
                                </div>
                              </>
                            )}
                          </div>
                        </Card>
                      </>
                    )
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Select a Layer
                  </h3>
                  <p className="text-muted-foreground">
                    Click on any architecture layer to explore its technical details and specifications.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h4 className="font-semibold text-foreground mb-4">Architecture Highlights</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-foreground">SOC2 Type II Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-foreground">Sub-second response times</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-foreground">Multi-region deployment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-foreground">Auto-scaling infrastructure</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}