import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { logger, generateRequestId } from '@/lib/logger'
import { validateAIConfiguration } from '@/lib/env'

// More robust OpenAI initialization
const openai = (() => {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!validateAIConfiguration()) {
    return null
  }
  
  try {
    return new OpenAI({ 
      apiKey,
      timeout: 30000, // 30 second timeout
      maxRetries: 2
    })
  } catch (error) {
    logger.error('Failed to initialize OpenAI client', { error })
    return null
  }
})()

export async function POST(request: NextRequest) {
  const requestId = generateRequestId()
  
  try {
    logger.info('AI Chat API: Request started', { requestId, endpoint: '/api/ai-chat' })
    
    const body = await request.json()
    logger.info('AI Chat API: Request body received', { requestId, action: body.action })
    const { action, message, businessType, userMessage, conversationHistory = [] } = body

    // Health check endpoint
    if (action === 'healthCheck') {
      return NextResponse.json({ 
        aiEnabled: !!openai,
        requestId 
      })
    }

    // Enhanced fallback when OpenAI is not available
    if (!openai) {
      logger.warn('AI Chat API: OpenAI not configured, using enhanced fallback', { requestId })
      
      if (action === 'detectSoftwareType') {
        const detectedType = detectSoftwareTypeLocally(message)
        logger.info('AI Chat API: Local software type detection', { requestId, detectedType })
        return NextResponse.json({ softwareType: detectedType, requestId })
      }
      
      if (action === 'generateResponse') {
        const fallbackResponse = generateEnhancedFallback(userMessage, businessType, conversationHistory)
        logger.info('AI Chat API: Enhanced fallback response', { requestId })
        return NextResponse.json({ response: fallbackResponse, requestId })
      }
    }

    if (action === 'detectSoftwareType') {
      const prompt = `You are a software classification expert. Based on the description below, classify it into ONE of these software categories:

Available categories:
- business-management: CRM systems, inventory management, employee scheduling, business operations platforms
- agency-to-saas: turning service businesses into SaaS platforms, client dashboards, automated reporting, subscription models
- ecommerce: online stores, shopping carts, product catalogs, payment processing, e-commerce platforms
- mobile-app: iOS/Android apps, native mobile applications, mobile-first solutions
- ai-automation: AI tools, process automation, workflow automation, document processing, chatbots

User description: "${message}"

Rules:
- Respond with ONLY the category name (hyphenated, lowercase)
- Focus on the SOFTWARE TYPE being requested, not the industry
- If someone mentions a dental practice, auto shop, restaurant, medical practice, legal firm, consulting business, etc., think about what TYPE of software they need (usually business-management)
- If someone mentions turning their business into a SaaS or creating client dashboards, use "agency-to-saas"
- If they mention online stores, selling products, shopping carts, use "ecommerce"
- If they specifically want mobile apps or mention iOS/Android, use "mobile-app"
- If they want automation, AI tools, chatbots, use "ai-automation"
- If unclear about software type, use "business-management" as default

Classification:`

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a software classification expert. Respond with only the exact category name (hyphenated, lowercase).'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 10,
        temperature: 0.1
      })

      const softwareType = response.choices[0]?.message?.content?.trim().toLowerCase()
      
      // Validate the response
      const validTypes = ['business-management', 'agency-to-saas', 'ecommerce', 'mobile-app', 'ai-automation']
      const detectedType = validTypes.includes(softwareType || '') ? softwareType : 'business-management'
      
      logger.info('AI Chat API: Software type detected', { requestId, detectedType })
      return NextResponse.json({ softwareType: detectedType, requestId })
      
    } else if (action === 'generateResponse') {
      const { softwareType, userMessage } = body
      
      const softwareInfo = getSoftwareInfo(softwareType || 'other')
      
      // Build conversation context
      const conversationContext = conversationHistory
        .map((msg: any) => `${msg.type}: ${msg.content}`)
        .join('\n')

      const prompt = `You are an expert software developer who builds custom software solutions. You're having a conversation with a potential client interested in ${softwareInfo.name.toLowerCase()}.

CONVERSATION HISTORY:
${conversationContext}

USER'S LATEST MESSAGE: "${userMessage}"

SOFTWARE SOLUTION: ${softwareInfo.title}
KEY FEATURES YOU BUILD:
${softwareInfo.features.map(f => `• ${f.title}: ${f.description}`).join('\n')}

INSTRUCTIONS:
- Respond as an expert developer who specializes in this type of software
- Be enthusiastic but professional about your capabilities
- Answer their specific question while showcasing relevant features
- If they ask about cost, mention solutions typically range $8,000-75,000 depending on complexity
- If they ask what you can build, mention specific features for their software type
- Include the ROI/value proposition: ${softwareInfo.roiExample}
- Keep responses to 1-2 sentences and focused on their question
- Be confident about your abilities and results
- Always end with a question to keep the conversation going

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
        logger.warn('AI Chat API: AI response too short, using fallback', { requestId })
        throw new Error('AI response too short, using fallback')
      }
      
      logger.info('AI Chat API: AI response generated', { requestId, responseLength: aiResponse.length })
      return NextResponse.json({ response: aiResponse, requestId })
    }

    logger.warn('AI Chat API: Invalid action', { requestId, action: body.action })
    return NextResponse.json({ error: 'Invalid action', requestId }, { status: 400 })

  } catch (error) {
    logger.error('AI Chat API: Request failed', { error: error.message, requestId })
    
    // Enhanced fallback based on user's actual message
    if (body?.action === 'generateResponse') {
      const fallbackResponse = generateContextualFallback(body, error)
      logger.info('AI Chat API: Using contextual fallback response', { requestId })
      return NextResponse.json({ response: fallbackResponse, requestId })
    }
    
    if (body?.action === 'detectSoftwareType') {
      const detectedType = detectSoftwareTypeLocally(body.message || '')
      logger.info('AI Chat API: Using local detection fallback', { requestId, detectedType })
      return NextResponse.json({ softwareType: detectedType, requestId })
    }
    
    return NextResponse.json(
      { 
        response: 'I apologize for the technical difficulty. I specialize in building custom software solutions for businesses. What challenges are you trying to solve?',
        requestId 
      }
    )
  }
}

// Enhanced local software type detection  
function detectSoftwareTypeLocally(message: string): string {
  const msg = message.toLowerCase()
  
  const typeMapping = [
    {
      keywords: ['saas', 'subscription', 'recurring', 'platform', 'client portal', 'tenant', 'agency', 'marketing agency', 'turning business into saas'],
      type: 'agency-to-saas'
    },
    {
      keywords: ['shop', 'store', 'ecommerce', 'e-commerce', 'sell', 'product', 'cart', 'checkout', 'online store', 'retail'],
      type: 'ecommerce'
    },
    {
      keywords: ['mobile app', 'ios app', 'android app', 'smartphone app', 'native app', 'mobile application', 'fitness app'],
      type: 'mobile-app'
    },
    {
      keywords: ['automation', 'ai tool', 'automate', 'workflow automation', 'process automation', 'chatbot', 'ai chatbot'],
      type: 'ai-automation'
    },
    {
      keywords: ['crm', 'business management', 'operations', 'customer management', 'inventory', 'schedule', 'dental practice', 'auto shop', 'restaurant', 'medical practice', 'legal firm', 'consulting'],
      type: 'business-management'
    }
  ]

  for (const mapping of typeMapping) {
    if (mapping.keywords.some(keyword => msg.includes(keyword))) {
      return mapping.type
    }
  }

  return 'business-management' // Default
}

// Enhanced contextual fallback responses
function generateEnhancedFallback(userMessage: string, businessType: string, conversationHistory: any[]): string {
  const msg = userMessage.toLowerCase()
  const historyLength = conversationHistory.length
  
  // Analyze conversation context
  const hasDiscussedPricing = conversationHistory.some(m => 
    m.content?.toLowerCase().includes('cost') || 
    m.content?.toLowerCase().includes('price')
  )
  
  const softwareInfo = getSoftwareInfo(businessType || 'other')
  
  // Cost-related questions
  if (msg.includes('cost') || msg.includes('price') || msg.includes('expensive') || msg.includes('afford')) {
    return `Great question about pricing! My ${softwareInfo.title} solutions typically range from $15,000-45,000 depending on complexity. Most clients see ROI within 2-4 months through ${softwareInfo.roiExample.toLowerCase()}. Would you like to see a detailed breakdown of what's included?`
  }
  
  // Capability questions
  if (msg.includes('can you') || msg.includes('do you') || msg.includes('able to')) {
    return `Absolutely! I specialize in ${softwareInfo.name.toLowerCase()}. I've built ${softwareInfo.title} systems that typically deliver ${softwareInfo.roiExample.toLowerCase()}. Each solution includes ${softwareInfo.features.slice(0, 2).map(f => f.title.toLowerCase()).join(' and ')}. Ready to see how it would work for your specific needs?`
  }
  
  // Feature/functionality questions
  if (msg.includes('features') || msg.includes('functionality') || msg.includes('what does')) {
    const features = softwareInfo.features
    return `Excellent question! My ${softwareInfo.title} includes powerful features like ${features.slice(0, 3).map(f => f.title).join(', ')}, plus much more. Everything is custom-built for your specific workflow. Want me to show you how these features would work in your business?`
  }
  
  // Timeline questions
  if (msg.includes('how long') || msg.includes('timeline') || msg.includes('when')) {
    return `Great timing question! Most ${softwareInfo.name.toLowerCase()} projects take 4-8 weeks from start to launch. I work in weekly sprints so you see progress every week. The exact timeline depends on your specific features, but I always provide accurate estimates upfront. Should we discuss your project timeline?`
  }
  
  // Follow-up responses based on conversation flow
  if (historyLength > 2 && !hasDiscussedPricing) {
    return `I can see you're interested in ${softwareInfo.name.toLowerCase()}! Based on what you've told me, I'd estimate this project at around $${Math.floor(Math.random() * 20000 + 20000).toLocaleString()} and would typically deliver ${softwareInfo.roiExample.toLowerCase()}. Want to see exactly how this would work for your business?`
  }
  
  // Default contextual response
  return `That's a great point about ${businessType}! I've built several ${softwareInfo.title} systems that solve exactly these challenges. The typical result is ${softwareInfo.roiExample.toLowerCase()}. Would you like me to show you a live demo of how this works?`
}

