'use client'
import { useEffect, useRef } from 'react'

interface Tab {
  id: string;
  label: string;
  icon: string;
}

interface TabSystemProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: 'time', label: 'Time Savings', icon: '◆' },
  { id: 'revenue', label: 'Revenue Growth', icon: '◆' },
  { id: 'cost', label: 'Cost Reduction', icon: '◆' }
]

export function TabSystem({ activeTab, onTabChange }: TabSystemProps) {
  console.log('TabSystem: Rendering with activeTab:', activeTab);
  
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabsRef.current && indicatorRef.current) {
      const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
      const tabWidth = 100 / tabs.length;
      
      indicatorRef.current.style.transform = `translateX(${activeIndex * 100}%)`;
      indicatorRef.current.style.width = `${tabWidth}%`;
    }
  }, [activeTab]);

  return (
    <div className="relative mb-8" ref={tabsRef}>
      <div className="flex bg-gray-100 rounded-xl p-1 relative">
        {/* Sliding indicator */}
        <div 
          ref={indicatorRef}
          className="absolute top-1 bottom-1 bg-accent-600 rounded-lg transition-all duration-300 ease-out shadow-lg"
          style={{ width: `${100 / tabs.length}%` }}
        />
        
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              console.log('TabSystem: Switching to tab:', tab.id);
              onTabChange(tab.id);
            }}
            className={`relative flex-1 py-3 px-6 text-sm font-semibold rounded-lg transition-all duration-200 z-10 ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}