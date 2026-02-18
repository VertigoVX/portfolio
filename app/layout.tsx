import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import CustomCursor from '@/components/ui/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tristan David | Junior Full Stack Engineer',
  description:
    'Portfolio of Tristan David — Junior Full Stack Engineer specialising in Python, React, and Next.js.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Tristan David | Portfolio',
    description: 'Junior Full Stack Engineer | Python • React • Next.js',
    url: 'https://tristandev.vercel.app',
    siteName: 'Tristan David Portfolio',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