// Enhanced contextual fallback based on error type
function generateContextualFallback(body: any, error: any): string {
  const { userMessage, businessType } = body
  const msg = userMessage?.toLowerCase() || ''
  const softwareInfo = getSoftwareInfo(businessType || 'other')
  
  let fallbackMessage = "I apologize for the technical difficulty. "
  
  if (error.message?.includes('rate limit') || error.message?.includes('429')) {
    fallbackMessage += "I'm getting a lot of requests right now. Let me still help you - "
  } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
    fallbackMessage += "There seems to be a connection issue, but I can still assist - "
  } else {
    fallbackMessage += "Let me help you anyway - "
  }
  
  // Add contextual help based on message content
  if (msg.includes('cost') || msg.includes('price')) {
    fallbackMessage += `My ${softwareInfo.title} solutions typically range from $15,000-45,000 and usually pay for themselves within 2-3 months through ${softwareInfo.roiExample.toLowerCase()}. Would you like to discuss your specific project?`
  } else if (msg.includes('features') || msg.includes('what can')) {
    fallbackMessage += `I build comprehensive ${softwareInfo.title} systems with features like ${softwareInfo.features.slice(0, 3).map(f => f.title).join(', ')}. Want to see how it works?`
  } else {
    fallbackMessage += `I specialize in ${softwareInfo.name.toLowerCase()} and have built systems that deliver ${softwareInfo.roiExample.toLowerCase()}. What challenges are you trying to solve?`
  }
  
  return fallbackMessage
}

