# Code Standards & Conventions

## Project Structure

```
/src/
  /app/
    App.tsx                          # Main app with theme switching
    /components/
      TwilightThinkingSite.tsx       # Homepage (light/hybrid themes)
      TwilightThinkingSiteDark.tsx   # Homepage (dark theme)
      EpisodePage.tsx                # Single episode detail page
      BrowseEpisodesPage.tsx         # Episode listing/archive
      StyleGuidePage.tsx             # Visual design system documentation
      BrandGuide.tsx                 # Brand identity guide
      /ui/                           # Reusable UI components (shadcn)
        button.tsx
        card.tsx
        ...
  /styles/
    fonts.css                        # Font imports
    index.css                        # Global styles
    tailwind.css                     # Tailwind imports
    theme.css                        # CSS variables, theme tokens

/docs/                               # Documentation (you are here!)
  README.md
  COLOR-SYSTEM.md
  COMPONENTS.md
  TYPOGRAPHY.md
  ACCENT-STRATEGY.md
  LAYOUT-PATTERNS.md
  CODE-STANDARDS.md
```

## File Naming Conventions

### Components
- Use PascalCase: `TwilightThinkingSite.tsx`
- Descriptive names: `EpisodePage.tsx`, not `Page1.tsx`
- Co-locate related components or use folders for complex features

### Documentation
- Use UPPER-KEBAB-CASE: `COLOR-SYSTEM.md`
- Descriptive and scannable: `ACCENT-STRATEGY.md`

### Assets
- Use descriptive names: `host-photo.png`, not `image1.png`
- Use kebab-case for multi-word names

## TypeScript Patterns

### Component Props
Always define explicit prop types

```tsx
interface EpisodePageProps {
  onNavigateBack: () => void;
  onPlayEpisode: (episode: any) => void;
  isPlaying: boolean;
  currentEpisode: any;
  theme?: 'light' | 'dark' | 'hybrid';
}

export function EpisodePage({ 
  onNavigateBack, 
  onPlayEpisode, 
  isPlaying, 
  currentEpisode, 
  theme = 'hybrid' 
}: EpisodePageProps) {
  // Component logic
}
```

### Type Aliases
Define common types

```tsx
type Theme = 'light' | 'dark' | 'hybrid';
type Page = 'home' | 'episode' | 'browse' | 'styleguide';

type Episode = {
  number: number;
  title: string;
  description: string;
  duration: string;
  topics: string[];
};
```

### State Typing
```tsx
const [theme, setTheme] = useState<Theme>('hybrid');
const [currentPage, setCurrentPage] = useState<Page>('home');
const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
```

## React Patterns

### Functional Components
Always use functional components with hooks

```tsx
export function ComponentName({ prop1, prop2 }: ComponentProps) {
  const [state, setState] = useState<StateType>(initialValue);
  
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  const handleAction = () => {
    // Event handler
  };
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Event Handlers
Prefix with `handle` or `on`

```tsx
const handlePlayEpisode = (episode: Episode) => {
  setCurrentEpisode(episode);
  setIsPlaying(true);
};

const handleNavigateBack = () => {
  setCurrentPage('home');
};
```

### Conditional Rendering
```tsx
// Early return for theme variants
if (theme === 'dark') {
  return <DarkVersion {...props} />;
}

// Ternary for small conditions
{isPlaying ? <Pause /> : <Play />}

// Logical AND for conditional display
{currentEpisode && <MiniPlayer episode={currentEpisode} />}
```

## Styling Conventions

### Tailwind Class Order
Follow this order for consistency:

1. Layout (display, position)
2. Sizing (width, height, padding, margin)
3. Typography (font, text)
4. Visual (background, border, shadow)
5. Transitions & animations
6. Responsive modifiers
7. State modifiers (hover, focus, group)

```tsx
<div className="
  relative                          // Layout
  flex items-center gap-3          // Layout
  w-full px-6 py-3                 // Sizing
  font-bold text-sm                // Typography
  rounded-full bg-white            // Visual
  border-2 border-purple-300       // Visual
  shadow-lg                        // Visual
  transition hover:scale-105       // Transitions
  lg:px-8 lg:py-4                  // Responsive
  group-hover:bg-purple-50         // State
">
  Content
</div>
```

### Custom Colors
Use bracket notation for brand colors

```tsx
// Foundation colors
className="bg-[#4C1D95]"
className="text-[#5B21B6]"
className="border-[#7C3AED]"

// Gradients
className="bg-gradient-to-r from-[#5B21B6] to-[#7C3AED]"

