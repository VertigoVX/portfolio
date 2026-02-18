'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionTitle from '@/components/ui/SectionTitle'
import { skills } from '@/lib/data'

interface SkillBarProps {
  name: string
  level: number
  delay?: number
}

function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} style={{ marginBottom: '1.2rem' }}>
      {/* Label row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}
      >
        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.7 }}
          style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.03em' }}
        >
          {level}%
        </motion.span>
      </div>

      {/*
        Track — liquid glass trough.
        Inner inset shadow makes it look like the bar is recessed into glass.
      */}
      <div
        style={{
          height: '8px',
          borderRadius: '100px',
          /* Glass trough */
          background: `
            radial-gradient(
              ellipse at 10% 50%,
              rgba(255, 255, 255, 0.08) 0%,
              transparent 70%
            ),
            rgba(255, 255, 255, 0.04)
          `,
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: `
            inset 0 2px 4px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(0, 0, 0, 0.12)
          `,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Liquid fill */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: `${level}%`, opacity: 1 } : {}}
          transition={{
            width: { duration: 1.1, delay, ease: [0.25, 0.46, 0.45, 0.94] },
            opacity: { duration: 0.3, delay },
          }}
          style={{
            height: '100%',
            borderRadius: '100px',
            position: 'relative',
            /* Gradient fill — mimics liquid with light hitting the surface */
            background: `
              linear-gradient(
                90deg,
                var(--accent) 0%,
                var(--accent-hover) 60%,
                rgba(255, 255, 255, 0.6) 100%
              )
            `,
            /* Top specular on the liquid surface */
            boxShadow: `
              inset 0 1.5px 0 rgba(255, 255, 255, 0.45),
              inset 0 -1px 0 rgba(0, 0, 0, 0.15),
              0 0 12px var(--accent-glow)
            `,
            overflow: 'hidden',
          }}
        >
          {/* Moving light spot — the "liquid" shimmer */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{
              duration: 2.2,
              delay: delay + 1.2,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '40%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)',
              borderRadius: '100px',
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

interface SkillColumnProps {
  title: string
  items: { name: string; level: number }[]
  delay?: number
}

function SkillColumn({ title, items, delay = 0 }: SkillColumnProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      /* glass-shimmer adds the slow sweep of light across the card */
      className="glass glass-shimmer"
      style={{ padding: '2rem' }}
    >
      {/* Column title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--accent)',
            boxShadow: '0 0 8px var(--accent-glow)',
          }}
        />
        <h3
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
          }}
        >
          {title}
        </h3>
      </div>

      {items.map((skill, i) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          delay={delay + i * 0.1}
        />
      ))}
    </motion.div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section-container">
      <SectionTitle title="My Skills" subtitle="Technologies I work with" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}
      >
        <SkillColumn title="Frontend" items={skills.frontend} delay={0.05} />
        <SkillColumn title="Backend" items={skills.backend} delay={0.15} />
        <SkillColumn title="Tools & Others" items={skills.tools} delay={0.25} />
      </div>
    </section>
  )
}
