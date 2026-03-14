# Development Guidelines

## Code Style

- React functional components with TypeScript
- Tailwind CSS 4 for styling (no CSS modules or styled-components)
- shadcn/ui primitives for common UI patterns
- Outfit font for headings, Lexend for body text

## Design Principles

- Purple foundation first — 80%+ of color should be purple spectrum
- Accent colors are rare and semantic (see [docs/ACCENT-STRATEGY.md](../docs/ACCENT-STRATEGY.md))
- Mobile-first responsive design
- Accessible: semantic HTML, ARIA labels, keyboard navigation

## Episode Content

- Episodes are markdown files in `content/episodes/`
- Frontmatter schema: number, title, slug, date, duration, published, audioUrl, topics, segments, resources
- Audio hosted on Cloudflare R2, URLs wrapped with OP3 prefix for analytics
- Run `npm run build:content` after editing episode markdown

## Commits

- Descriptive messages: "Add ep003" not "update files"
- Run `npm run build` before pushing to verify no build errors
