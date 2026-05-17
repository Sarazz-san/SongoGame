---
name: Songo Heritage
colors:
  surface: '#181210'
  surface-dim: '#181210'
  surface-bright: '#3f3835'
  surface-container-lowest: '#130d0b'
  surface-container-low: '#201a18'
  surface-container: '#251e1c'
  surface-container-high: '#2f2826'
  surface-container-highest: '#3b3331'
  on-surface: '#ede0dc'
  on-surface-variant: '#d3c4b4'
  inverse-surface: '#ede0dc'
  inverse-on-surface: '#362f2c'
  outline: '#9b8f80'
  outline-variant: '#4f4539'
  surface-tint: '#eebf78'
  primary: '#eebf78'
  on-primary: '#442c00'
  primary-container: '#d0a35f'
  on-primary-container: '#573900'
  inverse-primary: '#7b581b'
  secondary: '#eebab9'
  on-secondary: '#492727'
  secondary-container: '#653f3f'
  on-secondary-container: '#dfacab'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#fc8f33'
  on-tertiary-container: '#653100'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb0'
  primary-fixed-dim: '#eebf78'
  on-primary-fixed: '#281800'
  on-primary-fixed-variant: '#614003'
  secondary-fixed: '#ffdad9'
  secondary-fixed-dim: '#eebab9'
  on-secondary-fixed: '#301313'
  on-secondary-fixed-variant: '#623d3d'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#713700'
  background: '#181210'
  on-background: '#ede0dc'
  surface-variant: '#3b3331'
  ebony-deep: '#0C0908'
  mahogany-rich: '#3D2424'
  sunset-glow: '#FF8C42'
  tactical-gold: '#D0A35F'
  seed-ivory: '#F0EBE6'
typography:
  headline-xl:
    fontFamily: EB Garamond
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-md:
    fontFamily: Metropolis
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  stats-display:
    fontFamily: Metropolis
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: 0.05em
  label-technical:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  board-gap: 12px
---

## Brand & Style

The design system is an "Afro-Modern" framework crafted for a digital interpretation of Songo, the traditional Mancala-style game of Central Africa. It bridges the gap between ancient strategic heritage and contemporary digital precision. The target audience includes both cultural enthusiasts and competitive strategy gamers who value a premium, professional gaming environment.

The style is **Tactile / Modern**, blending high-fidelity physical metaphors with a clean, systematic interface. It avoids the "rustic" trope in favor of a "luxurious-technical" aesthetic. Think of a high-end, laser-etched mahogany board found in a modern architecture firm. Key visual drivers include:
- **Heritage Mathematical:** Subtle grid-based notations and geometric patterns that nod to the complex mathematics of the game.
- **Material Authenticity:** Deep wood grain textures contrasted with crisp, glowing digital overlays.
- **Strategic Focus:** A dark, immersive atmosphere that centers the user's attention on the seeds and pits.

## Colors

This design system uses a primary **dark mode** to evoke a focused, evening-parlor atmosphere. 

- **Primary (Tactical Gold):** Used for highlights, active selection rings, and critical mathematical data. It represents the "value" and precision of the move.
- **Secondary (Mahogany):** The structural base for the UI—used for containers, board surfaces, and large tactile elements.
- **Tertiary (Sunset Orange):** An energetic accent used sparingly for notifications, win-states, or high-stakes moves.
- **Neutral (Ebony):** The "ebony wood" foundation. We use a near-black `#0C0908` for the deepest backgrounds to ensure the rich wood tones of the mahogany containers pop.

Surface colors should utilize subtle gradients to mimic the way light hits polished wood, transitioning from deep mahogany to a slightly lighter grain.

## Typography

The typography strategy creates a tension between cultural storytelling and mathematical rigor.

- **Headings (EB Garamond):** Chosen for its elegant, classical serif structure. It provides the "Heritage" feel, appearing on splash screens, chapter titles, and major modal headers.
- **Interface & Body (Metropolis):** A modern geometric sans-serif that ensures high legibility for game rules and settings. It feels engineered and reliable.
- **Data & Notations (JetBrains Mono):** Used for the "laser-etched" mathematical notations around the pits and for seed counts. The monospaced nature emphasizes the logic and calculation inherent in Songo.

Use tight letter spacing for large headlines and generous tracking for technical labels to maintain a high-end, editorial feel.

## Layout & Spacing

The layout is centered around a **fixed-aspect-ratio game board** that scales fluidly within a container. 

- **Grid System:** A 12-column grid is used for the surrounding UI (HUD, chat, stats), while the game board itself follows a strict internal 2x7 or 2x9 grid (depending on Songo variation).
- **Rhythm:** An 8px base unit drives all spacing. 
- **The "Pit" Centering:** Spacing between pits (gutters) must be wide enough to allow for the "glow" of selected pits without overlapping.
- **Responsive Behavior:** On mobile, the board rotates to a vertical orientation or a horizontal scrollable view to maintain the spherical scale of the pits. Side panels (stats/history) collapse into bottom sheets.

## Elevation & Depth

Depth is the core of the Songo visual experience. We use **Tonal Layers** combined with **Physical Sculpting**:

- **The Board (Level 0):** Deep Ebony background with a subtle matte finish.
- **The Pits (Level -1):** Inset depth. Use inner shadows (top-down lighting) and radial gradients to create a concave, spherical "carved" look. 
- **The Seeds (Level +2):** High-contrast ivory or stone textures with crisp, contact shadows. They should appear to sit "inside" the pits.
- **UI Panels (Level +1):** Floating mahogany containers with soft, ambient shadows tinted with `#3D2424` (Mahogany) rather than pure black, maintaining the warm, wooden feel.
- **Active State:** Laser-etched notations around the pits should "glow" using a Gold outer-glow filter when a move is possible.

## Shapes

The shape language is defined by the **Circle**.

- **Primary Elements:** All interactive game nodes (pits, seeds) are perfect circles.
- **UI Elements:** Rounded-lg (16px) is the standard for cards and modals to echo the softness of the pits while maintaining a professional structure.
- **Buttons:** Use a pill-shaped (rounded-xl) design for primary actions (Start Game, End Turn) to differentiate them from the board geometry.
- **Icons:** Use thin-stroke, geometric icons that look like they could be etched into wood or metal.

## Components

- **The Pit (Songo Hole):** A concave circular container. When active, it features a `tactical-gold` inner ring. Seed count is displayed in the bottom right in `label-technical` (JetBrains Mono).
- **Seeds:** Varied organic shapes (3-4 variations) with a stone or polished ivory texture. They should cluster naturally (not perfectly centered) within the pits.
- **Primary Button:** Mahogany background, Gold border (1px), Gold text. On hover, the background fills with a Gold-to-Sunset gradient.
- **Status Chips:** Small, dark ebony capsules with technical borders used to display player turn, time remaining, or "Capture" alerts.
- **Scoreboard:** A vertical or horizontal strip featuring a "Seed Reservoir" (the captured seeds) and a clear `stats-display` of the total count.
- **Mathematical Overlays:** Fine, 0.5px lines in Gold that appear during "Aiming" or "Calculation" phases, showing the path of the seeds across the board.
- **Input Fields:** Dark ebony with a bottom-border only (mahogany), turning gold on focus.