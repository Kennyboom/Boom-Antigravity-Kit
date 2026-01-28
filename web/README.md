# Agent Assistant Website

Professional website for the Agent Assistant project - a multi-agent orchestration system for AI coding assistants.

## Features

- 🎨 Modern dark theme with gradient accents
- ⚡ Fast page loads with code splitting
- 📱 Fully responsive (mobile, tablet, desktop)
- ♿ Accessible (WCAG 2.1 AA compliant)
- 🔍 SEO optimized with structured data
- 🎬 Smooth animations with reduced motion support

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **React 18+** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **React Router v6** - Client-side routing
- **Framer Motion** - Animations
- **React Helmet Async** - SEO management
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── badges/          # Badge components
│   ├── cards/           # Card components
│   ├── code/            # Code display components
│   ├── layout/          # Layout components (Header, Footer, etc.)
│   ├── sections/        # Page section components
│   ├── seo/             # SEO and structured data
│   └── ui/              # Base UI components (Button, etc.)
├── pages/               # Route pages
│   └── features/        # Feature detail pages
├── data/                # Static data (agents, commands, etc.)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── types/               # TypeScript type definitions
└── styles/              # Global CSS styles
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, features overview |
| `/installation` | Installation guide |
| `/docs` | Documentation page |
| `/features/one-time-setup` | One-time setup feature |
| `/features/sub-agent-orchestration` | Sub-agent orchestration feature |
| `/features/multi-platform-support` | Multi-platform support feature |
| `/features/matrix-skills` | Matrix skills feature |
| `/features/specialist-agents` | Specialist agents feature |
| `/features/commands-workflows` | Commands & workflows feature |
| `/features/quality-gates` | Quality gates feature |

## Code Quality

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Performance

- Code splitting for all feature pages
- Lazy loading for non-critical components
- Optimized asset loading
- Minimal bundle size (~120KB gzipped for main bundle)

## Accessibility

- Skip to content link
- Keyboard navigation support
- ARIA labels and roles
- Focus visible states
- Reduced motion support

## License

MIT License - see LICENSE file in the root directory.
