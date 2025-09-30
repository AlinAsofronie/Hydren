'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export function AnimatedCard({ 
  children, 
  className = '', 
  delay = 0,
  hover = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={hover ? { 
        y: -4,
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
      } : undefined}
      className={`
        bg-white/80 backdrop-blur-apple border border-neutral-200/50
        rounded-2xl shadow-apple hover:shadow-apple-lg
        transition-all duration-300 ease-apple
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}