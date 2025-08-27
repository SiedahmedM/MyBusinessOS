import type { BusinessType, AppFeature } from '@/types';

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
    name: 'Automotive Service',
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
  {
    id: 'ecommerce',
    name: 'E-commerce Business',
    icon: '🛒',
    title: 'CommerceMax',
    features: [
      { icon: '🛒', title: 'Smart Cart', description: 'AI-powered shopping experience' },
      { icon: '📦', title: 'Inventory Sync', description: 'Real-time stock management' },
      { icon: '💳', title: 'Payment Gateway', description: 'Secure multi-payment processing' },
      { icon: '📊', title: 'Sales Analytics', description: 'Advanced conversion tracking' },
    ],
  },
  {
    id: 'rental',
    name: 'Rental Business',
    icon: '🚗',
    title: 'RentalHub Pro',
    features: [
      { icon: '📅', title: 'Booking System', description: 'Smart availability management' },
      { icon: '🚗', title: 'Asset Tracking', description: 'Real-time location monitoring' },
      { icon: '💳', title: 'Payment Processing', description: 'Automated billing and deposits' },
      { icon: '📱', title: 'Mobile Check-in', description: 'Contactless pickup/return' },
    ],
  },
  {
    id: 'realestate',
    name: 'Real Estate',
    icon: '🏠',
    title: 'PropertyPro',
    features: [
      { icon: '🏠', title: 'Listing Manager', description: 'Multi-platform property sync' },
      { icon: '👥', title: 'CRM System', description: 'Advanced client relationship tools' },
      { icon: '📱', title: 'Virtual Tours', description: '360° property showcases' },
      { icon: '📊', title: 'Market Analytics', description: 'AI-powered market insights' },
    ],
  },
  {
    id: 'fitness',
    name: 'Fitness Business',
    icon: '💪',
    title: 'FitnessPro',
    features: [
      { icon: '💪', title: 'Workout Tracking', description: 'Personalized fitness programs' },
      { icon: '📅', title: 'Class Scheduling', description: 'Smart booking and waitlists' },
      { icon: '💳', title: 'Membership Portal', description: 'Automated billing and renewals' },
      { icon: '📱', title: 'Mobile App', description: 'Custom branded fitness app' },
    ],
  },
  {
    id: 'legal',
    name: 'Legal Practice',
    icon: '⚖️',
    title: 'LegalMax',
    features: [
      { icon: '📋', title: 'Case Management', description: 'Comprehensive case tracking' },
      { icon: '⏰', title: 'Time Tracking', description: 'Automated billable hours' },
      { icon: '📄', title: 'Document Portal', description: 'Secure client file sharing' },
      { icon: '💳', title: 'Billing System', description: 'Automated invoicing and payments' },
    ],
  },
  {
    id: 'accounting',
    name: 'Accounting Firm',
    icon: '📊',
    title: 'AccountPro',
    features: [
      { icon: '📊', title: 'Financial Dashboard', description: 'Real-time client financials' },
      { icon: '📄', title: 'Tax Prep Tools', description: 'Automated tax calculations' },
      { icon: '👥', title: 'Client Portal', description: 'Secure document exchange' },
      { icon: '📱', title: 'Mobile Receipts', description: 'AI-powered expense tracking' },
    ],
  },
  {
    id: 'consulting',
    name: 'Consulting Business',
    icon: '💼',
    title: 'ConsultMax',
    features: [
      { icon: '👥', title: 'Project Management', description: 'Client project tracking' },
      { icon: '⏰', title: 'Time Tracking', description: 'Billable hours automation' },
      { icon: '📊', title: 'ROI Calculator', description: 'Client value demonstration' },
      { icon: '📱', title: 'Client Portal', description: 'Progress reporting dashboard' },
    ],
  },
  {
    id: 'retail',
    name: 'Retail Store',
    icon: '🏪',
    title: 'RetailPro',
    features: [
      { icon: '📦', title: 'Inventory Management', description: 'Smart stock level tracking' },
      { icon: '💳', title: 'POS Integration', description: 'Unified sales processing' },
      { icon: '👥', title: 'Customer Loyalty', description: 'Rewards and retention system' },
      { icon: '📊', title: 'Sales Analytics', description: 'Performance insights dashboard' },
    ],
  },
  {
    id: 'other',
    name: 'Business',
    icon: '🏢',
    title: 'BusinessPro',
    features: [
      { icon: '👥', title: 'Customer Management', description: 'Comprehensive CRM system' },
      { icon: '📊', title: 'Analytics Dashboard', description: 'Business intelligence tools' },
      { icon: '💳', title: 'Payment Processing', description: 'Secure transaction handling' },
      { icon: '📱', title: 'Mobile Solution', description: 'Custom mobile application' },
    ],
  },
];

