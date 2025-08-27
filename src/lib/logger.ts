interface LogEntry {
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
  timestamp: string
  data?: any
  userId?: string
  sessionId?: string
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  private formatLog(entry: LogEntry): void {
    const prefix = `[${entry.timestamp}] ${entry.level.toUpperCase()}`
    
    if (this.isDevelopment) {
      console.log(`${prefix}: ${entry.message}`, entry.data || '')
    }
    
    // In production, send to external logging service
    if (!this.isDevelopment) {
      this.sendToExternalService(entry)
    }
  }

  private sendToExternalService(entry: LogEntry): void {
    // Send to logging service like DataDog, LogRocket, etc.
    // For now, just console.log
    console.log('External Log:', entry)
  }

  info(message: string, data?: any): void {
    this.formatLog({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      data
    })
  }

  warn(message: string, data?: any): void {
    this.formatLog({
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      data
    })
  }

  error(message: string, data?: any): void {
    this.formatLog({
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      data
    })
  }

  debug(message: string, data?: any): void {
    this.formatLog({
      level: 'debug',
      message,
      timestamp: new Date().toISOString(),
      data
    })
  }
}

export const logger = new Logger()

export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}