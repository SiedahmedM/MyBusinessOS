'use client'
import { useState, useEffect } from 'react'

const codeSnippet = `// Real-time customer updates for Adam's Muffler Shop
import { createClient } from '@supabase/supabase-js'

export function useRealtimeRepairs() {
  const [repairs, setRepairs] = useState([])
  const supabase = createClient(url, key)

  useEffect(() => {
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('repairs')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'repairs'
      }, (payload) => {
        console.log('Repair updated:', payload)
        
        // Auto-notify customer
        sendSMSUpdate(payload.new)
        
        // Update dashboard
        setRepairs(prev => [...prev, payload.new])
      })
      .subscribe()

    return () => subscription.unsubscribe()
  }, [])

  return repairs
}`

export function CodeDisplay() {
  const [visibleLines, setVisibleLines] = useState(0)
  const lines = codeSnippet.trim().split('\n')

  useEffect(() => {
    console.log('CodeDisplay: Starting line-by-line animation');
    
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev < lines.length) {
          return prev + 1
        }
        clearInterval(interval)
        return prev
      })
    }, 150) // Show one line every 150ms

    return () => clearInterval(interval)
  }, [lines.length])

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
      {/* Mac window controls */}
      <div className="flex items-center px-4 py-3 bg-gray-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="ml-4 text-gray-400 text-sm font-mono">
          AdamsMufflerShop.tsx
        </div>
      </div>
      
      {/* Code content */}
      <div className="p-4 code-editor font-mono text-sm overflow-x-auto">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`flex transition-opacity duration-300 ${
              index < visibleLines ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ minHeight: '1.5rem' }}
          >
            <span className="code-line-number w-8 text-right pr-4 select-none">
              {index + 1}
            </span>
            <span className="flex-1">
              {formatCodeLine(line)}
            </span>
          </div>
        ))}
        
        {/* Blinking cursor at the end */}
        {visibleLines >= lines.length && (
          <span className="animate-pulse text-white">|</span>
        )}
      </div>
    </div>
  )
}

function formatCodeLine(line: string) {
  // Simple syntax highlighting
  let formattedLine = line

  // Keywords
  formattedLine = formattedLine.replace(
    /\b(import|export|function|const|let|var|if|else|return|from|useEffect|useState)\b/g,
    '<span class="code-keyword">$1</span>'
  )

  // Strings
  formattedLine = formattedLine.replace(
    /'([^']*)'|"([^"]*)"/g,
    '<span class="code-string">\'$1$2\'</span>'
  )

  // Comments
  formattedLine = formattedLine.replace(
    /\/\/(.*)/g,
    '<span class="code-comment">//$1</span>'
  )

  return <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
}