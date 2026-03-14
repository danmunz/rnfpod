# Typography System

## Font Families

### Outfit (Display & Headings)
- **Usage**: All headings (H1-H4), display text, hero titles, card titles
- **Weight**: Black (900) for most headings
- **Import**: Already imported in base CSS
- **Apply**: `style={{ fontFamily: 'Outfit, sans-serif' }}`

```tsx
<h1 className="font-black text-5xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
  Making Connections
</h1>
```

### Lexend (Body & UI)
- **Usage**: Body text, UI elements, buttons, navigation, descriptions
- **Weight**: Regular (400) for body, Bold (700) for emphasis
- **Import**: Already imported in base CSS
- **Apply**: Default font, or `style={{ fontFamily: 'Lexend, sans-serif' }}`

```tsx
<p className="text-base" style={{ fontFamily: 'Lexend, sans-serif' }}>
  Body text content here
</p>
```

### Monospace (System/Meta)
- **Usage**: Episode numbers, timestamps, code-like elements, meta information
- **Apply**: `font-mono` class
- **Example**: "Episode 47", "48:32", "// Making connections"

```tsx
<span className="font-mono text-xs font-bold uppercase tracking-wider">
  Episode 47
</span>
```

## Type Scale

### Display (Hero)
Large text for hero sections and major page titles

```tsx
<h1 className="font-black text-4xl lg:text-5xl xl:text-6xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
  Hero Heading
</h1>
```

**Properties:**
- Font: Outfit
- Size: 2.5rem (mobile) → 3rem (tablet) → 3.75rem (desktop)
- Weight: 900 (Black)
- Line-height: 1.1
- Letter-spacing: Default

### H1 (Page Titles)
Main page section titles

```tsx
<h1 className="font-black text-4xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
  Page Title
</h1>
```

**Properties:**
- Font: Outfit
- Size: 2.25rem (36px)
- Weight: 900 (Black)
- Line-height: 1.2

### H2 (Section Titles)
Major section headings

```tsx
<h2 className="font-black text-3xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
  Section Title
</h2>
```

**Properties:**
- Font: Outfit
- Size: 1.875rem (30px)
- Weight: 900 (Black)
- Line-height: 1.3

### H3 (Card Titles / Subsections)
Episode card titles, subsection headings

```tsx
<h3 className="font-bold text-xl" style={{ fontFamily: 'Outfit, sans-serif' }}>
  Card Title
</h3>
```

**Properties:**
- Font: Outfit
- Size: 1.25rem (20px)
- Weight: 700 (Bold)
- Line-height: 1.4

### H4 (Small Headings)
Minor headings, list titles

```tsx
<h4 className="font-bold text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
  Small Heading
</h4>
```

**Properties:**
- Font: Outfit
- Size: 1.125rem (18px)
- Weight: 700 (Bold)
- Line-height: 1.5

### Body Large
Introductory paragraphs, important body text

```tsx
<p className="text-lg leading-relaxed">
  Large body text for intros and important content.
</p>
```

**Properties:**
- Font: Lexend
- Size: 1.125rem (18px)
- Weight: 400 (Regular)
- Line-height: 1.75 (relaxed)

### Body Regular
Standard body text, descriptions

```tsx
<p className="text-base leading-relaxed">
  Regular body text content.
</p>
```

**Properties:**
- Font: Lexend
- Size: 1rem (16px)
- Weight: 400 (Regular)
- Line-height: 1.625

### Body Small
Supporting text, captions, metadata

```tsx
<p className="text-sm leading-relaxed">
  Small supporting text.
</p>
```

**Properties:**
- Font: Lexend
- Size: 0.875rem (14px)
- Weight: 400 (Regular)
- Line-height: 1.5

### Label / Caption
Form labels, tiny metadata, timestamps

```tsx
<span className="text-xs">
  Timestamp or label
</span>
```

**Properties:**
- Font: Lexend
- Size: 0.75rem (12px)
- Weight: 400 (Regular) or 600 (Semibold)
- Line-height: 1.5

### Monospace Meta
Episode numbers, timestamps, code snippets

```tsx
<span className="font-mono text-xs font-bold uppercase tracking-wider">
  EPISODE 47
</span>
```

**Properties:**
- Font: System monospace
- Size: 0.75rem (12px)
- Weight: 700 (Bold)
- Text-transform: Uppercase
- Letter-spacing: 0.05em (wider)

## Text Colors

### On Light Backgrounds

```tsx
// Primary text
className="text-slate-900"

// Secondary text
className="text-slate-700"

// Tertiary / muted text
className="text-slate-600"

// Metadata / timestamps
className="text-slate-400"

// Purple emphasis
className="text-[#5B21B6]"
className="text-[#7C3AED]"
```

### On Dark/Purple Backgrounds

```tsx
// Primary text
className="text-white"

// Secondary text
className="text-purple-100"

// Tertiary text
className="text-purple-200"

// Metadata
className="text-purple-300"
```

### Gradient Text
For special emphasis

```tsx
<span className="bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#A855F7] bg-clip-text text-transparent">
  Gradient Text
</span>
```

## Font Weight Utilities

