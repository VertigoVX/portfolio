'use client'

import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import GitHubIcon from '@/components/ui/GitHubIcon'

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '2.5rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem' }}>
        <motion.a
          href="https://github.com/VertigoVX"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, color: 'var(--accent)' }}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            transition: 'color 0.2s ease, border-color 0.2s ease',
          }}
          aria-label="GitHub"
        >
          <GitHubIcon size={16} />
        </motion.a>
        <motion.a
          href="mailto:tristan.david1503@icloud.com"
          whileHover={{ scale: 1.1, color: 'var(--accent)' }}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            transition: 'color 0.2s ease, border-color 0.2s ease',
          }}
          aria-label="Email"
        >
          <Mail size={16} />
        </motion.a>
      </div>
      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.8rem',
          letterSpacing: '0.04em',
          textAlign: 'center',
        }}
      >
        © {new Date().getFullYear()} Tristan David — Built with Next.js & ♥
      </p>
    </footer>
  )
}
