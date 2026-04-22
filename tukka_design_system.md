# Tukka Design System & Style Guide

This document defines the visual identity, colors, and typography for the **Tukka** landing page. Use these tokens and principles to maintain consistency across other projects.

## 🎨 Color Palette

The Tukka aesthetic is defined by a warm "Almond" base with high-contrast "Burgundy" accents, creating a premium and organic feel. It connects Projects (companies/product teams) with a network of Creators (distributors).

### Core Colors
| Name | Hex Code | Utility Class (Tailwind v4) | Usage |
| :--- | :--- | :--- | :--- |
| **Brand BG** | `#f0ebe0` | `bg-brand-bg` | Main page background, warm almond tone. |
| **Brand Text** | `#1a1814` | `text-brand-text` | Primary body and heading text. |
| **Brand Accent** | `#800020` | `bg-brand-accent` | Primary CTA buttons, highlights, and active states. |
| **Brand Black** | `#111010` | `bg-brand-black` | Deep dark accents, logo containers, and footer elements. |
| **Brand Muted** | `#7a756e` | `text-brand-muted` | Secondary text, descriptions, and breadcrumbs. |
| **Accent Hover** | `#EADDCA` | `hover:bg-brand-accent-hover` | Interaction states for primary actions. |

### Translucency & Borders
- **Navbar Blur**: `backdrop-blur-2xl` with `bg-brand-bg/95`.
- **Borders**: `rgba(26, 24, 20, 0.1)` (Light) and `rgba(26, 24, 20, 0.18)` (Dark).

---

## 🔡 Typography

We use two modern sans-serif fonts to balance personality with readability.

### Primary Font: Syne
- **Usage**: Headings, Hero titles, Branding.
- **Characteristics**: Bold, geometric, modern.
- **Tailwind Class**: `font-syne`
- **Import**: [Google Fonts: Syne](https://fonts.google.com/specimen/Syne)

### Secondary Font: DM Sans
- **Usage**: Body text, navigation links, small labels.
- **Characteristics**: Balanced, neutral, highly legible.
- **Tailwind Class**: `font-dm-sans`
- **Import**: [Google Fonts: DM Sans](https://fonts.google.com/specimen/DM+Sans)

---

## ✨ Key Design Tokens

### Shadows & Depth
- **Primary Button**: `shadow-[0_8px_20px_rgba(128,0,32,0.25)]`
- **Card/Container**: `backdrop-blur-md bg-black/20 border border-white/12`

### Animations (CSS Keyframes)
| Name | Effect |
| :--- | :--- |
| `pulse` | Opacity and scale loop (used for "platform live" indicator). |
| `line-pulse`| Vertical scale loop (used for scroll cue). |
| `fade-up` | Smooth entry with 22px Y-offset. |
| `float` | Subtle vertical hovering. |

---

## 🛠️ Implementation Snippet (Tailwind v4)

Add this to your `@theme` block in `index.css`:

```css
@theme {
  --color-brand-bg: #f0ebe0;
  --color-brand-black: #111010;
  --color-brand-text: #1a1814;
  --color-brand-muted: #7a756e;
  --color-brand-accent: #800020;
  --color-brand-accent-hover: #EADDCA;
  --color-brand-border: rgba(26, 24, 20, 0.1);
  --color-brand-border-dark: rgba(26, 24, 20, 0.18);

  --font-syne: "Syne", sans-serif;
  --font-dm-sans: "DM Sans", sans-serif;
}
```

## 🖼️ UI Components Checklist
- [ ] **Buttons**: Rounded-full, uppercase, high tracking.
- [ ] **Inputs**: Subtle backdrop-blur, rounded-full.
- [ ] **Containers**: Soft border radius (16px - 24px).
- [ ] **Backgrounds**: Use gradients to blend hero sections into the page body.
