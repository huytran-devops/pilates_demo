---
name: Serene Balance
colors:
  surface: '#fbf9f7'
  surface-dim: '#dbdad8'
  surface-bright: '#fbf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f1'
  surface-container: '#efedec'
  surface-container-high: '#eae8e6'
  surface-container-highest: '#e4e2e0'
  on-surface: '#1b1c1b'
  on-surface-variant: '#434843'
  inverse-surface: '#30302f'
  inverse-on-surface: '#f2f0ee'
  outline: '#737872'
  outline-variant: '#c3c8c0'
  surface-tint: '#506352'
  primary: '#4d6150'
  on-primary: '#ffffff'
  primary-container: '#667a68'
  on-primary-container: '#f6fff4'
  inverse-primary: '#b7ccb7'
  secondary: '#685c53'
  on-secondary: '#ffffff'
  secondary-container: '#f0e0d3'
  on-secondary-container: '#6e6258'
  tertiary: '#545f4a'
  on-tertiary: '#ffffff'
  tertiary-container: '#6d7862'
  on-tertiary-container: '#f9ffed'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e8d3'
  primary-fixed-dim: '#b7ccb7'
  on-primary-fixed: '#0e1f12'
  on-primary-fixed-variant: '#394b3b'
  secondary-fixed: '#f0e0d3'
  secondary-fixed-dim: '#d3c4b8'
  on-secondary-fixed: '#221a13'
  on-secondary-fixed-variant: '#4f453c'
  tertiary-fixed: '#dae7cc'
  tertiary-fixed-dim: '#becbb1'
  on-tertiary-fixed: '#151e0e'
  on-tertiary-fixed-variant: '#3f4a36'
  background: '#fbf9f7'
  on-background: '#1b1c1b'
  surface-variant: '#e4e2e0'
  sage-deep: '#4A5D4C'
  warm-sand: '#EAE3DB'
  charcoal-silk: '#2D2D2D'
  soft-clay: '#B5A496'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 4.5rem
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 3rem
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 2.25rem
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 2rem
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1.5'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  section-gap: 8rem
  section-gap-mobile: 4rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style

The design system is rooted in the philosophy of **Modern Minimalism** with a **High-End Wellness** focus. It targets a discerning audience seeking physical transformation and mental clarity. The interface prioritizes tranquility, using generous whitespace to create "breathing room" that mirrors the focused environment of a Pilates studio.

The aesthetic blends soft, organic shapes with a rigid, professional grid structure. This juxtaposition conveys both the fluidity of movement and the precision of the Pilates method. The visual language is calm, sophisticated, and inviting, avoiding the high-intensity aggression of traditional fitness branding in favor of a restorative, premium experience.

## Colors

The color palette is inspired by nature and organic materials. **Sage Green** serves as the primary brand anchor, representing growth and vitality. **Warm Neutrals** like sand and clay provide a grounded, architectural foundation.

- **Primary (Sage):** Used for key actions, brand marks, and active states.
- **Secondary (Warm Sand):** Used for subtle background layering and secondary UI elements.
- **Neutral (Off-White):** The primary canvas color, ensuring the UI feels airy and premium rather than clinical.
- **Text:** Primary headings utilize *Charcoal Silk* for high legibility without the harshness of pure black.

## Typography

This design system employs a classic serif/sans-serif pairing to establish a premium editorial feel. 

**Playfair Display** is used for headlines to convey elegance and heritage. It should often be paired with italicized styles for specific emphasis words (e.g., *balance*, *strength*) to mimic high-end lifestyle publications.

**Inter** provides a functional, neutral counterpoint for body copy, ensuring maximum readability across digital interfaces. Tight tracking is used for large displays, while generous line heights are maintained for body text to support the "calming" brand narrative.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop (12 columns) that transitions to a fluid single-column stack on mobile. 

- **Whitespace:** Use `section-gap` between major content blocks to prevent visual clutter.
- **Alignment:** Headlines are generally centered or left-aligned with significant indentation to create an asymmetrical, modern editorial look.
- **Rhythm:** A 4px baseline grid ensures consistent vertical rhythm across all components.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and **Ambient Shadows** rather than heavy gradients. 

- **Surfaces:** Use subtle shifts in background color (e.g., *Neutral* to *Warm Sand*) to define different content zones.
- **Shadows:** Applied only to interactive elements like primary cards and floating navigation. Shadows should be ultra-soft: `0px 10px 40px rgba(74, 93, 76, 0.05)`.
- **Glassmorphism:** Navigation bars and sticky utilities should use a light backdrop blur (12px) with 80% opacity of the neutral color to maintain context of the content beneath.

## Shapes

The shape language is defined by **Softness**. A standard radius of `1rem` (16px) is applied to all primary containers, buttons, and input fields. 

- **Images:** Photography should always feature rounded corners to fit the gentle aesthetic.
- **Iconography:** Use "Linear" or "Light" weight icons with rounded terminals. Avoid sharp corners or heavy fills.

## Components

### Buttons
- **Primary:** Solid *Sage Green* with white text. Rounded (1rem). High horizontal padding.
- **Secondary:** *Charcoal Silk* outline (1px) with transparent background.
- **Tertiary:** Text-only with a subtle 1px underline that expands on hover.

### Cards
Cards should be used for pricing and class types. They feature a *Neutral* background, a very thin *Warm Sand* border, and no shadow unless hovered. Content within cards should have a minimum of 2rem internal padding.

### Inputs
Fields use a *Warm Sand* background with no border. On focus, a 1px *Sage Green* border appears. Labels use `label-caps` typography positioned above the field.

### Chips & Tags
Used for "Popular" or "New" labels. These should be pill-shaped with a low-opacity tint of the *Primary* color and dark text to remain subtle but distinct.