// Or use Tailwind colors when close enough
className="bg-purple-50"
className="text-purple-600"
```

### Inline Styles
Only use for dynamic values or font families

```tsx
// Font family (not available in Tailwind config)
<h1 style={{ fontFamily: 'Outfit, sans-serif' }}>

// Dynamic values
<div style={{ width: `${progress}%` }}>

// Prefer Tailwind for static values
<div className="w-1/2">  // NOT style={{ width: '50%' }}
```

### Avoiding Magic Numbers
Use Tailwind's spacing scale

```tsx
// Good
className="p-6 gap-4 mb-8"

// Avoid
className="p-[23px] gap-[17px] mb-[31px]"

// Exception: Brand-specific values
className="h-12 w-12"  // Logo size
className="h-2"        // Top bar height
```

## Component Composition

### Small, Focused Components
Break large components into smaller pieces

```tsx
// ❌ One giant component
export function EpisodePage() {
  return (
    <div>
      {/* 500 lines of JSX */}
    </div>
  );
}

// ✅ Composed from smaller components
export function EpisodePage() {
  return (
    <div>
      <EpisodeHeader />
      <EpisodePlayer />
      <EpisodeSegments />
      <EpisodeResources />
    </div>
  );
}
```

### Prop Drilling Solutions
For deep component trees, pass callbacks

```tsx
// App.tsx
const handlePlayEpisode = (episode: Episode) => {
  setCurrentEpisode(episode);
  setIsPlaying(true);
};

// Pass down to children
<Homepage onPlayEpisode={handlePlayEpisode} />

// Child component uses it
<EpisodeCard onClick={() => onPlayEpisode(episode)} />
```

### Children Pattern
For flexible composition

```tsx
interface CardProps {
  children: React.ReactNode;
  accent?: string;
}

export function Card({ children, accent }: CardProps) {
  return (
    <div className={`rounded-2xl bg-white ${accent ? `border-${accent}-400` : 'border-purple-200'}`}>
      {children}
    </div>
  );
}

// Usage
<Card>
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

## Data Patterns

### Episode Data Structure
```tsx
const episode = {
  number: 47,
  title: "Episode Title",
  description: "Episode description...",
  duration: "48:32",
  date: "2026-01-13",
  topics: ["topic1", "topic2"],
  segments: [
    {
      title: "Segment title",
      timestamp: 0,
      description: "Segment description",
      accent: "cyan"  // Optional accent color
    }
  ],
  resources: [
    {
      title: "Resource title",
      url: "https://..."
    }
  ]
};
```

### Mock Data
Keep mock data at the top of components

```tsx
export function EpisodePage() {
  // Mock data
  const episode = {
    number: 1,
    title: "Episode Title",
    // ...
  };
  
  const segments = [
    { title: "Intro", timestamp: 0 },
    { title: "Main Discussion", timestamp: 342 },
    // ...
  ];
  
  // Component logic
  // ...
}
```

### Episode State Management
```tsx
// App.tsx (global state)
const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
const [isPlaying, setIsPlaying] = useState(false);

// Pass to all pages that need it
<EpisodePage 
  currentEpisode={currentEpisode}
  isPlaying={isPlaying}
  onPlayEpisode={setCurrentEpisode}
/>
```

## Accessibility Standards

### Semantic HTML
Use appropriate HTML elements

```tsx
// ✅ Semantic
<header>
  <nav>
    <a href="#">Link</a>
  </nav>
</header>

<main>
  <article>
    <h2>Episode Title</h2>
  </article>
</main>

<footer>
  {/* Footer content */}
</footer>

// ❌ Non-semantic
<div className="header">
  <div className="nav">
    <div onClick={}>Link</div>
  </div>
</div>
```

### ARIA Labels
Add labels for icon-only buttons

```tsx
<button aria-label="Play episode">
  <Play className="h-5 w-5" />
</button>

<button aria-label="Close player">
  <X className="h-4 w-4" />
  <span className="sr-only">Close</span>
</button>
```

### Keyboard Navigation
Ensure all interactive elements are keyboard accessible

```tsx
<button 
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  className="focus:outline-none focus:ring-4 focus:ring-[#A855F7]/50"
>
  Action
</button>
```

### Focus Styles
Always provide visible focus indicators

```tsx
className="focus:outline-none focus:ring-4 focus:ring-[#A855F7]/50 rounded"
className="focus-visible:ring-2 focus-visible:ring-purple-500"
```

## Performance Patterns

