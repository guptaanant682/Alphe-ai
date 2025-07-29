'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Settings, Shield, Building, Calculator, MessageSquare, Phone, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Logo from '@/components/common/Logo'

const navigationItems = [
  { name: 'Features', href: '#features', icon: Zap },
  { name: 'Architecture', href: '#architecture', icon: Settings },
  { name: 'Security', href: '#security', icon: Shield },
  { name: 'Enterprise', href: '#enterprise', icon: Building },
  { name: 'Pricing', href: '#pricing', icon: Calculator },
  { name: 'Testimonials', href: '#testimonials', icon: MessageSquare },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
            onClick={() => scrollToSection('#hero')}
          >
            <Logo size="md" variant="default" animated={true} />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors duration-200 group"
                >
                  <Icon className="w-4 h-4 group-hover:text-primary transition-colors" />
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              )
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-border/30 hover:border-primary/50 transition-all duration-200"
              onClick={() => scrollToSection('#contact')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 transition-all duration-200 hover:scale-105"
              onClick={() => scrollToSection('#pricing')}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border/30"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {navigationItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center space-x-3 w-full p-3 rounded-lg bg-card/30 backdrop-blur-sm border border-border/20 hover:border-primary/30 transition-all duration-200"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item.name}</span>
                    </motion.button>
                  )
                })}
                
                <div className="pt-4 space-y-3 border-t border-border/20">
                  <Button
                    variant="outline"
                    className="w-full justify-center border-border/30"
                    onClick={() => scrollToSection('#contact')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Us
                  </Button>
                  <Button
                    className="w-full justify-center bg-gradient-to-r from-primary to-accent"
                    onClick={() => scrollToSection('#pricing')}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}