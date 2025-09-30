'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { ReactNode, useRef } from 'react'

// Apple-style reveal animations with smooth easing
const appleEasing = [0.4, 0, 0.2, 1] as const

interface SmoothRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  stagger?: number
  once?: boolean
  threshold?: number
}

// Main smooth reveal component
export function SmoothReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  direction = 'up',
  distance = 30,
  once = true,
  threshold = 0.3
}: SmoothRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: threshold })

  const directions = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 }
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0
      } : {
        opacity: 0,
        ...directions[direction]
      }}
      transition={{
        duration,
        delay,
        ease: appleEasing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered children reveal
export function StaggeredReveal({
  children,
  className = '',
  stagger = 0.1,
  direction = 'up',
  distance = 20
}: {
  children: ReactNode[]
  className?: string
  stagger?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const directions = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 }
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger
      }
    }
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      ...directions[direction]
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: appleEasing
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {Array.isArray(children) ? children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      )) : (
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}

// Text reveal with word-by-word animation
export function TextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.05,
  once = true
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
  once?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })
  const words = text.split(' ')

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  }

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: appleEasing
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Character-by-character reveal
export function CharReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.02
}: {
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const characters = text.split('')

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  }

  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: appleEasing
      }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={charVariants}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Scale reveal animation
export function ScaleReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  scale = 0.8
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  scale?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        scale
      }}
      animate={isInView ? {
        opacity: 1,
        scale: 1
      } : {
        opacity: 0,
        scale
      }}
      transition={{
        duration,
        delay,
        ease: appleEasing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Mask reveal animation (like Apple's website)
export function MaskReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 1.2
}: {
  children: ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

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
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{
        clipPath: clipPaths[direction].initial
      }}
      animate={isInView ? {
        clipPath: clipPaths[direction].animate
      } : {
        clipPath: clipPaths[direction].initial
      }}
      transition={{
        duration,
        delay,
        ease: appleEasing
      }}
    >
      {children}
    </motion.div>
  )
}

// Fade and blur reveal
export function BlurReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  blur = 10
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  blur?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        filter: `blur(${blur}px)`
      }}
      animate={isInView ? {
        opacity: 1,
        filter: 'blur(0px)'
      } : {
        opacity: 0,
        filter: `blur(${blur}px)`
      }}
      transition={{
        duration,
        delay,
        ease: appleEasing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Counter animation with reveal
export function CounterReveal({
  from = 0,
  to,
  duration = 2,
  className = '',
  suffix = '',
  prefix = ''
}: {
  from?: number
  to: number
  duration?: number
  className?: string
  suffix?: string
  prefix?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5, ease: appleEasing }}
    >
      {prefix}
      <motion.span
        initial={{ textContent: from.toString() }}
        animate={isInView ? { textContent: to.toString() } : { textContent: from.toString() }}
        transition={{
          duration,
          ease: 'easeOut',
          delay: 0.2
        }}
        onUpdate={(latest) => {
          if (typeof latest.textContent === 'string') {
            const current = parseFloat(latest.textContent)
            latest.textContent = Math.round(current).toString()
          }
        }}
      />
      {suffix}
    </motion.span>
  )
}

// Progressive image reveal
export function ImageReveal({
  src,
  alt,
  className = '',
  direction = 'up',
  delay = 0
}: {
  src: string
  alt: string
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <MaskReveal direction={direction} delay={delay}>
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.5,
            delay: delay + 0.2,
            ease: appleEasing
          }}
        />
      </MaskReveal>
    </div>
  )
}