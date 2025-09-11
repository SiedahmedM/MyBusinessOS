import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17535615667"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'AW-17535615667');`}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1136854395176930');
fbq('track', 'PageView');`}
        </Script>
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1136854395176930&ev=PageView&noscript=1" />',
          }}
        />
        {children}
        <Analytics />
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