import { logger } from './logger'

export function measurePerformance(name: string, fn: (...args: any[]) => Promise<any>) {
  return async (...args: any[]) => {
    const start = performance.now()
    
    try {
      const result = await fn.apply(this, args)
      const duration = performance.now() - start
      
      logger.info('Performance measurement', { 
        operation: name, 
        duration: `${duration.toFixed(2)}ms` 
      })
      
      return result
    } catch (error) {
      const duration = performance.now() - start
      
      logger.error('Performance measurement (with error)', { 
        operation: name, 
        duration: `${duration.toFixed(2)}ms`,
        error 
      })
      
      throw error
    }
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}