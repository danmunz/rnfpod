# Layout Patterns

## Container Structure

### Standard Page Container
```tsx
<div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F5F3FF] to-[#EDE9FE]">
  {/* Page content */}
</div>
```

### Content Width Containers

```tsx
// Narrow content (text-heavy pages)
<div className="mx-auto max-w-3xl px-6">
  {/* Content */}
</div>

// Standard content (most pages)
<div className="mx-auto max-w-5xl px-6">
  {/* Content */}
</div>

// Wide content (homepage, browse)
<div className="mx-auto max-w-7xl px-6">
  {/* Content */}
</div>

// Full-width sections (hero backgrounds)
<section className="w-full">
  <div className="mx-auto max-w-7xl px-6">
    {/* Constrained content inside full-width section */}
  </div>
</section>
```

## Spacing System

### Section Spacing
```tsx
// Large section gaps
className="py-20"          // Top & bottom
className="mb-20"          // Bottom only
className="space-y-20"     // Between children

// Medium section gaps  
className="py-12"
className="mb-12"
className="space-y-12"

// Small section gaps
className="py-8"
className="mb-8"
className="space-y-8"
```

### Component Spacing
```tsx
// Card padding
className="p-6"            // Standard
className="p-8"            // Comfortable
className="p-12"           // Spacious

// Element gaps
className="gap-6"          // Grid/flex gaps
className="space-y-6"      // Vertical stack
className="space-x-4"      // Horizontal stack
```

### Responsive Spacing
```tsx
// Mobile to desktop scaling
className="py-8 lg:py-20"
className="px-4 sm:px-6 lg:px-8"
className="gap-4 lg:gap-8"
className="space-y-4 lg:space-y-8"
```

## Grid Patterns

### Episode Grid (3 columns)
```tsx
<div className="grid gap-6 lg:grid-cols-3">
  <EpisodeCard />
  <EpisodeCard />
  <EpisodeCard />
</div>
```

### Two Column Layout
```tsx
<div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
  <div>{/* Left column */}</div>
  <div>{/* Right column */}</div>
</div>
```

### Asymmetric Layout (Homepage Latest Episode)
```tsx
<div className="grid lg:grid-cols-[1fr,340px]">
  <div className="p-12">
    {/* Main content */}
  </div>
  <div className="bg-gradient-to-br from-[#5B21B6] via-[#7C3AED] to-[#A855F7] p-8">
    {/* Side accent */}
  </div>
</div>
```

### Content + Sidebar
```tsx
<div className="grid gap-8 lg:grid-cols-[1fr,300px]">
  <main>{/* Main content */}</main>
  <aside>{/* Sidebar */}</aside>
</div>
```

## Responsive Patterns

### Mobile-First Approach
Always design mobile first, then scale up

```tsx
// Stack on mobile, grid on desktop
<div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
  {/* Content */}
</div>

// Hide on mobile, show on desktop
<div className="hidden lg:block">
  {/* Desktop-only content */}
</div>

// Show on mobile, hide on desktop
<div className="block lg:hidden">
  {/* Mobile-only content */}
</div>
```

### Breakpoints
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

Most commonly used: `lg:` for tablet/desktop split

### Text Scaling
```tsx
// Hero heading
<h1 className="text-4xl lg:text-5xl xl:text-6xl">

// Page title
<h1 className="text-3xl lg:text-4xl">

// Section title
<h2 className="text-2xl lg:text-3xl">

// Body text
<p className="text-base lg:text-lg">
```

### Image Sizing
```tsx
// Responsive square
<div className="h-56 w-56 lg:h-64 lg:w-64">

// Full width on mobile, constrained on desktop
<img className="w-full lg:w-96" />

// Aspect ratio maintained
<div className="aspect-video w-full">
  <img className="h-full w-full object-cover" />
</div>
```

## Page Structures

