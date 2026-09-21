---
name: Obsidian Flow
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353942'
  surface-container-lowest: '#0a0e16'
  surface-container-low: '#181c24'
  surface-container: '#1c2028'
  surface-container-high: '#262a33'
  surface-container-highest: '#31353e'
  on-surface: '#dfe2ee'
  on-surface-variant: '#ccc3d8'
  inverse-surface: '#dfe2ee'
  inverse-on-surface: '#2c3039'
  outline: '#958da1'
  outline-variant: '#4a4455'
  surface-tint: '#d2bbff'
  primary: '#d2bbff'
  on-primary: '#3f008e'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#732ee4'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#007650'
  on-tertiary-container: '#76ffc2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#0f131c'
  on-background: '#dfe2ee'
  surface-variant: '#31353e'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.75rem
    fontWeight: '800'
    lineHeight: '1.05'
    letterSpacing: -0.035em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: '1.15'
    letterSpacing: -0.025em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: '1.35'
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: '1.55'
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.1em
  label-pill:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.02em
  readout-num:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system embodies a high-precision, AI-native media laboratory. It marries the calculated restraint of developer-grade command surfaces with the kinetic energy of modern content velocity. The target audience encompasses digital-first video creators, media agencies, growth engineers, and short-form video editors who demand rapid automated extraction of viral moments without the sensory fatigue of consumer-grade clutter.

The visual signature is driven by an atmospheric obsidian aesthetic: deep, light-absorbing dark surfaces pierced by controlled, directional emissions of Electric Violet and Cyber Cyan. Frosted glass paneling (translucent backdrop blur) provides multi-layered environmental depth, while ultra-fine gradient hairline borders delineate interactive boundaries. 

The emotional objective is absolute mastery and computational speed. The interface behaves like a calibrated instrument: quiet during steady state, surgical and vivid during processing, and immediate in user feedback. Visual decoration is strictly functional—timecodes, confidence ratios, viral score metrics, and token balances serve as the primary structural anchors of the UI.

## Colors

The system is constructed natively for a dark-first environment using calibrated layers of obsidian and navy depths:

- **Canvas & Backdrops:** The foundation rests on `#0B0F17` (Deep Obsidian Base) and `#111827` (Midnight Navy Container). These absorb ambient light and provide zero-glare viewing during intensive editing and scrubbing workflows.
- **Primary Energy (Electric Violet):** `#7C3AED` (with accent tone `#8B5CF6`) serves as the core action engine. It drives primary CTA interactions, active pipeline steppers, processing highlights, and primary selection states.
- **Secondary Energy (Cyber Cyan):** `#06B6D4` (with dynamic highlight `#22D3EE`) serves as the metric and scanning channel. It highlights AI bounding boxes, audio waveform scrubbers, token balance meters, and live rendering trackers.
- **Tertiary & Validation (Viral Emerald):** `#10B981` signals algorithmic viability, high viral prediction scores (90+), automated clip readiness, and quota health.
- **Hairlines & Boundaries:** Borders never use opaque gray lines. They utilize layered alpha channels of pure white and accent hues (e.g., `rgba(255, 255, 255, 0.08)` ramping up to `rgba(124, 58, 237, 0.35)` on active states) to achieve crisp, luminous definitions.
- **Text & Readouts:** Text maintains stark contrast hierarchy. High-priority values, headlines, and data meters resolve in pure white `#F9FAFB` (98% luminance), descriptive copy rests at `#9CA3AF` (65%), and mono eyebrows/metadata chips calibrate down to `#6B7280` (45%).

## Typography

The design system enforces a precise two-register typographic hierarchy:

1. **Human Interface Prose:** `Plus Jakarta Sans` provides geometric, modern authority for display moments and section anchors. It transitions cleanly into `Inter` for standard user interface text, settings, and dense workflow lists. Body type is optimized for rapid scanning under high contrast.
2. **Machine Telemetry & Readouts:** `JetBrains Mono` handles all computational data—timestamps, token balances, viral probability ratings, aspect ratios (`9:16`, `1:1`), render progress, and frame indices. All mono labels render strictly in uppercase with extended letter tracking (`0.1em`). Numerical readouts consistently apply tabular numbers (`font-variant-numeric: tabular-nums`) to prevent spatial jitter during real-time processing and playback.

User content (transcripts, captions, clip titles) must preserve intended casing and never inherit global UI transforms.

## Layout & Spacing

The layout model is architected around a fluid, dense workbench layout scaling into full-bleed modular canvas zones:

- **Desktop (>= 1280px):** 12-column adaptive fluid grid with `2rem` margins and `1.5rem` gutters. The app viewport is locked to standard viewport height with collapsible side panels (timeline, AI inspector, asset tray) prioritizing maximum canvas real estate for the 9:16 video viewport.
- **Tablet (768px – 1279px):** 8-column layout. The inspector cascades into an overlay slide-out sheet; video canvas and clip queue stack vertically.
- **Mobile (< 768px):** 4-column layout with strict `1rem` outer margins and `0.75rem` internal gutters. Control surfaces shift into bottom-docked sheets with thumb-accessible control pills and fixed bottom-navigation command anchors.

