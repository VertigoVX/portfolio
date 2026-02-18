'use client'

import { motion } from 'framer-motion'

interface GlassOrbProps {
  /** Diameter in pixels */
  size: number
  /** Horizontal position (CSS value, e.g. '80%', '-100px') */
  x: string
  /** Vertical position (CSS value) */
  y: string
  /** Stagger delay in seconds */
  delay?: number
  /** Opacity of the accent colour tint inside the orb (0–1) */
  tintOpacity?: number
  /** Float travel distance in px */
  travel?: number
  /** Duration of one float cycle in seconds */
  floatDuration?: number
}

/**
 * Decorative glass orb — Apple liquid-glass aesthetic.
 *
 * Layers:
 *  1. Framer Motion handles entrance + floating drift
 *  2. Inner div has a CSS @keyframes morph for the organic blob shape
 *  3. Radial gradient simulates the specular highlight at the top-left
 *  4. backdrop-filter blurs and saturates whatever is visible behind it
 *  5. inset box-shadow adds the glass-edge specular rim
 */
export default function GlassOrb({
  size,
  x,
  y,
  delay = 0,
  tintOpacity = 0.06,
  travel = 28,
  floatDuration = 9,
}: GlassOrbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { duration: 2.5, delay, ease: 'easeOut' },
        scale: { duration: 2.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      {/* Slow vertical drift — separate from the entrance animation */}
      <motion.div
        animate={{ y: [0, -travel, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.5,
        }}
        style={{ width: '100%', height: '100%' }}
      >
        {/*
          Inner blob — CSS animation morphs the border-radius organically.
          Keeping this as a vanilla div (not motion.div) avoids transform
          conflicts with the outer Framer Motion components.
        */}
        <div
          style={{
            width: '100%',
            height: '100%',
            /* Specular highlight top-left + base tint */
            background: `
              radial-gradient(
                circle at 30% 26%,
                rgba(255, 255, 255, 0.28) 0%,
                rgba(255, 255, 255, 0.10) 22%,
                rgba(0, 234, 255, ${tintOpacity}) 55%,
                transparent 78%
              )
            `,
            /* Frosted-glass lens effect */
            backdropFilter: 'blur(28px) saturate(200%) brightness(1.08)',
            WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(1.08)',
            /* Glass edge */
            border: '1px solid rgba(255, 255, 255, 0.14)',
            /* Depth + specular rim */
            boxShadow: `
              inset 0 2px 8px rgba(255, 255, 255, 0.24),
              inset 0 -2px 6px rgba(0, 0, 0, 0.10),
              inset 2px 0 6px rgba(255, 255, 255, 0.06),
              0 20px 72px rgba(0, 234, 255, ${tintOpacity * 1.6})
            `,
            /* Organic blob shape — morphed by CSS keyframes */
            borderRadius: '60% 40% 55% 45% / 65% 50% 50% 35%',
            animation: `morph-orb ${12 + delay * 3}s ease-in-out infinite`,
            animationDelay: `${delay * 1.5}s`,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
