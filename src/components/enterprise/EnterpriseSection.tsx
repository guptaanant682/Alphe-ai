'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { gsap } from 'gsap'
import anime from 'animejs'
import {
  Building,
  Key,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Server,
  Database,
  Network,
  Cloud,
  UserCheck,
  Activity
} from 'lucide-react'

interface EnterpriseFeature {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: 'byok' | 'compliance' | 'scalability' | 'governance'
  benefits: string[]
  stats?: { label: string; value: string; trend?: 'up' | 'down' }[]
}

const enterpriseFeatures: EnterpriseFeature[] = [
  {
    id: 'byok-encryption',
    title: 'Bring Your Own Keys (BYOK)',
    description: 'Complete control over your encryption keys with hardware security module integration',
    icon: Key,
    category: 'byok',
    benefits: [
      'Customer-managed encryption keys',
      'Hardware Security Module (HSM) support',
      'Key rotation and lifecycle management',
      'Audit trails for all key operations',
      'Multi-region key replication'
    ],
    stats: [
      { label: 'Key Operations/sec', value: '10,000+', trend: 'up' },
      { label: 'HSM Availability', value: '99.999%' },
      { label: 'Key Rotation Time', value: '<1min' }
    ]
  },
  {
    id: 'compliance-automation',
    title: 'Automated Compliance',
    description: 'Built-in compliance automation for SOC2, HIPAA, GDPR, and enterprise standards',
    icon: Shield,
    category: 'compliance',
    benefits: [
      'SOC2 Type II automated reporting',
      'HIPAA compliance for healthcare data',
      'GDPR data protection controls',
      'Real-time compliance monitoring',
      'Automated audit documentation'
    ],
    stats: [
      { label: 'Compliance Score', value: '100%', trend: 'up' },
      { label: 'Audit Time Saved', value: '85%', trend: 'up' },
      { label: 'Standards Covered', value: '12+' }
    ]
  },
  {
    id: 'infinite-scale',
    title: 'Infinite Scalability',
    description: 'Auto-scaling infrastructure that grows with your AI workloads seamlessly',
    icon: TrendingUp,
    category: 'scalability',
    benefits: [
      'Auto-scaling based on demand',
      'Multi-region deployment',
      'Load balancing across 50+ models',
      'Burst capacity for peak loads',
      'Zero-downtime scaling'
    ],
    stats: [
      { label: 'Max Scale Factor', value: '1000x', trend: 'up' },
      { label: 'Scaling Time', value: '<30s' },
      { label: 'Regional Coverage', value: '25+' }
    ]
  },
  {
    id: 'enterprise-governance',
    title: 'Enterprise Governance',
    description: 'Advanced governance controls with role-based access and policy management',
    icon: UserCheck,
    category: 'governance',
    benefits: [
      'Role-based access control (RBAC)',
      'Policy-as-code implementation',
      'Usage analytics and reporting',
      'Cost allocation and budgeting',
      'Multi-tenant isolation'
    ],
    stats: [
      { label: 'Policy Violations', value: '0', trend: 'down' },
      { label: 'Access Requests', value: '<1min' },
      { label: 'Audit Events', value: '100%' }
    ]
  }
]

const scalabilityMetrics = [
  { name: 'Requests/sec', current: 0, max: 1000000 },
  { name: 'Active Models', current: 0, max: 50 },
  { name: 'Global Regions', current: 0, max: 25 },
  { name: 'Concurrent Users', current: 0, max: 100000 }
]

