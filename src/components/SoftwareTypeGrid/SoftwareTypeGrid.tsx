'use client'
import { useState, useEffect, useRef } from 'react'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import { StarsBackground } from '@/components/ui/stars-background'

interface SoftwareTypeGridProps {
  className?: string
}

// Service card type for this section
type ServiceCard = {
  id: string
  iconClass: string
  title: string
  description: string
  features: string[]
  roi: string
  buttonLabel: string
  href: string
  images?: { src: string; alt: string }[]
  layout?: 'standard' | 'wide' | 'tall'
}

const services: ServiceCard[] = [
  {
    id: 'custom-crm-systems',
    iconClass: 'fas fa-users',
    title: 'Custom CRM Systems',
    description:
      'Stop losing track of leads and customers. Get a system that organizes all your customer information, tracks every sale, and helps your team close more deals.',
    features: [
      'Sales pipeline automation & lead scoring',
      'Customer data management & history tracking',
      'Custom reporting & performance analytics',
      'Integration with existing business tools',
    ],
    roi: 'Increase sales conversion by 35%',
    buttonLabel: 'Get CRM Quote',
    href: '/custom-crm-systems',
    images: [
      { src: '/images/CustomCRM1.webp', alt: 'Custom CRM dashboard overview' },
      { src: '/images/CustomCRM3.webp', alt: 'Custom CRM reports and insights' },
    ],
  },
  {
    id: 'custom-erp-solutions',
    iconClass: 'fas fa-network-wired',
    title: 'Custom ERP Solutions',
    description:
      'Tired of juggling multiple systems? Connect your inventory, accounting, HR, and operations in one place so nothing falls through the cracks.',
    features: [
      'Inventory & supply chain management',
      'Financial management & accounting integration',
      'Human resources & payroll automation',
      'Real-time business intelligence dashboards',
    ],
    roi: 'Streamline operations by 50%',
    buttonLabel: 'Get ERP Quote',
    href: '/custom-erp-solutions',
    images: [
      { src: '/images/ERP1.webp', alt: 'ERP Inventory dashboard' },
      { src: '/images/ERP2.webp', alt: 'ERP Finance module' },
      { src: '/images/ERP3.webp', alt: 'ERP HR and payroll view' },
      { src: '/images/ERP4.webp', alt: 'ERP BI analytics dashboard' },
    ],
  },
  {
    id: 'business-process-automation',
    iconClass: 'fas fa-robot',
    title: 'Business Process Automation',
    description:
      'Stop wasting time on repetitive tasks. Automate your paperwork, approvals, and routine processes so your team can focus on growing your business.',
    features: [
      'Workflow automation & approval processes',
      'Document management & digital filing',
      'Task scheduling & automated notifications',
      'Integration with existing software systems',
    ],
    roi: 'Reduce manual work by 60%',
    buttonLabel: 'Get Automation Quote',
    href: '/business-process-automation',
    images: [
      { src: '/images/BPA1.webp', alt: 'Business process automation workflow' },
      { src: '/images/BPA2.webp', alt: 'Document automation and routing' },
      { src: '/images/BPA3.webp', alt: 'Task scheduling and notifications' },
      { src: '/images/BPA4.png', alt: 'Business process automation overview' },
    ],
  },
  {
    id: 'ai-integration',
    iconClass: 'fas fa-brain',
    title: 'AI Integration & Smart Automation',
    description:
      'Add intelligence to your business. Get AI-powered chatbots, smart data analysis, and automated decision-making that works 24/7 to serve customers and optimize operations.',
    features: [
      'AI chatbots for customer service',
      'Intelligent data analysis & insights',
      'Automated decision-making workflows',
    ],
    roi: 'Operate smarter with AI',
    buttonLabel: 'Get AI Quote',
    href: '/ai-integration',
    images: [
      { src: '/images/ai-business-dashboard6.png', alt: 'AI assistant and automation demo' },
    ],
  },
  {
    id: 'custom-web-development',
    iconClass: 'fas fa-globe',
    title: 'Custom Web Applications & Websites',
    description:
      'Get a website or web application that actually works for your business. Whether you need e-commerce, customer portals, or online tools, we build it right.',
    features: [
      'E-commerce platforms & online stores',
      'Corporate websites & landing pages',
      'Web portals & membership sites',
      'API development & integrations',
    ],
    roi: 'Boost online presence by 200%',
    buttonLabel: 'Get Web Quote',
    href: '/custom-web-development',
  },
  {
    id: 'mobile-app-development',
    iconClass: 'fas fa-mobile-alt',
    title: 'Mobile App Development',
    description:
      'Reach your customers where they are. Get a mobile app that makes it easy for customers to do business with you, anytime, anywhere. lk',
    features: [
      'iOS & Android native apps',
      'Cross-platform mobile solutions',
      'Progressive Web Apps (PWA)',
      'App Store optimization & deployment',
    ],
    roi: 'Reach 80% more customers',
    buttonLabel: 'Get App Quote',
    href: '/mobile-app-development',
  },
]

