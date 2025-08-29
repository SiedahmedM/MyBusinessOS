import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Custom Software Development - Any Software You Can Imagine | MyBusinessOS',
  description: 'I build custom software solutions: business systems, mobile apps, SaaS platforms, e-commerce sites, and AI automation. From idea to reality in weeks, not months. Enterprise-level solutions at freelancer prices.',
  keywords: 'custom software development, SaaS development, mobile app development, business software, AI automation, e-commerce development, analytics dashboard, agency to saas, Orange County developer, enterprise software',
  authors: [{ name: 'MyBusinessOS' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#667eea',
  openGraph: {
    title: 'Custom Software Development - Any Software You Can Imagine',
    description: 'I build custom software solutions: business systems, mobile apps, SaaS platforms, e-commerce sites, and AI automation. From idea to reality in weeks.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MyBusinessOS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Custom Software Development - Any Software You Can Imagine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Software Development - Any Software You Can Imagine',
    description: 'I build custom software solutions: business systems, mobile apps, SaaS platforms, e-commerce sites, and AI automation.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
        <Toaster 
          position="top-center" 
          richColors 
          closeButton
          duration={4000}
        />
      </body>
    </html>
  )
}