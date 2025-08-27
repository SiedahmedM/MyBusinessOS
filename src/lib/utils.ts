export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function calculateTimeSavings(hoursPerWeek: number, hourlyRate: number) {
  const weeklySavings = hoursPerWeek * hourlyRate;
  const monthlySavings = weeklySavings * 4.33;
  const yearlySavings = monthlySavings * 12;
  const fiveYearSavings = yearlySavings * 5;
  const softwareCost = 10000;
  const roi = ((fiveYearSavings - softwareCost) / softwareCost * 100);
  
  return {
    weeklySavings,
    monthlySavings,
    yearlySavings,
    fiveYearSavings,
    roi: Math.round(roi)
  };
}

export function calculateRevenueGrowth(currentRevenue: number, growthPercentage: number) {
  const monthlyIncrease = (currentRevenue * growthPercentage / 100);
  const newRevenue = currentRevenue + monthlyIncrease;
  const yearlyIncrease = monthlyIncrease * 12;
  const fiveYearValue = yearlyIncrease * 5;
  
  return {
    monthlyIncrease,
    newRevenue,
    yearlyIncrease,
    fiveYearValue
  };
}

export function calculateCostReduction(currentCost: number, reductionPercentage: number) {
  const monthlySavings = currentCost * reductionPercentage / 100;
  const newCost = currentCost - monthlySavings;
  const yearlySavings = monthlySavings * 12;
  const breakEvenMonths = Math.ceil(10000 / monthlySavings);
  
  return {
    monthlySavings,
    newCost,
    yearlySavings,
    breakEvenMonths
  };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

export function scrollToSection(sectionId: string) {
  console.log('scrollToSection: Scrolling to', sectionId);
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    console.warn('scrollToSection: Element not found:', sectionId);
  }
}