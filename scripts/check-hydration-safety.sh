#!/bin/bash

echo "🔍 Checking for potential hydration issues..."

# Check for hydration-unsafe patterns outside of hooks
echo -e "\n📍 Looking for Date.now(), Math.random(), and locale methods outside of hooks:"
grep -RIn "toLocaleTimeString\|toLocaleDateString\|Date\.now\|Math\.random\|randomUUID" src --include="*.ts*" \
  | grep -v "useEffect\|useMemo\|useCallback\|\.test\.\|route\.ts\|api/" \
  | grep -v "// ESLint exception" || echo "✅ No unsafe patterns found"

echo -e "\n📍 Checking React keys for stability (should not use Math.random or Date.now):"
grep -RIn "key=.*\(Math\.random\|Date\.now\)" src --include="*.ts*" || echo "✅ All keys are stable"

echo -e "\n📍 Checking for typeof window conditionals that change markup:"
grep -RIn "typeof window.*?" src --include="*.ts*" -A 3 -B 3 | grep -E "(return|jsx|<)" || echo "✅ No conditional markup based on typeof window"

echo -e "\n📍 Checking for direct window/document access in render (should be in useEffect):"
grep -RIn "window\.\|document\.\|navigator\." src --include="*.ts*" \
  | grep -v "useEffect\|\.test\.\|route\.ts\|api/" \
  | grep -v "// ESLint exception" || echo "✅ No direct browser API access in render"

echo -e "\n✨ Hydration safety check complete!"