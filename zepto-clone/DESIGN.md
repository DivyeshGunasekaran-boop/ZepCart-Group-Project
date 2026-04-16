# Design Brief: Zepto Grocery Delivery

## Direction
Bold, energetic utility design. Fast-paced grocery app with clear hierarchy, high contrast, and immediate action. Purple-dominant brand identity with trust-driven green accents and warmth-driven orange badges.

## Tone
Direct, energetic, structured. No soft flourishes. Clean typography hierarchy drives scannability.

## Palette

| Token | OKLCH | Usage |
|-------|-------|-------|
| Primary (Purple) | 0.52 0.25 310 | Header, primary CTAs, category active state |
| Accent (Green) | 0.48 0.32 140 | ADD buttons, success actions |
| Secondary (Orange) | 0.68 0.18 80 | Discount badges, urgency highlights |
| Background | 0.99 0 0 | Main content area, light mode |
| Card | 0.98 0 0 | Product cards, elevated surfaces |
| Foreground | 0.15 0 0 | Body text, high contrast |
| Border | 0.92 0 0 | Card edges, dividers |
| Muted | 0.9 0 0 | Secondary text, inactive states |

## Typography
**Display/Body**: DM Sans (400, 600, 700 weights) — clean, modern, grocery-ready
**Mono**: JetBrains Mono — technical clarity if needed

## Shape & Radius
Card corners: 8px (rounded-lg). Badges: 0px (sharp). Button corners: 6px (rounded-md). Header: 0px.

## Elevation & Depth
Card borders visible on white background. Hover state: subtle shadow increase (`shadow-md`). Sticky header with bottom border. Clear z-hierarchy: header > modal > cards.

## Structural Zones

| Zone | Background | Border | Usage |
|------|-----------|--------|-------|
| Header | Primary (purple) | None | Sticky, search, cart icon |
| Category Tabs | Background (white) | Bottom border-border | Scrollable, active = bold text + underline |
| Product Grid | Background (white) | None | Card-based, 2 columns mobile, 4+ desktop |
| Product Card | Card (off-white) | border-border | Image, name, description, price, discount badge, quantity, ADD button |
| Cart Sidebar | Card (off-white) | border-border left | Fixed or modal on mobile |
| Footer | Muted/30% | border-top | Light divider |

## Component Patterns
- **Product Card**: Image → Name/Description → Price crossed out + discounted price → Discount badge (secondary background, sharp corners) → Quantity selector → ADD button (green, bold)
- **Discount Badge**: Orange background, dark text, sharp corners, small text
- **ADD Button**: Green background, white text, bold font weight, rounded corners
- **Category Tabs**: Text-only active state with bold weight + underline in primary color
- **Search Bar**: Animated placeholder cycling through suggestions

## Motion
- Fade-in on load (200ms)
- Button hover: opacity 90% (smooth 0.3s easing)
- Cart add/remove: scale + fade animation (300ms)
- Search bar: placeholder text cycles smoothly

## Constraints
- No gradients on backgrounds (solid OKLCH only)
- No shadows beyond subtle elevation (`shadow-md` max)
- No rounded corners on header or badges
- All colors token-driven via CSS variables

## Signature Detail
Bright green ADD buttons (high saturation, high contrast vs. white card) paired with sharp orange badges create visual energy and drive user action.
