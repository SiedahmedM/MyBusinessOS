import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'placeholder-openai-key' 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null

export async function POST(request: NextRequest) {
  if (!openai) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { action, message, businessType, userMessage } = body

    if (action === 'detectBusinessType') {
      const prompt = `Based on this business description, classify it into one of these categories: dental, auto, restaurant, medical, ecommerce, rental, realestate, fitness, legal, accounting, consulting, retail, or other.

Business description: "${message}"

Available categories:
- dental: dental practices, dentist offices, oral health services
- auto: auto repair shops, car services, mechanic shops, automotive services
- restaurant: restaurants, food services, dining establishments, cafes, bars
- medical: medical practices, doctor offices, clinics, healthcare services, hospitals
- ecommerce: online stores, e-commerce platforms, digital marketplaces, online retail
- rental: car rentals, equipment rentals, property rentals, vacation rentals
- realestate: real estate agencies, property management, real estate services
- fitness: gyms, fitness centers, personal training, wellness centers
- legal: law firms, legal services, attorneys, legal consultants
- accounting: accounting firms, bookkeeping services, tax services, financial services
- consulting: business consulting, management consulting, advisory services
- retail: physical stores, retail shops, brick-and-mortar businesses
- other: any business that doesn't fit the above categories

Respond with only the category name. If unclear, use "other".`

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a business classification assistant. Respond with only one word: the exact category name.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 10,
        temperature: 0.1
      })

      const businessType = response.choices[0]?.message?.content?.trim().toLowerCase()
      
      // Map to our existing business types or return the detected type
      const validTypes = ['dental', 'auto', 'restaurant', 'medical', 'ecommerce', 'rental', 'realestate', 'fitness', 'legal', 'accounting', 'consulting', 'retail', 'other']
      const detectedType = validTypes.includes(businessType || '') ? businessType : 'other'
      
      return NextResponse.json({ businessType: detectedType })
      
    } else if (action === 'generateResponse') {
      
      const businessInfo = getBusinessInfo(businessType)
      
      const prompt = `You are a confident software developer who specializes in building custom business automation software. A potential client just described their ${businessInfo.name.toLowerCase()} business.

User message: "${userMessage}"
Business type: ${businessInfo.name}
Your solution is called: ${businessInfo.title}

Key features you've built for this industry:
${businessInfo.features.map(f => `${f.icon} ${f.title}: ${f.description}`).join('\n')}

Respond conversationally as if you're speaking directly to this business owner. Be enthusiastic but professional. Mention:
1. That you've built similar software for this industry
2. Specific benefits (ROI, time savings, or revenue increases)
3. Ask if they'd like to see how it works or learn more

Keep response to 1-2 sentences. Be confident and results-focused.`

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an experienced software developer who builds custom business automation solutions. Be enthusiastic, confident, and focus on results and ROI.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })

      const aiResponse = response.choices[0]?.message?.content?.trim()
      
      return NextResponse.json({ response: aiResponse })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    )
  }
}

