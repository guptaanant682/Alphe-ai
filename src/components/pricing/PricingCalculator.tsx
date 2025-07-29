'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Calculator,
  TrendingDown,
  Zap,
  ArrowRight,
  CheckCircle,
  BarChart3,
  Clock,
  Shield,
  Sparkles
} from 'lucide-react'

interface PricingTier {
  name: string
  basePrice: number
  tokensIncluded: number
  overageRate: number
  features: string[]
  popular?: boolean
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Startup',
    basePrice: 99,
    tokensIncluded: 5000000, // 5M tokens
    overageRate: 0.00002,
    features: ['5M tokens included', 'Basic orchestration', 'Email support', 'Standard SLA']
  },
  {
    name: 'Scale',
    basePrice: 499,
    tokensIncluded: 50000000, // 50M tokens
    overageRate: 0.000015,
    features: ['50M tokens included', 'Advanced orchestration', 'Priority support', '99.9% SLA', 'Custom models'],
    popular: true
  },
  {
    name: 'Enterprise',
    basePrice: 2499,
    tokensIncluded: 500000000, // 500M tokens
    overageRate: 0.00001,
    features: ['500M tokens included', 'Full orchestration suite', 'Dedicated support', '99.99% SLA', 'BYOK', 'Custom deployment']
  }
]

const modelPricing = {
  'gpt-4o': { input: 0.005, output: 0.015 },
  'claude-3-5': { input: 0.003, output: 0.015 },
  'gemini-pro': { input: 0.00035, output: 0.00105 },
  'llama-3-1': { input: 0.0003, output: 0.0006 }
}

