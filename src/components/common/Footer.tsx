'use client'
import { Logo } from './Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const go = (hash: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    try {
      // Update hash for router/tab state
      window.location.hash = hash
      // Smooth scroll to top for consistent page start
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      // Fallback
      window.scrollTo(0, 0)
    }
  }

  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <Logo variant="footer" size="lg" color="white" />
            </div>
            <p className="text-neutral-400 leading-relaxed mb-6 max-w-md">
              Custom software development that transforms businesses. 
              From simple websites to complex SaaS platforms—turning ideas into reality 
              with enterprise-grade solutions at freelancer prices.
            </p>
            <div className="flex items-center text-accent-400 font-medium">
              <div className="w-2 h-2 bg-accent-400 rounded-full mr-3"></div>
              Orange County, CA
            </div>
          </div>

          {/* Services (updated to current sections) */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#crm" onClick={go('#crm')} className="hover:text-accent-400 transition-colors">Custom CRM Systems</a></li>
              <li><a href="#erp" onClick={go('#erp')} className="hover:text-accent-400 transition-colors">Custom ERP Solutions</a></li>
              <li><a href="#automation" onClick={go('#automation')} className="hover:text-accent-400 transition-colors">Business Process Automation</a></li>
              <li><a href="#ai" onClick={go('#ai')} className="hover:text-accent-400 transition-colors">AI Integration</a></li>
            </ul>
          </div>

          {/* Company (trimmed to live sections) */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#process" onClick={go('#process')} className="hover:text-accent-400 transition-colors">Our Process</a></li>
              <li><a href="#services" onClick={go('#services')} className="hover:text-accent-400 transition-colors">Services Overview</a></li>
              <li><a href="#contact" onClick={go('#contact')} className="hover:text-accent-400 transition-colors">Contact</a></li>
              <li><a href="#home" onClick={go('#home')} className="hover:text-accent-400 transition-colors">Home</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm">
              <span>&copy; {currentYear} CustomSoftwarePro. All rights reserved.</span>
              <a href="mailto:hello@customsoftwarepro.com" className="hover:text-accent-400 transition-colors">
                hello@customsoftwarepro.com
              </a>
            </div>
            <div className="text-sm text-neutral-400">
              Built with ❤️ in Orange County, CA
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none">
        <div className="bg-grid-pattern w-full h-full"></div>
      </div>
    </footer>
  )
}