function getBusinessInfo(businessType: string) {
  const businessTypes: Record<string, { name: string, title: string, features: Array<{icon: string, title: string, description: string}> }> = {
    dental: {
      name: 'Dental Practice',
      title: 'SmartDental Pro',
      features: [
        { icon: '📅', title: 'Smart Scheduling', description: 'AI-powered appointment booking' },
        { icon: '👥', title: 'Patient Portal', description: 'Online registration and forms' },
        { icon: '💳', title: 'Insurance Claims', description: 'Automated claim processing' },
        { icon: '📊', title: 'Treatment Plans', description: 'Visual treatment planning' },
      ]
    },
    auto: {
      name: 'Automotive Service',
      title: 'AutoPro Manager',
      features: [
        { icon: '🚗', title: 'Vehicle Tracking', description: 'Complete repair history' },
        { icon: '📱', title: 'Customer Updates', description: 'SMS progress notifications' },
        { icon: '📋', title: 'Digital Inspections', description: 'Photo-based vehicle checks' },
        { icon: '💰', title: 'Instant Quotes', description: 'AI-powered pricing' },
      ]
    },
    restaurant: {
      name: 'Restaurant',
      title: 'RestaurantOS',
      features: [
        { icon: '📱', title: 'Online Ordering', description: 'Custom mobile ordering app' },
        { icon: '🍳', title: 'Kitchen Display', description: 'Real-time order management' },
        { icon: '🪑', title: 'Table Management', description: 'Smart reservation system' },
        { icon: '📈', title: 'Sales Analytics', description: 'Real-time performance metrics' },
      ]
    },
    medical: {
      name: 'Medical Practice',
      title: 'MediCore System',
      features: [
        { icon: '📋', title: 'Electronic Records', description: 'HIPAA-compliant patient data' },
        { icon: '💊', title: 'Prescription Manager', description: 'Digital prescription system' },
        { icon: '🩺', title: 'Telehealth Portal', description: 'Virtual consultation platform' },
        { icon: '🏥', title: 'Lab Integration', description: 'Automated lab result processing' },
      ]
    },
    ecommerce: {
      name: 'E-commerce Business',
      title: 'CommerceMax',
      features: [
        { icon: '🛒', title: 'Smart Cart', description: 'AI-powered shopping experience' },
        { icon: '📦', title: 'Inventory Sync', description: 'Real-time stock management' },
        { icon: '💳', title: 'Payment Gateway', description: 'Secure multi-payment processing' },
        { icon: '📊', title: 'Sales Analytics', description: 'Advanced conversion tracking' },
      ]
    },
    rental: {
      name: 'Rental Business',
      title: 'RentalHub Pro',
      features: [
        { icon: '📅', title: 'Booking System', description: 'Smart availability management' },
        { icon: '🚗', title: 'Asset Tracking', description: 'Real-time location monitoring' },
        { icon: '💳', title: 'Payment Processing', description: 'Automated billing and deposits' },
        { icon: '📱', title: 'Mobile Check-in', description: 'Contactless pickup/return' },
      ]
    },
    realestate: {
      name: 'Real Estate',
      title: 'PropertyPro',
      features: [
        { icon: '🏠', title: 'Listing Manager', description: 'Multi-platform property sync' },
        { icon: '👥', title: 'CRM System', description: 'Advanced client relationship tools' },
        { icon: '📱', title: 'Virtual Tours', description: '360° property showcases' },
        { icon: '📊', title: 'Market Analytics', description: 'AI-powered market insights' },
      ]
    },
    fitness: {
      name: 'Fitness Business',
      title: 'FitnessPro',
      features: [
        { icon: '💪', title: 'Workout Tracking', description: 'Personalized fitness programs' },
        { icon: '📅', title: 'Class Scheduling', description: 'Smart booking and waitlists' },
        { icon: '💳', title: 'Membership Portal', description: 'Automated billing and renewals' },
        { icon: '📱', title: 'Mobile App', description: 'Custom branded fitness app' },
      ]
    },
    legal: {
      name: 'Legal Practice',
      title: 'LegalMax',
      features: [
        { icon: '📋', title: 'Case Management', description: 'Comprehensive case tracking' },
        { icon: '⏰', title: 'Time Tracking', description: 'Automated billable hours' },
        { icon: '📄', title: 'Document Portal', description: 'Secure client file sharing' },
        { icon: '💳', title: 'Billing System', description: 'Automated invoicing and payments' },
      ]
    },
    accounting: {
      name: 'Accounting Firm',
      title: 'AccountPro',
      features: [
        { icon: '📊', title: 'Financial Dashboard', description: 'Real-time client financials' },
        { icon: '📄', title: 'Tax Prep Tools', description: 'Automated tax calculations' },
        { icon: '👥', title: 'Client Portal', description: 'Secure document exchange' },
        { icon: '📱', title: 'Mobile Receipts', description: 'AI-powered expense tracking' },
      ]
    },
    consulting: {
      name: 'Consulting Business',
      title: 'ConsultMax',
      features: [
        { icon: '👥', title: 'Project Management', description: 'Client project tracking' },
        { icon: '⏰', title: 'Time Tracking', description: 'Billable hours automation' },
        { icon: '📊', title: 'ROI Calculator', description: 'Client value demonstration' },
        { icon: '📱', title: 'Client Portal', description: 'Progress reporting dashboard' },
      ]
    },
    retail: {
      name: 'Retail Store',
      title: 'RetailPro',
      features: [
        { icon: '📦', title: 'Inventory Management', description: 'Smart stock level tracking' },
        { icon: '💳', title: 'POS Integration', description: 'Unified sales processing' },
        { icon: '👥', title: 'Customer Loyalty', description: 'Rewards and retention system' },
        { icon: '📊', title: 'Sales Analytics', description: 'Performance insights dashboard' },
      ]
    },
    other: {
      name: 'Business',
      title: 'BusinessPro',
      features: [
        { icon: '👥', title: 'Customer Management', description: 'Comprehensive CRM system' },
        { icon: '📊', title: 'Analytics Dashboard', description: 'Business intelligence tools' },
        { icon: '💳', title: 'Payment Processing', description: 'Secure transaction handling' },
        { icon: '📱', title: 'Mobile Solution', description: 'Custom mobile application' },
      ]
    }
  }
  
  return businessTypes[businessType] || businessTypes.other
}