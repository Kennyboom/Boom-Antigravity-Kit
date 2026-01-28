import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

/**
 * Error Boundary component to catch React errors
 * Provides graceful error handling with recovery options
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // In production, you could send this to an error reporting service
    // e.g., Sentry, LogRocket, etc.
  }

  handleReload = (): void => {
    globalThis.location.reload()
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null })
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-gradient-red"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Error Message */}
            <h1 className="text-2xl font-bold text-text-primary mb-2">
              Something went wrong
            </h1>
            <p className="text-text-secondary mb-6">
              We're sorry, but something unexpected happened. Please try reloading the page or going back to home.
            </p>

            {/* Error Details (development only) */}
            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-text-muted hover:text-text-secondary transition-colors">
                  Technical details
                </summary>
                <pre className="mt-2 p-4 bg-bg-tertiary rounded-lg text-xs text-text-secondary overflow-auto max-h-40">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-text-accent text-bg-primary font-medium rounded-lg hover:bg-text-accent/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reload Page
              </button>
              
              <Link
                to="/"
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-tertiary text-text-primary font-medium rounded-lg border border-border-primary hover:bg-bg-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Loading spinner component for Suspense fallback
 * Centered with smooth animation
 */
interface LoadingSpinnerProps {
  readonly message?: string
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <output 
      className="min-h-screen flex items-center justify-center bg-bg-primary"
      aria-label={message}
    >
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-4">
          {/* Outer ring */}
          <div className="absolute inset-0 border-4 border-border-primary rounded-full" />
          {/* Spinning arc */}
          <div className="absolute inset-0 border-4 border-transparent border-t-text-accent rounded-full animate-spin" />
          {/* Inner glow effect */}
          <div className="absolute inset-2 border-2 border-transparent border-t-text-accent/30 rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
        </div>
        
        {/* Loading text */}
        <p className="text-text-secondary text-sm font-medium">
          {message}
        </p>
        
        {/* Subtle pulse dots */}
        <div className="flex justify-center gap-1 mt-3">
          <span className="w-1.5 h-1.5 bg-text-accent/50 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 bg-text-accent/50 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 bg-text-accent/50 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </output>
  )
}
