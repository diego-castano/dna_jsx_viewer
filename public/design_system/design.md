# DNA × Apple Design System — `design.md`

> **Version:** 2.0.0 — March 2026
> **Project:** DNA Platform UX/UI Overhaul
> **Client:** Gabriella Bord (Gabby), CEO of DNA (Digital News Agency)
> **Lead:** Diego Castaño, Senior PM/Architect, Digital HENKA

---

## 1. PHILOSOPHY

**"Cada pixel tiene un propósito. Cada transición cuenta una historia. La complejidad se siente simple."**

This design system merges **DNA's organic editorial identity** with **Apple's spatial precision**, informed by **humza.aii neumorphism** and **Pinterest references** of soft 3D UI, glassy gradients, and pastel SaaS design.

### 5 Principles

1. **CLARIDAD RADICAL** — Everything communicates. Nothing is superfluous. If an element doesn't improve the experience, remove it.
2. **PROFUNDIDAD CON PROPÓSITO** — Visual layers (shadows, glass, elevation) are not decoration — they communicate hierarchy. The most important content lives closest to the user.
3. **ORGANICIDAD CONTROLADA** — DNA's asymmetric rounded shapes (its visual signature) coexist with Apple's 8px grid precision. Controlled chaos: nature seen under a microscope.
4. **MOVIMIENTO COMO LENGUAJE** — Every transition tells a story. Entrances use spring easing, exits are faster. If reduced-motion is requested, the design works equally well static.
5. **CONTENIDO PRIMERO** — Design is the stage, content is the lead actor. Exquisite typography + generous space = the message breathes.

### Do's & Don'ts

**DO:**
- Use generous whitespace — Apple never cramps
- Keep DNA's asymmetric organic corners on feature cards and hero sections
- Apply glassmorphism only on navigation and floating elements over gradients
- Use Playfair Display for headlines — it's DNA's editorial voice
- Use `rgba()` separators, never solid hex borders
- Toast notifications (pill shape) for quick feedback
- Spring easing (`cubic-bezier(0.16, 1, 0.3, 1)`) for entrances

**DON'T:**
- Don't use asymmetric corners on small UI (buttons, inputs, chips)
- Don't use Playfair for body text or UI labels — DM Sans handles those
- Don't use glass on every component — it's for elevated floating contexts only
- Don't use blocking modal pop-ups for simple confirmations (Gabby hates "big blocks")
- Don't use solid hex borders like `#E6E4DD` — use `rgba(3, 0, 0, 0.08)` instead
- Don't use generic fonts (Inter, Roboto, Arial as primary)
- Don't use cold blues or purples — DNA's palette is warm greens, reds, and creams

---

## 2. FILES

The design system consists of 3 files that work together:

| File | Purpose | Size |
|------|---------|------|
| `dna-design-system-v2.css` | Complete CSS: tokens, reset, typography, layout, 24+ components, patterns, animations, accessibility, responsive, utilities | ~2000 lines |
| `dna-animations.js` | JavaScript animation engine: 12 IntersectionObserver-powered patterns | ~640 lines |
| `dna-design-system-v2.json` | Structured tokens for reference and tooling | ~390 lines |

### How to use in a prototype

```html
<!-- At the top of <head> -->
<link rel="stylesheet" href="dna-design-system-v2.css">

<!-- At the bottom of <body> -->
<script src="dna-animations.js"></script>
```

For self-contained HTML files, inline both the CSS inside `<style>` and the JS inside `<script>` tags.

---

## 3. COLOR SYSTEM

### Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-brand-primary` | `#2C4135` | Primary brand green — nav, buttons, headings |
| `--color-brand-primary-hover` | `#213328` | Hover state |
| `--color-brand-primary-active` | `#1A2920` | Pressed state |
| `--color-brand-primary-subtle` | `rgba(44,65,53,0.08)` | Ghost hover backgrounds |

### Accent (Mint)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent-mint` | `#83C6A3` | Active nav pill, toggles on, focus rings, progress bars |
| `--color-accent-mint-hover` | `#6BB892` | Mint hover |
| `--color-accent-mint-subtle` | `rgba(131,198,163,0.15)` | Sidebar active bg, focus ring glow |
| `--color-accent-mint-muted` | `#C9E5C3` | Tag badges (green), light backgrounds |
| `--color-accent-neon` | `#9CE68C` | Headings on dark backgrounds (h3 in organic cards) |

