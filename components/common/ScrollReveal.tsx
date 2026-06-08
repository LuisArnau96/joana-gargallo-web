'use client'

import { motion, type Variants } from 'framer-motion'
import { fadeUp } from '@/styles/animations'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
  delay?: number
  once?: boolean
}

export function ScrollReveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
