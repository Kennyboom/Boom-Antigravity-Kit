import { Link } from 'react-router-dom'
import { cn } from '../../lib/utils'

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Installation', href: '/installation' },
      { label: 'Documentation', href: '/docs' },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/hainamchung/agent-assistant',
        external: true,
      },
      {
        label: 'License',
        href: 'https://github.com/hainamchung/agent-assistant/blob/main/LICENSE',
        external: true,
      },
      {
        label: 'Issues',
        href: 'https://github.com/hainamchung/agent-assistant/issues',
        external: true,
      },
      {
        label: 'Contributing',
        href: 'https://github.com/hainamchung/agent-assistant/blob/main/README.md',
        external: true,
      },
    ],
  },
]

interface FooterProps {
  className?: string
}

/**
 * Footer - Site footer with links and support section
 */
export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'bg-[#1a1a1a]',
        'border-t border-[rgba(255,255,255,0.1)]',
        className
      )}
      role="contentinfo"
    >
      <div className="container-responsive py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link
              to="/"
              className={cn(
                'inline-flex items-center gap-3 mb-4',
                'focus-visible:outline-none focus-visible:ring-2',
                'focus-visible:ring-[var(--color-text-accent)]',
                'rounded-lg'
              )}
            >
              <img
                src="/assets/logo.svg"
                alt=""
                className="h-8 w-auto"
                aria-hidden="true"
              />
              <span className="text-lg font-semibold text-[var(--color-text-primary)]">
                Agent Assistant
              </span>
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4 max-w-xs">
              Transform AI assistants into specialized development teams with
              intelligent orchestration.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/hainamchung/agent-assistant"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'text-[var(--color-text-secondary)]',
                  'hover:text-[var(--color-text-primary)]',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-[var(--color-text-accent)]',
                  'rounded-md p-1',
                  'transition-colors'
                )}
                aria-label="GitHub repository"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'inline-flex items-center gap-1.5',
                          'text-sm text-[var(--color-text-secondary)]',
                          'hover:text-[var(--color-text-accent)]',
                          'focus-visible:outline-none focus-visible:ring-2',
                          'focus-visible:ring-[var(--color-text-accent)]',
                          'rounded-sm',
                          'transition-colors'
                        )}
                      >
                        {link.label}
                        <svg
                          className="w-3 h-3 opacity-60"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className={cn(
                          'text-sm text-[var(--color-text-secondary)]',
                          'hover:text-[var(--color-text-accent)]',
                          'focus-visible:outline-none focus-visible:ring-2',
                          'focus-visible:ring-[var(--color-text-accent)]',
                          'rounded-sm',
                          'transition-colors'
                        )}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Support Column */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wider mb-4">
              Support
            </h3>
            <div className="space-y-4">
              <a
                href="https://buymeacoffee.com/namnch"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-4 py-2',
                  'bg-[#FFDD00] hover:bg-[#FFDD00]/90',
                  'text-black font-medium text-sm',
                  'rounded-lg',
                  'focus-visible:outline-none focus-visible:ring-2',
                  'focus-visible:ring-[#FFDD00]',
                  'transition-colors'
                )}
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.185-1.755.213-.896.042-1.793.021-2.687-.045-.897-.064-1.785-.19-2.642-.461-1.023-.322-1.65-.985-1.731-2.085-.032-.436.02-.873.002-1.308a.41.41 0 00-.449-.399.41.41 0 00-.399.449c.007.12 0 .241 0 .362 0 .471-.017.941.019 1.41.113 1.481 1.04 2.428 2.447 2.844a11.74 11.74 0 002.696.487c.914.068 1.832.088 2.749.044.741-.036 1.48-.1 2.2-.307 1.208-.347 1.997-1.165 2.129-2.458.095-.916.194-1.83.292-2.746.065-.608.132-1.216.196-1.825.065-.607.131-1.213.196-1.82l.054-.502a.475.475 0 01.399-.438c.182-.02.361-.05.541-.08a12.1 12.1 0 002.067-.587c.506-.196.942-.478 1.27-.895.358-.455.524-1.004.443-1.575-.067-.466-.265-.89-.53-1.271-.293-.42-.667-.767-1.048-1.099-.432-.377-.89-.727-1.349-1.075-.51-.387-1.036-.745-1.56-1.108z" />
                </svg>
                Buy Me a Coffee
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.1)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              © 2026 NamCH. MIT License.
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Built with{' '}
              <span className="text-[var(--color-gradient-red)]" aria-label="love">
                ♥
              </span>{' '}
              using React + Vite + Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
