'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Mail, Calendar, Code2, Heart, Languages, Sparkles } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { about } from '@/lib/data'


function Card({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass glass-shimmer"
      style={{ padding: '1.75rem', ...style }}
    >
      {children}
    </motion.div>
  )
}

function CardHeading({
  icon: Icon,
  title,
}: {
  icon: React.ElementType
  title: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        marginBottom: '1.25rem',
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: '10px',
          background: 'var(--accent-glow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={16} style={{ color: 'var(--accent)' }} />
      </div>
      <h3
        style={{
          fontSize: '0.95rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
        }}
      >
        {title}
      </h3>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section-container">
      <SectionTitle title="About Me" subtitle="A little bit about who I am" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {/* Personal Info */}
        <Card delay={0.05}>
          <CardHeading icon={MapPin} title="Personal Info" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { icon: Calendar, label: 'Date of Birth', value: about.dob },
              { icon: MapPin, label: 'Location', value: about.location },
              { icon: Mail, label: 'Email', value: about.email },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Icon size={15} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '2px' }}>
                    {label}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Programming Languages */}
        <Card delay={0.1}>
          <CardHeading icon={Code2} title="Tech Stack" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {about.programmingLanguages.map((lang) => (
              <span key={lang} className="tag tag-accent">
                {lang}
              </span>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', margin: '1.25rem 0' }} />
          <CardHeading icon={Sparkles} title="Soft Skills" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {about.softSkills.map((skill) => (
              <span key={skill} className="tag">
                {skill}
              </span>
            ))}
          </div>
        </Card>

        {/* Spoken Languages */}
        <Card delay={0.15}>
          <CardHeading icon={Languages} title="Spoken Languages" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {about.spokenLanguages.map((lang) => (
              <div key={lang.name}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.35rem',
                  }}
                >
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {lang.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {lang.level}
                  </span>
                </div>
                <div
                  style={{
                    height: '4px',
                    background: 'var(--bg-surface)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <LanguageBar pct={lang.pct} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Interests */}
        <Card delay={0.2}>
          <CardHeading icon={Heart} title="Interests" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {about.interests.map((interest) => (
              <motion.span
                key={interest}
                className="tag"
                whileHover={{ scale: 1.05, borderColor: 'var(--accent)', color: 'var(--accent)' }}
                style={{ transition: 'all 0.2s ease' }}
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

function LanguageBar({ pct }: { pct: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ width: 0 }}
      animate={isInView ? { width: `${pct}%` } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        height: '100%',
        background: 'var(--accent)',
        borderRadius: '2px',
      }}
    />
  )
}
