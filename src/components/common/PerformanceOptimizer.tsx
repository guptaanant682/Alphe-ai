'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function PerformanceOptimizer() {
  useEffect(() => {
    // Enable hardware acceleration for all animations
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    })

    // Set up global performance optimizations
    if (typeof window !== 'undefined') {
      // Reduce motion for users who prefer it
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      
      if (prefersReducedMotion) {
        gsap.globalTimeline.timeScale(0.3)
        document.documentElement.style.setProperty('--animation-duration', '0.1s')
      }

      // Optimize for high refresh rate displays
      const refreshRate = window.screen?.refreshRate || 60
      if (refreshRate > 60) {
        gsap.ticker.fps(refreshRate)
      }

      // Preload critical animations
      gsap.set('[data-animate]', { opacity: 0, y: 30 })
      
      // Set up intersection observer for performance
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px',
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            
            if (element.dataset.animate) {
              gsap.to(element, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: parseFloat(element.dataset.delay || '0'),
              })
              
              observer.unobserve(element)
            }
          }
        })
      }, observerOptions)

      // Observe all elements with animation data
      document.querySelectorAll('[data-animate]').forEach((el) => {
        observer.observe(el)
      })

      // Memory management
      return () => {
        observer.disconnect()
        gsap.globalTimeline.clear()
      }
    }
  }, [])

  return null
}