Internal rhythm follows an absolute 4px/8px modular base. Padding within data-dense controls stays tight (`space-xs` and `space-sm`), while stage layouts and section cards employ `space-lg` to create clear cognitive grouping.

## Elevation & Depth

Visual depth is achieved through layered obsidian surfaces, frosted glass diffusion, and focused rim illumination rather than muddy drop shadows:

- **Layer 0 (Canvas Base):** Solid `#0B0F17` devoid of reflection.
- **Layer 1 (Frosted Glass Panels):** `rgba(17, 24, 39, 0.7)` with `backdrop-filter: blur(16px)` and a continuous hairline stroke of `rgba(255, 255, 255, 0.08)`. This tier hosts clip trays, video inspector panels, and secondary toolbars.
- **Layer 2 (Floating Modals & Flyouts):** `rgba(22, 30, 49, 0.85)` with `backdrop-filter: blur(24px)`, bounded by a dual-stroke pseudo border (outer hairline at `rgba(255, 255, 255, 0.12)`, top-edge specular gradient reflecting `rgba(124, 58, 237, 0.4)`).
- **Glow & Rim Highlights:** Dynamic elements project colored photonic halos:
  - Primary button hover: `box-shadow: 0 0 20px -3px rgba(124, 58, 237, 0.5)`
  - Active detection / bounding box: `box-shadow: 0 0 16px -2px rgba(6, 182, 212, 0.45)`
  - High viral score badge: `box-shadow: inset 0 0 8px rgba(16, 185, 129, 0.25)`

## Shapes

The design system maintains a refined, technical curvature balance:

- **Cards and Panels:** Governed by `roundedness: 2` (`0.5rem` / `8px` to `1rem` / `16px` for structural containers), producing structured, non-bulbous windows that frame video aspect ratios cleanly.
- **Input Fields & Command Selectors:** Standardized at `0.5rem` (`8px`) inner radiuses, providing crisp ergonomic boundaries.
- **Pill Primitives:** Interactive tags, credit balance indicators, status badges, and primary mobile action triggers override standard radiuses to use full pill contours (`rounded-full` / `9999px`).
- **Video Framing:** Video output viewports use strict `12px` clipping boundaries to reflect physical hardware device boundaries while editing 9:16 mobile assets.

## Components

### Buttons
- **Primary Action:** Solid Electric Violet (`#7C3AED`) to `#8B5CF6` gradient fill, pure white text, rounded pill or `rounded-lg` silhouette. On hover, emit an electric outer violet glow (`0 0 20px rgba(124, 58, 237, 0.45)`) and elevate `1px`.
- **Secondary (Cyber Glass):** Semi-transparent obsidian fill (`rgba(17, 24, 39, 0.6)`) with a hairline border (`rgba(6, 182, 212, 0.3)`), cyan text, and a soft cyan rim on hover.
- **Ghost / Utility:** Transparent fill, muted text (`#9CA3AF`), shifting to crisp white text and `rgba(255, 255, 255, 0.06)` background on hover.

### Credit Balance & Metric Pills
- Encapsulated pills featuring a leading glowing indicator dot. Background uses deep navy glass (`rgba(17, 24, 39, 0.8)`), bordered with hairline white (`rgba(255, 255, 255, 0.1)`). Values are rendered in tabular `JetBrains Mono` accompanied by a lightning/token icon tinted Cyber Cyan or Electric Violet.

### Cards & Media Panels
- Engineered with frosted glass backing (`backdrop-blur: 16px`, `rgba(17, 24, 39, 0.65)`). The top edge possesses a directional 1px border gradient transitioning from translucent white/cyan down to invisible. Hover states trigger an internal ambient wash (`rgba(124, 58, 237, 0.04)`) and a `translateY(-2px)` lift.

### Viral Score Badges
- Strict pill format with high-contrast text. For scores >85, background uses an emerald wash (`rgba(16, 185, 129, 0.12)`) paired with a vivid green border (`rgba(16, 185, 129, 0.4)`) and text in `#10B981`. Displays a mini flame or spark glyph alongside the tabular score (e.g., `94 VIRAL`).

### Form Controls & Inputs
- **Text Inputs & URLs:** Deep inset canvas (`#0B0F17`), 1px border at `rgba(255, 255, 255, 0.1)`. Focus state shifts the border to Cyber Cyan (`#06B6D4`) with a soft glow ring (`0 0 0 2px rgba(6, 182, 212, 0.2)`).
- **Checkboxes & Radios:** Custom square/circle tokens. Unselected: dark base with hairline stroke. Selected: Electric Violet solid fill with crisp white glyph.

### Timeline Scrubber & Aspect Ratio Toggles
- High-precision controls with monospaced timestamps. Active segment handles light up in Cyber Cyan, casting a narrow laser beam across the video canvas. Aspect ratio switchers (`9:16`, `1:1`, `16:9`) use segmented glass pills with an illuminated active state.