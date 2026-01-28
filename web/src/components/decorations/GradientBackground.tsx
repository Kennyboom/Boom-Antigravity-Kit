import { motion } from 'framer-motion'

export type GradientTheme = 
  | 'home'
  | 'installation'
  | 'docs'
  | 'commands'
  | 'agents'
  | 'platforms'
  | 'orchestration'
  | 'setup'
  | 'quality'
  | 'skills'

interface GradientConfig {
  primary: string
  secondary: string
  accent?: string
}

const gradientConfigs: Record<GradientTheme, GradientConfig> = {
  home: {
    primary: 'rgba(136, 68, 255, 0.15)',   // Purple
    secondary: 'rgba(255, 68, 68, 0.1)',    // Red
    accent: 'rgba(0, 255, 136, 0.08)',      // Green
  },
  installation: {
    primary: 'rgba(0, 255, 136, 0.12)',     // Green
    secondary: 'rgba(0, 212, 255, 0.1)',    // Cyan
    accent: 'rgba(136, 68, 255, 0.08)',     // Purple
  },
  docs: {
    primary: 'rgba(0, 212, 255, 0.12)',     // Cyan
    secondary: 'rgba(136, 68, 255, 0.1)',   // Purple
    accent: 'rgba(255, 136, 68, 0.08)',     // Orange
  },
  commands: {
    primary: 'rgba(255, 68, 68, 0.12)',     // Red
    secondary: 'rgba(255, 136, 68, 0.1)',   // Orange
    accent: 'rgba(136, 68, 255, 0.08)',     // Purple
  },
  agents: {
    primary: 'rgba(255, 136, 68, 0.12)',    // Orange
    secondary: 'rgba(255, 68, 68, 0.1)',    // Red
    accent: 'rgba(0, 212, 255, 0.08)',      // Cyan
  },
  platforms: {
    primary: 'rgba(0, 212, 255, 0.12)',     // Cyan
    secondary: 'rgba(136, 68, 255, 0.1)',   // Purple
    accent: 'rgba(0, 255, 136, 0.08)',      // Green
  },
  orchestration: {
    primary: 'rgba(136, 68, 255, 0.15)',    // Purple
    secondary: 'rgba(0, 212, 255, 0.1)',    // Cyan
    accent: 'rgba(255, 136, 68, 0.08)',     // Orange
  },
  setup: {
    primary: 'rgba(0, 255, 136, 0.15)',     // Green
    secondary: 'rgba(136, 68, 255, 0.1)',   // Purple
    accent: 'rgba(0, 212, 255, 0.08)',      // Cyan
  },
  quality: {
    primary: 'rgba(255, 136, 68, 0.12)',    // Orange
    secondary: 'rgba(0, 255, 136, 0.1)',    // Green
    accent: 'rgba(255, 68, 68, 0.08)',      // Red
  },
  skills: {
    primary: 'rgba(136, 68, 255, 0.15)',    // Purple
    secondary: 'rgba(0, 212, 255, 0.1)',    // Cyan
    accent: 'rgba(0, 255, 136, 0.08)',      // Green
  },
}

interface GradientBackgroundProps {
  theme: GradientTheme
  className?: string
}

export function GradientBackground({ theme, className = '' }: GradientBackgroundProps) {
  const config = gradientConfigs[theme]

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Main gradient orb - top left */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full blur-[120px]"
        style={{ backgroundColor: config.primary }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.5, 0.8, 0.5],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary gradient orb - bottom right */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full blur-[100px]"
        style={{ backgroundColor: config.secondary }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Accent gradient orb - center/offset */}
      {config.accent && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[80px]"
          style={{ backgroundColor: config.accent }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      )}

      {/* Mesh gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, ${config.primary} 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, ${config.secondary} 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, ${config.accent || 'transparent'} 0%, transparent 40%)
          `,
        }}
      />

      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
