'use client'

interface TechItem {
  icon: string;
  name: string;
  description: string;
}

const techItems: TechItem[] = [
  { icon: '⚛️', name: 'React', description: 'Used by Netflix & Facebook' },
  { icon: '▲', name: 'Next.js', description: 'Powers TikTok & Uber' },
  { icon: '🔷', name: 'TypeScript', description: 'Microsoft\'s language' },
  { icon: '🟢', name: 'Supabase', description: 'Real-time database' },
  { icon: '🎨', name: 'Tailwind', description: 'Modern CSS framework' },
  { icon: '◼️', name: 'Vercel', description: 'Deploy in seconds' }
]

export function TechGrid() {
  console.log('TechGrid: Rendering component');

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {techItems.map((tech, index) => (
        <div
          key={tech.name}
          className="bg-gray-800 rounded-xl p-6 text-center card-hover cursor-pointer group"
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {tech.icon}
          </div>
          <h3 className="text-white text-xl font-bold mb-2">
            {tech.name}
          </h3>
          <p className="text-gray-400 text-sm">
            {tech.description}
          </p>
        </div>
      ))}
    </div>
  )
}