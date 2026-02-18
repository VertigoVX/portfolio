'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/data'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)

      const ids = navLinks.map((l) => l.href.slice(1))
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && window.scrollY >= el.offsetTop - 220) {
          setActiveSection(ids[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (href: string) => {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      {/*
        The outer <nav> is always full-width + fixed so it stacks correctly.
        The INNER pill is what morphs between a full bar and a floating capsule.
      */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          /* The nav itself is transparent — glass lives on the inner pill */
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'center',
          padding: scrolled ? '0.8rem 1.5rem' : '0',
          transition: 'padding 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* ── Floating glass pill ── */}
        <div
          style={{
            pointerEvents: 'all',
            width: '100%',
            maxWidth: scrolled ? '920px' : '100vw',
            height: scrolled ? '56px' : '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: scrolled ? '0 1.5rem' : '0 2rem',
            borderRadius: scrolled ? '100px' : '0px',
            /* ── Glass backdrop — opacity transitions in ── */
            background: scrolled
              ? `
                  radial-gradient(
                    ellipse at 20% 30%,
                    rgba(255, 255, 255, 0.12) 0%,
                    transparent 55%
                  ),
                  rgba(10, 10, 10, 0.55)
                `
              : 'transparent',
            backdropFilter: scrolled ? 'blur(48px) saturate(200%) brightness(1.06)' : 'none',
            WebkitBackdropFilter: scrolled
              ? 'blur(48px) saturate(200%) brightness(1.06)'
              : 'none',
            border: scrolled ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid transparent',
            boxShadow: scrolled
              ? `
                  0 8px 40px rgba(0, 0, 0, 0.35),
                  inset 0 1px 0 rgba(255, 255, 255, 0.22),
                  inset 1px 0 0 rgba(255, 255, 255, 0.06)
                `
              : 'none',
            transition: [
              'max-width 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              'height 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              'padding 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              'border-radius 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              'background 0.35s ease',
              'border-color 0.35s ease',
              'box-shadow 0.35s ease',
            ].join(', '),
          }}
        >
          {/* ── Logo ── */}
          <motion.button
            onClick={() => scrollTo('#home')}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: scrolled ? '1.2rem' : '1.35rem',
              fontWeight: 800,
              color: 'var(--accent)',
              letterSpacing: '-0.04em',
              fontFamily: 'inherit',
              transition: 'font-size 0.35s ease',
              flexShrink: 0,
            }}
          >
            td.
          </motion.button>

          {/* ── Desktop nav links ── */}
          <div
            className="hidden md:flex"
            style={{ alignItems: 'center', gap: '2rem' }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: scrolled ? '0.78rem' : '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                    fontFamily: 'inherit',
                    position: 'relative',
                    paddingBottom: '2px',
                    transition: 'color 0.2s ease, font-size 0.35s ease',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '1.5px',
                        background: 'var(--accent)',
                        borderRadius: '2px',
                      }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* ── Controls ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ThemeToggle />
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: `
                  radial-gradient(
                    ellipse at 30% 25%,
                    rgba(255, 255, 255, 0.12) 0%,
                    transparent 65%
                  ),
                  rgba(255, 255, 255, 0.06)
                `,
                backdropFilter: 'blur(20px) saturate(160%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              {menuOpen ? (
                <X size={16} style={{ color: 'var(--text-primary)' }} />
              ) : (
                <Menu size={16} style={{ color: 'var(--text-primary)' }} />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile dropdown — liquid glass panel ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden"
            style={{
              position: 'fixed',
              top: '80px',
              left: '1rem',
              right: '1rem',
              zIndex: 999,
              background: `
                radial-gradient(
                  ellipse at 15% 10%,
                  rgba(255, 255, 255, 0.12) 0%,
                  transparent 55%
                ),
                rgba(10, 10, 10, 0.65)
              `,
              backdropFilter: 'blur(48px) saturate(200%) brightness(1.04)',
              WebkitBackdropFilter: 'blur(48px) saturate(200%) brightness(1.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '24px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem',
              boxShadow: `
                0 20px 60px rgba(0, 0, 0, 0.45),
                inset 0 1px 0 rgba(255, 255, 255, 0.22)
              `,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, ease: 'easeOut' }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color:
                    activeSection === link.href.slice(1)
                      ? 'var(--accent)'
                      : 'var(--text-primary)',
                  textAlign: 'left',
                  padding: '0.7rem 0.75rem',
                  borderRadius: '12px',
                  fontFamily: 'inherit',
                  transition: 'background 0.15s ease, color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'none'
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
