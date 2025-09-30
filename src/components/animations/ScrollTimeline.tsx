'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import Image from 'next/image'

interface TimelineItem {
  id: string
  title: string
  description: string
  icon?: ReactNode
  image?: string
  content?: ReactNode
}

interface ScrollTimelineProps {
  items: TimelineItem[]
  className?: string
}

export function ScrollTimeline({ items, className = '' }: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Smooth spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Progress line animation
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Progress Line */}
      <div className="absolute left-8 top-0 w-1 h-full bg-neutral-200 rounded-full">
        <motion.div
          className="w-full bg-gradient-to-b from-medical-500 to-trust-500 rounded-full origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      {/* Timeline Items */}
      <div className="space-y-24 pl-20">
        {items.map((item, index) => (
          <TimelineItemComponent
            key={item.id}
            item={item}
            index={index}
            totalItems={items.length}
            scrollProgress={smoothProgress}
          />
        ))}
      </div>
    </div>
  )
}

function TimelineItemComponent({
  item,
  index,
  totalItems,
  scrollProgress
}: {
  item: TimelineItem
  index: number
  totalItems: number
  scrollProgress: ReturnType<typeof useSpring>
}) {
  const itemRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ['start 0.8', 'end 0.2']
  })

  // Calculate when this item should animate
  const startProgress = index / totalItems
  const endProgress = (index + 1) / totalItems

  // Transform values based on scroll position
  const opacity = useTransform(itemProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(itemProgress, [0, 1], [50, -50])
  const scale = useTransform(itemProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  // Icon animation
  const iconScale = useTransform(
    scrollProgress,
    [startProgress - 0.1, startProgress, endProgress, endProgress + 0.1],
    [0, 1, 1, 0]
  )

  const iconRotate = useTransform(
    scrollProgress,
    [startProgress, endProgress],
    [0, 360]
  )

  return (
    <motion.div
      ref={itemRef}
      style={{ opacity, y, scale }}
      className="relative"
    >
      {/* Timeline Icon */}
      <motion.div
        style={{ scale: iconScale, rotate: iconRotate }}
        className="absolute -left-20 top-8 w-16 h-16 bg-white border-4 border-medical-500 rounded-full flex items-center justify-center shadow-apple"
      >
        {item.icon || (
          <div className="w-6 h-6 bg-medical-500 rounded-full" />
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="bg-white rounded-3xl p-8 shadow-apple hover:shadow-apple-lg transition-all duration-500"
      >
        <h3 className="text-2xl font-bold text-neutral-900 mb-4">
          {item.title}
        </h3>
        <p className="text-neutral-600 mb-6 leading-relaxed">
          {item.description}
        </p>
        
        {item.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 rounded-xl overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={192}
              className="w-full h-48 object-cover"
            />
          </motion.div>
        )}
        
        {item.content && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {item.content}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

// Apple-style feature showcase with scroll-triggered reveals
interface Feature {
  title: string
  description: string
  visual: ReactNode
  details?: string[]
}

export function FeatureShowcase({
  features,
  className = ''
}: {
  features: Feature[]
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className={`space-y-32 ${className}`}>
      {features.map((feature, index) => (
        <FeatureSection
          key={index}
          feature={feature}
          isReversed={index % 2 === 1}
        />
      ))}
    </div>
  )
}

function FeatureSection({
  feature,
  isReversed
}: {
  feature: Feature
  isReversed: boolean
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2']
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isReversed ? [100, -100] : [-100, 100]
  )

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={sectionRef}
      className={`grid lg:grid-cols-2 gap-16 items-center ${
        isReversed ? 'lg:grid-flow-col-dense' : ''
      }`}
    >
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0.4, 0, 0.2, 1]
        }}
        className={isReversed ? 'lg:col-start-2' : ''}
      >
        <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
          {feature.title}
        </h2>
        <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
          {feature.description}
        </p>
        
        {feature.details && (
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-3"
          >
            {feature.details.map((detail: string, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + (i * 0.1),
                  ease: [0.4, 0, 0.2, 1]
                }}
                className="flex items-center text-neutral-700"
              >
                <div className="w-2 h-2 bg-medical-500 rounded-full mr-4" />
                {detail}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>

      {/* Visual Content */}
      <motion.div
        style={{ x, opacity }}
        className={`relative ${isReversed ? 'lg:col-start-1' : ''}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 1,
            delay: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="relative z-10"
        >
          {feature.visual}
        </motion.div>
        
        {/* Background decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            delay: 0.1,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute inset-0 bg-gradient-to-br from-medical-100 to-trust-100 rounded-3xl transform rotate-3 scale-105 -z-10"
        />
      </motion.div>
    </motion.div>
  )
}

// Scroll-triggered statistics counter
export function ScrollStats({
  stats,
  className = ''
}: {
  stats: Array<{
    number: string
    label: string
    suffix?: string
  }>
  className?: string
}) {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.3 + (index * 0.1),
              type: 'spring',
              stiffness: 200,
              damping: 20
            }}
            className="text-5xl lg:text-6xl font-bold text-medical-600 mb-2"
          >
            {stat.number}{stat.suffix}
          </motion.div>
          <div className="text-neutral-600 font-medium">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}