'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import type { CaseStudy } from '@/lib/data'

interface CaseStudyModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  caseStudy: CaseStudy
}

export default function CaseStudyModal({
  isOpen,
  onClose,
  title,
  caseStudy,
}: CaseStudyModalProps) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 10000,
            }}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              translateX: '-50%',
              translateY: '-50%',
              zIndex: 10001,
              width: 'min(720px, calc(100vw - 2rem))',
              maxHeight: '88vh',
              overflowY: 'auto',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              padding: '2.5rem',
            }}
            data-lenis-prevent
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '2rem',
                gap: '1rem',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '0.4rem',
                  }}
                >
                  Case Study
                </p>
                <h2
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    color: 'var(--text-primary)',
                  }}
                >
                  {title}
                </h2>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <X size={16} style={{ color: 'var(--text-primary)' }} />
              </motion.button>
            </div>

            {/* Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* Overview / Challenge / Solution */}
              {[
                { label: 'Overview', content: caseStudy.overview },
                { label: 'The Challenge', content: caseStudy.challenge },
                { label: 'The Solution', content: caseStudy.solution },
                { label: 'Results', content: caseStudy.results },
              ].map(({ label, content }) => (
                <div key={label}>
                  <h3
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--accent)',
                      marginBottom: '0.6rem',
                    }}
                  >
                    {label}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                    {content}
                  </p>
                </div>
              ))}

              {/* Key Features */}
              <div>
                <h3
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '0.8rem',
                  }}
                >
                  Key Features
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {caseStudy.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.6,
                      }}
                    >
                      <CheckCircle2
                        size={15}
                        style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--accent)',
                    marginBottom: '0.8rem',
                  }}
                >
                  Technologies Used
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {caseStudy.technologies.map((tech) => (
                    <span key={tech} className="tag tag-accent">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