function generateIntelligentFallback(userMessage: string, softwareType: string): string {
  const message = userMessage.toLowerCase()
  const softwareInfo = getSoftwareInfo(softwareType)
  
  // Cost-related questions
  if (message.includes('cost') || message.includes('price') || message.includes('expensive') || message.includes('afford')) {
    return `Great question! My ${softwareInfo.title} solutions typically range from $8,000-75,000 depending on complexity, but clients usually see that investment returned quickly through ${softwareInfo.roiExample.toLowerCase()}. Most projects pay for themselves within 2-6 months. Would you like me to show you exactly how it works?`
  }
  
  // What can you build questions
  if (message.includes('what') && (message.includes('build') || message.includes('do') || message.includes('create'))) {
    return `For ${softwareInfo.name.toLowerCase()}, I build comprehensive solutions like ${softwareInfo.title} that include ${softwareInfo.features.slice(0, 3).map(f => f.title.toLowerCase()).join(', ')}, and much more. Each system is custom-built for your specific needs. Want to see a live demo of how it works?`
  }
  
  // General capability questions
  if (message.includes('help') || message.includes('can you') || message.includes('able to')) {
    return `Absolutely! I specialize in ${softwareInfo.name.toLowerCase()}. My ${softwareInfo.title} solutions handle everything from ${softwareInfo.features[0].title.toLowerCase()} to ${softwareInfo.features[1].title.toLowerCase()}, and typically deliver ${softwareInfo.roiExample.toLowerCase()}. Ready to see how it works?`
  }
  
  // Default intelligent response
  return `Perfect! For ${softwareInfo.name.toLowerCase()} like yours, I've built ${softwareInfo.title} systems that deliver ${softwareInfo.roiExample.toLowerCase()}. The key features include ${softwareInfo.features.slice(0, 2).map(f => f.title).join(' and ')}. Would you like to see a live demo of how it works?`
}

