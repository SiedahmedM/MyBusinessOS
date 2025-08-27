import {
  generateSessionId,
  formatCurrency,
  formatNumber,
  calculateTimeSavings,
  calculateRevenueGrowth,
  calculateCostReduction,
  debounce,
  scrollToSection
} from '@/lib/utils'

describe('Utils Functions', () => {
  describe('generateSessionId', () => {
    test('generates unique session IDs', () => {
      const id1 = generateSessionId()
      const id2 = generateSessionId()
      
      expect(id1).toMatch(/^session_\d+_[a-z0-9]{9}$/)
      expect(id2).toMatch(/^session_\d+_[a-z0-9]{9}$/)
      expect(id1).not.toBe(id2)
    })

    test('includes timestamp in session ID', () => {
      const beforeTime = Date.now()
      const sessionId = generateSessionId()
      const afterTime = Date.now()
      
      const timestamp = parseInt(sessionId.split('_')[1])
      expect(timestamp).toBeGreaterThanOrEqual(beforeTime)
      expect(timestamp).toBeLessThanOrEqual(afterTime)
    })
  })

  describe('formatCurrency', () => {
    test('formats positive numbers as currency', () => {
      expect(formatCurrency(1000)).toBe('$1,000')
      expect(formatCurrency(1234.56)).toBe('$1,235')
      expect(formatCurrency(0)).toBe('$0')
    })

    test('formats negative numbers as currency', () => {
      expect(formatCurrency(-1000)).toBe('-$1,000')
    })

    test('rounds to nearest dollar', () => {
      expect(formatCurrency(1234.49)).toBe('$1,234')
      expect(formatCurrency(1234.50)).toBe('$1,235')
    })
  })

  describe('formatNumber', () => {
    test('formats numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000')
      expect(formatNumber(1234567)).toBe('1,234,567')
      expect(formatNumber(0)).toBe('0')
    })

    test('handles negative numbers', () => {
      expect(formatNumber(-1000)).toBe('-1,000')
    })

    test('handles decimal numbers', () => {
      expect(formatNumber(1234.56)).toBe('1,234.56')
    })
  })

  describe('calculateTimeSavings', () => {
    test('calculates time savings correctly', () => {
      const result = calculateTimeSavings(10, 50)
      
      expect(result.weeklySavings).toBe(500)
      expect(result.monthlySavings).toBe(2165) // 500 * 4.33
      expect(result.yearlySavings).toBe(25980) // 2165 * 12
    })

    test('handles zero hours', () => {
      const result = calculateTimeSavings(0, 50)
      
      expect(result.weeklySavings).toBe(0)
      expect(result.monthlySavings).toBe(0)
      expect(result.yearlySavings).toBe(0)
    })

    test('handles zero hourly rate', () => {
      const result = calculateTimeSavings(10, 0)
      
      expect(result.weeklySavings).toBe(0)
      expect(result.monthlySavings).toBe(0)
      expect(result.yearlySavings).toBe(0)
    })
  })

  describe('calculateRevenueGrowth', () => {
    test('calculates revenue growth correctly', () => {
      const result = calculateRevenueGrowth(10000, 25)
      
      expect(result.newRevenue).toBe(12500)
      expect(result.additionalRevenue).toBe(2500)
      expect(result.yearlyIncrease).toBe(30000) // 2500 * 12
    })

    test('handles zero growth percentage', () => {
      const result = calculateRevenueGrowth(10000, 0)
      
      expect(result.newRevenue).toBe(10000)
      expect(result.additionalRevenue).toBe(0)
      expect(result.yearlyIncrease).toBe(0)
    })

    test('handles 100% growth', () => {
      const result = calculateRevenueGrowth(10000, 100)
      
      expect(result.newRevenue).toBe(20000)
      expect(result.additionalRevenue).toBe(10000)
      expect(result.yearlyIncrease).toBe(120000)
    })
  })

  describe('calculateCostReduction', () => {
    test('calculates cost reduction correctly', () => {
      const result = calculateCostReduction(5000, 20)
      
      expect(result.newCost).toBe(4000)
      expect(result.savings).toBe(1000)
      expect(result.yearlySavings).toBe(12000) // 1000 * 12
    })

    test('handles zero reduction percentage', () => {
      const result = calculateCostReduction(5000, 0)
      
      expect(result.newCost).toBe(5000)
      expect(result.savings).toBe(0)
      expect(result.yearlySavings).toBe(0)
    })

    test('handles 100% reduction', () => {
      const result = calculateCostReduction(5000, 100)
      
      expect(result.newCost).toBe(0)
      expect(result.savings).toBe(5000)
      expect(result.yearlySavings).toBe(60000)
    })
  })

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    test('delays function execution', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)
      
      debouncedFn('test')
      expect(mockFn).not.toHaveBeenCalled()
      
      jest.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledWith('test')
    })

    test('cancels previous calls when called multiple times', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)
      
      debouncedFn('first')
      debouncedFn('second')
      debouncedFn('third')
      
      jest.advanceTimersByTime(100)
      
      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('third')
    })

    test('preserves function context and arguments', () => {
      const mockFn = jest.fn()
      const debouncedFn = debounce(mockFn, 100)
      
      debouncedFn('arg1', 'arg2', 123)
      
      jest.advanceTimersByTime(100)
      
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123)
    })
  })

  describe('scrollToSection', () => {
    let mockElement: HTMLElement
    let mockScrollIntoView: jest.Mock
    let consoleSpy: jest.SpyInstance

    beforeEach(() => {
      mockScrollIntoView = jest.fn()
      mockElement = {
        scrollIntoView: mockScrollIntoView
      } as unknown as HTMLElement
      
      jest.spyOn(document, 'getElementById').mockReturnValue(mockElement)
      consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    test('scrolls to existing element', () => {
      scrollToSection('test-section')
      
      expect(document.getElementById).toHaveBeenCalledWith('test-section')
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      })
      expect(consoleSpy).toHaveBeenCalledWith('scrollToSection: Scrolling to', 'test-section')
    })

    test('handles missing element gracefully', () => {
      jest.spyOn(document, 'getElementById').mockReturnValue(null)
      const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
      
      scrollToSection('missing-section')
      
      expect(mockScrollIntoView).not.toHaveBeenCalled()
      expect(consoleWarnSpy).toHaveBeenCalledWith('scrollToSection: Element not found:', 'missing-section')
      
      consoleWarnSpy.mockRestore()
    })
  })
})