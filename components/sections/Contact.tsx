'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Mail, MessageSquare } from 'lucide-react'
import SectionTitle from '@/components/ui/SectionTitle'
import { about } from '@/lib/data'

type Status = 'idle' | 'sending' | 'success' | 'error'

function InputField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
  multiline,
}: {
  label: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  multiline?: boolean
}) {
  const [focused, setFocused] = useState(false)

  const commonStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '12px',
    border: `1.5px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
    background: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
    resize: multiline ? 'vertical' : 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: focused ? '0 0 0 3px var(--accent-glow)' : 'none',
    minHeight: multiline ? '140px' : undefined,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      <label
        htmlFor={name}
        style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: focused ? 'var(--accent)' : 'var(--text-muted)',
          transition: 'color 0.2s ease',
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={commonStyle}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={commonStyle}
        />
      )}
    </div>
  )
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus('idle'), 6000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="section-container">
      <SectionTitle title="Contact Me" subtitle="Let's work together" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* Left — info */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, x: -24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <div>
            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                marginBottom: '0.6rem',
              }}
            >
              Let&apos;s build something{' '}
              <span className="gradient-text">great</span>.
            </h3>
            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
              }}
            >
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision. Drop me a message and I&apos;ll
              get back to you as soon as possible.
            </p>
          </div>

          {/* Contact methods */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                icon: Mail,
                label: 'Email',
                value: about.email,
                href: `mailto:${about.email}`,
              },
              {
                icon: MessageSquare,
                label: 'Open to',
                value: 'Full-time & freelance opportunities',
                href: null,
              },
            ].map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
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
                <div>
                  <p
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginBottom: '2px',
                    }}
                  >
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--accent)',
                        textDecoration: 'none',
                      }}
                    >
                      {value}
                    </a>
                  ) : (
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass"
          style={{ padding: '2rem' }}
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <InputField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <InputField
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              required
            />
            <InputField
              label="Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              required
              multiline
            />

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              whileHover={status === 'idle' ? { scale: 1.02 } : {}}
              whileTap={status === 'idle' ? { scale: 0.98 } : {}}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                background:
                  status === 'success'
                    ? '#22c55e'
                    : status === 'error'
                      ? '#ef4444'
                      : 'var(--accent)',
                color: '#000',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: status === 'idle' ? 'pointer' : 'default',
                fontFamily: 'inherit',
                letterSpacing: '0.02em',
                transition: 'background 0.3s ease, box-shadow 0.2s ease',
                boxShadow: status === 'idle' ? '0 0 24px var(--accent-glow)' : 'none',
              }}
            >
              {status === 'sending' && (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                    style={{ display: 'inline-block', fontSize: '1rem' }}
                  >
                    ⟳
                  </motion.span>
                  Sending…
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle2 size={17} />
                  Message Sent!
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle size={17} />
                  Something went wrong — try again
                </>
              )}
              {status === 'idle' && (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