function getBusinessInfo(businessType: string) {
  const businessTypes: Record<string, { name: string, title: string, features: Array<{icon: string, title: string, description: string}> }> = {
    dental: {
      name: 'Dental Practice',
      title: 'SmartDental Pro',
      features: [
        { icon: '◆', title: 'Smart Scheduling', description: 'AI-powered appointment booking' },
        { icon: '◆', title: 'Patient Portal', description: 'Online registration and forms' },
        { icon: '◆', title: 'Insurance Claims', description: 'Automated claim processing' },
        { icon: '◆', title: 'Treatment Plans', description: 'Visual treatment planning' },
      ]
    },
    auto: {
      name: 'Automotive Service',
      title: 'AutoPro Manager',
      features: [
        { icon: '◆', title: 'Vehicle Tracking', description: 'Complete repair history' },
        { icon: '◆', title: 'Customer Updates', description: 'SMS progress notifications' },
        { icon: '◆', title: 'Digital Inspections', description: 'Photo-based vehicle checks' },
        { icon: '◆', title: 'Instant Quotes', description: 'AI-powered pricing' },
      ]
    },
    restaurant: {
      name: 'Restaurant',
      title: 'RestaurantOS',
      features: [
        { icon: '◆', title: 'Online Ordering', description: 'Custom mobile ordering app' },
        { icon: '◆', title: 'Kitchen Display', description: 'Real-time order management' },
        { icon: '◆', title: 'Table Management', description: 'Smart reservation system' },
        { icon: '◆', title: 'Sales Analytics', description: 'Real-time performance metrics' },
      ]
    },
    medical: {
      name: 'Medical Practice',
      title: 'MediCore System',
      features: [
        { icon: '◆', title: 'Electronic Records', description: 'HIPAA-compliant patient data' },
        { icon: '◆', title: 'Prescription Manager', description: 'Digital prescription system' },
        { icon: '◆', title: 'Telehealth Portal', description: 'Virtual consultation platform' },
        { icon: '◆', title: 'Lab Integration', description: 'Automated lab result processing' },
      ]
    },
    ecommerce: {
      name: 'E-commerce Business',
      title: 'CommerceMax',
      features: [
        { icon: '◆', title: 'Smart Cart', description: 'AI-powered shopping experience' },
        { icon: '◆', title: 'Inventory Sync', description: 'Real-time stock management' },
        { icon: '◆', title: 'Payment Gateway', description: 'Secure multi-payment processing' },
        { icon: '◆', title: 'Sales Analytics', description: 'Advanced conversion tracking' },
      ]
    },
    rental: {
      name: 'Rental Business',
      title: 'RentalHub Pro',
      features: [
        { icon: '◆', title: 'Booking System', description: 'Smart availability management' },
        { icon: '◆', title: 'Asset Tracking', description: 'Real-time location monitoring' },
        { icon: '◆', title: 'Payment Processing', description: 'Automated billing and deposits' },
        { icon: '◆', title: 'Mobile Check-in', description: 'Contactless pickup/return' },
      ]
    },
    realestate: {
      name: 'Real Estate',
      title: 'PropertyPro',
      features: [
        { icon: '◆', title: 'Listing Manager', description: 'Multi-platform property sync' },
        { icon: '◆', title: 'CRM System', description: 'Advanced client relationship tools' },
        { icon: '◆', title: 'Virtual Tours', description: '360° property showcases' },
        { icon: '◆', title: 'Market Analytics', description: 'AI-powered market insights' },
      ]
    },
    fitness: {
      name: 'Fitness Business',
      title: 'FitnessPro',
      features: [
        { icon: '◆', title: 'Workout Tracking', description: 'Personalized fitness programs' },
        { icon: '◆', title: 'Class Scheduling', description: 'Smart booking and waitlists' },
        { icon: '◆', title: 'Membership Portal', description: 'Automated billing and renewals' },
        { icon: '◆', title: 'Mobile App', description: 'Custom branded fitness app' },
      ]
    },
    legal: {
      name: 'Legal Practice',
      title: 'LegalMax',
      features: [
        { icon: '◆', title: 'Case Management', description: 'Comprehensive case tracking' },
        { icon: '⏰', title: 'Time Tracking', description: 'Automated billable hours' },
        { icon: '◆', title: 'Document Portal', description: 'Secure client file sharing' },
        { icon: '◆', title: 'Billing System', description: 'Automated invoicing and payments' },
      ]
    },
    accounting: {
      name: 'Accounting Firm',
      title: 'AccountPro',
      features: [
        { icon: '◆', title: 'Financial Dashboard', description: 'Real-time client financials' },
        { icon: '◆', title: 'Tax Prep Tools', description: 'Automated tax calculations' },
        { icon: '◆', title: 'Client Portal', description: 'Secure document exchange' },
        { icon: '◆', title: 'Mobile Receipts', description: 'AI-powered expense tracking' },
      ]
    },
    consulting: {
      name: 'Consulting Business',
      title: 'ConsultMax',
      features: [
        { icon: '◆', title: 'Project Management', description: 'Client project tracking' },
        { icon: '⏰', title: 'Time Tracking', description: 'Billable hours automation' },
        { icon: '◆', title: 'ROI Calculator', description: 'Client value demonstration' },
        { icon: '◆', title: 'Client Portal', description: 'Progress reporting dashboard' },
      ]
    },
    retail: {
      name: 'Retail Store',
      title: 'RetailPro',
      features: [
        { icon: '◆', title: 'Inventory Management', description: 'Smart stock level tracking' },
        { icon: '◆', title: 'POS Integration', description: 'Unified sales processing' },
        { icon: '◆', title: 'Customer Loyalty', description: 'Rewards and retention system' },
        { icon: '◆', title: 'Sales Analytics', description: 'Performance insights dashboard' },
      ]
    },
    other: {
      name: 'Business',
      title: 'BusinessPro',
      features: [
        { icon: '◆', title: 'Customer Management', description: 'Comprehensive CRM system' },
        { icon: '◆', title: 'Payment Processing', description: 'Secure transaction handling' },
        { icon: '◆', title: 'Mobile Solution', description: 'Custom mobile application' },
      ]
    }
  }
  
  return businessTypes[businessType] || businessTypes.other
}

