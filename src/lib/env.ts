const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'OPENAI_API_KEY',
] as const

export function validateEnvironment() {
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

export function validateAIConfiguration(): boolean {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    console.warn('OpenAI API key not found in environment variables')
    return false
  }
  
  if (apiKey === 'placeholder-openai-key') {
    console.warn('OpenAI API key is still set to placeholder value')
    return false
  }
  
  if (apiKey.length < 20) {
    console.warn('OpenAI API key appears to be invalid (too short)')
    return false
  }
  
  return true
}

export function getEnvConfig() {
  return {
    openaiApiKey: process.env.OPENAI_API_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}