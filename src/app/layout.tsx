import type { Metadata, Viewport } from 'next'
import { Toaster } from 'sonner'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://CustomSoftwarePro.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: 'Custom Software Pro',
  description: '...'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth bg-black" data-theme="full-dark">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
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