### Homepage Structure
```tsx
<div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] via-[#F5F3FF] to-[#EDE9FE]">
  {/* Header */}
  <header className="py-3">
    {/* Nav */}
  </header>

  {/* Hero - Dark with image */}
  <section className="relative overflow-hidden pb-8 pt-2">
    {/* Hero content */}
  </section>

  {/* Latest Episode - Featured card */}
  <section className="relative z-30 pb-20">
    {/* Large episode card */}
  </section>

  {/* Recent Episodes - Grid */}
  <section className="py-20">
    {/* 3-column grid */}
  </section>

  {/* About Section */}
  <section className="py-20">
    {/* Two-column layout */}
  </section>

  {/* Footer */}
  <footer className="border-t-2 border-purple-200 bg-white py-12">
    {/* Footer content */}
  </footer>

  {/* Mini Player - Fixed */}
  {currentEpisode && (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Player */}
    </div>
  )}
</div>
```

### Episode Detail Page Structure
```tsx
<div className="min-h-screen bg-gradient-to-b from-[#1E1B4B] to-[#312E81]">
  {/* Header */}
  <header className="border-b border-white/10 py-6">
    {/* Back button + nav */}
  </header>

  {/* Episode Hero */}
  <section className="py-12">
    {/* Title, description, play button */}
  </section>

  {/* Episode Details */}
  <section className="bg-white py-12">
    <div className="mx-auto max-w-5xl px-6">
      <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
        <div>
          {/* Segments timeline */}
        </div>
        <aside>
          {/* Resources, metadata */}
        </aside>
      </div>
    </div>
  </section>
</div>
```

### Browse/Archive Page Structure
```tsx
<div className="min-h-screen">
  {/* Header */}
  <header className="border-b py-6">
    {/* Nav + filters */}
  </header>

  {/* Filters */}
  <section className="border-b bg-purple-50 py-8">
    {/* Filter chips */}
  </section>

  {/* Episode Grid */}
  <section className="py-12">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Episode cards */}
      </div>
    </div>
  </section>

  {/* Pagination */}
  <section className="py-8">
    {/* Page numbers */}
  </section>
</div>
```

## Card Layouts

### Vertical Card (Episode)
```tsx
<article className="group relative overflow-hidden rounded-2xl border-2 border-purple-200 bg-white shadow-sm">
  {/* Top bar */}
  <div className="h-2 bg-gradient-to-r from-[#5B21B6] to-[#7C3AED]" />
  
  <div className="p-6">
    {/* Header */}
    <div className="mb-4 flex items-center justify-between">
      <span>{/* Episode # */}</span>
      <span>{/* Duration */}</span>
    </div>
    
    {/* Title */}
    <h3>{/* Episode title */}</h3>
    
    {/* Description */}
    <p>{/* Episode description */}</p>
    
    {/* Tags */}
    <div className="flex flex-wrap gap-2">{/* Tags */}</div>
    
    {/* Annotation */}
    <div>{/* Optional accent annotation */}</div>
    
    {/* CTA */}
    <div className="mt-4 border-t pt-4">{/* Play button */}</div>
  </div>
</article>
```

### Horizontal Card (Compact)
```tsx
<div className="group flex items-start gap-4 rounded-xl border border-purple-200 bg-white p-4">
  {/* Icon/Number */}
  <div className="flex-shrink-0">{/* Episode number circle */}</div>
  
  {/* Content */}
  <div className="flex-1">
    <h4>{/* Title */}</h4>
    <p>{/* Metadata */}</p>
  </div>
  
  {/* Action */}
  <button>{/* Play button */}</button>
</div>
```

### Feature Card (Large)
```tsx
<div className="overflow-hidden rounded-3xl border-2 border-purple-200 bg-white shadow-2xl">
  <div className="grid lg:grid-cols-[1fr,340px]">
    {/* Main content */}
    <div className="p-12">
      {/* Large content area */}
    </div>
    
    {/* Side panel */}
    <div className="bg-gradient-to-br from-[#5B21B6] to-[#A855F7] p-8">
      {/* Accent content */}
    </div>
  </div>
</div>
```

## Z-Index Layers

```tsx
// Fixed theme switcher (top)
className="z-[100]"

// Fixed mini player
className="z-50"

// Modal overlays
className="z-40"

// Sticky header
className="z-30"

// Floating elements
className="z-20"

// Content
className="z-10"

// Base content
className="relative"  // z-index: auto
```