### Image Optimization
```tsx
// Use appropriate loading strategy
<img 
  src={imageSrc}
  alt="Description"
  loading="lazy"
  className="..."
/>

// For hero images
<img 
  src={heroImage}
  alt="Description"
  loading="eager"
  className="..."
/>
```

### Conditional Imports
For theme variants

```tsx
// Only import dark theme if needed
if (theme === 'dark') {
  return <TwilightThinkingSiteDark {...props} />;
}
```

### Memoization (when needed)
For expensive computations

```tsx
import { useMemo } from 'react';

const filteredEpisodes = useMemo(() => {
  return episodes.filter(ep => ep.topics.includes(selectedTopic));
}, [episodes, selectedTopic]);
```

## Comment Standards

### When to Comment
- Complex logic that isn't immediately obvious
- Workarounds or hacks (with explanation)
- Future TODOs
- Section separators in long files

### Comment Style
```tsx
// Section comment for major blocks
{/* Hero - Full Width Image with Overlay */}
<section className="relative overflow-hidden">
  {/* Background Image */}
  <img src="..." />
  
  {/* Gradient Overlay - Multiple layers for depth */}
  <div className="absolute inset-0 bg-gradient-to-br..." />
  
  {/* Content */}
  <div className="relative z-10">
    {/* ... */}
  </div>
</section>

// TODO comments
// TODO: Replace mock data with API call
const episodes = mockEpisodes;

// Explanation comments
// Use bracket notation for exact brand colors not in Tailwind
className="bg-[#4C1D95]"
```

### What NOT to Comment
```tsx
// ❌ Obvious comments
// Set the theme to dark
setTheme('dark');

// ❌ Commented-out code (delete instead)
// const oldFunction = () => { ... }

// ❌ Redundant comments
// Episode card component
export function EpisodeCard() { ... }
```

## Error Handling

### Fallback UI
```tsx
{currentEpisode ? (
  <MiniPlayer episode={currentEpisode} />
) : (
  <div className="text-center text-slate-500">
    No episode playing
  </div>
)}
```

### Safe Access
```tsx
// Use optional chaining
currentEpisode?.title

// Provide defaults
const duration = currentEpisode?.duration || "00:00";
```

## Git Commit Standards

### Commit Message Format
```
type: Brief description

Optional longer description
```

### Commit Types
- `feat:` New feature
- `fix:` Bug fix
- `style:` Code style changes (formatting, no logic change)
- `refactor:` Code restructuring
- `docs:` Documentation updates
- `chore:` Maintenance tasks

### Examples
```
feat: Add accent color system to episode cards

fix: Correct purple gradient on dark theme hero

style: Reorder Tailwind classes for consistency

refactor: Extract EpisodeCard into separate component

docs: Update COLOR-SYSTEM.md with accent usage examples

chore: Update dependencies
```

## Testing Checklist

Before shipping:

- [ ] Test in light, dark, and hybrid themes
- [ ] Verify responsive design (mobile, tablet, desktop)
- [ ] Check all interactive elements are keyboard accessible
- [ ] Verify focus states are visible
- [ ] Ensure purple is dominant (80%+ of color)
- [ ] Count accent moments (should be 4-6 per page)
- [ ] Test with screen reader (basic check)
- [ ] Verify all images have alt text
- [ ] Check for console errors
- [ ] Test navigation flow

## Common Pitfalls

### ❌ Don't
```tsx
// Inline styles for static values
<div style={{ padding: '24px', backgroundColor: '#5B21B6' }}>

// Magic numbers
<div className="w-[347px] h-[219px]">

// Non-semantic HTML
<div onClick={handleClick}>Click me</div>

// Missing accessibility
<button>
  <Play />
</button>

// Too many accents
<div className="border-cyan-400 bg-pink-50">
  <span className="text-amber-700">...</span>
</div>
```

### ✅ Do
```tsx
// Tailwind utilities
<div className="p-6 bg-[#5B21B6]">

// Semantic spacing
<div className="w-full lg:w-96">

// Semantic HTML
<button onClick={handleClick}>Click me</button>

// Accessible labels
<button aria-label="Play episode">
  <Play />
</button>

// Strategic accents
<div className="border-purple-300 bg-purple-50">
  <span className="text-purple-700">...</span>
  {/* ONE accent annotation if needed */}
  <div className="border-l-4 border-cyan-400 bg-cyan-50">...</div>
</div>
```

## Quick Reference Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit

# Format code (if using Prettier)
npx prettier --write .
```

## Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Lucide Icons](https://lucide.dev)
- [WCAG Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

Remember: Code should be **readable**, **maintainable**, and **consistent**. When in doubt, favor clarity over cleverness.
