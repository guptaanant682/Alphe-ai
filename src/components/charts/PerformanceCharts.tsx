'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Zap,
  BarChart3,
  Activity
} from 'lucide-react'

interface ChartData {
  label: string
  value: number
  color: string
  savings?: number
}

const costComparisonData: ChartData[] = [
  { label: 'Direct API Costs', value: 100, color: 'from-red-500 to-red-600', savings: 0 },
  { label: 'Alpha.AI Optimized', value: 15, color: 'from-green-500 to-green-600', savings: 85 },
]

const performanceMetrics: ChartData[] = [
  { label: 'Latency Reduction', value: 40, color: 'from-blue-500 to-blue-600' },
  { label: 'Uptime SLA', value: 99.99, color: 'from-green-500 to-green-600' },
  { label: 'Cost Optimization', value: 85, color: 'from-purple-500 to-purple-600' },
  { label: 'Quality Score', value: 95, color: 'from-yellow-500 to-yellow-600' },
]

const monthlyUsageData = [
  { month: 'Jan', direct: 45000, alpha: 6750 },
  { month: 'Feb', direct: 52000, alpha: 7800 },
  { month: 'Mar', direct: 48000, alpha: 7200 },
  { month: 'Apr', direct: 65000, alpha: 9750 },
  { month: 'May', direct: 58000, alpha: 8700 },
  { month: 'Jun', direct: 72000, alpha: 10800 },
]

export default function PerformanceCharts() {
  const [activeChart, setActiveChart] = useState('cost')


  const AnimatedBar = ({ data, index, maxValue }: { data: ChartData; index: number; maxValue: number }) => {
    const percentage = (data.value / maxValue) * 100
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
        className="space-y-2"
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">{data.label}</span>
          <span className="text-sm text-muted-foreground">
            {data.savings ? `-${data.savings}%` : `${data.value}%`}
          </span>
        </div>
        
        <div className="relative h-8 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${data.color} relative`}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </motion.div>
        </div>
        
        {data.savings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + index * 0.2 }}
            className="flex items-center gap-1 text-xs text-green-400"
          >
            <TrendingDown className="w-3 h-3" />
            <span>{data.savings}% cost reduction</span>
          </motion.div>
        )}
      </motion.div>
    )
  }

  const AnimatedLineChart = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">Monthly Cost Comparison</h4>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span>Direct API</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span>Alpha.AI</span>
            </div>
          </div>
        </div>
        
        <div className="relative h-64">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-rows-4 opacity-20">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-t border-muted-foreground" />
            ))}
          </div>
          
          {/* Y-axis labels */}
          <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-muted-foreground">
            <span>$80K</span>
            <span>$60K</span>
            <span>$40K</span>
            <span>$20K</span>
            <span>$0</span>
          </div>
          
          {/* Chart area */}
          <div className="ml-12 mr-4 h-full flex items-end justify-between gap-2">
            {monthlyUsageData.map((data, index) => (
              <motion.div
                key={data.month}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                {/* Bars */}
                <div className="relative flex items-end gap-1 h-48">
                  {/* Direct API bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.direct / 80000) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="w-6 bg-gradient-to-t from-red-500 to-red-400 rounded-t"
                  />
                  
                  {/* Alpha.AI bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.alpha / 80000) * 100}%` }}
                    transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                    className="w-6 bg-gradient-to-t from-green-500 to-green-400 rounded-t"
                  />
                </div>
                
                {/* Month label */}
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Total savings calculation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">6-Month Total Savings</p>
              <p className="text-2xl font-bold text-green-400">
                $234,750
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Average Reduction</p>
              <p className="text-2xl font-bold text-green-400">85%</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const CircularMetric = ({ metric, index }: { metric: ChartData; index: number }) => {
    const circumference = 2 * Math.PI * 45
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (metric.value / 100) * circumference

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.2 }}
        className="flex flex-col items-center"
      >
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-muted opacity-20"
            />
            
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              stroke="url(#gradient)"
              strokeWidth="10"
              fill="transparent"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, delay: index * 0.2, ease: "easeOut" }}
              style={{
                strokeDasharray,
              }}
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06d6a0" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + index * 0.2 }}
              className="text-lg font-bold text-foreground"
            >
              {metric.value}%
            </motion.span>
          </div>
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 + index * 0.2 }}
          className="text-sm text-center text-muted-foreground mt-2"
        >
          {metric.label}
        </motion.p>
      </motion.div>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-br from-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm">
              <BarChart3 className="w-4 h-4 text-accent" />
              <span className="text-accent font-medium">Performance Analytics</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold">
              <span className="text-gradient-ai">Proven Results</span>
              <br />
              <span className="text-foreground">Real Savings</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our customers see immediate and sustained cost reductions with improved performance.
              See the data that proves Alpha.AI delivers on its promises.
            </p>
          </motion.div>
        </div>

        {/* Chart Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-1 rounded-lg bg-muted">
            {[
              { id: 'cost', label: 'Cost Analysis', icon: DollarSign },
              { id: 'performance', label: 'Performance', icon: Activity },
              { id: 'usage', label: 'Usage Trends', icon: TrendingUp }
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeChart === id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveChart(id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Chart Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Main Chart */}
          <motion.div
            key={activeChart}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 h-full">
              {activeChart === 'cost' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Cost Comparison</h3>
                  <div className="space-y-6">
                    {costComparisonData.map((data, index) => (
                      <AnimatedBar 
                        key={data.label} 
                        data={data} 
                        index={index} 
                        maxValue={Math.max(...costComparisonData.map(d => d.value))} 
                      />
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground">Your Monthly Savings</span>
                      <span className="text-2xl font-bold text-green-400">$39,125</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on average enterprise usage of 50M tokens/month
                    </p>
                  </div>
                </div>
              )}

              {activeChart === 'performance' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-foreground mb-6">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-8 py-8">
                    {performanceMetrics.map((metric, index) => (
                      <CircularMetric key={metric.label} metric={metric} index={index} />
                    ))}
                  </div>
                </div>
              )}

              {activeChart === 'usage' && <AnimatedLineChart />}
            </Card>
          </motion.div>

          {/* Key Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500 text-white">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Cost Optimization</h4>
                  <p className="text-sm text-muted-foreground">Immediate impact</p>
                </div>
              </div>
              <p className="text-green-400 text-2xl font-bold mb-2">85% Average Reduction</p>
              <p className="text-sm text-muted-foreground">
                Customers typically see cost reductions between 70-90% within the first month
                of implementation through intelligent model routing.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Performance Boost</h4>
                  <p className="text-sm text-muted-foreground">Faster responses</p>
                </div>
              </div>
              <p className="text-blue-400 text-2xl font-bold mb-2">40% Faster</p>
              <p className="text-sm text-muted-foreground">
                Smart caching and optimal model selection reduces average response
                times while maintaining quality standards.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500 text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Quality Maintained</h4>
                  <p className="text-sm text-muted-foreground">No compromises</p>
                </div>
              </div>
              <p className="text-purple-400 text-2xl font-bold mb-2">95% Quality Score</p>
              <p className="text-sm text-muted-foreground">
                Cost optimization never comes at the expense of output quality.
                Our routing algorithm ensures optimal model selection.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h4 className="font-semibold text-foreground mb-3">ROI Calculator</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Current monthly spend:</span>
                  <span className="font-medium">$45,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">With Alpha.AI:</span>
                  <span className="font-medium text-green-400">$6,750</span>
                </div>
                <div className="border-t border-border pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Monthly Savings:</span>
                    <span className="font-bold text-green-400">$38,250</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Annual Savings:</span>
                    <span>$459,000</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}