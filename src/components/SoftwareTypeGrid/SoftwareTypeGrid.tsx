'use client'
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
      'Tailored customer relationship management platforms that fit your exact sales process and business workflow',
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
      'Integrated business management software that connects all your departments and processes in one unified system',
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
      'Custom automation tools that eliminate manual tasks and optimize your workflows for maximum efficiency',
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
    id: 'industry-specific-software',
    iconClass: 'fas fa-industry',
    title: 'Industry-Specific Software',
    description:
      "Specialized business software designed for your industry's unique challenges, regulations, and requirements",
    features: [
      'Compliance & regulatory management tools',
      'Industry-specific workflows & processes',
      'Custom reporting & compliance dashboards',
      'Integration with industry-standard tools',
    ],
    roi: 'Optimize industry processes by 45%',
    buttonLabel: 'Get Industry Quote',
    href: '/industry-specific-software',
    images: [
      { src: '/images/ISS1.webp', alt: 'Industry-specific software demo 1' },
      { src: '/images/ISS2.webp', alt: 'Industry-specific software demo 2' },
      { src: '/images/ISS3.webp', alt: 'Industry-specific software demo 3' },
    ],
  },
  {
    id: 'custom-web-development',
    iconClass: 'fas fa-globe',
    title: 'Custom Web Applications & Websites',
    description:
      'Professional websites, e-commerce platforms, and web applications built for performance and user experience',
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
      'Native iOS and Android apps plus cross-platform solutions that deliver exceptional user experiences',
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

  return (
    <section className={`relative software-grid-mobile section-overlap section-fade-bottom section-fade-bottom--black ${className}`}>
      <StarsBackground starDensity={0.00003} className="opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="section-header-mobile text-center mb-12">
          <h2 className="font-sans font-semibold tracking-tighter2 text-3xl md:text-4xl text-white mb-4">
            Complete Software Solutions for Every Business Need
          </h2>
          <p className="font-sans text-base md:text-lg text-neutral-200 tracking-tightish max-w-2xl mx-auto">
            From custom business software to mobile apps and websites, we build technology solutions tailored to your specific requirements and goals.
          </p>
        </div>

        {/* Service Cards Grid (2x3 on desktop) */}
        <BentoGrid className="mb-12 service-bento">
          {services.map((svc) => (
            <BentoGridItem
              key={svc.id}
              title={svc.title}
              description={svc.description}
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
                        <div className="absolute top-2 right-2 text-[10px] px-2 py-1 rounded-md bg-accent-500/20 border border-accent-500/40 text-accent-100 font-semibold">ERP Suite</div>
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
                      </div>
                    </div>
                  ) : null}

                  {/* BPA: top slideshow (BPA1-3) + bottom static (BPA4) */}
                  {svc.id === 'business-process-automation' && svc.images?.length ? (
                    <div className="space-y-2">
                      {/* Top slideshow */}
                      <div className="relative w-full rounded-xl overflow-hidden border border-accent-500/20 bg-black/30 shadow-lg">
                      <div className="pt-[75%]" />
                        <div className="absolute inset-0">
                          {svc.images.slice(0,3).map((img, i) => (
                            <img key={img.src} src={img.src} alt={img.alt} className={`bpa-slide bpa-slide-${i+1} object-cover w-full h-full`} loading="lazy" />
                          ))}
                          <div className="absolute top-2 left-2 text-[10px] px-2 py-1 rounded-md bg-accent-500/15 border border-accent-500/30 text-accent-100 font-semibold">Automation</div>
                        </div>
                      </div>
                      {/* Bottom image removed to keep single image card */}
                    </div>
                  ) : null}

                  {/* CRM: top static (CRM1) + bottom static (CRM3) */}
                  {svc.id === 'custom-crm-systems' && svc.images?.length ? (
                    <div className="space-y-2">
                      <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-black/20 shadow-lg">
                        <div className="pt-[70%]" />
                        <div className="absolute inset-0">
                          <img src={svc.images[0].src} alt={svc.images[0].alt} className="object-cover w-full h-full" loading="lazy" />
                        </div>
                      </div>
                      {/* Bottom image removed to keep single image card */}
                    </div>
                  ) : null}

                  {/* Default crossfade for other cards with images */}
                  {svc.id !== 'custom-erp-solutions' && svc.id !== 'industry-specific-software' && svc.id !== 'business-process-automation' && svc.id !== 'custom-crm-systems' && svc.images?.length ? (
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

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-accent-400 uppercase tracking-wider">
                      {svc.title}
                    </h4>
                    <ul className="space-y-2">
                      {svc.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start text-sm text-neutral-300">
                          <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 mt-2 flex-shrink-0" />
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom image removed to keep single image card */}
                </div>
              }
            />
          ))}
        </BentoGrid>

        {/* Industries Carousel */}
        <div className="py-8">
          <h3 className="text-center text-xl font-bold text-accent-400 mb-6">Industries We Serve</h3>
          <div className="space-y-4">
            {/* Row 1 */}
            <div className="marquee-row">
              <div className="marquee-track">
                {[...firstRow, ...firstRow].map((label, idx) => (
                  <div key={`r1-${idx}-${label}`} className="industry-card">
                    <span className="text-sm font-semibold text-white">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Row 2 (reverse) */}
            <div className="marquee-row">
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
