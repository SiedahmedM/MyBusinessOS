import OpenAI from 'openai';
import type { BusinessType, AppFeature } from '@/types';

const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'placeholder-openai-key' 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export const businessTypes: BusinessType[] = [
  {
    id: 'dental',
    name: 'Dental Practice',
    icon: '🦷',
    title: 'SmartDental Pro',
    features: [
      { icon: '📅', title: 'Smart Scheduling', description: 'AI-powered appointment booking' },
      { icon: '👥', title: 'Patient Portal', description: 'Online registration and forms' },
      { icon: '💳', title: 'Insurance Claims', description: 'Automated claim processing' },
      { icon: '📊', title: 'Treatment Plans', description: 'Visual treatment planning' },
    ],
  },
  {
    id: 'auto',
    name: 'Auto Shop',
    icon: '🔧',
    title: 'AutoPro Manager',
    features: [
      { icon: '🚗', title: 'Vehicle Tracking', description: 'Complete repair history' },
      { icon: '📱', title: 'Customer Updates', description: 'SMS progress notifications' },
      { icon: '📋', title: 'Digital Inspections', description: 'Photo-based vehicle checks' },
      { icon: '💰', title: 'Instant Quotes', description: 'AI-powered pricing' },
    ],
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: '🍽️',
    title: 'RestaurantOS',
    features: [
      { icon: '📱', title: 'Online Ordering', description: 'Custom mobile ordering app' },
      { icon: '🍳', title: 'Kitchen Display', description: 'Real-time order management' },
      { icon: '🪑', title: 'Table Management', description: 'Smart reservation system' },
      { icon: '📈', title: 'Sales Analytics', description: 'Real-time performance metrics' },
    ],
  },
  {
    id: 'medical',
    name: 'Medical Practice',
    icon: '🏥',
    title: 'MediCore System',
    features: [
      { icon: '📋', title: 'Electronic Records', description: 'HIPAA-compliant patient data' },
      { icon: '💊', title: 'Prescription Manager', description: 'Digital prescription system' },
      { icon: '🩺', title: 'Telehealth Portal', description: 'Virtual consultation platform' },
      { icon: '🏥', title: 'Lab Integration', description: 'Automated lab result processing' },
    ],
  },
];

export function getBusinessByType(type: string): BusinessType | null {
  return businessTypes.find(b => b.id === type) || null;
}

export async function detectBusinessType(description: string): Promise<string> {
  // Simple keyword-based detection for demo
  const desc = description.toLowerCase();
  
  if (desc.includes('dental') || desc.includes('tooth') || desc.includes('dentist')) {
    return 'dental';
  }
  if (desc.includes('auto') || desc.includes('car') || desc.includes('repair') || desc.includes('mechanic')) {
    return 'auto';
  }
  if (desc.includes('restaurant') || desc.includes('food') || desc.includes('menu') || desc.includes('dining')) {
    return 'restaurant';
  }
  if (desc.includes('medical') || desc.includes('doctor') || desc.includes('patient') || desc.includes('clinic')) {
    return 'medical';
  }
  
  return 'dental'; // Default
}

export async function generateBusinessResponse(businessType: string, userMessage: string): Promise<string> {
  const business = getBusinessByType(businessType);
  if (!business) return "I'd love to help you build custom software for your business!";
  
  const responses = {
    dental: [
      "Perfect! I've built dental practice software that automates scheduling, manages patient records, and integrates with insurance systems. Would you like to see how it works?",
      "Dental practices love our patient portal and automated appointment reminders. I can show you exactly how it would work for your practice.",
      "I've helped several dental practices streamline their operations with custom software. The ROI is typically 300-500% in the first year!"
    ],
    auto: [
      "Auto shops are one of my specialties! I built a system for Adam's Muffler Shop that increased their revenue by 45%. Would you like to see the case study?",
      "I can build you a complete auto shop management system with customer tracking, repair history, and automated SMS updates. Very similar to what I built for Adam's shop.",
      "The auto repair software I build typically saves shop owners 15+ hours per week and increases customer satisfaction dramatically."
    ],
    restaurant: [
      "Restaurant software is incredibly impactful! I can build you online ordering, kitchen displays, and table management - all integrated with your POS system.",
      "I've seen restaurants increase revenue by 30-60% with the right software. The online ordering component alone can double your takeout business.",
      "For restaurants, I focus on customer experience and operational efficiency. The systems I build typically pay for themselves within 2-3 months."
    ],
    medical: [
      "Medical practice software is one of my core competencies. I build HIPAA-compliant systems with patient portals, telehealth, and EHR integration.",
      "Medical practices see huge efficiency gains with custom software - typically 20+ hours saved per week and much better patient satisfaction.",
      "I can build you a complete practice management system that handles everything from scheduling to billing to patient communications."
    ]
  };
  
  const businessResponses = responses[businessType as keyof typeof responses] || responses.dental;
  return businessResponses[Math.floor(Math.random() * businessResponses.length)];
}