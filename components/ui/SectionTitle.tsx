'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: string
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} style={{ textAlign: 'center', marginBottom: '4rem' }}>
      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          fontSize: 'clamp(2rem, 5vw, 2.75rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          color: 'var(--text-primary)',
          marginBottom: '0.6rem',
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          height: '3px',
          width: '48px',
          background: 'var(--accent)',
          margin: '1rem auto 0',
          borderRadius: '2px',
          transformOrigin: 'center',
        }}
      />
    </div>
  )
}
