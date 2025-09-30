'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { useScrollDirection, useViewportScroll } from '@/hooks/useScrollAnimation'

// Main scroll progress indicator
export function ScrollProgress({ className = '' }: { className?: string }) {
  const { scrollYProgress } = useViewportScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-medical-500 to-trust-500 origin-left z-50 ${className}`}
      style={{ scaleX }}
    />
  )
}

// Circular scroll progress indicator
export function CircularScrollProgress({
  size = 60,
  strokeWidth = 4,
  className = ''
}: {
  size?: number
  strokeWidth?: number
  className?: string
}) {
  const { scrollYProgress } = useViewportScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const circumference = (size - strokeWidth) * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = useTransform(
    progress,
    [0, 1],
    [circumference, 0]
  )

  const scrollDirection = useScrollDirection()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.div
      className={`fixed bottom-8 right-8 z-50 ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
        y: scrollDirection === 'down' ? 0 : -20
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <motion.button
        onClick={scrollToTop}
        className="relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Background circle */}
        <div
          className="bg-white shadow-apple rounded-full flex items-center justify-center group-hover:shadow-apple-lg transition-all duration-200"
          style={{ width: size, height: size }}
        >
          {/* Arrow icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-medical-600"
          >
            <path
              d="M12 19V5M5 12l7-7 7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Progress circle */}
        <svg
          className="absolute inset-0 transform -rotate-90"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - strokeWidth) / 2}
            stroke="rgba(14, 165, 233, 0.2)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={(size - strokeWidth) / 2}
            stroke="url(#progressGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray,
              strokeDashoffset
            }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </motion.button>
    </motion.div>
  )
}

// Reading progress indicator for articles
export function ReadingProgress({
  target,
  className = ''
}: {
  target?: string
  className?: string
}) {
  const targetRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    if (target) {
      const element = document.querySelector(target) as HTMLElement
      if (element) {
        targetRef.current = element
      }
    }
  }, [target])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  })

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const scaleX = useTransform(progress, [0, 1], [0, 1])

  return (
    <div className={`fixed top-0 left-0 right-0 z-40 ${className}`}>
      <motion.div
        className="h-1 bg-gradient-to-r from-medical-500 to-trust-500 origin-left"
        style={{ scaleX }}
      />
    </div>
  )
}

// Section progress indicators
export function SectionProgress({
  sections,
  className = ''
}: {
  sections: string[]
  className?: string
}) {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(id => document.getElementById(id))
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index])
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className={`fixed right-8 top-1/2 transform -translate-y-1/2 z-40 ${className}`}>
      <div className="space-y-3">
        {sections.map((section, index) => (
          <motion.button
            key={section}
            onClick={() => scrollToSection(index)}
            className="group relative block"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${
                index === activeSection
                  ? 'bg-medical-500 border-medical-500'
                  : 'bg-white border-neutral-300 group-hover:border-medical-300'
              }`}
              animate={{
                scale: index === activeSection ? 1.2 : 1
              }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Tooltip */}
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-neutral-900 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
                {section.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

// Page scroll progress with percentage
export function DetailedScrollProgress({ className = '' }: { className?: string }) {
  const { scrollYProgress } = useViewportScroll()
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPercentage(Math.round(latest * 100))
    })
    return unsubscribe
  }, [scrollYProgress])

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 ${className}`}>
      <motion.div
        className="h-1 bg-gradient-to-r from-medical-500 via-trust-500 to-safety-500 origin-left"
        style={{ scaleX }}
      />
      <div className="absolute top-2 right-4 text-sm text-neutral-600 font-medium">
        {percentage}%
      </div>
    </div>
  )
}

// Animated scroll indicator for hero sections
export function HeroScrollIndicator({
  className = '',
  label = 'Scroll to explore'
}: {
  className?: string
  label?: string
}) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="flex flex-col items-center space-y-3">
        <span className="text-sm text-neutral-600 font-medium">
          {label}
        </span>
        
        <motion.div
          className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <motion.div
            className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
            animate={{
              y: [0, 8, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Minimap-style page overview
export function PageMinimap({
  sections,
  className = ''
}: {
  sections: Array<{ id: string; title: string; color?: string }>
  className?: string
}) {
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useViewportScroll()

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => document.getElementById(section.id))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.div
      className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-40 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="bg-white rounded-2xl shadow-apple p-4 space-y-2 max-w-48">
        <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-3">
          Page Overview
        </h4>
        
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-full text-left p-2 rounded-lg text-sm transition-all duration-200 ${
              index === activeSection
                ? 'bg-medical-50 text-medical-700 font-medium'
                : 'text-neutral-600 hover:bg-neutral-50'
            }`}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  section.color || 'bg-medical-500'
                } ${index === activeSection ? 'opacity-100' : 'opacity-40'}`}
              />
              <span className="truncate">{section.title}</span>
            </div>
          </motion.button>
        ))}
        
        {/* Progress bar */}
        <div className="mt-4 pt-3 border-t border-neutral-200">
          <div className="w-full h-1 bg-neutral-200 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-medical-500 to-trust-500 rounded-full origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}