function getSoftwareInfo(softwareType: string) {
  const softwareTypes: Record<string, { name: string, title: string, roiExample: string, features: Array<{icon: string, title: string, description: string}> }> = {
    'business-management': {
      name: 'Business Management System',
      title: 'BusinessHub Pro',
      roiExample: 'Save 20+ hours/week, increase revenue 40%',
      features: [
        { icon: '◆', title: 'Customer Management', description: 'Complete CRM on mobile' },
        { icon: '◆', title: 'Real-time Dashboard', description: 'Business metrics at a glance' },
        { icon: '◆', title: 'Smart Scheduling', description: 'AI-powered appointment booking' },
        { icon: '◆', title: 'Sales Tracking', description: 'Revenue and performance data' }
      ]
    },
    'agency-to-saas': {
      name: 'Agency to SaaS Platform',
      title: 'AgencyScale Platform',
      roiExample: 'Scale to $50K/month recurring revenue',
      features: [
        { icon: '◆', title: 'Client Dashboard', description: 'Self-service client portal' },
        { icon: '◆', title: 'Automated Reports', description: 'Generate reports automatically' },
        { icon: '◆', title: 'Subscription Billing', description: 'Recurring revenue management' },
        { icon: '◆', title: 'Multi-tenant Access', description: 'Secure client separation' }
      ]
    },
    'ecommerce': {
      name: 'E-commerce Platform',
      title: 'CommerceMax Pro',
      roiExample: 'Outperform Shopify by 60% conversion',
      features: [
        { icon: '◆', title: 'Smart Shopping Cart', description: 'AI-powered shopping experience' },
        { icon: '◆', title: 'Payment Processing', description: 'Multiple payment gateways' },
        { icon: '◆', title: 'Inventory Sync', description: 'Real-time stock management' },
        { icon: '◆', title: 'Customer Analytics', description: 'Advanced conversion tracking' }
      ]
    },
    'mobile-app': {
      name: 'Mobile Application',
      title: 'Native Mobile App',
      roiExample: 'Reach 80% more customers on mobile',
      features: [
        { icon: '◆', title: 'Native Performance', description: 'Lightning-fast user experience' },
        { icon: '◆', title: 'Offline Sync', description: 'Works without internet connection' },
        { icon: '◆', title: 'Push Notifications', description: 'Re-engage users automatically' },
        { icon: '◆', title: 'App Store Ready', description: 'Optimized for app stores' }
      ]
    },
    'ai-automation': {
      name: 'AI/Automation Tool',
      title: 'AutomationMax AI',
      roiExample: 'Automate 80% of manual work',
      features: [
        { icon: '◆', title: 'Document Processing', description: 'AI-powered document analysis' },
        { icon: '◆', title: 'Email Automation', description: 'Smart email workflows' },
        { icon: '⌨️', title: 'Data Entry', description: 'Eliminate repetitive typing' },
        { icon: '◆', title: 'Customer Support', description: 'AI chatbots and responses' }
      ]
    },
    'other': {
      name: 'Custom Software Solution',
      title: 'BusinessPro',
      roiExample: 'Streamline operations and boost efficiency',
      features: [
        { icon: '◆', title: 'Customer Management', description: 'Comprehensive CRM system' },
        { icon: '◆', title: 'Payment Processing', description: 'Secure transaction handling' },
        { icon: '◆', title: 'Mobile Solution', description: 'Custom mobile application' }
      ]
    }
  }
  
  return softwareTypes[softwareType] || softwareTypes.other
}