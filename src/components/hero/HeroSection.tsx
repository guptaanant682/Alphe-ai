'use client'

import { Button } from '@/components/ui/button'
import ParticleBackground from './ParticleBackground'
import InteractiveTerminal from './InteractiveTerminal'
import TheatreAnimation from './TheatreAnimation'
import Logo from '@/components/common/Logo'
import { ArrowRight, Play, TrendingDown, Shield, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <ParticleBackground />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/50 to-background/90" />
      
      {/* Floating Logo Elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 2 }}
        className="absolute top-20 left-10 z-5"
      >
        <Logo size="sm" variant="icon-only" animated={true} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.05, y: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-32 right-16 z-5"
      >
        <Logo size="md" variant="icon-only" animated={true} />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 0.08, x: 0 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute top-1/3 right-8 z-5"
      >
        <Logo size="sm" variant="icon-only" animated={true} />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium">The Inevitable Infrastructure Evolution</span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient-ai">Alpha.AI</span>
                <br />
                <span className="text-foreground">The Future of</span>
                <br />
                <span className="text-gradient-ai">AI Orchestration</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                The world&apos;s first adaptive AI orchestration engine with{' '}
                <span className="text-green-400 font-semibold">70-90% cost reduction</span>{' '}
                through intelligent multi-model routing and enterprise-grade security.
              </p>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">85%</div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">50+</div>
                <div className="text-sm text-muted-foreground">AI Models</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">99.99%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Button 
                size="lg" 
                variant="ai" 
                className="group flex-1 sm:flex-none min-w-0 px-4 sm:px-8 lg:px-12 h-12 sm:h-14 text-sm sm:text-lg whitespace-nowrap"
              >
                <span className="truncate">Schedule VC Demo</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="ai-outline" 
                className="group flex-1 sm:flex-none min-w-0 px-4 sm:px-8 lg:px-12 h-12 sm:h-14 text-sm sm:text-lg whitespace-nowrap"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="truncate">Watch Platform Demo</span>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-8 border-t border-border">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm text-muted-foreground">SOC2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-muted-foreground">Proven 85% Savings</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-muted-foreground">Enterprise Ready</span>
              </div>
            </div>
          </div>

          {/* Right side - Interactive Elements */}
          <div className="space-y-6">
            {/* Theatre Animation */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg blur-xl" />
              <TheatreAnimation />
            </div>
            
            {/* Interactive Terminal */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg blur-xl" />
              <InteractiveTerminal />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/30 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}