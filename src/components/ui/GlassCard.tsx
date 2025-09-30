'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  blur?: boolean
}

export function GlassCard({ 
  children, 
  className = '',
  blur = true 
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`
        relative overflow-hidden rounded-3xl
        ${blur ? 'backdrop-blur-apple' : ''}
        bg-white/10 border border-white/20
        shadow-glass
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}