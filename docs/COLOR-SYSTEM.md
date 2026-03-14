# Color System

## Overview

The Random Neural Firings color system is built on two layers:

1. **Foundation Colors** (purple spectrum) - Used extensively, 80%+ of all color
2. **Neural Spark Accents** - Used sparingly, 4-6 strategic moments per page

## Foundation Colors (Purple Spectrum)

These colors form the core twilight aesthetic and should be used liberally throughout the design.

### Deep Indigo
- **Hex**: `#4C1D95`
- **Tailwind**: `from-[#4C1D95]` or custom
- **Usage**: Primary dark backgrounds, header backgrounds, dark gradients
- **Example**: Header backgrounds, hero section overlays

```tsx
<div className="bg-gradient-to-r from-[#4C1D95] to-[#5B21B6]">
  {/* Content */}
</div>
```

### Royal Purple
- **Hex**: `#5B21B6`
- **Tailwind**: `from-[#5B21B6]`, `text-[#5B21B6]`, `border-[#5B21B6]`
- **Usage**: Primary CTAs, major UI elements, brand color
- **Example**: Primary buttons, logo colors, main brand moments

```tsx
<button className="bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] text-white">
  Primary Action
</button>
```

### Vibrant Purple
- **Hex**: `#7C3AED`
- **Tailwind**: `from-[#7C3AED]`, `text-[#7C3AED]`, `border-[#7C3AED]`
- **Usage**: Interactive elements, hover states, links
- **Example**: Hover effects, active states, interactive components

```tsx
<a className="text-[#7C3AED] hover:text-[#5B21B6]">
  Link Text
</a>
```

### Soft Purple
- **Hex**: `#A855F7`
- **Tailwind**: `from-[#A855F7]`, `text-[#A855F7]`, `bg-[#A855F7]`
- **Usage**: Accents, highlights, secondary elements
- **Example**: Badges, small icons, decorative elements

```tsx
<span className="inline-flex items-center gap-2 bg-gradient-to-r from-[#A855F7] to-[#EC4899] px-4 py-1.5">
  Latest
</span>
```

### Light Lavender
- **Hex**: `#E9D5FF`
- **Tailwind**: `bg-purple-100`, `text-[#E9D5FF]`
- **Usage**: Light backgrounds, subtle accents, text on dark backgrounds
- **Example**: Light section backgrounds, hero text highlights

```tsx
<div className="bg-gradient-to-br from-white via-purple-50 to-purple-100">
  {/* Content */}
</div>
```

## Neural Spark Accent Colors

**CRITICAL**: Use these sparingly (4-6 moments per page max) and with semantic purpose.

### 1. Electric Cyan
- **Hex**: `#06B6D4`
- **Gradient**: `from-[#06B6D4] to-[#3B82F6]`
- **Semantic**: Tech & Systems
- **When to use**: Technical discussions, system thinking, code architecture, infrastructure
- **Example use**: "Tech deep-dive" episode badges, annotations about programming

```tsx
// Episode badge for tech content
<span className="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white px-4 py-2 rounded-full">
  Tech Deep-Dive
</span>

// Annotation for system thinking
<div className="border-l-4 border-cyan-400 bg-cyan-50 p-4">
  <p className="text-cyan-700 font-bold">💻 System Architecture Discussion</p>
</div>
```

### 2. Bright Blue
- **Hex**: `#3B82F6`
- **Gradient**: `from-[#3B82F6] to-[#06B6D4]`
- **Semantic**: Big Ideas
- **When to use**: Visionary thinking, ambitious concepts, future predictions, "what if" scenarios
- **Example use**: "Big idea" moments, theoretical discussions

```tsx
<div className="border-l-4 border-blue-500 bg-blue-50 p-4">
  <p className="text-blue-700 font-bold">🚀 Visionary Thinking Ahead</p>
</div>
```

### 3. Hot Pink
- **Hex**: `#EC4899`
- **Gradient**: `from-[#EC4899] to-[#F43F5E]`
- **Semantic**: Creative & Playful
- **When to use**: Art discussions, creative process, playful tangents, design topics
- **Example use**: Design-focused episodes, creative exploration moments

```tsx
<span className="bg-gradient-to-r from-[#EC4899] to-[#F43F5E] text-white px-4 py-2 rounded-full">
  Creative Exploration
</span>
```

### 4. Coral Red
- **Hex**: `#F43F5E`
- **Gradient**: `from-[#F43F5E] to-[#F59E0B]`
- **Semantic**: Passion & Energy
- **When to use**: Hot takes, passionate debates, controversial topics, strong opinions
- **Example use**: Debate segments, passionate discussion markers

