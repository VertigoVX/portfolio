'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { experiences } from '@/lib/data'

function TimelineItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 40px 1fr',
        gap: '1rem',
        alignItems: 'start',
        marginBottom: '2.5rem',
      }}
    >
      {/* Left slot */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          visibility: isLeft ? 'visible' : 'hidden',
        }}
      >
        {isLeft && <ItemCard experience={experience} />}
      </motion.div>

      {/* Center dot */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: experience.current
              ? 'var(--accent)'
              : 'var(--bg-card)',
            border: '2px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            flexShrink: 0,
          }}
        >
          <Briefcase
            size={16}
            style={{
              color: experience.current ? '#000' : 'var(--accent)',
            }}
          />
        </motion.div>
      </div>

      {/* Right slot */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          visibility: !isLeft ? 'visible' : 'hidden',
        }}
      >
        {!isLeft && <ItemCard experience={experience} />}
      </motion.div>
    </div>
  )
}

function ItemCard({ experience }: { experience: (typeof experiences)[0] }) {
  return (
    <div
      className="glass"
      style={{ padding: '1.5rem' }}
    >
      <p
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '0.4rem',
        }}
      >
        {experience.period}
      </p>
      <h3
        style={{
          fontSize: '1rem',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--text-primary)',
          marginBottom: '0.25rem',
        }}
      >
        {experience.role}
      </h3>
      <p
        style={{
          fontSize: '0.8rem',
          fontWeight: 600,
          color: 'var(--text-muted)',
          marginBottom: '1rem',
        }}
      >
        @ {experience.company}
      </p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {experience.description.map((line) => (
          <li
            key={line}
            style={{
              fontSize: '0.84rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              paddingLeft: '1rem',
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: '0.55em',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: 'var(--accent)',
              }}
            />
            {line}
          </li>
        ))}
      </ul>
    </div>
  )
}

function MobileItem({
  experience,
  index,
  isLast,
}: {
  experience: (typeof experiences)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const exp = experience

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: exp.current ? 'var(--accent)' : 'var(--bg-card)',
              border: '2px solid var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Briefcase size={14} style={{ color: exp.current ? '#000' : 'var(--accent)' }} />
          </div>
          {!isLast && (
            <div
              style={{
                width: '1px',
                flex: 1,
                minHeight: '30px',
                background: 'var(--border)',
                marginTop: '8px',
              }}
            />
          )}
        </div>
        <div className="glass" style={{ padding: '1.25rem', flex: 1, marginBottom: '1rem' }}>
          <p
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: 'var(--accent)',
              marginBottom: '0.3rem',
              textTransform: 'uppercase',
            }}
          >
            {exp.period}
          </p>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem', letterSpacing: '-0.02em' }}>
            {exp.role}
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.8rem' }}>
            @ {exp.company}
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {exp.description.map((line) => (
              <li
                key={line}
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  paddingLeft: '0.85rem',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.5em',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                  }}
                />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

function MobileTimeline() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {experiences.map((exp, i) => (
        <MobileItem
          key={exp.role}
          experience={exp}
          index={i}
          isLast={i === experiences.length - 1}
        />
      ))}
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-container">
      <SectionTitle title="Work Experience" subtitle="My professional journey" />

      {/* Desktop alternating timeline */}
      <div className="hidden md:block" style={{ position: 'relative' }}>
        {/* Center vertical line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'var(--border)',
            transform: 'translateX(-50%)',
          }}
        />
        {experiences.map((exp, i) => (
          <TimelineItem key={exp.role} experience={exp} index={i} />
        ))}
      </div>

      {/* Mobile single-column timeline */}
      <div className="md:hidden">
        <MobileTimeline />
      </div>
    </section>
  )
}
