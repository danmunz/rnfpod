# Component Patterns

## Overview

This document provides copy-paste component patterns used throughout the Random Neural Firings site. All components follow the purple foundation with strategic accent color usage.

## Buttons

### Primary CTA Button
Used for main actions like "Play Episode" or "Subscribe"

```tsx
<button className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-8 py-4 font-black text-white shadow-lg shadow-purple-500/30 transition hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-[#A855F7]/50">
  <Play className="h-5 w-5 fill-current" />
  Play Episode
</button>
```

### Secondary Button
For less prominent actions

```tsx
<button className="flex items-center gap-2 rounded-full border-2 border-purple-300 bg-white px-6 py-3 font-bold text-purple-900 transition hover:bg-purple-50 focus:outline-none focus:ring-4 focus:ring-purple-500/50">
  Browse Episodes
</button>
```

### Ghost Button (on dark backgrounds)
For tertiary actions on dark or image backgrounds

```tsx
<button className="flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-white/50">
  Learn More
  <ArrowUpRight className="h-5 w-5" />
</button>
```

## Badges

### Episode Number Badge
Purple foundation badge for episode numbers

```tsx
<span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#5B21B6] to-[#A855F7] px-4 py-1.5 font-mono text-xs font-black uppercase tracking-wider text-white shadow-lg">
  <Sparkles className="h-3 w-3" />
  Latest
</span>
```

### Accent Content-Type Badges
**STRATEGIC USE ONLY** - Use to signal specific content types

```tsx
// Tech/Systems content
<span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] px-4 py-2 font-mono text-xs font-black uppercase tracking-wider text-white shadow-lg">
  <Zap className="h-3 w-3" />
  Tech Deep-Dive
</span>

// Learning/Education content
<span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#84CC16] to-[#10B981] px-4 py-2 font-mono text-xs font-black uppercase tracking-wider text-white shadow-lg">
  <Target className="h-3 w-3" />
  Learning Moment
</span>

// Wisdom/Philosophy content
<span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F43F5E] px-4 py-2 font-mono text-xs font-black uppercase tracking-wider text-white shadow-lg">
  <Lightbulb className="h-3 w-3" />
  Life Lesson
</span>

// Science content
<span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#10B981] to-[#06B6D4] px-4 py-2 font-mono text-xs font-black uppercase tracking-wider text-white shadow-lg">
  <Brain className="h-3 w-3" />
  Science Topic
</span>
```

## Annotations

### Purple Foundation Annotation
Standard annotation using purple foundation colors

```tsx
<div className="rounded-xl border-l-4 border-[#7C3AED] bg-gradient-to-r from-purple-50 to-indigo-50 p-4 shadow-sm">
  <p className="font-mono text-xs font-black uppercase tracking-wider text-[#5B21B6]">
    📝 Journey Notes
  </p>
  <p className="mt-1 text-sm text-slate-700">
    Contains: 1 "wait, go back" moment, 3 aha moments, and at least 2 tangents.
  </p>
</div>
```

### Floating Annotation (Decorative)
Used on hero sections or over images

```tsx
<div className="absolute -right-6 top-12 rotate-3 rounded-xl border-2 border-dashed border-[#A855F7] bg-gradient-to-br from-white to-purple-50 p-4 shadow-xl backdrop-blur-sm">
  <p className="font-mono text-xs font-black text-[#5B21B6]">
    ⚡ Connection made!
  </p>
  <p className="mt-1 max-w-[180px] text-sm text-slate-700">
    "Wait—this is just like that thing!"
  </p>
</div>
```

### Accent Color Annotations
**STRATEGIC USE ONLY** - One per page section max

