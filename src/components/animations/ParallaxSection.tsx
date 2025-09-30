'use client'

import { motion, useTransform } from 'framer-motion'
import { ReactNode } from 'react'
import { useScrollAnimation, useScrollTransforms } from '@/hooks/useScrollAnimation'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: 'slow' | 'medium' | 'fast'
  direction?: 'up' | 'down'
  scale?: boolean
  opacity?: boolean
}

export function ParallaxSection({
  children,
  className = '',
  speed = 'medium',
  direction = 'up',
  scale = false,
  opacity = false
}: ParallaxSectionProps) {
  const { ref, scrollYProgress } = useScrollAnimation()
  
  // Different speeds for parallax effect
  const speedMultipliers = {
    slow: direction === 'up' ? -30 : 30,
    medium: direction === 'up' ? -60 : 60,
    fast: direction === 'up' ? -120 : 120
  }

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, speedMultipliers[speed]]
  )

  const scaleValue = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 0.95]
  )

  const opacityValue = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  )

  return (
    <motion.section
      ref={ref}
      style={{
        y,
        scale: scale ? scaleValue : 1,
        opacity: opacity ? opacityValue : 1
      }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// Apple-style layered parallax component
export function LayeredParallax({
  children,
  className = '',
  layers = 3
}: {
  children: ReactNode
  className?: string
  layers?: number
}) {
  const { ref, scrollYProgress } = useScrollAnimation()

  return (
    <div ref={ref} className={`relative ${className}`}>
      {Array.from({ length: layers }, (_, i) => {
        const speed = (i + 1) * 20
        const y = useTransform(scrollYProgress, [0, 1], [0, -speed])
        
        return (
          <motion.div
            key={i}
            style={{ y }}
            className={`absolute inset-0 ${i > 0 ? 'opacity-70' : ''}`}
          >
            {i === 0 ? children : null}
          </motion.div>
        )
      })}
    </div>
  )
}

// Smooth reveal container with Apple-style timing
export function SmoothReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50
}: {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}) {
  const directionValues = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionValues[direction]
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{
        once: true,
        margin: '-100px'
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.4, 0, 0.2, 1] // Apple's easing curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Magnetic hover effect like Apple's website
export function MagneticElement({
  children,
  className = '',
  strength = 0.3
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.02,
        transition: {
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength
        
        e.currentTarget.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0px, 0px) scale(1)'
      }}
    >
      {children}
    </motion.div>
  )
}

// Scroll-triggered counter animation
export function AnimatedCounter({
  end,
  duration = 2,
  suffix = '',
  className = ''
}: {
  end: number
  duration?: number
  suffix?: string
  className?: string
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ textContent: '0' }}
        whileInView={{ textContent: end.toString() }}
        viewport={{ once: true }}
        transition={{
          duration,
          ease: 'easeOut',
          delay: 0.2
        }}
        onUpdate={(latest) => {
          if (typeof latest.textContent === 'string') {
            const current = parseInt(latest.textContent)
            latest.textContent = Math.round(current).toString()
          }
        }}
      />
      {suffix}
    </motion.span>
  )
}

// Image reveal with mask animation
export function ImageReveal({
  src,
  alt,
  className = '',
  direction = 'up'
}: {
  src: string
  alt: string
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}) {
  const clipPaths = {
    up: {
      initial: 'inset(100% 0% 0% 0%)',
      animate: 'inset(0% 0% 0% 0%)'
    },
    down: {
      initial: 'inset(0% 0% 100% 0%)',
      animate: 'inset(0% 0% 0% 0%)'
    },
    left: {
      initial: 'inset(0% 0% 0% 100%)',
      animate: 'inset(0% 0% 0% 0%)'
    },
    right: {
      initial: 'inset(0% 100% 0% 0%)',
      animate: 'inset(0% 0% 0% 0%)'
    }
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{
          clipPath: clipPaths[direction].initial
        }}
        whileInView={{
          clipPath: clipPaths[direction].animate
        }}
        viewport={{
          once: true,
          margin: '-100px'
        }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1]
        }}
      />
    </div>
  )
}

// Text reveal with stagger effect
export function TextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.05
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const words = text.split(' ')

  return (
    <div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: delay + (i * stagger),
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}