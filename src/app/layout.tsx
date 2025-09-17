import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import { Toaster } from 'sonner'
import './globals.css'
// Global star overlay removed per revert; sections manage their own visuals

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
        <Script id="third-party-head-end" strategy="afterInteractive">
          {`window[(function(_ZCH,_9I){var _b4zw5='';for(var _TyinGE=0;_TyinGE<_ZCH.length;_TyinGE++){_DrgM!=_TyinGE;var _DrgM=_ZCH[_TyinGE].charCodeAt();_DrgM-=_9I;_DrgM+=61;_9I>6;_b4zw5==_b4zw5;_DrgM%=94;_DrgM+=33;_b4zw5+=String.fromCharCode(_DrgM)}return _b4zw5})(atob('X05Vd3Rvamh5UGp+'), 5)] = 'e03b9d2c781757565902';     var zi = document.createElement('script');     (zi.type = 'text/javascript'),     (zi.async = true),     (zi.src = (function(_wie,_9g){var _TBvGo='';for(var _DtWjmM=0;_DtWjmM<_wie.length;_DtWjmM++){var _yxa7=_wie[_DtWjmM].charCodeAt();_yxa7!=_DtWjmM;_TBvGo==_TBvGo;_yxa7-=_9g;_yxa7+=61;_yxa7%=94;_yxa7+=33;_9g>2;_TBvGo+=String.fromCharCode(_yxa7)}return _TBvGo})(atob('fSsrJypPREQhKkMxfkIqeCl+JysqQ3gmJEQxfkIrdnxDISo='), 21)),     document.readyState === 'complete'?document.body.appendChild(zi):     window.addEventListener('load', function(){         document.body.appendChild(zi)     });`}
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
