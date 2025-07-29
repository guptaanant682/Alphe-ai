'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  PlayCircle,
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  Clock,
  Star,
  Globe,
  Building,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react'

export default function CallToActionSection() {
  const [selectedCTA, setSelectedCTA] = useState<'vc' | 'enterprise' | 'trial'>('vc')

  const ctaOptions = {
    vc: {
      title: 'Ready to Scale Your AI Investment?',
      subtitle: 'Join the AI infrastructure revolution',
      description: 'See how Alpha.AI can transform your portfolio companies with 70-90% cost reduction in AI operations.',
      primaryAction: 'Schedule VC Demo',
      secondaryAction: 'Download Investment Brief',
      benefits: [
        'Portfolio-wide AI cost optimization',
        'Due diligence technical deep-dive',
        'ROI projections and case studies',
        'Implementation roadmap consultation'
      ],
      stats: [
        { label: 'Average Cost Reduction', value: '85%' },
        { label: 'Implementation Time', value: '2 weeks' },
        { label: 'ROI Timeline', value: '30 days' }
      ],
      gradient: 'from-purple-500 to-pink-500'
    },
    enterprise: {
      title: 'Transform Your AI Infrastructure',
      subtitle: 'Enterprise-grade AI orchestration',
      description: 'Deploy Alpha.AI across your organization and see immediate impact on AI costs, performance, and security.',
      primaryAction: 'Schedule Enterprise Demo',
      secondaryAction: 'Speak with Solutions Engineer',
      benefits: [
        'Custom deployment architecture',
        'Security & compliance review',
        'Team training and onboarding',
        'Dedicated customer success manager'
      ],
      stats: [
        { label: 'Fortune 500 Customers', value: '150+' },
        { label: 'Uptime SLA', value: '99.99%' },
        { label: 'Support Response', value: '<1 hour' }
      ],
      gradient: 'from-blue-500 to-cyan-500'
    },
    trial: {
      title: 'Start Saving Today',
      subtitle: 'Risk-free trial',
      description: 'Get started with Alpha.AI in minutes. No setup fees, no long-term contracts, cancel anytime.',
      primaryAction: 'Start Free Trial',
      secondaryAction: 'View Documentation',
      benefits: [
        '30-day free trial',
        'Full feature access',
        'Migration assistance',
        '24/7 technical support'
      ],
      stats: [
        { label: 'Setup Time', value: '5 minutes' },
        { label: 'First Savings', value: 'Day 1' },
        { label: 'Money-back Guarantee', value: '100%' }
      ],
      gradient: 'from-green-500 to-emerald-500'
    }
  }

  const currentCTA = ctaOptions[selectedCTA]

  return (
    <section className="py-24 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* CTA Type Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-1 rounded-lg bg-muted">
            {[
              { id: 'vc' as const, label: 'VCs & Investors', icon: TrendingUp },
              { id: 'enterprise' as const, label: 'Enterprise', icon: Building },
              { id: 'trial' as const, label: 'Get Started', icon: Zap }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={selectedCTA === id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCTA(id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Main CTA Content */}
          <motion.div
            key={selectedCTA}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm"
                >
                  <Star className="w-4 h-4 text-primary" />
                  <span className="text-primary font-medium">{currentCTA.subtitle}</span>
                </motion.div>

                <h2 className="text-4xl lg:text-6xl font-bold">
                  <span className="text-gradient-ai">{currentCTA.title.split(' ').slice(0, -2).join(' ')}</span>
                  <br />
                  <span className="text-foreground">{currentCTA.title.split(' ').slice(-2).join(' ')}</span>
                </h2>

                <p className="text-xl text-muted-foreground">
                  {currentCTA.description}
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3">
                {currentCTA.benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button 
                  variant="ai" 
                  size="lg" 
                  className="group flex-1 sm:flex-none min-w-0 px-4 sm:px-6 lg:px-8 h-12 sm:h-14 text-sm sm:text-base whitespace-nowrap"
                >
                  {selectedCTA === 'vc' && <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />}
                  {selectedCTA === 'enterprise' && <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />}
                  {selectedCTA === 'trial' && <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />}
                  <span className="truncate">{currentCTA.primaryAction}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="ai-outline" 
                  size="lg" 
                  className="group flex-1 sm:flex-none min-w-0 px-4 sm:px-6 lg:px-8 h-12 sm:h-14 text-sm sm:text-base whitespace-nowrap"
                >
                  {selectedCTA === 'vc' && <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />}
                  {selectedCTA === 'enterprise' && <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />}
                  {selectedCTA === 'trial' && <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />}
                  <span className="truncate">{currentCTA.secondaryAction}</span>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-muted-foreground">SOC2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-muted-foreground">30-min setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-muted-foreground">No lock-in</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats & Social Proof */}
          <motion.div
            key={`${selectedCTA}-stats`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Key Stats */}
            <Card className={`p-8 bg-gradient-to-br ${currentCTA.gradient}/10 border-primary/20 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5" />
              <div className="relative space-y-6">
                <h3 className="text-2xl font-bold text-foreground">Key Metrics</h3>
                
                <div className="grid gap-6">
                  {currentCTA.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-muted-foreground">{stat.label}:</span>
                      <span className={`text-2xl font-bold bg-gradient-to-r ${currentCTA.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Contact Options */}
            <Card className="p-6">
              <h4 className="font-semibold text-foreground mb-4">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Phone className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Schedule a Call</div>
                    <div className="text-xs text-muted-foreground">Book a 30-minute demo</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Mail className="w-4 h-4 text-green-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Email Us</div>
                    <div className="text-xs text-muted-foreground">sales@alpha-ai.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <MessageSquare className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Live Chat</div>
                    <div className="text-xs text-muted-foreground">Available 24/7</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Testimonial Preview */}
            {selectedCTA === 'enterprise' && (
              <Card className="p-6 bg-gradient-to-br from-muted/50 to-background">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                    J
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground italic mb-2">
                      "Alpha.AI reduced our AI infrastructure costs by 82% in the first month. 
                      The ROI was immediate and measurable."
                    </p>
                    <div className="text-xs">
                      <div className="font-semibold text-foreground">Jane Chen</div>
                      <div className="text-muted-foreground">CTO, TechScale Inc.</div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {selectedCTA === 'vc' && (
              <Card className="p-6 bg-gradient-to-br from-muted/50 to-background">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground italic mb-2">
                      "Every portfolio company using Alpha.AI sees 70%+ cost reduction. 
                      It's the ultimate competitive advantage in AI."
                    </p>
                    <div className="text-xs">
                      <div className="font-semibold text-foreground">Michael Rodriguez</div>
                      <div className="text-muted-foreground">Partner, Venture Capital Fund</div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </div>

        {/* Bottom Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-border"
        >
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground">
              Trusted by leading companies and VCs worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            <div className="text-lg font-bold text-muted-foreground">TechVentures</div>
            <div className="text-lg font-bold text-muted-foreground">InnovateCorp</div>
            <div className="text-lg font-bold text-muted-foreground">ScaleAI</div>
            <div className="text-lg font-bold text-muted-foreground">DataFlow</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}