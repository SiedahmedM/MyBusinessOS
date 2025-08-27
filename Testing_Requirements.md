# TESTING & ERROR HANDLING REQUIREMENTS

This document defines the mandatory testing and error handling standards for all components in the MyBusinessOS project. **Every new component, API route, hook, or utility must follow these patterns for production readiness.**

## MANDATORY ERROR HANDLING PATTERNS

### 1. Component-Level Error Handling

Every React component must include comprehensive error handling:

```typescript
'use client'
import { useState, useCallback } from 'react'
import { logger } from '@/lib/logger'

export function ComponentName() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAction = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      logger.info('ComponentName: Action started')
      
      // Implementation here
      
      logger.info('ComponentName: Action completed successfully')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      logger.error('ComponentName: Action failed', { error: errorMessage })
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Error state UI
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

  // Loading state UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
        <span>Loading...</span>
      </div>
    )
  }

  return (
    // Component JSX
  )
}
```

### 2. API Route Error Handling

Every API route must follow this exact pattern:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { logger, generateRequestId } from '@/lib/logger'
import { validateInput } from '@/lib/validation'

export async function POST(request: NextRequest) {
  const requestId = generateRequestId()
  
  try {
    logger.info('API: Request started', { requestId, endpoint: '/api/endpoint-name' })
    
    const body = await request.json()
    
    // Input validation
    const validation = validateInput(body)
    if (!validation.success) {
      logger.warn('API: Validation failed', { errors: validation.errors, requestId })
      return NextResponse.json(
        { error: 'Invalid input', details: validation.errors },
        { status: 400 }
      )
    }

    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitResult = await checkRateLimit(clientIP)
    if (!rateLimitResult.allowed) {
      logger.warn('API: Rate limit exceeded', { clientIP, requestId })
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Main business logic
    const result = await performOperation(validation.data)
    
    if (!result) {
      throw new Error('Operation failed')
    }
    
    logger.info('API: Request completed successfully', { requestId })
    return NextResponse.json({ success: true, data: result })

  } catch (error) {
    logger.error('API: Request failed', { error, requestId })
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        requestId 
      },
      { status: 500 }
    )
  }
}
```

### 3. Database Operation Error Handling

All database operations must include proper error handling:

```typescript
export async function databaseOperation(data: any) {
  try {
    logger.info('Database: Operation started', { operation: 'operationName', data })
    
    const { data: result, error } = await supabase
      .from('table_name')
      .insert(data)
      .select()
      .single()
    
    if (error) {
      logger.error('Database: Operation failed', { error, data })
      throw new Error(`Database error: ${error.message}`)
    }

    if (!result) {
      logger.warn('Database: No result returned', { data })
      return null
    }

    logger.info('Database: Operation successful', { id: result.id })
    return result
    
  } catch (error) {
    logger.error('Database: Unexpected error', { error, data })
    return null
  }
}
```

### 4. Custom Hook Error Handling

All custom hooks must include error states:

```typescript
export function useCustomHook() {
  const [data, setData] = useState(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      logger.info('Hook: Fetching data')
      
      const result = await apiCall()
      setData(result)
      
      logger.info('Hook: Data fetched successfully')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Fetch failed'
      logger.error('Hook: Data fetch failed', { error: errorMessage })
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, error, isLoading, fetchData }
}
```

## MANDATORY TESTING PATTERNS

### 1. Component Tests

Every component requires comprehensive testing:

```typescript
// __tests__/components/ComponentName.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ComponentName } from '@/components/path/ComponentName'

// Mock dependencies
jest.mock('@/lib/logger')
jest.mock('@/lib/utils')

describe('ComponentName', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders component correctly', () => {
    render(<ComponentName />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  test('handles user interactions', async () => {
    render(<ComponentName />)
    
    const button = screen.getByText('Button Text')
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(screen.getByText('Expected Result')).toBeInTheDocument()
    })
  })

  test('displays loading state correctly', () => {
    render(<ComponentName />)
    // Test loading state
  })

  test('handles errors gracefully', async () => {
    // Mock error condition
    const mockError = new Error('Test error')
    // Setup error scenario
    
    render(<ComponentName />)
    
    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument()
    })
  })

  test('handles edge cases and boundary conditions', () => {
    // Test empty states, null values, etc.
  })

  test('accessibility requirements', () => {
    render(<ComponentName />)
    // Test ARIA labels, keyboard navigation, etc.
  })
})
```

### 2. API Route Tests

Every API route requires thorough testing:

```typescript
// __tests__/api/route-name.test.ts
import { POST } from '@/app/api/route-name/route'
import { NextRequest } from 'next/server'

jest.mock('@/lib/supabase')
jest.mock('@/lib/validation')
jest.mock('@/lib/logger')

