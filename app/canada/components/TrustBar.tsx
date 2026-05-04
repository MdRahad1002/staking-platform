import { trustBarItems } from '../data'
import { ExternalLink } from 'lucide-react'

export function TrustBar() {
  return (
    <div className="bg-gray-50 border-y border-gray-200" role="complementary" aria-label="Regulatory trust signals">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile: vertical stack; Desktop: horizontal row */}
        <ul className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {trustBarItems.map(({ label, href, external }) => {
            const isExternal = external ?? href.startsWith('http')
            return (
              <li key={label} className="flex-1">
                <a
                  href={href}
                  className="flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-medium text-gray-500 hover:text-[#00C896] transition-colors text-center"
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                  <span>{label}</span>
                  {isExternal && <ExternalLink className="h-3 w-3 flex-shrink-0" aria-hidden="true" />}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
