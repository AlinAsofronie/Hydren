'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface AnimatedTextRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  variant?: 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fade' | 'scale'
  stagger?: number
}

export function AnimatedTextReveal({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
  variant = 'slideUp',
  stagger = 0.1
}: AnimatedTextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const variants = {
    slideUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    slideDown: {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    }
  }

  // Split text into words for staggered animation
  const splitText = (text: string) => {
    return text.split(' ').map((word, i) => (
      <motion.span
        key={i}
        variants={variants[variant]}
        transition={{
          duration,
          delay: delay + (i * stagger),
          ease: [0.4, 0, 0.2, 1]
        }}
        className="inline-block"
        style={{ marginRight: '0.25em' }}
      >
        {word}
      </motion.span>
    ))
  }

  const renderContent = () => {
    if (typeof children === 'string') {
      return (
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={className}
        >
          {splitText(children)}
        </motion.div>
      )
    }

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants[variant]}
        transition={{
          duration,
          delay,
          ease: [0.4, 0, 0.2, 1]
        }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return renderContent()
}

// Component for character-by-character reveal
export function AnimatedCharReveal({
  text,
  delay = 0,
  duration = 0.05,
  className = ''
}: {
  text: string
  delay?: number
  duration?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const characters = text.split('')

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{
            duration: 0.3,
            delay: delay + (i * duration),
            ease: [0.4, 0, 0.2, 1]
          }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}