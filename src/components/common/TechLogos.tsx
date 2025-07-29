'use client'

import { motion } from 'framer-motion'
import { Globe, Shield, Zap, Settings, Database, Cloud, Server, Lock } from 'lucide-react'

const techLogos = [
  { name: 'OpenAI', icon: Zap, description: 'AI Models' },
  { name: 'AWS', icon: Cloud, description: 'Cloud Infrastructure' },
  { name: 'Docker', icon: Server, description: 'Containerization' },
  { name: 'Kubernetes', icon: Settings, description: 'Orchestration' },
  { name: 'PostgreSQL', icon: Database, description: 'Database' },
  { name: 'Security', icon: Shield, description: 'Zero-Trust' },
  { name: 'Global', icon: Globe, description: 'Worldwide' },
  { name: 'Encryption', icon: Lock, description: 'End-to-End' },
]

export default function TechLogos() {
  return (
    <div className="py-16 bg-card/20 backdrop-blur-sm border-y border-border/30">
      <div className="w-full max-w-none mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Powered by Industry Leaders</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Alpha.AI integrates with the world&apos;s leading AI models, cloud providers, 
            and enterprise security frameworks.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
          {techLogos.map((tech, index) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center space-y-3 p-4 rounded-lg bg-card/30 backdrop-blur-sm border border-border/20 hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-200">
                  <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors duration-200" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-sm">{tech.name}</h3>
                  <p className="text-xs text-muted-foreground">{tech.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}