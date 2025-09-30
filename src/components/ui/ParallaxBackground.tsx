'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxBackgroundProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxBackground({ 
  children, 
  speed = 0.5, 
  className = '' 
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y }}
        className="absolute inset-0 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}