export default function EnterpriseSection() {
  const [activeFeature, setActiveFeature] = useState('byok-encryption')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [metrics, setMetrics] = useState(scalabilityMetrics)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Animate metrics with anime.js
  useEffect(() => {
    metrics.forEach((metric, index) => {
      anime({
        targets: metric as unknown as Parameters<typeof anime>[0]['targets'],
        current: metric.max * 0.8, // Show 80% capacity
        duration: 2000 + index * 500,
        easing: 'easeOutCubic',
        update: () => {
          setMetrics([...metrics])
        }
      })
    })
  }, [metrics])

  // GSAP scroll animations
  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.enterprise-card')
      
      gsap.fromTo(cards,
        { 
          opacity: 0, 
          y: 60,
          rotationX: 15 
        },
        { 
          opacity: 1, 
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }
  }, [selectedCategory])

  const filteredFeatures = selectedCategory === 'all' 
    ? enterpriseFeatures 
    : enterpriseFeatures.filter(feature => feature.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'byok': return Key
      case 'compliance': return Shield
      case 'scalability': return TrendingUp
      case 'governance': return UserCheck
      default: return Building
    }
  }

  const ScalabilityVisualization = () => {
    return (
      <div className="space-y-4">
        {metrics.map((metric, index) => {
          const percentage = (metric.current / metric.max) * 100
          
          return (
            <div key={metric.name} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{metric.name}</span>
                <span className="text-sm text-muted-foreground">
                  {Math.floor(metric.current).toLocaleString()} / {metric.max.toLocaleString()}
                </span>
              </div>
              
              <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.5, delay: index * 0.2 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                </motion.div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const ComplianceMatrix = () => {
    const standards = [
      { name: 'SOC2 Type II', status: 'certified', coverage: 100 },
      { name: 'ISO 27001', status: 'certified', coverage: 100 },
      { name: 'HIPAA', status: 'compliant', coverage: 95 },
      { name: 'GDPR', status: 'compliant', coverage: 98 },
      { name: 'PCI DSS', status: 'certified', coverage: 100 },
      { name: 'FedRAMP', status: 'in-progress', coverage: 75 }
    ]

    return (
      <div className="grid grid-cols-2 gap-4">
        {standards.map((standard, index) => (
          <motion.div
            key={standard.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-gradient-to-br from-muted/50 to-background border border-border"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">{standard.name}</span>
              <div className={`w-2 h-2 rounded-full ${
                standard.status === 'certified' ? 'bg-green-400' :
                standard.status === 'compliant' ? 'bg-blue-400' : 'bg-yellow-400'
              }`} />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Coverage</span>
                <span className="text-foreground">{standard.coverage}%</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${standard.coverage}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-br from-background via-accent/5 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2.5L23.5 16l-3.5 3.5zm2-7V11H4v-2h18V6.5L25.5 9L22 11.5zm0 14V25H4v-2h18v-2.5L25.5 23L22 25.5z'/%3E%3C/g%3E%3C/svg%3E")`,
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm">
              <Building className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 font-medium">Enterprise Ready</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold">
              <span className="text-gradient-ai">Enterprise-Grade</span>
              <br />
              <span className="text-foreground">AI Infrastructure</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for the world&apos;s largest organizations with enterprise governance,
              infinite scalability, and complete data sovereignty.
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-1 rounded-lg bg-muted">
            {['all', 'byok', 'compliance', 'scalability', 'governance'].map(category => {
              const Icon = category === 'all' ? Building : getCategoryIcon(category)
              
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category === 'all' ? 'All Features' : category.toUpperCase()}
                </Button>
              )
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Enterprise Features */}
          <div className="lg:col-span-2">
            <div ref={sectionRef} className="grid gap-8">
              <AnimatePresence>
                {filteredFeatures.map((feature, index) => {
                  const Icon = feature.icon
                  const isActive = activeFeature === feature.id
                  
                  return (
                    <motion.div
                      key={feature.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card 
                        className={`enterprise-card p-8 cursor-pointer transition-all duration-300 ${
                          isActive 
                            ? 'border-primary shadow-xl shadow-primary/20 bg-gradient-to-br from-primary/5 to-accent/5' 
                            : 'hover:border-primary/50 hover:shadow-lg'
                        }`}
                        onClick={() => setActiveFeature(isActive ? '' : feature.id)}
                      >
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Feature Info */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <div className="p-3 rounded-lg bg-gradient-to-br from-primary to-accent text-white">
                                <Icon className="w-8 h-8" />
                              </div>
                              <div>
                                <h3 className="text-2xl font-bold text-foreground">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                              </div>
                            </div>

                            <div className="space-y-2">
                              {feature.benefits.map((benefit, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4 text-green-400" />
                                  <span className="text-sm text-foreground">{benefit}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Feature Stats */}
                          {feature.stats && (
                            <div className="space-y-4">
                              <h4 className="text-lg font-semibold text-foreground">Key Metrics</h4>
                              <div className="grid gap-4">
                                {feature.stats.map((stat, idx) => (
                                  <div 
                                    key={idx} 
                                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                                  >
                                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg font-bold text-foreground">{stat.value}</span>
                                      {stat.trend && (
                                        <TrendingUp 
                                          className={`w-4 h-4 ${
                                            stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                                          }`} 
                                        />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Live Scalability Metrics */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Live Scalability</h3>
              <ScalabilityVisualization />
              
              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm font-medium">Auto-scaling Active</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Infrastructure automatically scales based on demand
                </p>
              </div>
            </Card>

            {/* Compliance Matrix */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Compliance Status</h3>
              <ComplianceMatrix />
              
              <div className="mt-6 text-center">
                <Button variant="ai-outline" size="sm" className="w-full">
                  View Compliance Report
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>

            {/* Architecture Overview */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-4">Enterprise Architecture</h3>
              
              <div className="space-y-4">
                {[
                  { icon: Cloud, label: 'Multi-Cloud Support', status: 'active' },
                  { icon: Database, label: 'Data Residency Controls', status: 'active' },
                  { icon: Network, label: 'Private Network Access', status: 'active' },
                  { icon: Server, label: 'Dedicated Instances', status: 'available' }
                ].map((item, index) => {
                  const Icon = item.icon
                  
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="text-sm text-foreground">{item.label}</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-blue-400'
                      }`} />
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-6">
                <Button variant="ai" size="sm" className="w-full">
                  Request Enterprise Demo
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready for Enterprise Scale?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join Fortune 500 companies already scaling their AI infrastructure with Alpha.AI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-2xl mx-auto">
              <Button 
                variant="ai" 
                size="lg" 
                className="group flex-1 sm:flex-none min-w-0 px-4 sm:px-6 lg:px-8 h-12 sm:h-14 text-sm sm:text-base whitespace-nowrap"
              >
                <span className="truncate">Schedule Enterprise Demo</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="ai-outline" 
                size="lg"
                className="flex-1 sm:flex-none min-w-0 px-4 sm:px-6 lg:px-8 h-12 sm:h-14 text-sm sm:text-base whitespace-nowrap"
              >
                <span className="truncate">Download Enterprise Guide</span>
              </Button>
            </div>

            <div className="mt-8 flex justify-center items-center gap-8 opacity-60">
              <div className="text-lg font-bold text-muted-foreground">Fortune 500</div>
              <div className="text-lg font-bold text-muted-foreground">Global Banks</div>
              <div className="text-lg font-bold text-muted-foreground">Healthcare</div>
              <div className="text-lg font-bold text-muted-foreground">Government</div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}