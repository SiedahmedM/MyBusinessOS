# Hydration Safety Guidelines

This document outlines the hydration safety measures implemented in this Next.js project to prevent server-client rendering mismatches.

## ✅ Implemented Guardrails

### 1. Date Serialization
- **Over the wire**: Send ISO strings (e.g., `2025-08-30T22:08:00.000Z`)
- **At component boundary**: Convert once using the `ClientTime` component
- **Locked locale/timezone**: Explicit `locale` and `timeZone` props in date formatting

### 2. Stable React Keys
- ✅ Never use `Math.random()` as React keys
- ✅ Use stable IDs from data or static indices
- ✅ All verified via `npm run hydration-check`

### 3. ClientTime Component
Located at `src/components/common/ClientTime.tsx`:
- Prevents hydration mismatches for timestamp rendering
- Uses `useState(false)` + `useEffect` pattern  
- Renders skeleton placeholder (`&thinsp;`) during SSR to prevent layout shift
- Normalizes timestamps from Date, number, or string formats
- Uses `Intl.DateTimeFormat` for consistent locale-aware formatting

### 4. Dynamic Visual Effects
- All star animations (`StarsBackground`, `ShootingStars`, `FloatingParticles`) are hydration-safe
- `Math.random()` calls only happen inside `useEffect`
- Window/document access wrapped in `useEffect`

### 5. ESLint Protection
`.eslintrc.js` includes rules to catch hydration-unsafe patterns:
```javascript
'no-restricted-syntax': [
  'error',
  {
    selector: 'CallExpression[callee.object.name="Date"][callee.property.name="now"]',
    message: 'Date.now() should only be used inside useEffect, useMemo, or useCallback'
  },
  // ... other rules for Math.random, toLocaleString, etc.
]
```

### 6. Automated Checking
Run `npm run hydration-check` to scan for potential issues:
- Unsafe patterns outside of hooks
- Unstable React keys
- Conditional markup based on `typeof window`
- Direct browser API access in render

## 🔧 Safe Patterns

### ✅ Timestamp Handling
```tsx
// ✅ Good - Using ClientTime component
<ClientTime 
  timestamp={message.timestamp}
  className="text-xs opacity-70"
  locale="en-US"
  timeZone="America/Los_Angeles"
/>

// ❌ Bad - Direct locale methods cause hydration mismatch
<span>{message.timestamp.toLocaleTimeString()}</span>
```

### ✅ Random Values in Effects
```tsx
// ✅ Good - Math.random in useEffect
useEffect(() => {
  const particles = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100
  }))
  setParticles(particles)
}, [])

// ❌ Bad - Math.random in render
const particles = Array.from({ length: 30 }, () => ({
  x: Math.random() * 100  // Causes hydration mismatch
}))
```

### ✅ Browser API Access
```tsx
// ✅ Good - Browser APIs in useEffect
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 100)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

// ❌ Bad - Direct browser API in render
const isScrolled = window.scrollY > 100  // Causes SSR error
```

## 🚨 Intentional Hydration Mismatches

For components that display real-time data (like "time since"), use:
```tsx
<span suppressHydrationWarning>{liveTimeString}</span>
```

## 🔍 Regular Maintenance

1. **Before each release**: Run `npm run hydration-check`
2. **In CI/CD**: Include hydration check in build pipeline
3. **Code reviews**: Watch for patterns flagged by ESLint
4. **New features**: Consider hydration impact for any client-side state

## 📚 Reference Implementation

Key files demonstrating hydration safety:
- `src/components/common/ClientTime.tsx` - Safe timestamp rendering
- `src/components/ui/stars-background.tsx` - Safe animation patterns  
- `src/components/Hero/StaggeredText.tsx` - Safe responsive detection
- `src/components/FloatingCTA/FloatingCTA.tsx` - Safe scroll detection

## 🛠️ Tools

- **ESLint config**: `.eslintrc.js` (hydration safety rules)
- **Check script**: `scripts/check-hydration-safety.sh`  
- **npm command**: `npm run hydration-check`