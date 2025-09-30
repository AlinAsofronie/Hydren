'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedTextReveal, AnimatedCharReveal } from '@/components/ui/AnimatedTextReveal'
import { AnimatedButton } from '@/components/ui/AnimatedButton'

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.8])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background with Water Gradient */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-medical-500 via-trust-400 to-safety-500" />
        
        {/* Animated Water Ripples */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-white/5"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.05, 0.2]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/2 w-80 h-80 rounded-full bg-white/8"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.1, 0.4]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Floating Water Droplets */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Dark Overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black/30"
      />

      {/* Hero Content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 container mx-auto px-6 text-center text-white will-change-transform"
      >
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
            <div className="w-2 h-2 bg-safety-400 rounded-full mr-2 animate-pulse" />
            <span className="text-sm font-medium">ISO 9001:2015 Certified</span>
          </div>
        </motion.div>

        {/* Main Headline with Character Animation */}
        <div className="mb-6">
          <AnimatedCharReveal
            text="Water Safety"
            delay={0.5}
            duration={0.08}
            className="text-6xl md:text-8xl font-bold leading-tight mb-2 block"
          />
          <AnimatedTextReveal
            delay={1.5}
            variant="slideUp"
            className="text-6xl md:text-8xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-teal-200 bg-clip-text text-transparent"
          >
            Compliance
          </AnimatedTextReveal>
        </div>

        {/* Subtitle */}
        <AnimatedTextReveal
          delay={2.2}
          variant="slideUp"
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Ensuring regulatory compliance and protecting public health through 
          comprehensive water quality management and testing solutions.
        </AnimatedTextReveal>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12"
        >
          {[
            { number: "500+", label: "Facilities Protected" },
            { number: "99.9%", label: "Compliance Rate" },
            { number: "24/7", label: "Monitoring" }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 3 + (index * 0.2),
                  type: "spring",
                  stiffness: 200
                }}
                className="text-3xl md:text-4xl font-bold mb-1"
              >
                {stat.number}
              </motion.div>
              <div className="text-white/80 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.8, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <AnimatedButton 
            size="lg" 
            className="px-8 py-4 bg-white text-medical-600 hover:bg-white/90 shadow-xl hover:shadow-2xl"
          >
            Request Compliance Audit
          </AnimatedButton>
          <AnimatedButton 
            variant="ghost" 
            size="lg"
            className="px-8 py-4 text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50"
          >
            View Certification →
          </AnimatedButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 4.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="text-white/60 text-sm mb-2 uppercase tracking-wide">Scroll</div>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 bg-white/50 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
    </section>
  )
}