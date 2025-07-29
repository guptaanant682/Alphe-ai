'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { gsap } from 'gsap'
import anime from 'animejs'
import {
  Star,
  Quote,
  ArrowLeft,
  ArrowRight,
  Users,
  TrendingUp,
  Award,
  Building,
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink
} from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  avatar: string
  quote: string
  fullTestimonial: string
  rating: number
  industry: string
  companySize: string
  metrics: {
    costReduction: number
    timeToValue: string
    satisfaction: number
  }
  videoUrl?: string
  linkedinUrl?: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    title: 'CTO',
    company: 'TechVenture Inc.',
    avatar: '👩‍💼',
    industry: 'Technology',
    companySize: '5,000+ employees',
    quote: 'Alpha.AI reduced our AI infrastructure costs by 87% while improving performance. The ROI was immediate and measurable.',
    fullTestimonial: 'We were spending over $120K monthly on direct API costs across multiple AI providers. Alpha.AI\'s intelligent routing reduced this to just $15K while actually improving response times by 40%. The implementation was seamless, and we saw results on day one. The compliance features saved us months of security reviews.',
    rating: 5,
    metrics: {
      costReduction: 87,
      timeToValue: '1 day',
      satisfaction: 98
    },
    videoUrl: '#',
    linkedinUrl: '#'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'VP of Engineering',
    company: 'DataFlow Solutions',
    avatar: '👨‍💻',
    industry: 'Financial Services',
    companySize: '10,000+ employees',
    quote: 'The security and compliance features are unmatched. We achieved SOC2 compliance 6 months ahead of schedule.',
    fullTestimonial: 'As a financial services company, security and compliance are non-negotiable. Alpha.AI\'s zero-trust architecture and automated compliance reporting transformed our AI governance. The BYOK feature gave us complete control over our encryption keys, and the real-time monitoring caught several potential security issues before they became problems.',
    rating: 5,
    metrics: {
      costReduction: 73,
      timeToValue: '3 days',
      satisfaction: 96
    },
    linkedinUrl: '#'
  },
  {
    id: '3',
    name: 'Dr. Emily Watson',
    title: 'Chief AI Officer',
    company: 'MedTech Innovations',
    avatar: '👩‍⚕️',
    industry: 'Healthcare',
    companySize: '2,500+ employees',
    quote: 'HIPAA compliance was seamless, and the cost savings allowed us to expand our AI research programs significantly.',
    fullTestimonial: 'Healthcare AI has unique compliance requirements, and Alpha.AI handled them flawlessly. The automated HIPAA compliance reporting saved our team hundreds of hours. With the 82% cost reduction, we reinvested the savings into three new AI research projects that are now showing promising results.',
    rating: 5,
    metrics: {
      costReduction: 82,
      timeToValue: '2 days',
      satisfaction: 99
    },
    videoUrl: '#'
  },
  {
    id: '4',
    name: 'James Park',
    title: 'Head of Infrastructure',
    company: 'ScaleAI Corp',
    avatar: '👨‍🔧',
    industry: 'Artificial Intelligence',
    companySize: '1,000+ employees',
    quote: 'The auto-scaling capabilities handled our 10x traffic spike during product launch without any issues.',
    fullTestimonial: 'During our major product launch, we experienced a 1000% increase in API requests within hours. Alpha.AI\'s auto-scaling handled it perfectly - no downtime, no performance degradation. The predictive scaling even ramped up resources before we hit capacity limits. It\'s like having a crystal ball for infrastructure needs.',
    rating: 5,
    metrics: {
      costReduction: 91,
      timeToValue: '4 hours',
      satisfaction: 97
    }
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    title: 'Partner',
    company: 'Venture Capital Fund',
    avatar: '👩‍💼',
    industry: 'Investment',
    companySize: '50+ portfolio companies',
    quote: 'Every portfolio company using Alpha.AI sees 70%+ cost reduction. It\'s the ultimate competitive advantage.',
    fullTestimonial: 'We\'ve deployed Alpha.AI across 15 portfolio companies, and the results are consistently impressive. The average cost reduction is 78%, but more importantly, it frees up capital for R&D and growth. Our portfolio companies using Alpha.AI are scaling 40% faster than those that aren\'t.',
    rating: 5,
    metrics: {
      costReduction: 78,
      timeToValue: '1 day',
      satisfaction: 94
    },
    linkedinUrl: '#'
  }
]