### Signal (Red / CTA)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-signal-red` | `#FE0216` | Contact CTA button, stat numbers, notification badges |
| `--color-signal-red-hover` | `#E50114` | Red hover |
| `--color-signal-pink` | `#F8737D` | Pink tag badges, soft gradient element |

### Surfaces (Layered Depth — the Apple approach)

The surface system creates visual depth through background layering. Each level is perceptibly different:

| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-primary` | `#F0EFEB` | **Page canvas** — DNA's warm cream base |
| `--surface-secondary` | `#FAFAF8` | Elevated sections, sidebar backgrounds |
| `--surface-tertiary` | `#FFFFFF` | **Cards, modals, inputs** — pure white for contrast |
| `--surface-elevated` | `#FFFFFF` | Floating elements (same as tertiary) |
| `--surface-apple-gray` | `#F5F5F3` | Neutral sections (Apple's signature gray, warmed) |
| `--surface-dark` | `#161515` | Footer, dark hero sections |
| `--surface-dark-elevated` | `#1E1E1E` | Cards on dark backgrounds |
| `--surface-brand` | `#2C4135` | Brand-colored sections |
| `--surface-brand-light` | `#4E6B4C` | Organic card backgrounds |
| `--surface-gold` | `#D0B371` | Testimonial accent cards |
| `--surface-warm` | `#D9CEB8` | Warm accent elements |
| `--surface-sage` | `#D3DCD1` | Soft sage sections |

**Feature Pastels** (for individual cards, Apple Mac Mini style):
- `--surface-pastel-rose`: `#FFE0DF`
- `--surface-pastel-sage`: `#CBCECC`
- `--surface-pastel-steel`: `#CFD8E3`
- `--surface-pastel-cream`: `#FAF7F4`

### Semantic Status

| Token | Color | Usage |
|-------|-------|-------|
| `--color-success` | `#34C759` | Apple green — published, approved, live |
| `--color-warning` | `#FF9500` | Apple orange — draft, pending, scheduled |
| `--color-error` | `#FF3B30` | Apple red — failed, error, required |
| `--color-info` | `#83C6A3` | DNA mint — tips, info banners |

### Glass Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--glass-light` | `rgba(250,250,248,0.72)` | Light glass panels over gradients |
| `--glass-dark` | `rgba(44,65,53,0.78)` | Dark glass nav, dark overlays |
| `--glass-blur` | `saturate(1.8) blur(20px)` | Standard blur (note: saturate BEFORE blur) |
| `--glass-blur-strong` | `saturate(2) blur(40px)` | Heavy blur for modals |
| `--glass-inner-shine` | `inset 0 0.5px 0 rgba(255,255,255,0.4)` | Top edge light line — makes glass feel real |

### Separators (never solid, always rgba)

| Token | Value |
|-------|-------|
| `--separator-default` | `rgba(3, 0, 0, 0.08)` |
| `--separator-strong` | `rgba(3, 0, 0, 0.15)` |
| `--separator-dark` | `rgba(240, 239, 235, 0.12)` |

### Gradients

```css
--gradient-hero-warm: linear-gradient(135deg, #F8737D 0%, #FE0216 20%, #D9CEB8 50%, #ABE0B2 80%, #83C6A3 100%);
--gradient-sunset:    linear-gradient(135deg, #F8737D 0%, #D9CEB8 50%, #C9E5C3 100%);
--gradient-mint:      linear-gradient(135deg, #C9E5C3 0%, #ABE0B2 40%, #83C6A3 100%);
--gradient-forest:    linear-gradient(180deg, #2C4135 0%, #213328 100%);
--gradient-surface:   linear-gradient(180deg, #FAFAF8 0%, #F0EFEB 100%);
```

---

## 4. TYPOGRAPHY

### Font Stacks

| Token | Fonts | Role |
|-------|-------|------|
| `--font-display` | Playfair Display → Ivy Presto Text → Georgia | **Headlines, titles** — DNA's editorial voice |
| `--font-headline` | Same as display | Hero headlines specifically |
| `--font-body` | DM Sans → Helvetica Neue → Arial | **All UI text** — body, buttons, nav, labels, captions |
| `--font-editorial` | Source Serif 4 → Georgia | **Story body text only** — press releases, articles |
| `--font-mono` | JetBrains Mono → Courier New | **Tags, badges, labels, code** — editorial/technical character |
| `--font-accent` | Bitter → Georgia | **Subtitles, special moments** — warm serif accent |

### Google Fonts URL

```
https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:opsz,wght@9..40,300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Bitter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,300;400;500;600;700&display=swap
```

### 9-Level Type Scale (Apple-aligned)

All sizes use `clamp()` for fluid responsiveness. **Negative letter-spacing** on all levels (Apple signature).

| Level | Class | Size | Weight | Leading | Tracking | Font |
|-------|-------|------|--------|---------|----------|------|
| 1. Display | `.type-display` | `clamp(80px, 12vw, 200px)` | 400 | 0.95 | -0.02em | display |
| 2. Large Title | `.type-large-title` | `clamp(36px, 5vw, 56px)` | 700 | 1.07 | -0.015em | display |
| 3. Title 1 | `.type-title1` | `clamp(28px, 3.5vw, 50px)` | 700 | 1.1 | -0.01em | display |
| 4. Title 2 | `.type-title2` | `clamp(22px, 2.5vw, 34px)` | 700 | 1.12 | -0.005em | display |
| 5. Title 3 | `.type-title3` | `clamp(18px, 2vw, 24px)` | 400 | 1.2 | 0 | display |
| 6. Headline | `.type-headline` | 17px | 600 | 1.24 | -0.022em | body |
| 7. Body | `.type-body` | 17px | 400 | 1.47 | -0.022em | body |
| 8. Callout | `.type-callout` | 14px | 400 | 1.43 | -0.016em | body |
| 9. Caption | `.type-caption` | 12px | 400 | 1.33 | 0 | body |

**Special types:**
- `.type-stat` — `clamp(40px, 5vw, 60px)`, weight 700, color: signal-red. For dashboard numbers.
- `.type-mono` — 13px, weight 600, tracking 0.06em, uppercase. For tag badges and labels.
- `.type-accent` — Bitter serif for special subtitles.
- `.editorial` — Source Serif 4 for story body text (press releases, articles).
- `.gradient-text` — Text with `background-clip: text` using sunset gradient.

---

## 5. SPACING & GRID

### 8px Grid

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 40px |
| `--space-8` | 48px |
| `--space-9` | 56px |
| `--space-10` | 64px |
| `--space-11` | 80px |
| `--space-12` | 96px |
| `--space-13` | 120px |
| `--space-14` | 160px |

### 12-Column Grid

```css
--grid-columns: 12;
--grid-gutter:  20px;
--grid-margin:  max(20px, 5vw);
--grid-max-width: 1280px;
--grid-inner-width: 1200px;
```

### Layout classes

```html
<div class="container">        <!-- max-width: 1280px, centered, padded -->
<div class="container--inner">  <!-- max-width: 1200px -->
<div class="container--narrow"> <!-- max-width: 800px -->

<section class="section">       <!-- padding: 96px 0 -->
<section class="section--lg">   <!-- padding: 120px 0 -->
<section class="section--xl">   <!-- padding: 160px 0 -->

<!-- Surface variants -->
<section class="section--white">     <!-- bg: #FFFFFF -->
<section class="section--dark">      <!-- bg: #161515, white text -->
<section class="section--brand">     <!-- bg: #2C4135, white text -->
<section class="section--apple-gray"> <!-- bg: #F5F5F3 -->
```

---

## 6. BORDER RADIUS

### Standard Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | 4px | Small details |
| `--radius-sm` | 8px | Tags, tooltips |
| `--radius-md` | 12px | Inputs, badges, sidebar items |
| `--radius-lg` | 16px | Images, inner cards |
| `--radius-xl` | 24px | Cards, panels |
| `--radius-2xl` | 32px | Modals, large sections, footer top |
| `--radius-3xl` | 48px | Hero sections |
| `--radius-pill` | 980px | Buttons, nav, pills, toasts |

### DNA Organic Shapes (Brand Signature)

These asymmetric corners derive from the "D" shape in the DNA logo. **One corner is always 0px (sharp)**. Use ONLY on feature cards, testimonials, and hero sections — never on small UI.

```css
--radius-organic-card:    60px 60px 60px 0px;   /* bottom-left sharp */
--radius-organic-alt:     80px 80px 80px 0px;   /* larger variant */
--radius-organic-reverse: 0px 60px 60px 60px;   /* top-left sharp (testimonials) */
--radius-organic-bottom:  0px 0px 50px 50px;    /* top sharp, bottom rounded */
```

---

## 7. SHADOWS

### Flat Shadows (6 levels)

```css
--shadow-xs:  0 1px 2px rgba(3, 0, 0, 0.04);     /* subtle border replacement */
--shadow-sm:  0 2px 8px rgba(3, 0, 0, 0.06);     /* cards at rest */
--shadow-md:  0 4px 16px rgba(3, 0, 0, 0.08);    /* hover, dropdowns */
--shadow-lg:  0 8px 32px rgba(3, 0, 0, 0.10);    /* floating panels */
--shadow-xl:  0 16px 48px rgba(3, 0, 0, 0.12);   /* nav, toasts */
--shadow-2xl: 0 24px 64px rgba(3, 0, 0, 0.16);   /* modals */
```

### Neumorphic Shadows (humza.aii style)

Dual shadow system — light from top-left, dark bottom-right. Use on `--surface-secondary` or `--surface-primary` backgrounds only.

```css
--shadow-neu-raised:  6px 6px 16px rgba(3,0,0,0.08), -6px -6px 16px rgba(255,255,255,0.9);
--shadow-neu-pressed: inset 4px 4px 8px rgba(3,0,0,0.06), inset -4px -4px 8px rgba(255,255,255,0.8);
--shadow-neu-soft:    8px 8px 24px rgba(3,0,0,0.06), -8px -8px 24px rgba(255,255,255,0.95);
```

### Glows

```css
--shadow-glow-mint: 0 0 40px rgba(131, 198, 163, 0.3);  /* success, hover accent */
--shadow-glow-red:  0 0 40px rgba(254, 2, 22, 0.2);     /* CTA hover */
```

---

## 8. MOTION & ANIMATION

### Timing

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-instant` | 100ms | Micro feedback |
| `--duration-fast` | 200ms | Hover states, tooltips |
| `--duration-normal` | 320ms | Standard interactions |
| `--duration-slow` | 500ms | Transforms, reveals |
| `--duration-slower` | 800ms | Scroll reveals |
| `--duration-cinematic` | 1300ms | Section entrances, hero |

### Easing Curves

| Token | Value | When to use |
|-------|-------|-------------|
| `--ease-default` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | General purpose |
| `--ease-spring` | `cubic-bezier(0.16, 1, 0.3, 1)` | **DNA signature** — scroll reveals, card entrances, section animations |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Toggle knobs, playful micro-interactions |
| `--ease-apple` | `cubic-bezier(0.4, 0, 0.6, 1)` | **Apple standard** — button hovers, nav, modals |

### Compound Transitions

```css
--transition-micro:     all 200ms ease-default;        /* quick hover */
--transition-default:   all 320ms ease-apple;          /* standard */
--transition-smooth:    all 1300ms ease-spring;        /* cinematic entrance */
--transition-color:     color 320ms, background-color 320ms ease-apple;
--transition-transform: transform 500ms ease-spring;
--transition-opacity:   opacity 320ms ease-default;
```

### 12 Animation Patterns (JS-powered)

The `dna-animations.js` file provides these IntersectionObserver-powered patterns. All respect `prefers-reduced-motion`.

#### Pattern 1: Scroll Reveal (P0 — most important)
```html
<div class="reveal">Fades up when entering viewport</div>
<div class="reveal reveal--delay-1">100ms delayed</div>
<div class="reveal reveal--delay-2">200ms delayed</div>
<div class="reveal reveal--delay-3">300ms delayed</div>
<div class="reveal reveal--delay-4">400ms delayed</div>
```
**Apply `.reveal` to every element that should animate on scroll** — headings, paragraphs, cards, images, sections. This is THE core Apple animation.

#### Pattern 2: Stagger Children
```html
<div class="stagger">
  <div>Card 1 (0ms)</div>
  <div>Card 2 (80ms)</div>
  <div>Card 3 (160ms)</div>
</div>
```
Wrap any grid or flex container in `.stagger`. All direct children animate with 80ms delay between each.

#### Pattern 3: Hero Cascade (page load)
```html
<section class="hero-cascade">
  <span class="hero-cascade__eyebrow">OVERLINE</span>      <!-- 0ms -->
  <h1 class="hero-cascade__title">Headline</h1>            <!-- 150ms -->
  <p class="hero-cascade__subtitle">Description</p>        <!-- 300ms -->
  <div class="hero-cascade__actions">Buttons</div>          <!-- 450ms -->
  <div class="hero-cascade__media">Image/Video</div>        <!-- 600ms, uses scale -->
</section>
```

#### Pattern 4: Count-Up (dashboard stats)
```html
<span class="count-up" data-target="12456" data-prefix="£" data-suffix="+" data-separator="," data-duration="1500">0</span>
```

#### Pattern 5: Parallax
```html
<div class="parallax" data-speed="0.12">Moves slower than scroll</div>
```
`data-speed`: 0.05 (subtle) to 0.3 (dramatic). Default: 0.12.

#### Pattern 6: Nav Glass Intensification
```html
<nav class="nav">
  <div class="nav__inner">...</div>
</nav>
```
JS automatically adds `.nav--scrolled` after 100px scroll, intensifying the glass background.

#### Pattern 7: Image Clip Reveal
```html
<div class="clip-reveal" data-direction="up">
  <img src="..." />
</div>
```
Directions: `up`, `down`, `left`, `right`.

#### Pattern 8: Section Color Blend
```html
<section class="section-blend" data-bg-from="#FFFFFF" data-bg-to="#161515" data-text-from="#030000" data-text-to="#F0EFEB">
```

#### Pattern 9: Sticky Scroll Section
```html
<div class="sticky-section" data-steps="3">
  <div class="sticky-section__pinned">
    <div class="sticky-section__step is-active" data-step="1">Step 1</div>
    <div class="sticky-section__step" data-step="2">Step 2</div>
    <div class="sticky-section__step" data-step="3">Step 3</div>
  </div>
</div>
```

#### Pattern 10: Card 3D Tilt
```html
<div class="card card-tilt" data-tilt-max="8">Hover for 3D effect</div>
```

#### Pattern 11: Magnetic Button (subtle — strength 0.12)
```html
<button class="btn btn--primary btn-magnetic">Subtly follows cursor</button>
```

#### Pattern 12: Scroll Progress Bar
```html
<div class="scroll-progress"></div>  <!-- first child of body -->
```

### CSS Animation Utilities

```html
<div class="animate-spin">...</div>       <!-- infinite rotation -->
<div class="animate-scale-in">...</div>   <!-- scale 0.92→1 + fade -->
<div class="animate-slide-up">...</div>   <!-- translateY 32px→0 + fade -->
<div class="animate-fade-in">...</div>    <!-- opacity 0→1 -->
<div class="animate-float">...</div>      <!-- gentle up/down loop -->
<div class="animate-pulse">...</div>      <!-- pulsing glow ring -->

<!-- Delays -->
<div class="animate-delay-1">100ms</div>
<div class="animate-delay-2">200ms</div>
<!-- ...through animate-delay-6 -->
```

### JS API for React/SPA

```javascript
window.DNAAnimations.init();              // Re-init all patterns
window.DNAAnimations.initScrollReveal();  // Individual pattern
window.DNAAnimations.initCountUp();
// etc.
```

---

## 9. COMPONENTS

### Navigation

```html
<nav class="nav">
  <div class="nav__inner">
    <img class="nav__logo" src="..." alt="DNA" />
    <div class="nav__links">
      <a class="nav__link nav__link--active" href="#">Home</a>
      <a class="nav__link" href="#">Platform</a>
      <a class="nav__link" href="#">Services</a>
      <a class="nav__cta" href="#">Contact →</a>
    </div>
  </div>
</nav>
```
- Fixed position, pill shape, glass-dark background
- `.nav--scrolled` added by JS (glass intensifies)
- Active item: mint background, dark text, 30px radius

### Buttons

| Class | Description |
|-------|-------------|
| `.btn--primary` | Green bg, white text, inner shine on hover, glow shadow |
| `.btn--secondary` | Outlined, transparent bg, brand border |
| `.btn--secondary-light` | White outlined (for dark backgrounds) |
| `.btn--cta` | Red bg, white text, red glow on hover |
| `.btn--ghost` | No bg, no border, subtle hover bg |

**States built-in:** hover (lift -2px + shadow), active (sink +1px + inset shadow), focus (mint outline 3px offset), disabled (opacity 0.4), loading (`.btn-loading` adds spinner).

Add `.btn-magnetic` for subtle cursor-following effect (strength: 0.12).

### Tags / Badges

```html
<span class="tag tag--green">Technology</span>
<span class="tag tag--dark">PR & Comms</span>
<span class="tag tag--pink">Agency</span>
<span class="tag tag--live">Live</span>
<span class="tag tag--draft">Draft</span>
<span class="tag tag--error">Error</span>
<span class="tag tag--muted">Muted</span>
<span class="tag tag--brand">Brand</span>
<span class="tag tag--warm">Lifestyle</span>
```

### Cards

| Class | Description |
|-------|-------------|
| `.card` | Default: white bg, separator border, xl radius. Hover: lift -4px, shadow-lg, image zoom 1.03x |
| `.card--neu` | Neumorphic: no border, dual shadow on secondary bg |
| `.card--glass` | Glass: backdrop-filter, inner shine, transparent bg |
| `.card--organic` | DNA signature: `60px 60px 60px 0`, brand-light bg, neon heading |
| `.card--organic-alt` | Alternative: `80px 80px 80px 0`, mint-muted bg |
| `.card--organic-reverse` | Testimonial: `0 60px 60px 60px` |

Add `.card-tilt` for 3D perspective on hover. Add `.card-image-zoom` wrapper for image scale effect.

### Inputs

```html
<label class="label">Story Title</label>
<input class="input" placeholder="Enter title..." />

<!-- Variants -->
<input class="input input--neu" placeholder="Neumorphic..." />
<input class="input input--glass" placeholder="Glass..." />
<textarea class="textarea" placeholder="Description..."></textarea>
```

### Search

```html
<div class="search">
  <span class="search__icon">🔍</span>
  <input class="search__input" placeholder="Search stories, files, brands..." />
</div>
```

### Toggle (Apple-sized: 51×31px)

```html
<label>
  <input type="checkbox" class="toggle" checked />
</label>
```

### Tabs

```html
<div class="tabs">
  <button class="tab tab--active">Files</button>
  <button class="tab">Folders</button>
  <button class="tab">Stories</button>
</div>
```

### Chips (Filter Tags)

```html
<span class="chip chip--active">All</span>
<span class="chip">Technology</span>
<span class="chip">Lifestyle</span>
```

### Breadcrumbs

```html
<div class="breadcrumb">
  <a class="breadcrumb__link" href="#">Dashboard</a>
  <span class="breadcrumb__separator"></span>
  <a class="breadcrumb__link" href="#">Stories</a>
  <span class="breadcrumb__separator"></span>
  <span class="breadcrumb__current">Bacardi Campaign</span>
</div>
```

### Toast Notifications

```html
<div class="toast is-visible">✓ Story published successfully</div>
```
Pill shape, fixed bottom center, slide-up with spring.

### Notification Banners (Premium)

```html
<div class="notif notif--success">
  <div class="notif__icon">✓</div>
  <div class="notif__body">
    <div class="notif__title">Published successfully</div>
    <div class="notif__text">Your story is now live on the newsroom.</div>
  </div>
  <a href="#" class="notif__action">View story →</a>
</div>
```
Variants: `notif--success`, `notif--info`, `notif--warn`, `notif--error`. Glass-style with icon orb and action button.

### Modal

```html
<div class="modal-overlay is-active">
  <div class="modal">
    <h3>Title</h3>
    <p>Content</p>
    <div style="display:flex;gap:10px;justify-content:flex-end">
      <button class="btn btn--ghost">Cancel</button>
      <button class="btn btn--cta">→ Confirm</button>
    </div>
  </div>
</div>
```
Entry animation: `scale(0.95) translateY(16px)` → `scale(1) translateY(0)`. Overlay: `rgba(3,0,0,0.4)` + `blur(8px)`.

### Accordion (Apple-like)

```html
<div class="acc">
  <div class="acc__item is-open" onclick="this.classList.toggle('is-open')">
    <button class="acc__trigger">
      Question text
      <svg class="acc__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 8l5 5 5-5"/></svg>
    </button>
    <div class="acc__panel">
      <div class="acc__body">Answer text</div>
    </div>
  </div>
</div>
```
Chevron rotates 180° with spring easing. Container has rounded corners and subtle border.

### Upload Zone

```html
<div class="upload-zone">
  <div>📁</div>
  <h4>Drop your media files here</h4>
  <p>Supports images, videos, PDFs & documents</p>
  <button class="btn btn--secondary">Browse Files</button>
</div>
```
Dashed border → solid mint on hover/active. WeTransfer-inspired.

### Progress Bar

```html
<div class="progress">
  <div class="progress__bar" style="width: 68%"></div>
</div>
```

### Skeleton Loader

```html
<div class="skeleton skeleton--title"></div>
<div class="skeleton skeleton--text"></div>
<div class="skeleton skeleton--image"></div>
<div class="skeleton skeleton--avatar"></div>
```

### Sidebar (CMS)

```html
<div class="sidebar">
  <div class="sidebar__section-label">Main</div>
  <a class="sidebar__item sidebar__item--active" href="#">📊 Dashboard</a>
  <a class="sidebar__item" href="#">📝 Stories</a>
  <a class="sidebar__item" href="#">📁 Media Library</a>
</div>
```
Dark green bg, active indicator bar (3px mint on left), mono section labels.

### Table

```html
<table class="table">
  <thead><tr><th>Title</th><th>Status</th><th>Date</th></tr></thead>
  <tbody><tr><td>Story name</td><td><span class="tag tag--live">Live</span></td><td>Mar 7</td></tr></tbody>
</table>
```

### Footer

```html
<footer class="footer">
  <div class="footer__grid">
    <!-- Logo column, Platform links, Agency links, Address, Connect -->
  </div>
  <div class="footer__bottom">
    <span>Digital News Agency © 2026</span>
    <div>Terms · Privacy · Cookies</div>
  </div>
</footer>
```
Dark bg with `border-radius: 32px 32px 0 0` top corners. Tricolor logo.

---

## 10. PATTERNS & COMPOSITIONS

### Bento Grid (Apple-style)

```html
<div class="bento">
  <div class="bento__item--span-8">Large card</div>
  <div class="bento__item--span-4">Small card</div>
  <div class="bento__item--span-6">Half</div>
  <div class="bento__item--span-6">Half</div>
</div>
```

### Logo Marquee (Trusted by)

```html
<div class="marquee">
  <div class="marquee__track">
    <!-- logos duplicated for seamless loop -->
  </div>
</div>
```
Gradient mask on edges. Pauses on hover.

### Hero Section

```html
<section class="hero hero-cascade">
  <span class="hero-cascade__eyebrow type-mono">DNA PLATFORM</span>
  <h1 class="hero-cascade__title type-large-title">Headline</h1>
  <p class="hero-cascade__subtitle">Subtext</p>
  <div class="hero-cascade__actions">
    <a class="btn btn--primary btn-magnetic" href="#">→ CTA</a>
    <a class="btn btn--secondary" href="#">Secondary</a>
  </div>
</section>
```

### Feature Block (Apple product showcase)

```html
<div class="feature-block">
  <span class="feature-block__eyebrow">STUDIO</span>
  <h2 class="feature-block__title">Headline</h2>
  <p class="feature-block__subtitle">Description</p>
  <div class="feature-block__media">Image/Video</div>
</div>
```

### Decorative Background Orbs

```html
<div class="orb orb--mint orb--lg animate-float" style="top:-100px;right:-80px"></div>
<div class="orb orb--pink orb--sm animate-float" style="bottom:-40px;left:20px"></div>
```
Blurred gradient circles. Sizes: `--sm` (200px), `--md` (400px), `--lg` (600px). Colors: `--mint`, `--pink`, `--warm`.

---

## 11. RESPONSIVE BREAKPOINTS

Apple-aligned breakpoints:

| Breakpoint | Range | Grid Changes |
|-----------|-------|--------------|
| Mobile | 0–734px | 1 column, margin 20px, gutter 16px |
| Tablet | 735–1068px | 2 columns, margin 32px, gutter 18px |
| Desktop | 1069px+ | Full grid, margin max(20px, 5vw) |
| Wide | 1440px+ | margin 80px |

```css
@media (max-width: 734px) { /* mobile */ }
@media (min-width: 735px) and (max-width: 1068px) { /* tablet */ }
@media (min-width: 1440px) { /* wide */ }
```

---

## 12. ACCESSIBILITY

- **Focus:** `outline: 2px solid mint, offset 3px` on `:focus-visible`
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables all animations
- **High contrast:** `@media (prefers-contrast: high)` thickens borders and improves separator visibility
- **Screen readers:** `.sr-only` class for visually hidden text
- **Skip link:** `.skip-link` for keyboard navigation
- **Color contrast:** All text meets WCAG AA against its background

---

## 13. UTILITY CLASSES

```css
/* Colors */
.text-primary, .text-secondary, .text-tertiary, .text-mint, .text-neon, .text-red, .text-on-dark
.bg-primary, .bg-secondary, .bg-white, .bg-dark, .bg-brand, .bg-mint, .bg-apple-gray

/* Spacing */
.mt-0 through .mt-12, .mb-2 through .mb-8, .gap-2 through .gap-8

/* Layout */
.flex, .flex-center, .flex-between, .flex-col, .flex-wrap, .text-center, .mx-auto

/* Width */
.w-full, .max-w-sm (480px), .max-w-md (680px), .max-w-lg (900px)

/* Radius */
.rounded-sm through .rounded-full, .rounded-organic
```

---

## 14. DNA VOCABULARY

| Term | Meaning |
|------|---------|
| **Story** | Press release / news article published on the newsroom |
| **MediaCart** | Download queue where media users collect files before downloading |
| **Studio** | Creative review/approval module with versioning and timestamped commenting |
| **Brand Site** | Dedicated newsroom page for a specific client brand |
| **Featured** | Admin-pinned stories on homepage (max 3, ordered) |
| **News Alert** | Email notification sent to subscribers when a story is published |
| **Topics / Categories** | Content tags (tech, lifestyle, etc.) assigned to stories |
| **Media Library** | File repository (images, videos, audio, documents, PDFs) |

---

## 15. CLIENT CONTEXT

**DNA (Digital News Agency)** is a content agency with its own content platform, based at Soho Works, Television Centre, London. The platform serves marketing, PR, and brand teams at enterprise clients (Bacardi, Vodafone, easyJet, Aira, Wesleyan, Zedra).

**Target:** Modernize the UI/UX to investor-ready quality for SaaS transition. The pitch: "Look what we've done on no budget. With funding, in 12 months we'll be a SaaS MVP."

**The client (Gabby) explicitly wants:**
- "Apple made DNA" level of refinement
- Modern, clean, spacious — like Apple product pages
- WeTransfer-like upload experience
- Apple Music-like onboarding (brand/topic selection bubbles)
- Toast notifications, not blocking pop-ups
- Integrated email alerts in the publish workflow
- Nicer toggles, buttons, calendar date picker
- Tooltips on non-obvious fields
- Breadcrumb navigation in the CMS
- Studio comments with @tagging and timestamps
- Version comparison with side-by-side and opacity slider
- Mobile-responsive everything

**Enterprise clients:** Bacardi (spirits, lifestyle), Vodafone (tech, V-Hub), easyJet (travel, multi-language), Aira (home tech, DAM), LØCI (fashion/sustainability).

---

## 16. PROTOTYPE CONVENTIONS

- **File naming:** `dna-[module]-[variant].html` (e.g., `dna-homepage-v1.html`)
- **Self-contained:** Every prototype file should inline the CSS and JS — no external dependencies except Google Fonts CDN
- **Realistic data:** Use real DNA brand names (Bacardi, Vodafone, easyJet), realistic story titles, accurate file types and sizes
- **All animations active:** Every prototype should include the animation engine and use `.reveal`, `.stagger`, `.hero-cascade` throughout
- **Desktop-first, responsive:** Design for 1280px first, then ensure it works at 734px and below
- **Dark sections:** Alternate between white and dark/brand sections for dramatic contrast (Apple approach)
- **Organic cards for features:** Use asymmetric radius on hero/feature cards, standard radius on UI components
