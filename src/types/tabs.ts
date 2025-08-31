export interface Tab {
  id: 'solutions' | 'process' | 'pricing'
  title: string
  description: string
  icon: string
  href: string
}

export interface SoftwareType {
  id: string
  title: string
  icon: string
  description: string
  examples: string[]
  roiExample: string
  size?: 'standard' | 'large'
  caseStudy?: string
}

export interface PortfolioProject {
  id: string
  title: string
  category: string
  industry: string
  challenge: string
  solution: string
  results: ProjectMetric[]
  technologies: string[]
  timeline: string
  images: string[]
  testimonial?: Testimonial
}

export interface ProjectMetric {
  label: string
  value: string
  period: string
}

export interface Testimonial {
  quote: string
  author: string
  position: string
  company: string
  rating?: number
  image?: string
}

export interface ProcessStep {
  number: number
  title: string
  duration: string
  activities: string[]
  deliverable: string
}

export interface PricingTier {
  id: 'simple' | 'standard' | 'complex'
  range: string
  timeline: string
  examples: string[]
  features: string[]
}

export interface QuickROIInputs {
  softwareType: string
  monthlyRevenue: number
  hoursSpentManually: number
  teamSize: number
}

export interface ROIResult {
  investment: string
  yearlySavings: string
  roi: string
  breakdown: string
  paybackPeriod: string
}

export interface ROIExample {
  investment: string
  yearlyValue: string
  roi: string
  breakdown: string
}

export const primaryTabs: Tab[] = [
  { id: 'solutions', title: 'Solutions', description: 'What I build & examples', icon: '◆', href: '#solutions' },
  { id: 'process', title: 'Process', description: 'How we work together', icon: '◆', href: '#process' },
  { id: 'pricing', title: 'Pricing', description: 'Investment & ROI', icon: '◆', href: '#pricing' }
]

export const softwareTypes: SoftwareType[] = [
  {
    id: 'business-hub',
    title: 'All-in-One Business Hub',
    icon: '◆',
    description: 'Run your business from one place',
    examples: [
      'Keep track of customers & sales',
      'Manage inventory without spreadsheets',
      'Easily schedule & manage your team'
    ],
    roiExample: 'Save 20+ hours each week, boost revenue by 40%',
    size: 'standard',
    caseStudy: 'adams-muffler'
  },
  {
    id: 'agency-saas',
    title: 'Turn Your Service Into Recurring Income',
    icon: '◆',
    description: 'Stop trading time for money — build a platform',
    examples: [
      'Give clients self-serve dashboards',
      'Automate reports so you don\'t have to',
      'Sell under your own brand (white-label)'
    ],
    roiExample: 'Grow to $50K/month predictable revenue',
    size: 'standard'
  },
  {
    id: 'ecommerce',
    title: 'Online Store That Sells More',
    icon: '◆',
    description: 'A smarter store built around conversions',
    examples: [
      'Showcase products beautifully',
      'Accept payments securely',
      'Sync inventory automatically'
    ],
    roiExample: 'Beat Shopify by 60% in conversions',
    size: 'standard',
    caseStudy: 'bellas-restaurant'
  },
  {
    id: 'mobile-app',
    title: 'Mobile App for Your Business',
    icon: '◆',
    description: 'Be on the phones your customers use every day',
    examples: [
      'Fast, reliable performance',
      'Works even offline',
      'Send instant push notifications'
    ],
    roiExample: 'Reach 80% more customers on mobile',
    size: 'standard'
  },
  {
    id: 'automation',
    title: 'Let Software Handle the Boring Work',
    icon: '◆',
    description: 'Free your team from repetitive tasks',
    examples: [
      'Process documents instantly',
      'Automate customer emails',
      'Enter data without manual typing'
    ],
    roiExample: 'Cut 80% of manual work',
    size: 'large'
  },
  {
    id: 'ai-services',
    title: 'Bring AI Into Your Business',
    icon: '◆',
    description: 'Use AI to work smarter, not harder',
    examples: [
      'Chatbots that answer customer questions 24/7',
      'Smart tools to summarize and draft documents',
      'Predict trends from your business data'
    ],
    roiExample: 'Save 100+ hours/year, unlock new revenue',
    size: 'large'
  }
]