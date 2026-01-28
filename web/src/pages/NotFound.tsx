import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button, Section } from '../components/ui'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Section background="gradient" spacing="xl" className="min-h-[80vh] flex items-center">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 404 Number */}
            <motion.div
              className="text-[8rem] md:text-[12rem] font-bold leading-none mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="gradient-text">404</span>
            </motion.div>

            {/* Icon */}
            <motion.div
              className="text-6xl mb-6"
              initial={{ rotate: -10, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              🔍
            </motion.div>

            {/* Message */}
            <h1 className="heading-page mb-4">
              Page Not Found
            </h1>
            <p className="text-body text-lg mb-8">
              Oops! The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="primary" size="lg" href="/">
                Go to Homepage
              </Button>
              <Button variant="secondary" size="lg" href="/docs">
                Browse Docs
              </Button>
            </div>

            {/* Quick Links */}
            <div className="pt-8 border-t border-border-primary">
              <p className="text-small mb-4">Or try one of these:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/installation" 
                  className="text-text-accent hover:text-text-primary transition-colors"
                >
                  Installation
                </Link>
                <Link 
                  to="/features/specialist-agents" 
                  className="text-text-accent hover:text-text-primary transition-colors"
                >
                  Agents
                </Link>
                <Link 
                  to="/features/commands-workflows" 
                  className="text-text-accent hover:text-text-primary transition-colors"
                >
                  Commands
                </Link>
                <a 
                  href="https://github.com/hainamchung/agent-assistant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-accent hover:text-text-primary transition-colors flex items-center gap-1"
                >
                  GitHub
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>
    </main>
  )
}