```tsx
<div className="border-l-4 border-rose-500 bg-rose-50 p-4">
  <p className="text-rose-700 font-bold">🔥 Hot Take Alert</p>
</div>
```

### 5. Warm Amber
- **Hex**: `#F59E0B`
- **Gradient**: `from-[#F59E0B] to-[#F43F5E]`
- **Semantic**: Wisdom & Insight
- **When to use**: Life lessons, philosophical moments, reflective discussions, wisdom sharing
- **Example use**: "Aha moment" annotations, philosophical tangents

```tsx
<div className="border-l-4 border-amber-400 bg-amber-50 p-4">
  <p className="text-amber-700 font-bold">💡 Life Lesson</p>
</div>
```

### 6. Lime Green
- **Hex**: `#84CC16`
- **Gradient**: `from-[#84CC16] to-[#10B981]`
- **Semantic**: Growth & Learning
- **When to use**: Educational content, skill building, learning moments, personal growth
- **Example use**: Educational episodes, skill development discussions

```tsx
<span className="bg-gradient-to-r from-[#84CC16] to-[#10B981] text-white px-4 py-2 rounded-full">
  Learning Moment
</span>
```

### 7. Emerald Green
- **Hex**: `#10B981`
- **Gradient**: `from-[#10B981] to-[#06B6D4]`
- **Semantic**: Nature & Science
- **When to use**: Science topics, natural world, biology, psychology, analytical thinking
- **Example use**: Science episodes, research-based discussions

```tsx
<div className="border-l-4 border-emerald-400 bg-emerald-50 p-4">
  <p className="text-emerald-700 font-bold">🧬 Science Corner</p>
</div>
```

### 8. Light Purple
- **Hex**: `#C084FC`
- **Gradient**: `from-[#C084FC] to-[#A855F7]`
- **Semantic**: Meta & Reflection
- **When to use**: Meta-commentary, podcast about the podcast, self-awareness moments
- **Example use**: Meta discussions, reflection on the show itself

```tsx
<div className="border-l-4 border-purple-400 bg-purple-50 p-4">
  <p className="text-purple-700 font-bold">🎙️ Meta Moment</p>
</div>
```

## Usage Guidelines

### DO ✅

1. **Use purple foundation extensively** - This should be 80-90% of all color on the page
2. **Match accents to content semantics** - Choose accent based on what the content is about
3. **Limit to 4-6 accent moments per page** - Restraint is critical
4. **Use accents for wayfinding** - Help users identify content types at a glance
5. **Keep accent moments small** - Badges, annotations, borders - not large backgrounds

### DON'T ❌

1. **Don't use all 8 accents on one page** - This creates rainbow chaos
2. **Don't let accents dominate** - Purple must remain the primary color
3. **Don't use accents decoratively** - Every accent should have semantic meaning
4. **Don't use accent colors in large backgrounds** - Keep them as highlights
5. **Don't mix multiple accents in one component** - One accent per element

## Gradient Patterns

### Purple Foundation Gradients
```tsx
// Hero background
className="bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#7C3AED]"

// Button gradient
className="bg-gradient-to-r from-[#5B21B6] to-[#7C3AED]"

// Subtle background
className="bg-gradient-to-br from-purple-50 to-indigo-50"

// Text gradient
className="bg-gradient-to-r from-[#5B21B6] to-[#A855F7] bg-clip-text text-transparent"
```

### Strategic Accent Gradients (use sparingly)
```tsx
// Tech badge
className="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]"

// Wisdom badge
className="bg-gradient-to-r from-[#F59E0B] to-[#F43F5E]"

// Science badge
className="bg-gradient-to-r from-[#10B981] to-[#06B6D4]"
```

## Color Accessibility

- Ensure sufficient contrast for text readability
- Light text on dark purple backgrounds: Use `text-white` or `text-purple-100`
- Dark text on light backgrounds: Use `text-slate-900` or `text-slate-700`
- Accent color text: Test against backgrounds for WCAG AA compliance

## Implementation Pattern

When building a new page:

1. Start with purple foundation (background, headers, primary elements)
2. Add core content with purple styling
3. Identify 4-6 strategic moments that need emphasis
4. Choose accent colors based on semantic meaning
5. Apply accents only to those specific moments
6. Review: Is purple still dominant? (Should be 80%+)

## Real-World Example

Homepage accent usage (total: 5 moments):
1. Latest episode badge - Purple foundation (Sparkles icon)
2. Episode #46 annotation - Cyan (design deep-dive)
3. Episode #45 annotation - Emerald (learning/logic moment)
4. Episode #44 annotation - Amber (philosophy/psychology)
5. Host photo annotation - Pink accent border (playful moment)

This creates visual interest without overwhelming the purple twilight foundation.
