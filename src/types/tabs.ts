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
    id: 'business-management',
    title: 'Business Management System',
    icon: '◆',
    description: 'Complete business operations platform',
    examples: ['CRM', 'Inventory Management', 'Employee Scheduling', 'Customer Portal'],
    roiExample: 'Save 20+ hours/week, increase revenue 40%',
    caseStudy: 'adams-muffler'
  },
  {
    id: 'agency-to-saas',
    title: 'Turn My Agency Into SaaS',
    icon: '◆',
    description: 'Convert your service into recurring revenue',
    examples: ['Client Dashboards', 'Automated Reporting', 'White-label Platform', 'Subscription Billing'],
    roiExample: 'Scale to $50K/month recurring revenue',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Platform',
    icon: '◆',
    description: 'Custom online store that converts',
    examples: ['Product Catalogs', 'Payment Processing', 'Inventory Sync', 'Customer Analytics'],
    roiExample: 'Outperform Shopify by 60% conversion',
    caseStudy: 'bellas-restaurant'
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    icon: '◆',
    description: 'iOS/Android apps your customers love',
    examples: ['Native Performance', 'Offline Sync', 'Push Notifications', 'App Store Ready'],
    roiExample: 'Reach 80% more customers on mobile'
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    icon: '◆',
    description: 'Turn data into actionable insights',
    examples: ['Real-time Metrics', 'Custom Reports', 'Data Visualization', 'Automated Alerts'],
    roiExample: 'Make decisions 10x faster with data'
  },
  {
    id: 'ai-automation',
    title: 'AI/Automation Tool',
    icon: '◆',
    description: 'Eliminate repetitive tasks with AI',
    examples: ['Document Processing', 'Email Automation', 'Data Entry', 'Customer Support'],
    roiExample: 'Automate 80% of manual work'
  }
]