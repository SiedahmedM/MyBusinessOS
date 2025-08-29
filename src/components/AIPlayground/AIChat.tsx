'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import { detectBusinessType, businessTypes } from '@/lib/openai'
import { logger } from '@/lib/logger'

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  onBusinessTypeDetected: (businessType: string) => void;
  disabled?: boolean;
}

export function AIChat({ onBusinessTypeDetected, disabled = false }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm here to help you build custom software for your business. What type of business do you run?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [detectedBusinessType, setDetectedBusinessType] = useState<string | null>(null)
  const [isAIEnabled, setIsAIEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const hasMounted = useRef(false)

  // Check AI availability on component mount
  useEffect(() => {
    const checkAIAvailability = async () => {
      try {
        const response = await fetch('/api/ai-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'healthCheck' })
        })
        const data = await response.json()
        setIsAIEnabled(data.aiEnabled || false)
      } catch {
        setIsAIEnabled(false)
      }
    }
    
    checkAIAvailability()
  }, [])

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const addMessage = (content: string, type: 'user' | 'ai') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
    return newMessage
  }

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return

    try {
      setIsLoading(true)
      setError(null)

      logger.info('Sending AI chat message', { message })

      // Add user message and build updated conversation history
      const newMessage = addMessage(message, 'user')
      setInputValue('')

      const conversationHistory = [...messages, newMessage].map(msg => ({
        type: msg.type,
        content: msg.content
      }))

      // Detect business type first
      let currentBusinessType = detectedBusinessType
      if (!currentBusinessType || currentBusinessType === 'other') {
        try {
          const businessType = await detectBusinessType(message)
          console.log('AIChat: Detected business type:', businessType);
          
          if (businessType && businessType !== detectedBusinessType) {
            setDetectedBusinessType(businessType)
            onBusinessTypeDetected(businessType)
            currentBusinessType = businessType
          }
        } catch (error) {
          console.warn('Business type detection failed, continuing with conversation')
        }
      }

      // Generate AI response with conversation context
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generateResponse',
          businessType: currentBusinessType || 'other',
          userMessage: message,
          conversationHistory
        })
      })

      if (!response.ok) {
        // Handle different HTTP status codes
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.')
        } else if (response.status >= 500) {
          throw new Error('Service temporarily unavailable. Please try again.')
        } else {
          throw new Error(`Request failed with status ${response.status}`)
        }
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const aiResponse = data.response
      
      if (!aiResponse || aiResponse.length < 5) {
        throw new Error('Received empty response')
      }

      addMessage(aiResponse, 'ai')
      logger.info('AI chat message sent successfully')
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message'
      logger.error('AI chat error', { error: errorMessage })
      
      // More sophisticated fallback based on error type
      let fallbackMessage = "I apologize for the technical difficulty. "
      
      if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
        fallbackMessage += "I'm getting a lot of requests right now. Let me still help you - "
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        fallbackMessage += "There seems to be a connection issue, but I can still assist - "
      } else {
        fallbackMessage += "Let me help you anyway - "
      }
      
      // Add contextual help based on message content
      if (message.toLowerCase().includes('cost') || message.toLowerCase().includes('price')) {
        fallbackMessage += "My solutions typically range from $15,000-45,000 and usually pay for themselves within 2-3 months. Would you like to discuss your specific project?"
      } else if (message.toLowerCase().includes('build') || message.toLowerCase().includes('create')) {
        fallbackMessage += "I specialize in building custom business software that saves time and increases revenue. What challenges are you facing?"
      } else {
        fallbackMessage += "I'd be happy to discuss how I can build custom software for your business. What challenges are you trying to solve?"
      }
      
      addMessage(fallbackMessage, 'ai')
      
      // Don't set error state for rate limit scenarios
      if (!errorMessage.includes('rate limit')) {
        setError(`Connection issue: ${errorMessage}`)
      }
    } finally {
      setIsLoading(false)
    }
  }, [detectedBusinessType, onBusinessTypeDetected, messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  if (error && messages.length <= 2) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Connection Error: {error}</p>
        <button 
          onClick={() => {
            setError(null)
            setMessages([{
              id: '1',
              type: 'ai',
              content: "Hi! I'm here to help you build custom software for your business. What type of business do you run?",
              timestamp: new Date()
            }])
          }}
          className="mt-2 text-sm text-red-700 underline"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full min-h-[500px] sm:min-h-[600px]">
      {!isAIEnabled && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
          <div className="flex items-center text-amber-800">
            <span className="mr-2">◆</span>
            <span>AI features are currently in demo mode with enhanced responses.</span>
          </div>
        </div>
      )}
      
      {/* AI Avatar & Header */}
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 bg-accent-gradient rounded-full flex items-center justify-center text-3xl mr-4">
          ◆
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">AI Solution Builder</h3>
          <p className="text-neutral-200">Tell me about your business and I'll build your custom app</p>
        </div>
      </div>

      {/* Industry Suggestion Pills - Only show initially */}
      {messages.length <= 1 && (
        <div className="mb-6">
          <p className="text-accent-300 text-sm mb-3">Quick start:</p>
          <div className="flex flex-wrap gap-2">
            {businessTypes.slice(0, 6).map((business) => (
              <button
                key={business.id}
                onClick={() => handleSuggestionClick(`I run a ${business.name.toLowerCase()}`)}
                disabled={disabled || isLoading}
                className="px-4 py-2 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {business.icon} {business.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
              message.type === 'user'
                ? 'bg-white text-neutral-900'
                : 'bg-white/10 text-white'
            }`}>
              <p className="text-sm leading-relaxed">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-white px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-accent-600 border-t-transparent rounded-full"></div>
                <span className="text-sm">Analyzing your business needs...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tell me about your business needs..."
          className="flex-1 px-4 py-3 bg-white/10 text-white placeholder-neutral-300 rounded-lg border border-white/20 focus:outline-none focus:border-white/40 focus:bg-white/15"
          disabled={disabled || isLoading}
        />
        <button
          type="submit"
          disabled={disabled || isLoading || !inputValue.trim()}
          className="px-6 py-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </form>
      
      {/* Connection status */}
      {error && (
        <p className="text-xs text-accent-300 mt-2 opacity-75">
          Note: Running in offline mode due to connection issue
        </p>
      )}
    </div>
  )
}