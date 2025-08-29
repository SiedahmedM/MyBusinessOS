'use client'
import { useState, useEffect } from 'react'
import { calculateTimeSavings, calculateRevenueGrowth, calculateCostReduction, formatCurrency } from '@/lib/utils'

interface CalculatorFormsProps {
  activeTab: string;
}

export function CalculatorForms({ activeTab }: CalculatorFormsProps) {
  console.log('CalculatorForms: Rendering with activeTab:', activeTab);
  
  // Time Savings inputs
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [hourlyValue, setHourlyValue] = useState(75);
  const [teamMembers, setTeamMembers] = useState(2);

  // Revenue Growth inputs  
  const [currentRevenue, setCurrentRevenue] = useState(50000);
  const [growthPercentage, setGrowthPercentage] = useState(25);

  // Cost Reduction inputs
  const [softwareSubscriptions, setSoftwareSubscriptions] = useState(500);
  const [errorCosts, setErrorCosts] = useState(2000);

  const [results, setResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  // Calculate results in real-time
  useEffect(() => {
    let calculationResults;
    
    switch (activeTab) {
      case 'time':
        const weeklyHours = hoursPerDay * 5 * teamMembers;
        calculationResults = calculateTimeSavings(weeklyHours, hourlyValue);
        break;
      case 'revenue':
        calculationResults = calculateRevenueGrowth(currentRevenue, growthPercentage);
        break;
      case 'cost':
        const totalMonthlyCost = softwareSubscriptions + errorCosts;
        calculationResults = calculateCostReduction(totalMonthlyCost, 80);
        break;
    }
    
    if (calculationResults) {
      setResults(calculationResults);
      // Add slight delay for animation
      setTimeout(() => setShowResults(true), 100);
    }
  }, [activeTab, hoursPerDay, hourlyValue, teamMembers, currentRevenue, growthPercentage, softwareSubscriptions, errorCosts]);

  const renderForm = () => {
    switch (activeTab) {
      case 'time':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Hours per day on manual tasks
              </label>
              <input
                type="number"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200"
                placeholder="e.g., 3"
                min="0.5"
                max="12"
                step="0.5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Your hourly rate/value ($)
              </label>
              <input
                type="number"
                value={hourlyValue}
                onChange={(e) => setHourlyValue(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200"
                placeholder="e.g., 75"
                min="25"
                max="500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Team members affected
              </label>
              <input
                type="number"
                value={teamMembers}
                onChange={(e) => setTeamMembers(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200"
                placeholder="e.g., 2"
                min="1"
                max="50"
              />
            </div>
            
            {showResults && results && (
              <div className="results-animate-in bg-gradient-to-br from-primary-700 to-primary-500 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Your Time Freedom</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatCurrency(results.monthlySavings)}</div>
                    <div className="text-sm opacity-90">Monthly Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatCurrency(results.yearlySavings)}</div>
                    <div className="text-sm opacity-90">Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{results.roi}%</div>
                    <div className="text-sm opacity-90">5-Year ROI</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'revenue':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Current monthly revenue ($)
              </label>
              <input
                type="number"
                value={currentRevenue}
                onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200"
                placeholder="e.g., 50,000"
                min="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Expected growth from automation (%)
              </label>
              <input
                type="number"
                value={growthPercentage}
                onChange={(e) => setGrowthPercentage(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200"
                placeholder="e.g., 25"
                min="5"
                max="100"
              />
            </div>
            
            {showResults && results && (
              <div className="results-animate-in bg-gradient-to-br from-primary-700 to-primary-500 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Revenue Explosion</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatCurrency(results.monthlyIncrease)}</div>
                    <div className="text-sm opacity-90">Monthly Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatCurrency(results.yearlyIncrease)}</div>
                    <div className="text-sm opacity-90">Annual Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatCurrency(results.fiveYearValue)}</div>
                    <div className="text-sm opacity-90">5-Year Value</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'cost':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Monthly software subscriptions ($)
              </label>
              <input
                type="number"
                value={softwareSubscriptions}
                onChange={(e) => setSoftwareSubscriptions(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200"
                placeholder="e.g., 500"
                min="50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Monthly cost of errors/inefficiencies ($)
              </label>
              <input
                type="number"
                value={errorCosts}
                onChange={(e) => setErrorCosts(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200"
                placeholder="e.g., 2,000"
                min="100"
              />
            </div>
            
            {showResults && results && (
              <div className="results-animate-in bg-gradient-to-br from-primary-700 to-primary-500 text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Cost Elimination</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatCurrency(results.monthlySavings)}</div>
                    <div className="text-sm opacity-90">Monthly Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{formatCurrency(results.yearlySavings)}</div>
                    <div className="text-sm opacity-90">Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{results.breakEvenMonths} mo</div>
                    <div className="text-sm opacity-90">Break-Even Time</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return <div>{renderForm()}</div>;
}