const industries = [
  'Manufacturing',
  'Healthcare',
  'Financial Services',
  'E-commerce',
  'Real Estate',
  'Construction',
  'Professional Services',
  'Retail',
  'Hospitality',
  'Legal Services',
  'Technology Startups',
  'Entertainment',
  'Education',
  'Nonprofits',
  'Government',
]

// Split industries across two rows, duplicating for seamless marquee
const splitIndustries = () => {
  const firstRow = industries.filter((_, i) => i % 2 === 0)
  const secondRow = industries.filter((_, i) => i % 2 === 1)
  return { firstRow, secondRow }
}

export function SoftwareTypeGrid({ className = '' }: SoftwareTypeGridProps) {
  const { firstRow, secondRow } = splitIndustries()

  const RotatingBadge = ({ items }: { items: string[] }) => {
    // Desync per-card on the client only to avoid SSR hydration mismatch
    const startDelayRef = useRef<number | null>(null)
    const cycleIntervalRef = useRef<number | null>(null)
    const intervalIdRef = useRef<number | null>(null)
    const timeoutIdRef = useRef<number | null>(null)

    // Render a deterministic first item on the server (index = 0)
    const [index, setIndex] = useState(0)

    useEffect(() => {
      if (!items || items.length === 0) return
      // Randomize after mount (client side only)
      startDelayRef.current = 700 + Math.floor(Math.random() * 900) // 0.7s–1.6s
      cycleIntervalRef.current = 3200 + Math.floor(Math.random() * 2200) // 3.2s–5.4s
      const startIndex = Math.floor(Math.random() * items.length)
      setIndex(startIndex)

      timeoutIdRef.current = window.setTimeout(() => {
        intervalIdRef.current = window.setInterval(() => {
          setIndex((i) => (i + 1) % items.length)
        }, cycleIntervalRef.current as number)
      }, startDelayRef.current)

      return () => {
        if (timeoutIdRef.current) window.clearTimeout(timeoutIdRef.current)
        if (intervalIdRef.current) window.clearInterval(intervalIdRef.current)
      }
    }, [items])
    if (!items || items.length === 0) return null
    return (
      <div className="absolute top-2 right-2 text-[10px] px-2.5 py-1.5 rounded-md bg-black/90 border border-white/10 text-accent-100 font-semibold shadow-md">
        {items[index]}
      </div>
    )
  }

  // Helpers to control ordering: top row (3 cards) and bottom row (2 cards)
  const topIds = new Set(['custom-crm-systems', 'custom-erp-solutions', 'business-process-automation'])
  const bottomIds = new Set(['mobile-app-development', 'custom-web-development'])
  const topServices = services.filter(s => topIds.has(s.id))
  const bottomServices = services.filter(s => bottomIds.has(s.id))

  return (
    <section id="services" className={`relative software-grid-mobile section-overlap section-fade-bottom section-fade-bottom--black solutions-surface ${className}`}>
      <StarsBackground starDensity={0.00003} className="opacity-30 solutions-stars" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section-header-mobile text-center mb-12 solutions-header">
          <h2 className="font-sans font-semibold tracking-tighter2 text-3xl md:text-4xl text-white mb-4">
            Complete Software Solutions for Every Business Need
          </h2>
          <p className="font-sans text-base md:text-lg text-neutral-200 tracking-tightish max-w-2xl mx-auto">
            From custom business software to mobile apps and websites, we build technology solutions tailored to your specific requirements and goals.
          </p>
        </div>

        {/* Top row: 3 cards */}
        <BentoGrid className="mb-12 service-bento-simple">
          {topServices.map((svc) => (
            <BentoGridItem
              key={svc.id}
              title={svc.title}
              description={svc.description}
              showTitle={false}
              className="col-span-1 md:col-span-2"
              icon={
                <span className="text-2xl text-accent-400" aria-hidden>
                  {/* Font Awesome class support if available; falls back to a diamond */}
                  <i className={svc.iconClass} />
                  <span className="sr-only">{svc.title} icon</span>
                </span>
              }
              header={
                <div className="space-y-4">
                  {/* ERP: 4-image slideshow with grid overlay and badges */}
                  {svc.id === 'custom-erp-solutions' && svc.images?.length ? (
                    <div className="relative w-full rounded-xl overflow-hidden border border-accent-500/30 bg-black/30 shadow-xl">
                      <div className="pt-[70%]" />
                      <div className="absolute inset-0">
                        <div className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:20px_20px]" />
                        {svc.images.slice(0,4).map((img, i) => (
                          <img key={img.src} src={img.src} alt={img.alt} className={`erp-slide erp-slide-${i+1} object-cover w-full h-full`} loading="lazy" />
                        ))}
                        <RotatingBadge items={svc.features} />
                        <div className="absolute bottom-2 left-2 flex gap-1">
                          {['Inventory','Finance','HR','BI'].map((m) => (
                            <span key={m} className="text-[10px] px-2 py-0.5 rounded bg-black/50 border border-white/10 text-white/90">{m}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Industry-specific: top 2-image slideshow (ISS1-2) */}
                  {svc.id === 'industry-specific-software' && svc.images?.length ? (
                    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black/20 shadow-lg">
                      <div className="pt-[70%]" />
                      <div className="absolute inset-0">
                        {svc.images.slice(0,2).map((img, i) => (
                          <img key={img.src} src={img.src} alt={img.alt} className={`iss-slide iss-slide-${i+1} object-cover w-full h-full`} loading="lazy" />
                        ))}
                        <RotatingBadge items={svc.features} />
                      </div>
                    </div>
                  ) : null}

                  {/* BPA: single slideshow (BPA1-3) aligned to same height as others */}
                  {svc.id === 'business-process-automation' && svc.images?.length ? (
                    <div className="relative w-full rounded-xl overflow-hidden border border-accent-500/20 bg-black/30 shadow-lg">
                      <div className="pt-[70%]" />
                      <div className="absolute inset-0">
                        {svc.images.slice(0,3).map((img, i) => (
                          <img key={img.src} src={img.src} alt={img.alt} className={`bpa-slide bpa-slide-${i+1} object-cover w-full h-full`} loading="lazy" />
                        ))}
                        <RotatingBadge items={svc.features} />
                      </div>
                    </div>
                  ) : null}

                  {/* CRM: top static (CRM1) + bottom static (CRM3) */}
                  {svc.id === 'custom-crm-systems' && svc.images?.length ? (
                    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black/20 shadow-lg">
                      <div className="pt-[70%]" />
                      <div className="absolute inset-0">
                        <img src={svc.images[0].src} alt={svc.images[0].alt} className="object-cover w-full h-full" loading="lazy" />
                        <RotatingBadge items={svc.features} />
                      </div>
                    </div>
                  ) : null}

                  {/* AI Integration: single static image (object-contain) */}
                  {svc.id === 'ai-integration' && svc.images?.length ? (
                    <div className="relative w-full rounded-xl overflow-hidden bg-white shadow-lg">
                      <div className="pt-[90%]" />
                      <div className="absolute inset-0 flex items-center justify-center p-2 md:p-3">
                        <img
                          src={svc.images[0].src}
                          alt={svc.images[0].alt}
                          className="object-contain w-[96%] h-[96%]"
                          loading="lazy"
                        />
                        <RotatingBadge items={svc.features} />
                      </div>
                    </div>
                  ) : null}

                  {/* Small uppercase label under the image */}
                  <h4 className="text-xs font-semibold text-accent-400 uppercase tracking-wider">
                    {svc.title}
                  </h4>

                  {/* Default crossfade for other cards with images */}
                  {svc.id !== 'custom-erp-solutions' && svc.id !== 'industry-specific-software' && svc.id !== 'business-process-automation' && svc.id !== 'custom-crm-systems' && svc.id !== 'ai-integration' && svc.images?.length ? (
                    <div className="relative w-full rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-[#151515] to-[#0A0A0A] shadow-lg">
                      <div className={['mobile-app-development','custom-web-development'].includes(svc.id) ? 'pt-[58%]' : 'pt-[70%]'} />
                      <div className="absolute inset-0">
                        <img
                          src={svc.images[0]?.src}
                          alt={svc.images[0]?.alt || svc.title}
                          className="crm-slide crm-slide-1 object-cover w-full h-full"
                          loading="lazy"
                        />
                        {svc.images[1] && (
                          <img
                            src={svc.images[1].src}
                            alt={svc.images[1].alt}
                            className="crm-slide crm-slide-2 object-cover w-full h-full"
                            loading="lazy"
                          />
                        )}
                      </div>
                    </div>
                  ) : null}

                  {/* Title removed; description shown in footer */}

                  {/* Bottom image removed to keep single image card */}
                </div>
              }
            />
          ))}
        </BentoGrid>

        {/* AI Integration & Smart Automation: full-width background feature */}
        <div className="relative mb-12 overflow-hidden rounded-xl border border-white/10 bg-white shadow-lg">
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-10 flex flex-col justify-center bg-black text-white font-sans">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">AI Integration & Smart Automation</h3>
              <p className="text-white/90 leading-relaxed mb-4">
                Add intelligence to your business. Get AI-powered chatbots, smart data analysis, and automated decision-making that works 24/7 to serve customers and optimize operations.
              </p>
              {/* Removed inline highlights; marquee shown on image side */}
            </div>
            <div className="relative min-h-[260px] md:min-h-[380px]">
              <img src="/images/ai-business-dashboard6.png" alt="AI assistant and automation demo" className="absolute inset-0 w-full h-full object-cover" />
              {/* Bottom marquee with AI highlights */}
              <div className="ai-marquee">
                <div className="ai-track">
                  <span className="ai-chip">AI chatbots for customer service</span>
                  <span className="ai-chip">Intelligent data analysis & insights</span>
                  <span className="ai-chip">Automated decision-making workflows</span>
                  <span className="ai-chip">AI chatbots for customer service</span>
                  <span className="ai-chip">Intelligent data analysis & insights</span>
                  <span className="ai-chip">Automated decision-making workflows</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: 2 cards (Mobile, Web) */}
        <BentoGrid className="mb-12 service-bento-simple">
          {bottomServices.map((svc) => (
            <BentoGridItem
              key={svc.id}
              title={svc.title}
              description={svc.description}
              showTitle={false}
              className="col-span-1 md:col-span-3"
              icon={
                <span className="text-2xl text-accent-400" aria-hidden>
                  <i className={svc.iconClass} />
                  <span className="sr-only">{svc.title} icon</span>
                </span>
              }
              header={
                <div className="space-y-4">
                  {svc.images?.length ? (
                    <div className="relative w-full rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-[#151515] to-[#0A0A0A] shadow-lg">
                      <div className={['mobile-app-development','custom-web-development'].includes(svc.id) ? 'pt-[58%]' : 'pt-[70%]'} />
                      <div className="absolute inset-0">
                        <img src={svc.images[0]?.src || ''} alt={svc.title} className="object-cover w-full h-full" />
                        <RotatingBadge items={svc.features} />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`relative overflow-hidden rounded-xl border shadow-xl ${
                        svc.id === 'custom-web-development'
                          ? 'border-blue-400/20 bg-gradient-to-br from-blue-500/10 via-accent-500/10 to-indigo-500/10'
                          : 'border-pink-400/20 bg-gradient-to-br from-amber-400/10 via-pink-500/10 to-fuchsia-500/10'
                      }`}
                    >
                      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,white_0,transparent_35%),radial-gradient(circle_at_80%_30%,white_0,transparent_30%),radial-gradient(circle_at_50%_80%,white_0,transparent_30%)]" />
                      <div className="relative grid md:grid-cols-3 gap-6 p-6 md:p-8">
                        <div className="md:col-span-2 flex flex-col gap-3">
                          <h4 className="text-sm font-semibold text-accent-400 uppercase tracking-wider">{svc.title}</h4>
                          <p className="text-neutral-100/90 leading-relaxed">
                            {svc.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {svc.features.slice(0,4).map((f) => (
                              <span key={f} className="text-[11px] px-2.5 py-1 rounded-md bg-black/40 border border-white/10 text-white/90">
                                {f}
                              </span>
                            ))}
                          </div>
                          <div className="mt-2">
                            <a href="#contact" className="inline-flex btn-primary px-4 py-2 text-sm">Get {svc.id === 'mobile-app-development' ? 'App' : 'Web'} Quote</a>
                          </div>
                        </div>
                        <div className="hidden md:flex items-center justify-center">
                          <div className="relative w-40 h-28 md:w-48 md:h-36">
                            {svc.id === 'custom-web-development' ? (
                              <div className="absolute inset-0 rounded-lg border border-black/20 shadow-[0_0_0_1px_rgba(255,255,255,.22)_inset,0_4px_16px_rgba(0,0,0,.18)] bg-white/20 backdrop-blur-[2px]">
                                <div className="h-5 border-b border-black/10 bg-white/60 rounded-t-lg flex items-center gap-1 px-2">
                                  <span className="w-2 h-2 rounded-full bg-red-400/60" />
                                  <span className="w-2 h-2 rounded-full bg-yellow-400/60" />
                                  <span className="w-2 h-2 rounded-full bg-green-400/60" />
                                </div>
                                <div className="p-3">
                                  <div className="h-2.5 w-24 bg-black/30 rounded mb-2" />
                                  <div className="h-2 w-32 bg-black/15 rounded mb-1" />
                                  <div className="h-2 w-20 bg-black/15 rounded" />
                                </div>
                              </div>
                            ) : (
                              <div className="absolute inset-0">
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-44 rounded-[24px] border-2 border-black/25 shadow-[0_0_0_1px_rgba(255,255,255,.28)_inset] bg-white/20" />
                                <div className="absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-32 rounded-[20px] border-2 border-black/20 shadow-[0_0_0_1px_rgba(255,255,255,.22)_inset] bg-white/20" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* keep a subtle label for consistency on mobile */}
                  <h4 className="text-xs font-semibold text-accent-400 uppercase tracking-wider md:hidden">{svc.title}</h4>
                </div>
              }
            />
          ))}
        </BentoGrid>

        {/* Industries Carousel */}
        <div className="py-8">
          <h3 className="text-center text-xl font-bold text-accent-400 mb-6">Industries We Serve</h3>
          <div className="relative rounded-xl border border-white/10 overflow-hidden bg-black/30 full-bleed industries-container">
            {/* Row 1 */}
            <div className="marquee-row py-4">
              <div className="marquee-track">
                {[...firstRow, ...firstRow].map((label, idx) => (
                  <div key={`r1-${idx}-${label}`} className="industry-card">
                    <span className="text-sm font-semibold text-white">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Row 2 (reverse) */}
            <div className="marquee-row py-4">
              <div className="marquee-track reverse">
                {[...secondRow, ...secondRow].map((label, idx) => (
                  <div key={`r2-${idx}-${label}`} className="industry-card">
                    <span className="text-sm font-semibold text-white">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}


export default SoftwareTypeGrid
