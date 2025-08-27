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
    const { action, message, businessType, userMessage, conversationHistory = [] } = body

    if (action === 'detectBusinessType') {
      const prompt = `You are a business classification expert. Based on the business description below, classify it into ONE of these categories:

Available categories:
- dental: dentist offices, oral health, teeth cleaning, orthodontics
- auto: car repair, mechanic shops, automotive services, oil changes
- restaurant: food service, dining, cafes, bars, catering
- medical: doctor offices, clinics, healthcare, hospitals, therapy
- ecommerce: online stores, digital marketplaces, online retail
- rental: car rentals, equipment rentals, vacation rentals
- realestate: real estate agencies, property management, home sales
- fitness: gyms, personal training, wellness centers, yoga studios
- legal: law firms, attorneys, legal services, paralegal
- accounting: bookkeeping, tax services, financial planning, CPA
- consulting: business consulting, advisory services, strategy
- retail: physical stores, brick-and-mortar shops, boutiques
- other: any business that doesn't fit the above categories

Business description: "${message}"

Rules:
- Respond with ONLY the category name (one word)
- If you're unsure, use "other"
- Look for key industry terms and context clues
- Consider the main business activity described

Classification:`

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a business classification expert. Respond with only one word: the exact category name.'
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
      
      // Validate the response
      const validTypes = ['dental', 'auto', 'restaurant', 'medical', 'ecommerce', 'rental', 'realestate', 'fitness', 'legal', 'accounting', 'consulting', 'retail', 'other']
      const detectedType = validTypes.includes(businessType || '') ? businessType : 'other'
      
      return NextResponse.json({ businessType: detectedType })
      
    } else if (action === 'generateResponse') {
      
      const businessInfo = getBusinessInfo(businessType)
      
      // Build conversation context
      const conversationContext = conversationHistory
        .map((msg: any) => `${msg.type}: ${msg.content}`)
        .join('\n')

      const prompt = `You are an expert software developer who builds custom business automation solutions. You're having a conversation with a potential client who runs a ${businessInfo.name.toLowerCase()}.

CONVERSATION HISTORY:
${conversationContext}

USER'S LATEST MESSAGE: "${userMessage}"

YOUR SOLUTION: ${businessInfo.title}
KEY FEATURES YOU'VE BUILT:
${businessInfo.features.map(f => `• ${f.title}: ${f.description}`).join('\n')}

INSTRUCTIONS:
- Respond naturally and conversationally as if you're speaking directly to this business owner
- Be enthusiastic but professional about your work
- Answer their specific question while showcasing relevant capabilities
- If they ask about cost, mention that your solutions typically cost $8,000-15,000 but save 10x that in the first year
- If they ask what you can build, mention specific features relevant to their industry
- Keep responses to 1-2 sentences and focused on their question
- Be confident about your abilities and past successes
- Always end with a question or call-to-action to keep the conversation going

RESPONSE (speak directly to them):`

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a confident, experienced software developer who builds custom business automation solutions. Be conversational, enthusiastic, and results-focused. Keep responses concise but engaging.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      })

      const aiResponse = response.choices[0]?.message?.content?.trim()
      
      // Only use fallback if AI response is truly empty or very short
      if (!aiResponse || aiResponse.length < 20) {
        throw new Error('AI response too short, using fallback')
      }
      
      return NextResponse.json({ response: aiResponse })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    console.error('OpenAI API error:', error)
    
    // Enhanced fallback based on user's actual message
    if (body.action === 'generateResponse') {
      const fallbackResponse = generateIntelligentFallback(body.userMessage, body.businessType)
      return NextResponse.json({ response: fallbackResponse })
    }
    
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    )
  }
}

function generateIntelligentFallback(userMessage: string, businessType: string): string {
  const message = userMessage.toLowerCase()
  const businessInfo = getBusinessInfo(businessType)
  
  // Cost-related questions
  if (message.includes('cost') || message.includes('price') || message.includes('expensive') || message.includes('afford')) {
    return `Great question! My ${businessInfo.title} solutions typically range from $8,000-15,000, but my clients usually see that investment returned within 2-3 months through increased efficiency and revenue. For ${businessInfo.name.toLowerCase()} businesses, the average ROI is 450% in the first year. Would you like me to show you exactly how it works?`
  }
  
  // What can you build questions
  if (message.includes('what') && (message.includes('build') || message.includes('do') || message.includes('create'))) {
    return `For ${businessInfo.name.toLowerCase()} businesses, I build comprehensive solutions like ${businessInfo.title} that include ${businessInfo.features.slice(0, 3).map(f => f.title.toLowerCase()).join(', ')}, and much more. Each system is custom-built for your specific needs. Want to see a live demo of how it works?`
  }
  
  // General capability questions
  if (message.includes('help') || message.includes('can you') || message.includes('able to')) {
    return `Absolutely! I specialize in ${businessInfo.name.toLowerCase()} automation. My ${businessInfo.title} system handles everything from ${businessInfo.features[0].title.toLowerCase()} to ${businessInfo.features[1].title.toLowerCase()}, typically saving business owners 15-25 hours per week. Ready to see how it works for your business?`
  }
  
  // Default intelligent response
  return `Perfect! For ${businessInfo.name.toLowerCase()} businesses like yours, I've built ${businessInfo.title} systems that typically increase revenue by 25-45% while saving 15+ hours per week. The key features include ${businessInfo.features.slice(0, 2).map(f => f.title).join(' and ')}. Would you like to see a live demo of how it works?`
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