```tsx
// Tech/Systems annotation
<div className="rounded-xl border-2 border-cyan-400 bg-cyan-50 p-4 shadow-sm">
  <p className="font-mono text-xs font-black uppercase tracking-wider text-cyan-700">
    💻 Tech Deep-Dive
  </p>
  <p className="mt-1 text-sm text-slate-700">
    We explore system architecture and how networks actually work.
  </p>
</div>

// Wisdom/Philosophy annotation
<div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-4 shadow-sm">
  <p className="font-mono text-xs font-black uppercase tracking-wider text-amber-700">
    💡 Wisdom Moment
  </p>
  <p className="mt-1 text-sm text-slate-700">
    Sometimes the journey is more important than the destination.
  </p>
</div>

// Science annotation
<div className="rounded-xl border-2 border-emerald-400 bg-emerald-50 p-4 shadow-sm">
  <p className="font-mono text-xs font-black uppercase tracking-wider text-emerald-700">
    🧬 Science Corner
  </p>
  <p className="mt-1 text-sm text-slate-700">
    Breaking down the biology and psychology behind this phenomenon.
  </p>
</div>

// Creative/Design annotation
<div className="rounded-xl border-2 border-pink-400 bg-pink-50 p-4 shadow-sm">
  <p className="font-mono text-xs font-black uppercase tracking-wider text-pink-700">
    🎨 Creative Process
  </p>
  <p className="mt-1 text-sm text-slate-700">
    Exploring the artistic approach and design thinking.
  </p>
</div>
```

## Episode Cards

### Full Episode Card
Used in episode grids on homepage and browse page

```tsx
<article className="group relative overflow-hidden rounded-2xl border-2 border-purple-200 bg-white shadow-sm transition hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/20">
  {/* Gradient top bar */}
  <div className="h-2 bg-gradient-to-r from-[#5B21B6] to-[#7C3AED]" />
  
  {/* Episode number badge */}
  <div className="absolute -right-3 -top-3 flex h-12 w-12 rotate-12 items-center justify-center rounded-full border-3 border-white bg-gradient-to-br from-[#5B21B6] to-[#7C3AED] font-mono text-sm font-black text-white shadow-xl">
    47
  </div>

  <div className="p-6">
    {/* Header */}
    <div className="mb-4 mt-2 flex items-center justify-between">
      <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-600">
        Episode 47
      </span>
      <span className="font-mono text-xs text-slate-400">
        48:32
      </span>
    </div>

    {/* Title */}
    <h3 className="mb-3 font-bold text-xl leading-tight text-slate-900 group-hover:text-[#5B21B6]" style={{ fontFamily: 'Outfit, sans-serif' }}>
      From Mario Kart to Mythology: The Unexpected Journey
    </h3>

    {/* Description */}
    <p className="mb-4 text-sm leading-relaxed text-slate-600">
      What started as AJ explaining Rainbow Road strategy somehow became a deep dive into Greek mythology.
    </p>

    {/* Topic tags (purple foundation) */}
    <div className="mb-4 flex flex-wrap gap-2">
      <span className="rounded-full border border-purple-300 bg-gradient-to-r from-purple-50 to-indigo-50 px-3 py-1 text-xs font-medium text-[#5B21B6]">
        gaming
      </span>
      <span className="rounded-full border border-purple-300 bg-gradient-to-r from-purple-50 to-indigo-50 px-3 py-1 text-xs font-medium text-[#5B21B6]">
        mythology
      </span>
    </div>

    {/* Annotation - STRATEGIC accent use */}
    <div className="rounded-lg border-l-4 border-emerald-400 bg-emerald-50 p-3 shadow-sm">
      <p className="font-mono text-xs font-bold text-emerald-700">
        🧬 Contains mythology & psychology discussion
      </p>
    </div>

    {/* CTA */}
    <div className="mt-4 border-t border-purple-100 pt-4">
      <button className="flex items-center gap-2 font-bold text-sm text-[#7C3AED] transition group-hover:gap-3">
        <Play className="h-4 w-4" />
        Listen
      </button>
    </div>
  </div>
</article>
```

### Compact Episode Card
Smaller version for sidebar or recent episodes

