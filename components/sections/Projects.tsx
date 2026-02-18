'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, BookOpen } from 'lucide-react'
import GitHubIcon from '@/components/ui/GitHubIcon'
import SectionTitle from '@/components/ui/SectionTitle'
import CaseStudyModal from '@/components/ui/CaseStudyModal'
import { projects, type Project } from '@/lib/data'

function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [modalOpen, setModalOpen] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dy * -6, y: dx * 6 })
  }

  const resetTilt = () => setTilt({ x: 0, y: 0 })

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s ease',
        }}
      >
        <div
          className="glass glass-shimmer"
          style={{
            padding: '1.75rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3
              style={{
                fontSize: '1.1rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                flexShrink: 0,
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              aria-label={`View ${project.title} on GitHub`}
            >
              <GitHubIcon size={15} />
            </motion.a>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              flexGrow: 1,
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {project.tags.map((tag) => (
              <span key={tag} className="tag tag-accent">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.6rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              <ExternalLink size={13} />
              View on GitHub
            </a>
            {project.caseStudy && (
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: 'auto',
                  fontFamily: 'inherit',
                }}
              >
                <BookOpen size={13} />
                Case Study
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Case study modal */}
      {project.caseStudy && (
        <CaseStudyModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title={project.title}
          caseStudy={project.caseStudy}
        />
      )}
    </>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-container">
      <SectionTitle title="My Projects" subtitle="A selection of what I've built" />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} delay={i * 0.1} />
        ))}
      </div>

      {/* GitHub CTA */}
      <div style={{ textAlign: 'center' }}>
        <motion.a
          href="https://github.com/VertigoVX"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.875rem 2rem',
            borderRadius: '100px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'border-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.color = 'var(--accent)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-primary)'
          }}
        >
          <GitHubIcon size={17} />
          View All on GitHub
        </motion.a>
      </div>
    </section>
  )
}
