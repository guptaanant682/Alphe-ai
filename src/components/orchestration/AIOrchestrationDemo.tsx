'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Zap, 
  TrendingDown, 
  Activity, 
  ArrowRight, 
  CheckCircle, 
  Clock,
  DollarSign,
  Shield,
  Cpu,
  Eye,
  MessageSquare,
  Image,
  FileText,
  Code
} from 'lucide-react'

const modelProviders = [
  { name: 'GPT-4o', cost: '$15.00', latency: '1.2s', provider: 'OpenAI', color: 'from-green-400 to-emerald-500' },
  { name: 'Claude 3.5', cost: '$3.00', latency: '0.8s', provider: 'Anthropic', color: 'from-orange-400 to-red-500' },
  { name: 'Gemini Pro', cost: '$7.00', latency: '0.9s', provider: 'Google', color: 'from-blue-400 to-cyan-500' },
  { name: 'Llama 3.1', cost: '$0.60', latency: '0.5s', provider: 'Meta', color: 'from-purple-400 to-pink-500' },
]

const requestTypes = [
  { type: 'text', icon: MessageSquare, label: 'Text Generation', optimal: 'Claude 3.5' },
  { type: 'vision', icon: Eye, label: 'Vision Analysis', optimal: 'GPT-4o' },
  { type: 'code', icon: Code, label: 'Code Generation', optimal: 'Claude 3.5' },
  { type: 'reasoning', icon: Brain, label: 'Complex Reasoning', optimal: 'GPT-4o' },
  { type: 'document', icon: FileText, label: 'Document Analysis', optimal: 'Gemini Pro' },
  { type: 'image', icon: Image, label: 'Image Generation', optimal: 'Llama 3.1' },
]

export default function AIOrchestrationDemo() {
  const [activeRequest, setActiveRequest] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [isRouting, setIsRouting] = useState(false)
  const [routingComplete, setRoutingComplete] = useState(false)
  const [totalSavings, setTotalSavings] = useState(0)
  const [requestCount, setRequestCount] = useState(0)

  const handleRequestDemo = (requestType: string) => {
    setActiveRequest(requestType)
    setIsRouting(true)
    setRoutingComplete(false)
    setSelectedModel(null)

    // Simulate AI routing decision
    setTimeout(() => {
      const request = requestTypes.find(r => r.type === requestType)
      if (request) {
        setSelectedModel(request.optimal)
        setIsRouting(false)
        
        // Calculate savings
        const optimalModel = modelProviders.find(m => m.name === request.optimal)
        const mostExpensive = modelProviders.reduce((prev, current) => 
          parseFloat(prev.cost.replace('$', '')) > parseFloat(current.cost.replace('$', '')) ? prev : current
        )
        
        if (optimalModel && mostExpensive) {
          const savings = parseFloat(mostExpensive.cost.replace('$', '')) - parseFloat(optimalModel.cost.replace('$', ''))
          setTotalSavings(prev => prev + savings)
          setRequestCount(prev => prev + 1)
        }
        
        setTimeout(() => {
          setRoutingComplete(true)
        }, 1000)
      }
    }, 2000)
  }

  const resetDemo = () => {
    setActiveRequest(null)
    setSelectedModel(null)
    setIsRouting(false)
    setRoutingComplete(false)
  }

  return (
    <section className="py-24 bg-gradient-to-br from-background via-background/80 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">Intelligent Orchestration</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold">
              <span className="text-gradient-ai">AI That Chooses</span>
              <br />
              <span className="text-foreground">The Right Model</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Watch Alpha.AI automatically route requests to the optimal model based on cost, 
              performance, and quality requirements. Try different request types below.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Request Types */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground mb-6">Select Request Type</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {requestTypes.map((request) => {
                  const Icon = request.icon
                  const isActive = activeRequest === request.type
                  
                  return (
                    <motion.button
                      key={request.type}
                      onClick={() => handleRequestDemo(request.type)}
                      disabled={isRouting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        p-4 rounded-lg border-2 transition-all duration-300 text-left
                        ${isActive 
                          ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
                          : 'border-border hover:border-primary/50 bg-card'
                        }
                        ${isRouting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`
                          p-2 rounded-lg transition-colors
                          ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'}
                        `}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{request.label}</div>
                          <div className="text-xs text-muted-foreground">
                            Optimal: {request.optimal}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Stats */}
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <h4 className="text-lg font-semibold text-foreground mb-4">Demo Session Stats</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    ${totalSavings.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{requestCount}</div>
                  <div className="text-sm text-muted-foreground">Requests Routed</div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Orchestration Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Routing Engine */}
            <Card className="p-6 bg-gradient-to-br from-background to-primary/5 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Alpha.AI Orchestration Engine</h3>
                  <p className="text-sm text-muted-foreground">Real-time model selection</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!activeRequest && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <Activity className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select a request type to see AI orchestration in action</p>
                  </motion.div>
                )}

                {isRouting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-foreground font-medium mb-2">Analyzing Request...</p>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>• Evaluating cost vs quality trade-offs</div>
                      <div>• Checking model availability & latency</div>
                      <div>• Optimizing for your requirements</div>
                    </div>
                  </motion.div>
                )}

                {selectedModel && !isRouting && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
                      <p className="text-foreground font-medium">Optimal Model Selected</p>
                    </div>

                    {/* Selected Model Details */}
                    {modelProviders.map((model) => {
                      if (model.name !== selectedModel) return null
                      
                      return (
                        <motion.div
                          key={model.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-lg bg-gradient-to-r ${model.color} text-white`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-bold text-lg">{model.name}</h4>
                              <p className="text-sm opacity-90">{model.provider}</p>
                            </div>
                            <Zap className="w-6 h-6" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              <span className="text-sm">{model.cost}/1K tokens</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{model.latency} avg</span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}

                    {routingComplete && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-2"
                      >
                        <Button
                          onClick={() => handleRequestDemo(activeRequest!)}
                          variant="ai"
                          size="sm"
                          className="flex-1"
                        >
                          Route Another
                        </Button>
                        <Button
                          onClick={resetDemo}
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          Reset Demo
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Model Providers */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-foreground">Available Models</h4>
              <div className="grid grid-cols-2 gap-3">
                {modelProviders.map((model) => (
                  <motion.div
                    key={model.name}
                    animate={{
                      scale: selectedModel === model.name ? 1.05 : 1,
                      opacity: selectedModel && selectedModel !== model.name ? 0.5 : 1
                    }}
                    className={`
                      p-3 rounded-lg border transition-all duration-300
                      ${selectedModel === model.name 
                        ? 'border-primary shadow-lg shadow-primary/20 bg-primary/5' 
                        : 'border-border bg-card'
                      }
                    `}
                  >
                    <div className="text-sm font-medium text-foreground">{model.name}</div>
                    <div className="text-xs text-muted-foreground mb-2">{model.provider}</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        {model.cost}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {model.latency}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}