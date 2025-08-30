module.exports = {
  extends: [
    'next/core-web-vitals'
  ],
  rules: {
    // Hydration safety rules
    'no-restricted-syntax': [
      'error',
      {
        selector: 'CallExpression[callee.object.name="Date"][callee.property.name="now"] ~ :not(CallExpression[callee.name=/^use(Effect|Memo|Callback)$/])',
        message: 'Date.now() should only be used inside useEffect, useMemo, or useCallback to avoid hydration mismatches'
      },
      {
        selector: 'CallExpression[callee.object.name="Math"][callee.property.name="random"] ~ :not(CallExpression[callee.name=/^use(Effect|Memo|Callback)$/])',
        message: 'Math.random() should only be used inside useEffect, useMemo, or useCallback to avoid hydration mismatches'
      },
      {
        selector: 'CallExpression[callee.property.name="toLocaleString"]',
        message: 'Use ClientTime component instead of toLocaleString() to avoid hydration mismatches'
      },
      {
        selector: 'CallExpression[callee.property.name="toLocaleDateString"]', 
        message: 'Use ClientTime component instead of toLocaleDateString() to avoid hydration mismatches'
      },
      {
        selector: 'CallExpression[callee.property.name="toLocaleTimeString"]',
        message: 'Use ClientTime component instead of toLocaleTimeString() to avoid hydration mismatches'
      }
    ]
  }
}