# Random Neural Firings - Frontend Design Documentation

## Project Overview

**Random Neural Firings** is a podcast featuring Dan (dad, 41) and AJ (daughter, 11) having rambling conversations about nerdy topics, AJ's life, and random interesting ideas. The brand embodies "sparkle brain" energy with ADHD vibes, making unexpected connections between seemingly unrelated topics.

## Design Concept: Twilight Thinking

The visual identity uses the **Twilight Thinking** concept:
- **Foundation**: Deep purple spectrum (indigo → violet → lavender) represents the twilight sky
- **Accent Colors**: 8 "Neural Spark" colors represent different types of intellectual moments
- **Philosophy**: Purple is dominant (80%+ of all color), accents are rare and intentional

### Brand Personality
- Smart but not smug
- Energetic but not manic
- Curious but not performative
- Playful nerd but not gamer bro
- Definite ADHD/"sparkle brain" energy

## Documentation Structure

This documentation is organized into focused guides:

1. **[COLOR-SYSTEM.md](./COLOR-SYSTEM.md)** - Complete color palette, semantic meanings, and usage rules
2. **[COMPONENTS.md](./COMPONENTS.md)** - Component patterns, code examples, and implementation guidelines
3. **[TYPOGRAPHY.md](./TYPOGRAPHY.md)** - Font families, type scale, and text styling
4. **[LAYOUT-PATTERNS.md](./LAYOUT-PATTERNS.md)** - Page structure, spacing, and responsive design
5. **[ACCENT-STRATEGY.md](./ACCENT-STRATEGY.md)** - The critical "Golden Rule" and strategic accent placement
6. **[CODE-STANDARDS.md](./CODE-STANDARDS.md)** - File structure, naming conventions, and code patterns

## Quick Start for Developers

### Tech Stack
- **Framework**: React 18.3.1 with TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Fonts**: 
  - Outfit (headings, display)
  - Lexend (body, UI)

### Key Principles

1. **Purple Foundation First**: Always start with purple spectrum colors
2. **Strategic Accent Use**: 4-6 accent moments maximum per page
3. **Semantic Color Mapping**: Match accent colors to content types
4. **No Rainbow Chaos**: Use 1-2 accent colors per page, not all 8

### File Structure
```
/src/app/
  App.tsx                          # Main app with routing
  /components/
    TwilightThinkingSite.tsx       # Homepage (light/hybrid)
    TwilightThinkingSiteDark.tsx   # Homepage (dark variant)
    EpisodePage.tsx                # Single episode detail
    BrowseEpisodesPage.tsx         # Episode listing
    StyleGuidePage.tsx             # Visual design system docs
    BrandGuide.tsx                 # Brand identity docs
```

## Implementation Checklist

When implementing new pages or features:

- [ ] Start with purple foundation colors (indigo, violet, lavender)
- [ ] Identify 4-6 strategic moments for accent colors
- [ ] Match accent colors to semantic content types
- [ ] Use Outfit font for all headings
- [ ] Use Lexend font for body text
- [ ] Ensure responsive design (mobile-first)
- [ ] Add floating annotations where appropriate
- [ ] Test in light, dark, and hybrid themes
- [ ] Verify purple remains dominant (80%+)

## Theme System

The site supports three theme modes:
- **Light**: Light backgrounds, purple accents, high contrast
- **Dark**: Deep purple/indigo backgrounds, twilight aesthetic
- **Hybrid** (recommended): Light sections transitioning to dark

See `theme` prop usage in component files.

## Getting Help

- Review the **[ACCENT-STRATEGY.md](./ACCENT-STRATEGY.md)** file first - it's the most critical
- Check **[COMPONENTS.md](./COMPONENTS.md)** for copy-paste code examples
- Refer to **[StyleGuidePage.tsx](../src/app/components/StyleGuidePage.tsx)** for visual reference
- See existing pages for real-world implementation examples

## Critical Rule

> **"Use accent colors like yelling — the more you do it, the less people listen."**

This is the Golden Rule. Accent colors should be rare, intentional, and tied to semantic meaning. Never use all 8 accents on one page. Never let accents compete with the purple foundation.
