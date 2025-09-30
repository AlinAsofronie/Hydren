'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

// Advanced scroll hook with Apple-style smooth animations
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  // Smooth spring physics for natural motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return { ref, scrollYProgress: smoothProgress }
}

// Hook for element-specific scroll animations
export function useElementScroll(options?: {
  offset?: ["start start" | "start end" | "end start" | "end end", "start start" | "start end" | "end start" | "end end"]
  spring?: { stiffness: number; damping: number }
}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options?.offset || ['start end', 'start start']
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: options?.spring?.stiffness || 100,
    damping: options?.spring?.damping || 30,
    restDelta: 0.001
  })

  return { ref, progress: smoothProgress }
}

// Hook for viewport-based scroll animations
export function useViewportScroll() {
  const { scrollY, scrollYProgress } = useScroll()
  
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return { scrollY: smoothScrollY, scrollYProgress: smoothProgress }
}

// Hook for scroll-triggered state changes
export function useScrollTrigger(threshold = 0.5) {
  const [isTriggered, setIsTriggered] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTriggered(entry.intersectionRatio >= threshold)
      },
      {
        threshold,
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isTriggered }
}

// Hook for scroll direction detection
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
        setScrollDirection(direction)
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0)
    }

    const throttledUpdate = throttle(updateScrollDirection, 16) // 60fps
    window.addEventListener('scroll', throttledUpdate)
    
    return () => window.removeEventListener('scroll', throttledUpdate)
  }, [scrollDirection, lastScrollY])

  return scrollDirection
}

// Utility function for throttling
function throttle<T extends (...args: unknown[]) => void>(
  func: T, 
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Hook for creating smooth transforms based on scroll
export function useScrollTransforms(scrollProgress: MotionValue<number>) {
  // Apple-style parallax transforms
  const y = useTransform(scrollProgress, [0, 1], [0, -100])
  const yFast = useTransform(scrollProgress, [0, 1], [0, -200])
  const ySlow = useTransform(scrollProgress, [0, 1], [0, -50])
  
  // Scale transforms
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [1, 1.1, 1])
  const scaleDown = useTransform(scrollProgress, [0, 1], [1, 0.8])
  
  // Opacity transforms
  const opacity = useTransform(scrollProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const fadeIn = useTransform(scrollProgress, [0, 0.5], [0, 1])
  const fadeOut = useTransform(scrollProgress, [0.5, 1], [1, 0])
  
  // Rotation transforms
  const rotate = useTransform(scrollProgress, [0, 1], [0, 360])
  const rotateX = useTransform(scrollProgress, [0, 1], [0, 45])
  
  return {
    y, yFast, ySlow,
    scale, scaleDown,
    opacity, fadeIn, fadeOut,
    rotate, rotateX
  }
}

// Hook for staggered animations
export function useStaggeredAnimation(itemCount: number, delay = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-50px'
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * delay,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  }

  return { ref, isVisible, staggerVariants }
}