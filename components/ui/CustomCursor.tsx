'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(true)

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  // Fast dot
  const dotX = useSpring(rawX, { stiffness: 600, damping: 42 })
  const dotY = useSpring(rawY, { stiffness: 600, damping: 42 })

  // Slower lagging ring
  const ringX = useSpring(rawX, { stiffness: 140, damping: 28 })
  const ringY = useSpring(rawY, { stiffness: 140, damping: 28 })

  useEffect(() => {
    // Only show on pointer-fine (mouse) devices
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return
    setIsTouch(false)

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)
    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'a, button, [role="button"], label, input, textarea, select, [data-hover]',
      )
      setHovering(!!el)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onOver)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onOver)
    }
  }, [rawX, rawY])

  if (isTouch) return null

  return (
    <>
      {/* Small dot — snaps to cursor */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: clicking ? 6 : 8,
          height: clicking ? 6 : 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: 'width 0.1s, height 0.1s, opacity 0.2s',
        }}
      />
      {/* Lagging ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 52 : clicking ? 24 : 36,
          height: hovering ? 52 : clicking ? 24 : 36,
          borderRadius: '50%',
          border: `1.5px solid var(--accent)`,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? (hovering ? 0.75 : 0.38) : 0,
          transition: 'width 0.18s ease, height 0.18s ease, opacity 0.2s',
        }}
      />
    </>
  )
}
