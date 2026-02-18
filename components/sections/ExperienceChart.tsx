'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useTheme } from 'next-themes'
import SectionTitle from '@/components/ui/SectionTitle'
import { chartData } from '@/lib/data'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

export default function ExperienceChart() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <section id="chart" className="section-container">
        <SectionTitle title="Experience & Growth" subtitle="My career progression over time" />
        <div style={{ height: 320 }} />
      </section>
    )
  }

  const isDark = resolvedTheme !== 'light'
  const accentColor = isDark ? '#00eaff' : '#0066cc'
  const accentGlow = isDark ? 'rgba(0, 234, 255, 0.15)' : 'rgba(0, 102, 204, 0.12)'
  const gridColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
  const textColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.data,
        borderColor: accentColor,
        backgroundColor: (context: { chart: ChartJS }) => {
          const chart = context.chart
          const { ctx, chartArea } = chart
          if (!chartArea) return accentGlow
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
          gradient.addColorStop(0, accentColor.replace(')', ', 0.35)').replace('rgb', 'rgba').replace('#00eaff', 'rgba(0,234,255,0.35)').replace('#0066cc', 'rgba(0,102,204,0.3)'))
          gradient.addColorStop(1, 'transparent')
          return gradient
        },
        fill: true,
        tension: 0.45,
        pointBackgroundColor: accentColor,
        pointBorderColor: isDark ? '#080808' : '#f2f4f8',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 9,
        borderWidth: 2.5,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: isInView ? 1200 : 0,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? 'rgba(20,20,20,0.95)' : 'rgba(255,255,255,0.97)',
        borderColor: accentColor,
        borderWidth: 1,
        titleColor: accentColor,
        bodyColor: textColor,
        padding: 12,
        callbacks: {
          label: (ctx: { parsed: { y: number } }) => ` Growth: ${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: textColor, font: { size: 12, weight: 600 as const } },
        border: { display: false },
      },
      y: {
        min: 0,
        max: 100,
        grid: { color: gridColor },
        ticks: {
          color: textColor,
          font: { size: 11 },
          callback: (v: number | string) => `${v}%`,
        },
        border: { display: false },
      },
    },
  }

  return (
    <section id="chart" className="section-container">
      <SectionTitle title="Experience & Growth" subtitle="My career progression over time" />

      <div
        ref={ref}
        className="glass"
        style={{ padding: '2rem', height: '360px' }}
      >
        <Line data={data} options={options as Parameters<typeof Line>[0]['options']} />
      </div>
    </section>
  )
}
