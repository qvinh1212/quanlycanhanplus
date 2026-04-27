---
name: Reliable Finance
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444653'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#747684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3357bf'
  primary: '#003297'
  on-primary: '#ffffff'
  primary-container: '#254bb3'
  on-primary-container: '#b7c5ff'
  inverse-primary: '#b5c4ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#563400'
  on-tertiary: '#ffffff'
  tertiary-container: '#764900'
  on-tertiary-container: '#ffb960'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b5c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#113da6'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  h1:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  h2:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  h3:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  currency-display:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 20px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
  tap-target-min: 48px
---

## Brand & Style

This design system is built on the pillars of **Trust, Clarity, and Ease**. Designed specifically for the Vietnamese market, it balances the professional nature of financial management with a friendly, approachable aesthetic. The style is **Modern Minimalist**, utilizing generous whitespace to reduce cognitive load when viewing complex transaction data. 

The emotional response should be one of "controlled freedom"—the user feels in control of their money without the app feeling like a rigid accounting tool. Visuals are soft, using depth and rounded forms to create a welcoming environment for daily interaction.

## Colors

The palette is anchored by **Reliable Blue (#254BB3)**, conveying stability and institutional trust. 
- **Secondary (Success):** An emerald green used for income and positive balances.
- **Tertiary (Warning):** A soft amber for pending transactions or budget limits.
- **Error:** A clean red for expenses and over-budget alerts.
- **Background:** A very light grey-blue (Slate 50) is used instead of pure white to reduce eye strain and provide better contrast for white cards.

## Typography

This design system uses a dual-font strategy. **Manrope** is used for headings and currency displays to provide a structured, modern, and premium financial feel. **Be Vietnam Pro** is used for all body text and labels to ensure maximum readability for the Vietnamese language, specifically handling diacritics elegantly. 

The currency display (VND) should always use semi-bold or bold weights to ensure the user's primary focus—their money—is immediately visible.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for mobile-first web access. 
- **Margins:** A consistent 20px side margin ensures content does not touch the screen edges.
- **Rhythm:** A 4px baseline grid governs all vertical spacing.
- **One-Handed Use:** Primary actions (Add Transaction, Save, Filter) are placed in the bottom 40% of the screen.
- **Safe Areas:** Generous padding is applied to the bottom of the viewport to account for mobile browser navigation bars.

## Elevation & Depth

To maintain a friendly and modern feel, this design system uses **Ambient Shadows** and **Tonal Layering** instead of harsh borders.

1.  **Level 0 (Base):** The app background (#F8FAFC).
2.  **Level 1 (Cards):** White surfaces with a very soft, diffused shadow (Y: 4, Blur: 20, Color: Primary Blue at 4% opacity).
3.  **Level 2 (Modals/Sheets):** Higher elevation with a deeper shadow (Y: 10, Blur: 30, Color: Primary Blue at 8% opacity) to signify temporary focus.

Transitions between states should use subtle blurs to maintain the "Glassmorphism" influence without sacrificing legibility.

## Shapes

The shape language is defined by "Soft Continuity." 
- **Main Cards:** Use a 24px corner radius to feel approachable and tactile.
- **Buttons & Inputs:** Use a 16px radius.
- **Selection Chips:** Use a full pill-shape (999px) for distinct visual separation from actionable buttons.

Avoid sharp 90-degree corners entirely to maintain the "friendly" brand promise.

## Components

### Buttons
- **Primary:** Solid #254BB3 with white text. Minimum height of 56px for easy thumb tapping.
- **Secondary:** Light blue tint (#254BB3 at 10%) with #254BB3 text.
- **Floating Action Button (FAB):** A large 64px circle for the "Add Transaction" (Thêm giao dịch) feature, positioned at the bottom right.

### Cards
Cards are the primary container for transactions. Each card should feature:
- An icon on the left (rounded background tint).
- Category name and timestamp (dd/mm/yyyy) in the center.
- Amount in VND on the right (Positive = Green, Negative = Black).

### Input Fields
Inputs use a "Floating Label" style. The active state is indicated by a 2px stroke of the Primary Blue. Backgrounds of inputs should be slightly off-white (#F1F5F9) to stand out against white cards.

### Intuitive Icons
Use a "Line-Duotone" icon style—outlines with a secondary color fill at 20% opacity. This adds visual interest without being distracting.

### List Items
Transactions should be grouped by date headers (e.g., "Hôm nay", "Hôm qua"). Use a thin 1px light-grey divider that doesn't reach the edges of the screen.