import { motion } from 'framer-motion'

// Command items for left side
const leftCommands = [
  { cmd: '/cook', desc: 'Build features', color: '#ff4444', delay: 0 },
  { cmd: '/fix', desc: 'Fix bugs', color: '#ff8844', delay: 0.3 },
  { cmd: '/plan', desc: 'Create plans', color: '#8844ff', delay: 0.6 },
  { cmd: '/debug', desc: 'Debug issues', color: '#00d4ff', delay: 0.9 },
  { cmd: '/test', desc: 'Run tests', color: '#00ff88', delay: 1.2 },
]

// Feature items for right side
const rightFeatures = [
  { icon: '🤖', text: 'Multi-Agent', color: '#8844ff', delay: 0.15 },
  { icon: '⚡', text: 'Auto-Route', color: '#ff8844', delay: 0.45 },
  { icon: '🎯', text: 'Skill Match', color: '#00ff88', delay: 0.75 },
  { icon: '📋', text: 'Quality Gates', color: '#00d4ff', delay: 1.05 },
  { icon: '🔄', text: 'Workflows', color: '#ff4444', delay: 1.35 },
]

// Floating code snippets
const codeSnippets = [
  { code: 'async', x: 5, y: 20, delay: 0.2 },
  { code: 'await', x: 12, y: 45, delay: 0.5 },
  { code: '() =>', x: 8, y: 70, delay: 0.8 },
]

const rightCodeSnippets = [
  { code: 'const', x: 85, y: 25, delay: 0.3 },
  { code: 'export', x: 88, y: 55, delay: 0.6 },
  { code: 'import', x: 82, y: 80, delay: 0.9 },
]

interface CommandBadgeProps {
  cmd: string
  desc: string
  color: string
  delay: number
  index: number
}

function CommandBadge({ cmd, desc, color, delay, index }: CommandBadgeProps) {
  const yPosition = 15 + index * 16 // Stagger vertically

  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-secondary/80 backdrop-blur-sm border border-border-primary/50"
      style={{ 
        left: '3%',
        top: `${yPosition}%`,
        boxShadow: `0 0 20px ${color}20`,
      }}
      initial={{ opacity: 0, x: -30 }}
      animate={{ 
        opacity: [0.4, 0.7, 0.4],
        x: 0,
      }}
      transition={{
        opacity: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
        x: {
          duration: 0.5,
          delay: delay + 0.5,
        },
      }}
    >
      <span 
        className="font-mono text-sm font-semibold"
        style={{ color }}
      >
        {cmd}
      </span>
      <span className="text-xs text-text-tertiary hidden xl:inline">
        {desc}
      </span>
    </motion.div>
  )
}

interface FeatureBadgeProps {
  icon: string
  text: string
  color: string
  delay: number
  index: number
}

function FeatureBadge({ icon, text, color, delay, index }: FeatureBadgeProps) {
  const yPosition = 18 + index * 15 // Stagger vertically

  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-secondary/80 backdrop-blur-sm border border-border-primary/50"
      style={{ 
        right: '3%',
        top: `${yPosition}%`,
        boxShadow: `0 0 20px ${color}20`,
      }}
      initial={{ opacity: 0, x: 30 }}
      animate={{ 
        opacity: [0.4, 0.7, 0.4],
        x: 0,
      }}
      transition={{
        opacity: {
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        },
        x: {
          duration: 0.5,
          delay: delay + 0.5,
        },
      }}
    >
      <span className="text-base">{icon}</span>
      <span 
        className="text-xs font-medium"
        style={{ color }}
      >
        {text}
      </span>
    </motion.div>
  )
}

interface FloatingCodeProps {
  code: string
  x: number
  y: number
  delay: number
}

function FloatingCode({ code, x, y, delay }: FloatingCodeProps) {
  return (
    <motion.span
      className="absolute hidden xl:block font-mono text-xs text-text-tertiary/30 select-none"
      style={{ 
        left: `${x}%`,
        top: `${y}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        y: [0, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    >
      {code}
    </motion.span>
  )
}

// Animated line decoration
function AnimatedLine({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left'
  
  return (
    <motion.div
      className={`absolute hidden lg:block w-[1px] h-32 ${isLeft ? 'left-[15%]' : 'right-[15%]'} top-1/3`}
      style={{
        background: `linear-gradient(to bottom, transparent, ${isLeft ? '#8844ff40' : '#00ff8840'}, transparent)`,
      }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ 
        scaleY: 1, 
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        scaleY: { duration: 1, delay: isLeft ? 1 : 1.2 },
        opacity: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: isLeft ? 1.5 : 1.7 },
      }}
    />
  )
}

// Floating particle
function FloatingParticle({ x, y, delay, color }: { x: number; y: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute hidden lg:block w-1.5 h-1.5 rounded-full"
      style={{ 
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 0.6, 0],
        scale: [0.5, 1, 0.5],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  )
}

export function HeroSideDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Left side - Commands */}
      {leftCommands.map((cmd, index) => (
        <CommandBadge
          key={cmd.cmd}
          {...cmd}
          index={index}
        />
      ))}
      
      {/* Right side - Features */}
      {rightFeatures.map((feature, index) => (
        <FeatureBadge
          key={feature.text}
          {...feature}
          index={index}
        />
      ))}
      
      {/* Floating code snippets - left */}
      {codeSnippets.map((snippet) => (
        <FloatingCode key={snippet.code} {...snippet} />
      ))}
      
      {/* Floating code snippets - right */}
      {rightCodeSnippets.map((snippet) => (
        <FloatingCode key={snippet.code} {...snippet} />
      ))}
      
      {/* Animated vertical lines */}
      <AnimatedLine side="left" />
      <AnimatedLine side="right" />
      
      {/* Floating particles */}
      <FloatingParticle x={8} y={35} delay={0} color="#8844ff" />
      <FloatingParticle x={92} y={40} delay={0.5} color="#00ff88" />
      <FloatingParticle x={6} y={60} delay={1} color="#ff8844" />
      <FloatingParticle x={94} y={55} delay={1.5} color="#00d4ff" />
      <FloatingParticle x={10} y={75} delay={2} color="#ff4444" />
      <FloatingParticle x={90} y={70} delay={2.5} color="#8844ff" />
    </div>
  )
}
