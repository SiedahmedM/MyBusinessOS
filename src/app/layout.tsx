import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'MyBusinessOS - Expert Developer • Orange County',
  description: 'I build custom business software that transforms operations for Orange County companies. Enterprise-quality solutions at freelancer prices with faster delivery.',
  keywords: 'Orange County developer, business software, custom CRM, inventory management, automation, Next.js developer',
  authors: [{ name: 'MyBusinessOS' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#667eea',
  openGraph: {
    title: 'MyBusinessOS - Expert Developer • Orange County',
    description: 'I build custom business software that transforms operations for Orange County companies.',
    type: 'website',
    locale: 'en_US',
    siteName: 'MyBusinessOS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyBusinessOS - Expert Developer • Orange County',
    description: 'Custom business software that transforms operations',
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