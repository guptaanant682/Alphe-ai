'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import { gsap } from 'gsap'

interface TerminalLine {
  text: string
  type: 'command' | 'output' | 'success' | 'warning' | 'error'
  delay: number
  icon?: string
}

const terminalSequence: TerminalLine[] = [
  { text: '$ alpha-ai init --enterprise', type: 'command', delay: 0 },
  { text: 'Initializing Alpha.AI orchestration layer...', type: 'output', delay: 800, icon: '⚡' },
  { text: 'Connecting to 50+ AI model providers...', type: 'output', delay: 1600, icon: '🔗' },
  { text: 'Analyzing current AI infrastructure costs...', type: 'output', delay: 2400, icon: '📊' },
  { text: 'Current monthly cost: $45,000', type: 'warning', delay: 3200, icon: '💸' },
  { text: 'Optimizing routing matrix with 16-dimensional analysis...', type: 'output', delay: 4000, icon: '🧠' },
  { text: 'Implementing zero-trust security architecture...', type: 'output', delay: 4800, icon: '🔒' },
  { text: 'Running cost optimization algorithms...', type: 'output', delay: 5400, icon: '⚙️' },
  { text: 'Projected monthly cost: $6,750 (85% reduction)', type: 'success', delay: 6200, icon: '🎯' },
  { text: 'Alpha.AI orchestration ACTIVE', type: 'success', delay: 7000, icon: '✅' },
  { text: '', type: 'output', delay: 7800 },
  { text: '$ alpha-ai status --detailed', type: 'command', delay: 8600 },
  { text: 'Status: OPTIMAL', type: 'success', delay: 9400, icon: '🟢' },
  { text: 'Models: 50+ providers orchestrated', type: 'output', delay: 9800, icon: '🤖' },
  { text: 'Security: Zero-trust active', type: 'output', delay: 10200, icon: '🛡️' },
  { text: 'Performance: 40% latency improvement', type: 'success', delay: 10600, icon: '⚡' },
  { text: 'Monthly savings: $38,250', type: 'success', delay: 11000, icon: '💰' },
  { text: 'Annual ROI: 459%', type: 'success', delay: 11400, icon: '📈' },
]