export default function PricingCalculator() {
  const [monthlyTokens, setMonthlyTokens] = useState(10000000) // 10M default
  const [selectedTier, setSelectedTier] = useState('Scale')
  const [directCost, setDirectCost] = useState(0)
  const [alphaCost, setAlphaCost] = useState(0)
  const [savings, setSavings] = useState(0)
  const [savingsPercentage, setSavingsPercentage] = useState(0)

  useEffect(() => {
    // Calculate direct API costs (weighted average of popular models)
    const avgDirectCost = (
      modelPricing['gpt-4o'].input * 0.3 +
      modelPricing['claude-3-5'].input * 0.3 +
      modelPricing['gemini-pro'].input * 0.2 +
      modelPricing['llama-3-1'].input * 0.2
    ) * monthlyTokens

    // Calculate Alpha.AI costs (15% of direct cost due to optimization)
    const tier = pricingTiers.find(t => t.name === selectedTier)!
    let alphaTotal = tier.basePrice
    
    if (monthlyTokens > tier.tokensIncluded) {
      const overage = monthlyTokens - tier.tokensIncluded
      alphaTotal += overage * tier.overageRate
    }

    const totalSavings = avgDirectCost - alphaTotal
    const savingsPercent = totalSavings > 0 ? (totalSavings / avgDirectCost) * 100 : 0

    setDirectCost(avgDirectCost)
    setAlphaCost(alphaTotal)
    setSavings(totalSavings)
    setSavingsPercentage(savingsPercent)
  }, [monthlyTokens, selectedTier])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`
    }
    if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(1)}K`
    }
    return tokens.toString()
  }

  return (
    <section className="py-24 bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm">
              <Calculator className="w-4 h-4 text-accent" />
              <span className="text-accent font-medium">ROI Calculator</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold">
              <span className="text-gradient-ai">Calculate Your</span>
              <br />
              <span className="text-foreground">Cost Savings</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See exactly how much you&apos;ll save with Alpha.AI&apos;s intelligent orchestration.
              Adjust your usage to get a personalized cost breakdown.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Usage Input */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Monthly Usage</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Tokens per month: {formatTokens(monthlyTokens)}
                  </label>
                  <input
                    type="range"
                    min="1000000"
                    max="1000000000"
                    step="1000000"
                    value={monthlyTokens}
                    onChange={(e) => setMonthlyTokens(parseInt(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1M</span>
                    <span>100M</span>
                    <span>1B</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex gap-2">
                  {[
                    { label: '10M', value: 10000000 },
                    { label: '50M', value: 50000000 },
                    { label: '100M', value: 100000000 },
                    { label: '500M', value: 500000000 }
                  ].map(preset => (
                    <Button
                      key={preset.label}
                      variant={monthlyTokens === preset.value ? 'ai' : 'outline'}
                      size="sm"
                      onClick={() => setMonthlyTokens(preset.value)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Tier Selection */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Select Plan</h3>
              
              <div className="space-y-3">
                {pricingTiers.map(tier => (
                  <motion.button
                    key={tier.name}
                    onClick={() => setSelectedTier(tier.name)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      w-full p-4 rounded-lg border-2 text-left transition-all duration-300
                      ${selectedTier === tier.name
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                        : 'border-border hover:border-primary/50 bg-card'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{tier.name}</h4>
                        {tier.popular && (
                          <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">{formatCurrency(tier.basePrice)}</div>
                        <div className="text-xs text-muted-foreground">/month</div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {formatTokens(tier.tokensIncluded)} tokens included
                    </div>
                  </motion.button>
                ))}
              </div>
            </Card>

            {/* Features */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h4 className="font-semibold text-foreground mb-4">What&apos;s Included</h4>
              <div className="space-y-2">
                {pricingTiers.find(t => t.name === selectedTier)?.features.map((feature, index) => (
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
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Cost Breakdown */}
            <Card className="p-8 bg-gradient-to-br from-background to-primary/5 border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Cost Comparison</h3>
                  <p className="text-sm text-muted-foreground">Monthly breakdown</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Direct API Cost */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div>
                    <div className="font-semibold text-foreground">Direct API Costs</div>
                    <div className="text-sm text-muted-foreground">Without Alpha.AI</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-400">{formatCurrency(directCost)}</div>
                    <div className="text-xs text-muted-foreground">per month</div>
                  </div>
                </div>

                {/* Alpha.AI Cost */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div>
                    <div className="font-semibold text-foreground">Alpha.AI Cost</div>
                    <div className="text-sm text-muted-foreground">With optimization</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{formatCurrency(alphaCost)}</div>
                    <div className="text-xs text-muted-foreground">per month</div>
                  </div>
                </div>

                {/* Savings */}
                <motion.div
                  animate={{
                    scale: savings > 0 ? [1, 1.02, 1] : 1
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="p-6 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-6 h-6 text-green-400" />
                      <div>
                        <div className="font-bold text-green-400">Monthly Savings</div>
                        <div className="text-sm text-muted-foreground">Your ROI</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-400">{formatCurrency(savings)}</div>
                      <div className="text-sm text-green-400">{savingsPercentage.toFixed(0)}% reduction</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-green-500/20">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{formatCurrency(savings * 12)}</div>
                      <div className="text-xs text-muted-foreground">Annual Savings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{Math.round((savings * 12) / (directCost * 12 - savings * 12))}x</div>
                      <div className="text-xs text-muted-foreground">ROI Multiple</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Card>

            {/* Additional Benefits */}
            <Card className="p-6">
              <h4 className="font-semibold text-foreground mb-4">Additional Benefits</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-foreground">40% faster responses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-foreground">Enterprise security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-foreground">99.99% uptime SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-foreground">Quality maintained</span>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="text-center space-y-4">
                <h4 className="text-xl font-bold text-foreground">Ready to Start Saving?</h4>
                <p className="text-sm text-muted-foreground">
                  Join hundreds of companies already saving millions with Alpha.AI
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="ai" className="flex-1 group">
                    Schedule Demo
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="ai-outline" className="flex-1">
                    Start Free Trial
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>No setup fees • Cancel anytime • 30-day money-back guarantee</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">
            Trusted by leading companies to optimize their AI infrastructure
          </p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            {/* Company logos would go here */}
            <div className="text-2xl font-bold text-muted-foreground">TechCorp</div>
            <div className="text-2xl font-bold text-muted-foreground">InnovateLabs</div>
            <div className="text-2xl font-bold text-muted-foreground">DataFlow</div>
            <div className="text-2xl font-bold text-muted-foreground">ScaleTech</div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </section>
  )
}