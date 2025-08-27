'use client'
import { useState, useCallback } from 'react'
import { generateBusinessResponse, detectBusinessType, businessTypes } from '@/lib/openai'
import { logger } from '@/lib/logger'

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  onBusinessTypeDetected: (businessType: string) => void;
}

export function AIChat({ onBusinessTypeDetected }: AIChatProps) {
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

      // Add user message
      addMessage(message, 'user')
      setInputValue('')

      // Detect business type
      const businessType = await detectBusinessType(message)
      console.log('AIChat: Detected business type:', businessType);
      
      if (businessType && businessType !== detectedBusinessType) {
        setDetectedBusinessType(businessType)
        onBusinessTypeDetected(businessType)
      }

      // Generate AI response
      const aiResponse = await generateBusinessResponse(businessType, message)
      addMessage(aiResponse, 'ai')
      
      logger.info('AI chat message sent successfully')
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message'
      logger.error('AI chat error', { error: errorMessage })
      setError(errorMessage)
      addMessage('Sorry, I encountered an error. Please try again!', 'ai')
    } finally {
      setIsLoading(false)
    }
  }, [detectedBusinessType, onBusinessTypeDetected])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error: {error}</p>
        <button 
          onClick={() => setError(null)}
          className="mt-2 text-sm text-red-700 underline"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* AI Avatar & Header */}
      <div className="flex items-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-3xl mr-4">
          🧠
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white">AI Solution Builder</h3>
          <p className="text-purple-200">Tell me about your business and I'll build your custom app</p>
        </div>
      </div>

      {/* Industry Suggestion Pills */}
      {messages.length <= 1 && (
        <div className="mb-6">
          <p className="text-purple-200 text-sm mb-3">Quick start:</p>
          <div className="flex flex-wrap gap-2">
            {businessTypes.map((business) => (
              <button
                key={business.id}
                onClick={() => handleSuggestionClick(`I run a ${business.name.toLowerCase()}`)}
                className="px-4 py-2 bg-white/10 text-white rounded-full text-sm hover:bg-white/20 transition-colors"
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
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.type === 'user' 
                ? 'bg-white text-gray-900' 
                : 'bg-white/10 text-white'
            }`}>
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-white px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-4 w-4 border-2 border-purple-600 border-t-transparent rounded-full"></div>
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tell me about your business..."
          className="flex-1 px-4 py-3 bg-white/10 text-white placeholder-purple-200 rounded-lg border border-white/20 focus:outline-none focus:border-white/40"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  )
}