```tsx
// Ultra bold headings
className="font-black"  // 900

// Bold headings and emphasis
className="font-bold"   // 700

// Medium weight (buttons, labels)
className="font-semibold"  // 600

// Regular body text
className="font-normal"  // 400
```

## Common Typography Patterns

### Episode Title
```tsx
<h3 
  className="mb-3 font-bold text-xl leading-tight text-slate-900 group-hover:text-[#5B21B6]" 
  style={{ fontFamily: 'Outfit, sans-serif' }}
>
  Episode Title Goes Here
</h3>
```

### Episode Description
```tsx
<p className="mb-4 text-sm leading-relaxed text-slate-600">
  Episode description with comfortable reading line-height and muted color.
</p>
```

### Metadata Line
```tsx
<div className="flex items-center justify-between">
  <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-600">
    Episode 47
  </span>
  <span className="font-mono text-xs text-slate-400">
    48:32
  </span>
</div>
```

### Section Header
```tsx
<div className="mb-12">
  <h2 
    className="mb-2 font-black text-5xl text-slate-900" 
    style={{ fontFamily: 'Outfit, sans-serif' }}
  >
    <span className="bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#A855F7] bg-clip-text text-transparent">
      Section Title
    </span>
  </h2>
  <div className="flex items-center gap-2">
    <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#A855F7]" />
    <p className="font-mono text-sm font-bold text-purple-600">
      // Subtitle here
    </p>
  </div>
</div>
```

### Hero Title
```tsx
<h1 
  className="mb-4 font-black text-4xl leading-[1.1] text-white lg:text-5xl" 
  style={{ fontFamily: 'Outfit, sans-serif' }}
>
  That moment when your brain{" "}
  <span className="bg-gradient-to-r from-[#E9D5FF] via-[#F0ABFC] to-[#FBCFE8] bg-clip-text italic text-transparent">
    lights up
  </span>
</h1>
```

### Annotation Header
```tsx
<p className="font-mono text-xs font-black uppercase tracking-wider text-[#5B21B6]">
  📝 Journey Notes
</p>
```

### Button Text
```tsx
<button className="font-black text-base">
  Primary Action
</button>

<button className="font-bold text-sm">
  Secondary Action
</button>
```

## Text Hierarchy Best Practices

### On a Typical Page

1. **Page Title** (H1, Outfit Black, 4xl)
2. **Section Titles** (H2, Outfit Black, 3xl)
3. **Card Titles** (H3, Outfit Bold, xl)
4. **Body Text** (Lexend Regular, base or lg)
5. **Metadata** (Mono Bold, xs, uppercase)

### Episode Card Hierarchy

1. **Episode Number** (Mono Bold, xs, uppercase) - Purple
2. **Episode Title** (Outfit Bold, xl) - Slate-900
3. **Description** (Lexend Regular, sm) - Slate-600
4. **Duration** (Mono Regular, xs) - Slate-400

### Hero Section Hierarchy

1. **Badge/Label** (Mono Bold, xs, uppercase) - Light color
2. **Main Title** (Outfit Black, 4xl-5xl) - White
3. **Supporting Text** (Lexend Regular, lg) - Purple-100
4. **CTA Button** (Bold, base)

## Accessibility Considerations

### Contrast Ratios

Ensure WCAG AA compliance:
- Large text (18pt+): 3:1 minimum contrast
- Regular text: 4.5:1 minimum contrast

### Readable Line Lengths
- Optimal: 50-75 characters per line
- Use `max-w-prose` (65ch) for long-form content
- Use `max-w-2xl` or `max-w-3xl` for sections

```tsx
<div className="mx-auto max-w-prose">
  <p className="text-base leading-relaxed">
    Long-form readable content here...
  </p>
</div>
```

### Line Height
- Headings: 1.1 - 1.4
- Body text: 1.5 - 1.75
- Use `leading-tight` for headings
- Use `leading-relaxed` for body text

## Responsive Typography

### Mobile to Desktop Scaling

```tsx
// Hero heading
className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"

// Page title
className="text-2xl sm:text-3xl lg:text-4xl"

// Section title
className="text-xl sm:text-2xl lg:text-3xl"

// Body text
className="text-sm sm:text-base lg:text-lg"
```

### Container Widths
```tsx
// Narrow content (text-heavy)
className="mx-auto max-w-3xl px-6"

// Standard content
className="mx-auto max-w-5xl px-6"

// Wide content (cards, grids)
className="mx-auto max-w-7xl px-6"
```

## Special Text Effects

### Uppercase with Tracking
For labels and metadata

```tsx
<span className="font-mono text-xs font-bold uppercase tracking-widest">
  LABEL TEXT
</span>
```

### Italic Emphasis
For special moments in hero text

```tsx
<span className="italic">
  emphasized text
</span>
```

### Text Truncation
For overflow handling

```tsx
<p className="truncate">
  Long text that gets cut off with ellipsis...
</p>

<p className="line-clamp-2">
  Text limited to 2 lines with ellipsis...
</p>
```

## Don'ts

❌ Don't use Comic Sans (obviously)
❌ Don't use all caps for body text
❌ Don't use center alignment for body text
❌ Don't use font sizes smaller than 12px
❌ Don't use too many font weights in one section
❌ Don't use accent colors for large blocks of text