## Overlays & Backgrounds

### Dark Hero Overlay Pattern
```tsx
<section className="relative overflow-hidden">
  {/* Background image */}
  <img src="..." className="absolute inset-0 h-full w-full object-cover" />
  
  {/* Gradient overlays */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#4C1D95]/95 via-[#5B21B6]/85 to-[#7C3AED]/70" />
  <div className="absolute inset-0 bg-gradient-to-t from-[#4C1D95] via-transparent to-transparent" />
  
  {/* Animated glow orbs */}
  <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-[#A855F7]/30 to-transparent blur-3xl" />
  
  {/* Content (on top) */}
  <div className="relative z-10">
    {/* Content here */}
  </div>
</section>
```

### Light Gradient Background
```tsx
<section className="bg-gradient-to-br from-white via-purple-50 to-purple-100 py-20">
  {/* Content */}
</section>
```

### Card with Gradient Accent
```tsx
<div className="rounded-2xl border-2 border-purple-200 bg-white">
  <div className="p-6">
    {/* Content */}
  </div>
  <div className="bg-gradient-to-br from-[#5B21B6] to-[#7C3AED] p-6">
    {/* Accent section */}
  </div>
</div>
```

## Positioning Patterns

### Fixed Elements
```tsx
// Fixed header
<header className="fixed left-0 right-0 top-0 z-50">

// Fixed footer/player
<div className="fixed bottom-0 left-0 right-0 z-50">

// Fixed sidebar
<aside className="fixed left-0 top-0 h-screen">
```

### Absolute Positioning (Decorative)
```tsx
// Badge overlay on card
<div className="absolute -right-3 -top-3">
  {/* Episode number badge */}
</div>

// Floating annotation
<div className="absolute -left-4 bottom-12 -rotate-2">
  {/* Annotation */}
</div>

// Corner accent
<div className="absolute right-0 top-0">
  {/* Corner decoration */}
</div>
```

### Sticky Elements
```tsx
// Sticky section header
<h2 className="sticky top-0 bg-white z-20">
  Section Title
</h2>

// Sticky sidebar
<aside className="sticky top-6">
  {/* Sidebar content */}
</aside>
```

## Flexbox Patterns

### Center Content
```tsx
// Horizontal & vertical center
<div className="flex h-screen items-center justify-center">

// Vertical center only
<div className="flex items-center">

// Horizontal center only
<div className="flex justify-center">
```

### Space Between
```tsx
<div className="flex items-center justify-between">
  <div>{/* Left */}</div>
  <div>{/* Right */}</div>
</div>
```

### Flex Wrap
```tsx
<div className="flex flex-wrap gap-2">
  {/* Items that wrap */}
</div>
```

### Flex Direction
```tsx
// Stack on mobile, row on desktop
<div className="flex flex-col gap-4 lg:flex-row">
  {/* Content */}
</div>
```

## Common Layout Utilities

### Aspect Ratios
```tsx
className="aspect-square"   // 1:1
className="aspect-video"    // 16:9
className="aspect-[4/3]"    // Custom
```

### Overflow Handling
```tsx
className="overflow-hidden"      // Hide overflow
className="overflow-auto"        // Scroll if needed
className="overflow-x-auto"      // Horizontal scroll
className="overflow-y-auto"      // Vertical scroll
```

### Object Fit (Images)
```tsx
className="object-cover"         // Fill container
className="object-contain"       // Fit inside
className="object-top"           // Align top
className="object-center"        // Center
```

### Rounding
```tsx
className="rounded-lg"       // 0.5rem
className="rounded-xl"       // 0.75rem
className="rounded-2xl"      // 1rem
className="rounded-3xl"      // 1.5rem
className="rounded-full"     // Circle/pill
```

## Accessibility Patterns

### Skip to Content
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

<main id="main-content">
  {/* Page content */}
</main>
```

### Focus Visible
```tsx
className="focus:outline-none focus:ring-4 focus:ring-[#A855F7]/50"
```

### Screen Reader Only
```tsx
<span className="sr-only">
  Descriptive text for screen readers
</span>
```