export default function InteractiveTerminal() {
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [currentTypedText, setCurrentTypedText] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (currentIndex >= terminalSequence.length) {
      // Create closing animation with GSAP
      const tl = gsap.timeline()
      tl.to(terminalRef.current, {
        scale: 0.98,
        duration: 0.5,
        ease: "power1.inOut"
      })
      .to(terminalRef.current, {
        scale: 1,
        duration: 0.5,
        ease: "power1.inOut"
      })
      .to({}, { 
        duration: 3,
        onComplete: () => {
          // Reset animation
          gsap.set(lineRefs.current, { opacity: 0, y: 10 })
          setDisplayedLines([])
          setCurrentIndex(0)
          setCurrentTypedText('')
        }
      })
      
      return () => tl.kill()
    }

    const currentLine = terminalSequence[currentIndex]
    const timeout = setTimeout(() => {
      setIsTyping(true)
      setCurrentTypedText('')
      
      // Typewriter effect with GSAP
      const chars = currentLine.text.split('')
      let charIndex = 0
      
      const typeNextChar = () => {
        if (charIndex < chars.length) {
          setCurrentTypedText(prev => prev + chars[charIndex])
          charIndex++
          
          // Variable speed typing - faster for spaces, slower for punctuation
          const char = chars[charIndex - 1]
          let delay = 30 // base delay
          if (char === ' ') delay = 20
          else if (['.', ',', '!', '?', ':'].includes(char)) delay = 150
          else if (char === '$') delay = 100
          
          setTimeout(typeNextChar, delay)
        } else {
          // Finished typing current line
          setDisplayedLines(prev => [...prev, { ...currentLine, text: currentLine.text }])
          setCurrentIndex(prev => prev + 1)
          setIsTyping(false)
          setCurrentTypedText('')
          
          // Animate the newly added line
          const newLineIndex = displayedLines.length
          gsap.fromTo(lineRefs.current[newLineIndex], 
            { opacity: 0, y: 10, scale: 0.95 },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.7)"
            }
          )
          
          // Add glow effect for success lines
          if (currentLine.type === 'success') {
            gsap.to(lineRefs.current[newLineIndex], {
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)',
              duration: 0.3,
              yoyo: true,
              repeat: 1
            })
          }
        }
      }
      
      typeNextChar()
    }, currentLine.delay)

    return () => clearTimeout(timeout)
  }, [currentIndex, displayedLines.length])

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-cyan-400'
      case 'success':
        return 'text-green-400'
      case 'warning':
        return 'text-yellow-400'
      case 'error':
        return 'text-red-400'
      default:
        return 'text-gray-300'
    }
  }

  const getLineIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓'
      case 'warning':
        return '⚠'
      case 'error':
        return '✗'
      default:
        return ''
    }
  }

  // Terminal window controls animation
  useEffect(() => {
    const controls = document.querySelectorAll('.terminal-control')
    
    gsap.fromTo(controls, 
      { scale: 0, rotation: 180 },
      { 
        scale: 1, 
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.2
      }
    )
  }, [])

  return (
    <Card 
      ref={terminalRef}
      className="w-full max-w-2xl font-mono text-sm bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl overflow-hidden"
    >
      <div className="relative">
        {/* Terminal header with enhanced styling */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-b border-slate-600/50">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="terminal-control w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer shadow-sm"></div>
              <div className="terminal-control w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer shadow-sm"></div>
              <div className="terminal-control w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer shadow-sm"></div>
            </div>
            <div className="w-px h-4 bg-slate-600"></div>
            <span className="text-slate-300 font-medium">Alpha.AI Terminal</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>LIVE</span>
            </div>
          </div>
        </div>
        
        {/* Terminal content */}
        <div className="p-6 min-h-[400px] max-h-[500px] overflow-hidden">
          <div className="space-y-2">
            {displayedLines.map((line, index) => (
              <div 
                key={index} 
                ref={el => { lineRefs.current[index] = el }}
                className={`${getLineColor(line.type)} flex items-start gap-2 transition-all duration-300 hover:bg-slate-800/20 rounded px-2 py-1`}
              >
                {line.type === 'command' && (
                  <span className="text-slate-500 select-none font-bold">❯</span>
                )}
                {line.icon && line.type !== 'command' && (
                  <span className="text-lg select-none">{line.icon}</span>
                )}
                {!line.icon && line.type !== 'command' && getLineIcon(line.type) && (
                  <span className={`${getLineColor(line.type)} select-none font-bold`}>
                    {getLineIcon(line.type)}
                  </span>
                )}
                <span className="flex-1">{line.text}</span>
                {line.type === 'success' && (
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                )}
              </div>
            ))}
            
            {/* Current typing line */}
            {isTyping && (
              <div className={`${getLineColor(terminalSequence[currentIndex]?.type || 'output')} flex items-start gap-2`}>
                {terminalSequence[currentIndex]?.type === 'command' && (
                  <span className="text-slate-500 select-none font-bold">❯</span>
                )}
                {terminalSequence[currentIndex]?.icon && terminalSequence[currentIndex]?.type !== 'command' && (
                  <span className="text-lg select-none">{terminalSequence[currentIndex]?.icon}</span>
                )}
                <span className="flex-1">{currentTypedText}</span>
                <span className="animate-pulse text-slate-400">|</span>
              </div>
            )}
            
            {/* Cursor when not typing */}
            {!isTyping && currentIndex < terminalSequence.length && (
              <div className="flex items-center gap-2">
                <span className="text-slate-500 select-none font-bold">❯</span>
                <span className="animate-pulse text-slate-400">|</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Terminal footer with system info */}
        <div className="px-6 py-3 bg-gradient-to-r from-slate-800/60 to-slate-700/60 border-t border-slate-600/30">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span>alpha-ai v2.1.0</span>
              <span>•</span>
              <span>Enterprise Edition</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse"></div>
              <span>Connected</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}