```tsx
<div className="group flex items-start gap-4 rounded-xl border border-purple-200 bg-white p-4 transition hover:border-purple-400 hover:shadow-md">
  {/* Episode number */}
  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5B21B6] to-[#7C3AED] font-mono text-sm font-black text-white">
    47
  </div>
  
  {/* Content */}
  <div className="flex-1">
    <h4 className="mb-1 font-bold text-sm leading-tight text-slate-900 group-hover:text-[#5B21B6]">
      Episode Title Here
    </h4>
    <p className="text-xs text-slate-500">48:32</p>
  </div>
  
  {/* Play button */}
  <button className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-[#5B21B6] transition hover:bg-purple-200">
    <Play className="h-3 w-3 fill-current" />
  </button>
</div>
```

## Headers

### Main Site Header
```tsx
<header className="relative left-0 right-0 top-0 z-50 py-3">
  <div className="mx-auto max-w-7xl px-6">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#5B21B6] to-[#A855F7] shadow-lg shadow-purple-500/30">
          <Zap className="h-6 w-6 text-white" />
          <div className="absolute -right-1 -top-1 rounded-full bg-gradient-to-r from-[#A855F7] to-[#EC4899] px-1.5 py-0.5 font-mono text-[8px] font-black text-white shadow-md">
            ⚡
          </div>
        </div>
        <div>
          <div className="bg-gradient-to-r from-[#4C1D95] to-[#7C3AED] bg-clip-text font-black text-sm uppercase tracking-widest text-transparent">
            Random Neural Firings
          </div>
          <div className="font-mono text-[10px] font-bold text-purple-500">
            // Making connections
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex gap-8 text-sm font-bold text-slate-700">
        <a href="#" className="transition hover:text-[#5B21B6]">
          Listen
        </a>
        <a href="#" className="transition hover:text-[#5B21B6]">
          About
        </a>
        <a href="#" className="transition hover:text-[#5B21B6]">
          Subscribe
        </a>
      </nav>
    </div>
  </div>
</header>
```

## Hero Sections

### Dark Hero with Image Background
```tsx
<section className="relative overflow-hidden pb-8 pt-2">
  {/* Background Image */}
  <img
    src="[IMAGE_URL]"
    alt="Twilight sky"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Gradient Overlay - Multiple layers for depth */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#4C1D95]/95 via-[#5B21B6]/85 to-[#7C3AED]/70" />
  <div className="absolute inset-0 bg-gradient-to-t from-[#4C1D95] via-transparent to-transparent" />

  {/* Animated glow orbs */}
  <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-[#A855F7]/30 to-transparent blur-3xl" />
  <div className="absolute bottom-1/3 right-1/3 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-[#EC4899]/20 to-transparent blur-3xl" />

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-7xl px-6 py-8">
    <h1 className="mb-4 font-black text-4xl leading-[1.1] text-white lg:text-5xl" style={{ fontFamily: "Outfit, sans-serif" }}>
      That moment when your brain{" "}
      <span className="bg-gradient-to-r from-[#E9D5FF] via-[#F0ABFC] to-[#FBCFE8] bg-clip-text italic text-transparent">
        lights up
      </span>
    </h1>
    <p className="mb-6 text-lg leading-relaxed text-purple-100">
      Making unexpected connections between completely unrelated topics.
    </p>
  </div>
</section>
```

### Light Hero
```tsx
<section className="bg-gradient-to-br from-white via-purple-50 to-purple-100 py-20">
  <div className="mx-auto max-w-7xl px-6">
    <h1 className="mb-6 font-black text-5xl text-slate-900" style={{ fontFamily: "Outfit, sans-serif" }}>
      <span className="bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#A855F7] bg-clip-text text-transparent">
        Making Connections
      </span>
    </h1>
    <p className="text-lg text-slate-600">
      Subtitle text here
    </p>
  </div>
</section>
```

## Topic Tags

