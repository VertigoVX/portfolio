'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ChevronDown } from 'lucide-react'
import { about } from '@/lib/data'
import ParticlesCanvas from '@/components/ui/ParticlesCanvas'
import GlassOrb from '@/components/ui/GlassOrb'

export default function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* ── Layer 1: gradient vignette ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, var(--bg-primary) 0%, transparent 20%, transparent 70%, var(--bg-primary) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Layer 2: liquid glass orbs — depth atmosphere ── */}

      {/* Large orb — top right, slow and majestic */}
      <GlassOrb
        size={480}
        x="62%"
        y="-12%"
        delay={0.4}
        tintOpacity={0.07}
        floatDuration={11}
        travel={22}
      />

      {/* Medium orb — bottom left */}
      <GlassOrb
        size={300}
        x="-8%"
        y="52%"
        delay={1.0}
        tintOpacity={0.05}
        floatDuration={8}
        travel={32}
      />

      {/* Small accent orb — mid right, quickest */}
      <GlassOrb
        size={180}
        x="78%"
        y="55%"
        delay={1.6}
        tintOpacity={0.09}
        floatDuration={6.5}
        travel={18}
      />

      {/* ── Layer 3: interactive particle network ── */}
      <div
        style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'auto' }}
      >
        <ParticlesCanvas />
      </div>

      {/* ── Layer 4: main hero content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '860px',
          width: '100%',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            color: 'var(--accent)',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            fontSize: 'clamp(2.8rem, 9vw, 5.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.05em',
            lineHeight: 1.05,
            marginBottom: '1.25rem',
          }}
        >
          Hi, I&apos;m{' '}
          <span className="gradient-text">{about.firstName}</span>
        </motion.h1>

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          style={{
            fontSize: 'clamp(1.05rem, 3vw, 1.45rem)',
            color: 'var(--text-muted)',
            marginBottom: '2.75rem',
            minHeight: '2.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TypeAnimation
            sequence={about.typingStrings}
            wrapper="span"
            speed={55}
            deletionSpeed={65}
            repeat={Infinity}
          />
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <button className="btn-primary" onClick={() => scrollTo('projects')}>
            View My Work
          </button>
          <button className="btn-outline" onClick={() => scrollTo('contact')}>
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.button
        onClick={() => scrollTo('about')}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          translateX: '-50%',
          zIndex: 4,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        <span>Scroll</span>
        <ChevronDown size={18} />
      </motion.button>
    </section>
  )
}
