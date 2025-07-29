'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu, ArrowRight, Zap, Shield, Building, Settings, Calculator, MessageSquare, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const navigationItems = [
  {
    title: 'Products',
    items: [
      {
        title: 'AI Orchestration',
        href: '#features',
        description: 'Intelligent multi-model routing with cost optimization',
        icon: Zap
      },
      {
        title: 'Architecture',
        href: '#architecture',
        description: 'Scalable infrastructure for enterprise AI workloads',
        icon: Settings
      },
      {
        title: 'Security',
        href: '#security',
        description: 'Zero-trust security with end-to-end encryption',
        icon: Shield
      }
    ]
  },
  {
    title: 'Solutions',
    items: [
      {
        title: 'Enterprise',
        href: '#enterprise',
        description: 'Complete AI infrastructure for large organizations',
        icon: Building
      },
      {
        title: 'Pricing',
        href: '#pricing',
        description: 'Transparent pricing with cost optimization',
        icon: Calculator
      }
    ]
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'Documentation',
        href: '#docs',
        description: 'Complete guides and API references',
        icon: MessageSquare
      },
      {
        title: 'Support',
        href: '#contact',
        description: '24/7 technical support and consultation',
        icon: Phone
      }
    ]
  }
]

export default function ModernNavbar() {
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
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20' 
          : 'bg-transparent'
      )}
    >
      <div className="w-full px-[7%] box-border">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => scrollToSection('#hero')}
          >
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <Image
                src="/alpha-ai-logo-dark.svg"
                alt="Alpha.AI Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl lg:text-2xl font-bold text-gradient-ai">
                Alpha.AI
              </h1>
              <p className="text-xs text-muted-foreground">
                AI Infrastructure
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-white/5 text-foreground/80 hover:text-foreground">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-black/95 backdrop-blur-xl border border-white/10">
                        {item.items.map((subItem) => {
                          const Icon = subItem.icon
                          return (
                            <li key={subItem.title}>
                              <NavigationMenuLink asChild>
                                <button
                                  onClick={() => scrollToSection(subItem.href)}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5 hover:text-accent-foreground focus:bg-white/5 focus:text-accent-foreground w-full text-left group"
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-200">
                                      <Icon className="w-4 h-4 text-primary group-hover:text-accent transition-colors duration-200" />
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium leading-none text-foreground">
                                        {subItem.title}
                                      </div>
                                      <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
                                        {subItem.description}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              </NavigationMenuLink>
                            </li>
                          )
                        })}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-foreground/80 hover:text-foreground hover:bg-white/5"
              onClick={() => scrollToSection('#contact')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200 hover:scale-105 shadow-lg shadow-primary/25"
              onClick={() => scrollToSection('#pricing')}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden p-2"
              >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[300px] sm:w-[400px] bg-black/95 backdrop-blur-xl border-l border-white/10"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-3">
                  <div className="relative w-8 h-8">
                    <Image
                      src="/alpha-ai-logo-dark.svg"
                      alt="Alpha.AI Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-gradient-ai">Alpha.AI</span>
                </SheetTitle>
                <SheetDescription>
                  AI Infrastructure Platform
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-8 space-y-6">
                {navigationItems.map((section) => (
                  <div key={section.title} className="space-y-3">
                    <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">
                      {section.title}
                    </h3>
                    <div className="space-y-2">
                      {section.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <button
                            key={item.title}
                            onClick={() => scrollToSection(item.href)}
                            className="flex items-center space-x-3 w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 text-left group"
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-200">
                              <Icon className="w-4 h-4 text-primary group-hover:text-accent transition-colors duration-200" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-foreground">
                                {item.title}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
                
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-center border-border/30 hover:border-primary/50"
                    onClick={() => scrollToSection('#contact')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Us
                  </Button>
                  <Button
                    className="w-full justify-center bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/25"
                    onClick={() => scrollToSection('#pricing')}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  )
}