'use client'

import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import Image from 'next/image'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'minimal' | 'icon-only' | 'actual'
  animated?: boolean
  className?: string
  theme?: 'dark' | 'light'
}

const sizeClasses = {
  sm: {
    container: 'w-8 h-8',
    logo: 'w-16 h-8',
    icon: 'w-4 h-4',
    text: 'text-lg',
    subtitle: 'text-xs'
  },
  md: {
    container: 'w-10 h-10',
    logo: 'w-20 h-10',
    icon: 'w-6 h-6',
    text: 'text-xl',
    subtitle: 'text-xs'
  },
  lg: {
    container: 'w-12 h-12',
    logo: 'w-24 h-12',
    icon: 'w-7 h-7',
    text: 'text-2xl',
    subtitle: 'text-sm'
  },
  xl: {
    container: 'w-16 h-16',
    logo: 'w-32 h-16',
    icon: 'w-9 h-9',
    text: 'text-3xl',
    subtitle: 'text-base'
  }
}

export default function Logo({ 
  size = 'md', 
  variant = 'default', 
  animated = true,
  className = '',
  theme = 'dark'
}: LogoProps) {
  const sizes = sizeClasses[size]

  const logoAnimation = animated ? {
    rotate: [0, 360],
    scale: [1, 1.1, 1]
  } : {}

  const logoTransition = animated ? {
    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
    scale: { duration: 2, repeat: Infinity }
  } : {}

  if (variant === 'actual') {
    return (
      <motion.div
        whileHover={animated ? { scale: 1.05 } : {}}
        className={`relative ${sizes.logo} ${className}`}
      >
        <Image
          src={theme === 'dark' ? '/alpha-ai-logo-dark.svg' : '/alpha-ai-logo-light.svg'}
          alt="Alpha.AI Logo"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    )
  }

  if (variant === 'icon-only') {
    return (
      <div className={`relative ${className}`}>
        <motion.div
          animate={logoAnimation}
          transition={logoTransition}
          className={`${sizes.container} bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg flex items-center justify-center`}
        >
          <Zap className={`${sizes.icon} text-white`} />
        </motion.div>
        
        {animated && (
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur-md opacity-50 -z-10`}></div>
        )}
      </div>
    )
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <motion.div
          animate={logoAnimation}
          transition={logoTransition}
          className={`${sizes.container} bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg flex items-center justify-center`}
        >
          <Zap className={`${sizes.icon} text-white`} />
        </motion.div>
        
        <h1 className={`${sizes.text} font-bold text-gradient-ai`}>
          Alpha.AI
        </h1>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative">
        <motion.div
          animate={logoAnimation}
          transition={logoTransition}
          className={`${sizes.container} bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg flex items-center justify-center`}
        >
          <Zap className={`${sizes.icon} text-white`} />
        </motion.div>
        
        {animated && (
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-lg blur-md opacity-50 -z-10`}></div>
        )}
      </div>
      
      <div>
        <h1 className={`${sizes.text} font-bold text-gradient-ai`}>
          Alpha.AI
        </h1>
        <p className={`${sizes.subtitle} text-muted-foreground`}>
          AI Infrastructure
        </p>
      </div>
    </div>
  )
}