export function getBusinessByType(type: string): BusinessType | null {
  return businessTypes.find(b => b.id === type) || null;
}

export async function detectBusinessType(description: string): Promise<string> {
  try {
    const response = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'detectBusinessType',
        message: description
      })
    });

    if (!response.ok) {
      throw new Error('Failed to detect business type');
    }

    const data = await response.json();
    return data.businessType || 'other';
    
  } catch (error) {
    console.error('Business type detection error:', error);
    
    // Enhanced fallback keyword detection
    const desc = description.toLowerCase();
    
    // E-commerce keywords
    if (desc.includes('ecommerce') || desc.includes('e-commerce') || desc.includes('online store') || 
        desc.includes('shop') || desc.includes('sell online') || desc.includes('marketplace')) {
      return 'ecommerce';
    }
    
    // Rental keywords  
    if (desc.includes('rental') || desc.includes('rent') || desc.includes('car rental') || 
        desc.includes('vacation rental') || desc.includes('equipment rental')) {
      return 'rental';
    }
    
    // Real estate keywords
    if (desc.includes('real estate') || desc.includes('property') || desc.includes('realtor') || 
        desc.includes('homes') || desc.includes('listings')) {
      return 'realestate';
    }
    
    // Fitness keywords
    if (desc.includes('gym') || desc.includes('fitness') || desc.includes('personal training') || 
        desc.includes('workout') || desc.includes('wellness')) {
      return 'fitness';
    }
    
    // Legal keywords
    if (desc.includes('law') || desc.includes('legal') || desc.includes('attorney') || 
        desc.includes('lawyer') || desc.includes('law firm')) {
      return 'legal';
    }
    
    // Accounting keywords
    if (desc.includes('accounting') || desc.includes('bookkeeping') || desc.includes('tax') || 
        desc.includes('financial') || desc.includes('cpa')) {
      return 'accounting';
    }
    
    // Consulting keywords
    if (desc.includes('consulting') || desc.includes('consultant') || desc.includes('advisory') || 
        desc.includes('strategy')) {
      return 'consulting';
    }
    
    // Retail keywords
    if (desc.includes('retail') || desc.includes('store') || desc.includes('boutique') || 
        desc.includes('merchandise')) {
      return 'retail';
    }
    
    // Original keywords
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
    
    return 'other'; // Default to 'other' instead of 'dental'
  }
}

export async function generateBusinessResponse(businessType: string, userMessage: string): Promise<string> {
  const business = getBusinessByType(businessType);
  if (!business) return "I'd love to help you build custom software for your business!";
  
  try {
    const response = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'generateResponse',
        businessType,
        userMessage
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate AI response');
    }

    const data = await response.json();
    if (data.response && data.response.length > 10) {
      return data.response;
    }
    
    throw new Error('Empty AI response');
    
  } catch (error) {
    console.error('AI response generation error:', error);
    
    // Enhanced fallback responses for all business types
    const fallbackResponses: Record<string, string> = {
      dental: "Perfect! I've built dental practice software that automates scheduling and manages patient records. The ROI is typically 300-500% in the first year! Would you like to see how it works?",
      auto: "Automotive services are one of my specialties! I've built systems that increase shop revenue by 45% through better customer tracking and automated communications. Want to see the demo?",
      restaurant: "Restaurant software is incredibly impactful! I can build you online ordering and kitchen displays that typically double takeout business. Interested to see how it works?",
      medical: "Medical practice software is one of my core competencies. I build HIPAA-compliant systems that save 20+ hours per week. Want to see the demo?",
      ecommerce: "E-commerce automation is game-changing! I've built systems that increase conversion rates by 40% and automate inventory management. Ready to see how it works?",
      rental: "Rental business software delivers incredible ROI! I've built systems that automate bookings and increase utilization by 35%. Would you like to see the demo?",
      realestate: "Real estate software transforms your business! I've built systems that automate lead management and increase closings by 50%. Want to see how it works?",
      fitness: "Fitness business automation is powerful! I've built systems that increase member retention by 60% and automate billing. Ready for a demo?",
      legal: "Legal practice software saves massive time! I've built systems that automate case management and increase billable hours by 25%. Want to see it in action?",
      accounting: "Accounting software delivers incredible efficiency! I've built systems that automate client workflows and save 20+ hours per week. Ready for a demo?",
      consulting: "Consulting business software maximizes profitability! I've built systems that streamline project management and increase client satisfaction. Want to see how?",
      retail: "Retail automation transforms operations! I've built systems that optimize inventory and increase sales by 30%. Ready to see the demo?",
      other: "Custom business software delivers amazing results! I've built systems that automate operations and typically provide 200-400% ROI. Want to see how it works?"
    };
    
    return fallbackResponses[businessType] || fallbackResponses.other;
  }
}