const companyLogos = [
  { name: 'TechVenture', logo: '🚀' },
  { name: 'DataFlow', logo: '📊' },
  { name: 'MedTech', logo: '🏥' },
  { name: 'ScaleAI', logo: '🤖' },
  { name: 'InnovateLabs', logo: '🔬' },
  { name: 'CloudFirst', logo: '☁️' }
]

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showFullTestimonial, setShowFullTestimonial] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLDivElement>(null)
  const testimonialRef = useRef<HTMLDivElement>(null)

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Animate testimonial cards with GSAP
  useEffect(() => {
    if (testimonialRef.current) {
      gsap.fromTo(testimonialRef.current,
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "easeOut"
        }
      )
    }
  }, [currentTestimonial])

  // Animate metrics with anime.js
  useEffect(() => {
    const currentData = testimonials[currentTestimonial]
    const metricsElements = document.querySelectorAll('.metric-value')
    
    metricsElements.forEach((element, index) => {
      const metricKeys = ['costReduction', 'satisfaction']
      const metricKey = metricKeys[index]
      if (metricKey && currentData.metrics[metricKey as keyof typeof currentData.metrics]) {
        anime({
          targets: element,
          innerHTML: [0, currentData.metrics[metricKey as keyof typeof currentData.metrics]],
          duration: 1500,
          easing: 'easeOutCubic',
          round: 1
        })
      }
    })
  }, [currentTestimonial])

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentData = testimonials[currentTestimonial]

  return (
    <section className="py-24 bg-gradient-to-br from-background via-secondary/5 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-sm">
              <Award className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Customer Success</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold">
              <span className="text-gradient-ai">Trusted by</span>
              <br />
              <span className="text-foreground">Industry Leaders</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how leading companies achieve 70-90% cost reduction and transform
              their AI infrastructure with Alpha.AI
            </p>
          </motion.div>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-6xl mx-auto mb-16">
          <Card 
            ref={testimonialRef}
            className="p-8 lg:p-12 bg-gradient-to-br from-background/80 to-primary/5 backdrop-blur-xl border-primary/20 relative overflow-hidden"
          >
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-16 h-16 text-primary" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(currentData.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-2xl lg:text-3xl font-medium text-foreground leading-relaxed">
                  "{showFullTestimonial ? currentData.fullTestimonial : currentData.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                    {currentData.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-lg">{currentData.name}</div>
                    <div className="text-primary font-medium">{currentData.title}</div>
                    <div className="text-muted-foreground">{currentData.company}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {currentData.industry} • {currentData.companySize}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFullTestimonial(!showFullTestimonial)}
                    className="text-primary hover:text-primary"
                  >
                    {showFullTestimonial ? 'Show Less' : 'Read Full Story'}
                  </Button>
                  
                  {currentData.videoUrl && (
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Watch Video
                    </Button>
                  )}
                  
                  {currentData.linkedinUrl && (
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      LinkedIn
                    </Button>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground">Results Achieved</h3>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                    <div className="text-3xl font-bold text-green-400 metric-value">
                      {currentData.metrics.costReduction}%
                    </div>
                    <div className="text-sm text-muted-foreground">Cost Reduction</div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                    <div className="text-3xl font-bold text-blue-400">
                      {currentData.metrics.timeToValue}
                    </div>
                    <div className="text-sm text-muted-foreground">Time to Value</div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                    <div className="text-3xl font-bold text-purple-400 metric-value">
                      {currentData.metrics.satisfaction}%
                    </div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonial(index)
                      setIsAutoPlaying(false)
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-primary w-8' 
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevTestimonial}
                  className="p-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextTestimonial}
                  className="p-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Customer Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by leading companies worldwide
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-60">
            {companyLogos.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-2xl"
              >
                <span>{company.logo}</span>
                <span className="text-lg font-bold text-muted-foreground">
                  {company.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Customer Satisfaction', value: '98%', icon: Star },
            { label: 'Average Cost Reduction', value: '82%', icon: TrendingUp },
            { label: 'Enterprise Customers', value: '500+', icon: Building },
            { label: 'Total Users Served', value: '2M+', icon: Users }
          ].map((stat, index) => {
            const Icon = stat.icon
            
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 text-center bg-gradient-to-br from-muted/30 to-background">
                  <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Join These Success Stories
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              See how Alpha.AI can transform your AI infrastructure and deliver
              the same results for your organization
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="ai" size="xl" className="group">
                Get Your Custom ROI Analysis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="ai-outline" size="xl">
                Schedule Success Story Call
              </Button>
            </div>

            <div className="mt-6 text-sm text-muted-foreground">
              Free assessment • No commitment • 30-day money-back guarantee
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}