### Purple Foundation Tags (default)
Use these for all standard topic tags

```tsx
<div className="flex flex-wrap gap-2">
  <span className="rounded-full border-2 border-[#A855F7] bg-gradient-to-r from-purple-50 to-fuchsia-50 px-4 py-1.5 text-sm font-bold text-[#5B21B6]">
    gaming
  </span>
  <span className="rounded-full border-2 border-[#A855F7] bg-gradient-to-r from-purple-50 to-fuchsia-50 px-4 py-1.5 text-sm font-bold text-[#5B21B6]">
    mythology
  </span>
  <span className="rounded-full border-2 border-[#A855F7] bg-gradient-to-r from-purple-50 to-fuchsia-50 px-4 py-1.5 text-sm font-bold text-[#5B21B6]">
    narrative design
  </span>
</div>
```

## Timeline/Progress Components

### Episode Timeline Segment
```tsx
<div className="mb-4 rounded-lg border-2 border-dashed border-white/30 bg-white/5 p-3 backdrop-blur-sm">
  <div className="mb-1 flex items-center gap-2 text-sm font-bold text-white">
    <span>Rainbow Road</span>
    <ArrowRight className="h-3 w-3 text-[#F0ABFC]" />
  </div>
  <div className="ml-4 border-l-2 border-[#F0ABFC] pl-3 text-sm font-medium text-purple-100">
    Greek Mythology
  </div>
  <div className="mt-2 flex items-center gap-2">
    <Circle className="h-2 w-2 fill-current text-[#A855F7]" />
    <span className="font-mono text-xs font-bold text-purple-300">
      8 min
    </span>
  </div>
</div>
```

## Mini Player

### Fixed Bottom Player
```tsx
{currentEpisode && (
  <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-purple-300 bg-white/95 backdrop-blur-xl">
    <div className="mx-auto max-w-7xl px-6 py-4">
      <div className="flex items-center gap-4">
        {/* Play/Pause */}
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] text-white shadow-lg transition hover:scale-105">
          {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
        </button>
        
        {/* Episode info */}
        <div className="flex-1">
          <p className="font-bold text-sm text-slate-900">
            Episode {currentEpisode.number}: {currentEpisode.title}
          </p>
          <p className="text-xs text-slate-500">
            {currentEpisode.duration}
          </p>
        </div>
        
        {/* Close */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
          <X className="h-4 w-4" />
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-purple-100">
        <div className="h-full bg-gradient-to-r from-[#5B21B6] to-[#A855F7] transition-all" style={{ width: `${progress}%` }} />
      </div>
    </div>
  </div>
)}
```

## Utility Classes Reference

### Common Purple Gradients
```tsx
// Background gradients
"bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#7C3AED]"
"bg-gradient-to-r from-[#5B21B6] to-[#7C3AED]"
"bg-gradient-to-br from-purple-50 to-indigo-50"

// Text gradients
"bg-gradient-to-r from-[#5B21B6] to-[#A855F7] bg-clip-text text-transparent"

// Border colors
"border-[#7C3AED]"
"border-purple-200"
"border-purple-300"
```

### Shadow Utilities
```tsx
// Purple shadows
"shadow-lg shadow-purple-500/30"
"shadow-xl shadow-purple-500/40"
"shadow-2xl shadow-purple-500/20"

// Accent shadows (use sparingly)
"shadow-lg shadow-cyan-500/20"
"shadow-lg shadow-emerald-500/20"
"shadow-lg shadow-amber-500/20"
```

## Responsive Patterns

### Mobile-First Grid
```tsx
<div className="grid gap-6 lg:grid-cols-3">
  {/* Content */}
</div>

<div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
  {/* Content */}
</div>
```

### Responsive Text Sizing
```tsx
<h1 className="font-black text-4xl lg:text-5xl">
  Heading
</h1>

<p className="text-base lg:text-lg">
  Body text
</p>
```
