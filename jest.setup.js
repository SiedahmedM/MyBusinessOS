import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Polyfill for Node.js environment
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock Request and Response for API route testing
global.Request = jest.fn().mockImplementation((input, init) => ({
  url: input,
  method: init?.method || 'GET',
  headers: new Map(Object.entries(init?.headers || {})),
  json: jest.fn().mockResolvedValue({}),
  ...init
}))

global.Response = jest.fn().mockImplementation((body, init) => ({
  status: init?.status || 200,
  ok: (init?.status || 200) >= 200 && (init?.status || 200) < 300,
  json: jest.fn().mockResolvedValue(JSON.parse(body)),
  headers: new Map(Object.entries(init?.headers || {})),
  ...init
}))

// Mock NextResponse
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({
      json: async () => data,
      status: init?.status || 200,
      ok: (init?.status || 200) >= 200 && (init?.status || 200) < 300,
      headers: new Map(Object.entries(init?.headers || {}))
    }))
  }
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => '/'),
}))

// Mock Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      insert: jest.fn(() => ({
        select: jest.fn(() => Promise.resolve({ data: [{ id: '123' }], error: null }))
      }))
    }))
  },
  saveContactLead: jest.fn(() => Promise.resolve({ id: '123', name: 'Test User' })),
  saveDemoRequest: jest.fn(() => Promise.resolve({ id: '123' })),
  saveROICalculation: jest.fn(() => Promise.resolve({ id: '123' }))
}))

// Mock sonner (toast notifications)
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
  Toaster: ({ children, ...props }) => <div {...props}>{children}</div>,
}))

// Mock OpenAI
jest.mock('@/lib/openai', () => ({
  businessTypes: [
    { id: 'dental', name: 'Dental Practice', icon: '◆', title: 'SmartDental Pro', features: [] },
    { id: 'auto', name: 'Auto Shop', icon: '◆', title: 'AutoPro Manager', features: [] },
  ],
  getBusinessByType: jest.fn(() => ({
    id: 'dental',
    name: 'Dental Practice',
    icon: '◆',
    title: 'SmartDental Pro',
    features: [
      { icon: '◆', title: 'Smart Scheduling', description: 'AI-powered appointment booking' }
    ]
  })),
  detectBusinessType: jest.fn(() => Promise.resolve('dental')),
  generateBusinessResponse: jest.fn(() => Promise.resolve('Test AI response'))
}))

// Global test utilities
global.console = {
  ...console,
  // Suppress console.log during tests unless VERBOSE_TESTS is set
  log: process.env.VERBOSE_TESTS ? console.log : jest.fn(),
  warn: console.warn,
  error: console.error,
}

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn()