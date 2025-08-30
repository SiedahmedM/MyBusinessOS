import type { Metadata, Viewport } from 'next'
import { Toaster } from 'sonner'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://CustomSoftwarePro.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#667eea',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Custom Software Development - Any Software You Can Imagine | CustomSoftwarePro',
    template: '%s | CustomSoftwarePro',
  },
  description: 'I build custom software solutions: business systems, mobile apps, SaaS platforms, e-commerce sites, and AI automation. From idea to reality in weeks, not months. Enterprise-level solutions at freelancer prices.',
  keywords: 'custom software development, SaaS development, mobile app development, business software, AI automation, e-commerce development, analytics dashboard, agency to saas, Orange County developer, enterprise software',
  authors: [{ name: 'CustomSoftwarePro', url: siteUrl }],
  creator: 'CustomSoftwarePro',
  publisher: 'CustomSoftwarePro',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'Custom Software Development - Any Software You Can Imagine',
    description: 'I build custom software solutions: business systems, mobile apps, SaaS platforms, e-commerce sites, and AI automation. From idea to reality in weeks.',
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'CustomSoftwarePro',
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
    site: '@CustomSoftwarePro',
    creator: '@CustomSoftwarePro',
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
    <html lang="en" className="scroll-smooth" data-theme="full-dark">
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