describe('/api/route-name', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('handles valid requests successfully', async () => {
    const mockValidation = require('@/lib/validation')
    mockValidation.validateInput.mockReturnValue({ success: true, data: {} })
    
    const mockRequest = createMockRequest({ validData: 'test' })
    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })

  test('handles validation errors', async () => {
    const mockValidation = require('@/lib/validation')
    mockValidation.validateInput.mockReturnValue({
      success: false,
      errors: [{ field: 'test', message: 'Required' }]
    })
    
    const mockRequest = createMockRequest({ invalidData: '' })
    const response = await POST(mockRequest)

    expect(response.status).toBe(400)
  })

  test('handles database errors', async () => {
    const mockSupabase = require('@/lib/supabase')
    mockSupabase.databaseOperation.mockResolvedValue(null)
    
    const mockRequest = createMockRequest({ validData: 'test' })
    const response = await POST(mockRequest)

    expect(response.status).toBe(500)
  })

  test('handles rate limiting', async () => {
    // Test rate limit scenarios
  })

  test('handles network timeouts', async () => {
    // Test timeout scenarios
  })
})

function createMockRequest(body: any): NextRequest {
  return {
    json: () => Promise.resolve(body),
    headers: new Map([['x-forwarded-for', '192.168.1.1']])
  } as NextRequest
}
```

### 3. Hook Tests

Every custom hook requires testing:

```typescript
// __tests__/hooks/useHookName.test.tsx
import { renderHook, act } from '@testing-library/react'
import { useHookName } from '@/hooks/useHookName'

describe('useHookName', () => {
  test('returns correct initial state', () => {
    const { result } = renderHook(() => useHookName())
    
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeNull()
    expect(result.current.isLoading).toBe(false)
  })

  test('handles async operations', async () => {
    const { result } = renderHook(() => useHookName())
    
    act(() => {
      result.current.fetchData()
    })
    
    expect(result.current.isLoading).toBe(true)
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
  })

  test('handles errors correctly', async () => {
    // Mock error scenario
    const { result } = renderHook(() => useHookName())
    
    act(() => {
      result.current.fetchData()
    })
    
    await waitFor(() => {
      expect(result.current.error).toBeTruthy()
    })
  })

  test('cleans up resources properly', () => {
    const { unmount } = renderHook(() => useHookName())
    unmount()
    // Verify cleanup
  })
})
```

## INPUT VALIDATION REQUIREMENTS

### 1. Zod Schema Validation

All user inputs must be validated with Zod schemas:

```typescript
import { z } from 'zod'

const inputSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  businessType: z.enum(['dental', 'auto', 'restaurant', 'medical']),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000)
})

export function validateInput(data: unknown) {
  try {
    const validData = inputSchema.parse(data)
    return { success: true, data: validData, errors: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        data: null, 
        errors: error.errors.map(e => ({ field: e.path[0], message: e.message }))
      }
    }
    return { success: false, data: null, errors: [{ field: 'unknown', message: 'Validation failed' }] }
  }
}
```

### 2. Rate Limiting

All public API endpoints must implement rate limiting:

```typescript
async function checkRateLimit(clientIP: string): Promise<{ allowed: boolean; remaining?: number }> {
  // Implement rate limiting logic
  // Store in Redis or database
  return { allowed: true }
}
```

## ACCESSIBILITY REQUIREMENTS

Every interactive component must include:

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Color contrast compliance
- Alternative text for images

```typescript
// Example accessible button
<button
  aria-label="Submit form"
  aria-describedby="submit-help"
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
  disabled={isLoading}
>
  {isLoading ? 'Submitting...' : 'Submit'}
</button>
```

## PERFORMANCE REQUIREMENTS

### 1. Component Optimization

Use React.memo for expensive components:

```typescript
import { memo } from 'react'

export const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Component logic
})
```

### 2. Code Splitting

Lazy load heavy components:

```typescript
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

export function Parent() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## LOGGING REQUIREMENTS

Every operation must include appropriate logging:

- **Info**: Successful operations, important state changes
- **Warn**: Recoverable errors, deprecated usage
- **Error**: Failures, exceptions
- **Debug**: Development debugging (not in production)

```typescript
logger.info('Operation started', { userId, operation: 'create-user' })
logger.warn('Deprecated API used', { endpoint: '/old-api' })
logger.error('Operation failed', { error: error.message, userId })
```

## SECURITY REQUIREMENTS

### 1. Input Sanitization

All user inputs must be sanitized:

```typescript
import DOMPurify from 'dompurify'

const sanitizedInput = DOMPurify.sanitize(userInput)
```

### 2. SQL Injection Prevention

Use parameterized queries and ORM methods:

```typescript
// Good - parameterized query
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)

// Bad - string concatenation (never do this)
// const query = `SELECT * FROM users WHERE id = '${userId}'`
```

## DEPLOYMENT CHECKLIST

Before deploying any new feature, ensure:

- [ ] All tests pass (unit, integration, e2e)
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Input validation in place
- [ ] Logging added
- [ ] Accessibility tested
- [ ] Performance optimized
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Environment variables configured

## COVERAGE REQUIREMENTS

Minimum test coverage requirements:

- **Unit Tests**: 80% code coverage
- **Integration Tests**: Critical user flows covered
- **Error Scenarios**: All error paths tested
- **Edge Cases**: Boundary conditions tested
- **Accessibility**: WCAG 2.1 AA compliance

## IMPLEMENTATION WORKFLOW

For every new component/feature:

1. Write failing tests first (TDD approach)
2. Implement component with error handling
3. Add comprehensive logging
4. Validate inputs and sanitize outputs
5. Add loading and error states
6. Test accessibility requirements
7. Optimize performance
8. Update documentation
9. Deploy to staging for testing
10. Deploy to production

Follow these requirements religiously to maintain production-ready code quality.