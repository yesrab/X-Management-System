# upgradeStyle.md — Universal Conversion Guide

> **Purpose.** This is an agent instruction file. It teaches you to take **any** project — any framework, any styling system, any language — and restyle it into the *n-downloader* visual language: a precise, gridded, industrial technical instrument inspired by the discipline of Teenage Engineering hardware (exposed structure, hard edges, restrained signal color, every element labeled and load-bearing).
>
> This file is **framework- and library-agnostic**. It never assumes React, Tailwind, shadcn, Vue, Svelte, Angular, plain HTML/CSS, SCSS, CSS-in-JS, or any component kit. Every rule is given first as a **raw value or structural spec**, then with **translation notes** for whatever system the target project happens to use. Your job is to map the spec onto the target's idiom — not to introduce new tooling.

---

## 0. How to use this file

Work in phases. Do not skip Phase 1. Do not start editing components before tokens exist.

1. **Audit** the target project (§1). Discover the stack, the styling mechanism, and build an inventory of surfaces to convert.
2. **Install the token layer** (§2–§3) in the project's native styling mechanism. This is the single source of truth. Everything else references it.
3. **Strip** anti-pattern styling (§4) — gradients, rounding, glass, soft shadows, neon.
4. **Rebuild components** from the recipes (§5) one surface type at a time.
5. **Apply layout, shell, and typography rules** (§6–§9).
6. **Verify** against the acceptance checklist (§11) and the anti-pattern list (§10).

Golden rules that override convenience at every step:

- **Color is signal, not decoration.** A hue appears because it means something (action, warning, torrent, data). Never to brighten a layout.
- **Borders over shadows.** Default to `1px` hard borders. Shadows are a landing-page-only flourish, and only as hard offset shadows.
- **Radius is `0`.** Square everything unless a third-party primitive physically cannot be un-rounded.
- **No card inside a card.** Use panels, rows, tables, meters, pills, segmented tool areas.
- **Every visible element has a job.** If it's decorative, delete it.

---

## 1. Phase 1 — Audit the target project

Before changing anything, determine and write down:

**1.1 Styling mechanism.** Find how styles are authored. Look for, in rough priority order:
- A global stylesheet or token file (`*.css`, `*.scss`, `theme.*`, `tokens.*`, `tailwind.config.*`, `styles.css`).
- A CSS-variable / design-token system already in place (`:root { --... }`, a theme provider, a design-token JSON).
- A utility-class framework (Tailwind, UnoCSS, Tachyons) — look at config + class usage.
- A component library (Material, Chakra, Ant, Bootstrap, shadcn/Radix, Vuetify, etc.) — look at package manifest + imports.
- CSS-in-JS (styled-components, Emotion, vanilla-extract, stitches) — look for `styled`/`css` calls.
- Plain inline styles / scoped component styles (Vue `<style scoped>`, Svelte `<style>`).

**1.2 Theming entry point.** Identify the *one* place where global colors, fonts, and radius are defined or can be defined. This becomes the token layer in §2.

**1.3 Dark mode.** Determine whether the project supports light/dark, and by what mechanism (a `.dark` class, `data-theme`, `prefers-color-scheme`, a JS theme context). You will supply both palettes from §2.

**1.4 Surface inventory.** List every distinct UI surface type present, mapped to the recipes in §5. Typical: app shell/nav, page header, cards→panels, tables/lists, forms/inputs, buttons, badges/chips, progress/loading, charts/metrics, modals, empty/landing pages.

**1.5 Third-party primitives.** Note any component-library primitives that render their own markup (you will *theme* these through tokens and thin wrappers — never hand-fork generated component source for cosmetics).

Produce a short written plan from this audit before editing.

---

## 2. The design tokens (canonical source of truth)

These are the exact values. Define them **once** in the project's theming entry point, then reference them everywhere. Prefer **CSS custom properties** when the platform supports them — they are the most universal mechanism and work across every web framework, plain HTML, CSS-in-JS, and most component libraries.

### 2.1 Raw palette

| Role | Light | Dark |
|---|---|---|
| Instrument body (app background, landing) | `#f7f4ef` | `#171512` |
| Workbench (dashboard background) | `#eee9df` | `#171512` |
| Raised panel / card surface | `#f8f5ed` | `#24211c` |
| Popover / overlay surface | `#f8f5ed` | `#24211c` |
| Ink (primary text, primary fill) | `#171512` | `#f7f4ef` |
| Muted text | `#635d53` | `#d8cfbf` |
| Track / fill neutral (secondary) | `#d8cfbf` | `#3a342b` |
| Subtle fill (muted surface) | `#e2dacb` | `#3a342b` |
| Border / input hairline | `#cfc5b5` | `#3a342b` |
| Focus ring | `#171512` | `#efb84f` |

### 2.2 Signal colors (same in light and dark — they are signals, not surfaces)

| Signal | Value | Meaning |
|---|---|---|
| Action red | `#ce3f21` | Primary actions, active transfer, eyebrow labels, emphasis |
| Data yellow | `#efb84f` | Data/values, terminal output accent, secondary signal |
| Torrent teal | `#5bb3a7` | Torrent / peer-to-peer / seeding context |
| Warning clay | `#d95c3d` | Warnings, destructive, degraded states |
| Muted ink | `#635d53` | Neutral chart/series, de-emphasized data |

> Use signal colors **sparingly and meaningfully**. A screen with three colored fills competing is wrong. Pick the one hue that carries meaning in that context.

### 2.3 Auxiliary shades (used in real components; keep them consistent)

- Button hover on ink: `#2c2822` (light) — a hair lighter than ink.
- Landing raised panel: `#fffdf8` (a brighter paper than the dashboard panel).
- Dark-on-dark inner panel border: `rgba(255,255,255,0.15)`; dark inner track: `rgba(255,255,255,0.10)`.
- Light border opacities: ink at `20%` / `15%` / `10%` for descending hierarchy of hairlines.

### 2.4 Geometry & type tokens

| Token | Value | Note |
|---|---|---|
| Border radius | `0` | Everywhere. Non-negotiable. |
| Border width | `1px` | The primary structural device. |
| Font family | `"JetBrains Mono Variable", monospace` | Mono everywhere, including headings. |
| Heading font | same as body (mono) | No separate display face. |
| Letter spacing | `normal` | **Never** negative tracking. |
| Base spacing unit | `4px` | Compact scale: 8 / 12 / 16 px are the workhorses. |

If JetBrains Mono is unavailable, substitute another **variable monospace** (e.g. IBM Plex Mono, Space Mono, JetBrains Mono via any CDN/font package). Stay monospace; do not fall back to a proportional sans.

---

## 3. Installing the token layer (per styling system)

Define the tokens from §2 in the target's native mechanism. Below are the universal recipes. **Pick the one** matching the audit.

### 3.1 Canonical CSS custom properties (preferred, works almost everywhere)

```css
:root {
  --background: #eee9df;        /* dashboard workbench */
  --body:       #f7f4ef;        /* instrument body / landing */
  --foreground: #171512;        /* ink */
  --panel:      #f8f5ed;        /* raised panel / card */
  --popover:    #f8f5ed;
  --primary:            #171512;
  --primary-foreground: #f7f4ef;
  --secondary:  #d8cfbf;        /* track/fill neutral */
  --muted:      #e2dacb;
  --muted-foreground: #635d53;
  --accent:     #d8cfbf;
  --border:     #cfc5b5;
  --input:      #cfc5b5;
  --ring:       #171512;

  --signal-red:    #ce3f21;     /* action */
  --signal-yellow: #efb84f;     /* data */
  --signal-teal:   #5bb3a7;     /* torrent */
  --signal-clay:   #d95c3d;     /* warning / destructive */

  --radius: 0;
  --font-mono: "JetBrains Mono Variable", monospace;
}

.dark {
  --background: #171512;
  --body:       #171512;
  --foreground: #f7f4ef;
  --panel:      #24211c;
  --popover:    #24211c;
  --primary:            #f7f4ef;
  --primary-foreground: #171512;
  --secondary:  #3a342b;
  --muted:      #3a342b;
  --muted-foreground: #d8cfbf;
  --accent:     #3a342b;
  --border:     #3a342b;
  --input:      #3a342b;
  --ring:       #efb84f;
  /* signal colors are identical in dark mode */
}

* { border-color: var(--border); border-radius: var(--radius); }
html, body { font-family: var(--font-mono); background: var(--body); color: var(--foreground); }
```

Switch `.dark` to whatever the project's dark-mode hook is (`[data-theme="dark"]`, a media query, etc.).

### 3.2 Utility-class framework (Tailwind / UnoCSS / etc.)

- Map each token above into the framework's theme config so semantic class names (`bg-background`, `text-foreground`, `border-border`, `bg-card`/`bg-panel`) resolve to these values.
- Set the radius scale base to `0` so `rounded-*` utilities collapse to square. (If the framework hard-codes radii, override the relevant scale to `0`.)
- Register `signal-red/yellow/teal/clay` as named colors so they read as intent in markup.
- Set the default/`mono` font to the variable monospace and apply it on `html`.

### 3.3 Component library (Material / Chakra / Ant / Bootstrap / shadcn / Vuetify …)

- **Theme through the library's token API**, not by editing generated component files. Feed the §2 palette into the library's theme object / SCSS variables / CSS-variable hooks.
- Set the library's radius/shape scale to `0`.
- Set the typography system to the variable monospace; force headings to inherit it.
- For primitives whose look you still cannot fully control, wrap them in a thin class that applies hard borders and square corners. **Do not fork or hand-clean generated component source for cosmetics** — theme it via variables and wrappers.

### 3.4 CSS-in-JS (styled-components / Emotion / vanilla-extract / stitches)

- Put the §3.1 values in the library's theme object and expose them through the theme provider.
- Reference `theme.*` in styled definitions; never inline raw hex in components once tokens exist.

### 3.5 Plain CSS / SCSS / scoped styles

- Put §3.1 in a global stylesheet imported once at the root.
- In SCSS you may mirror them as `$variables`, but still emit CSS custom properties so runtime theming/dark mode works.

> After this phase: a single token edit should ripple through the whole app. If a color is hard-coded in a component, it's a bug to fix as you go.

---

## 4. Strip phase — remove anti-pattern styling

Before rebuilding, hunt and remove these across the target. Each is a hard "delete or replace":

- **Border radius** on anything: rounded cards, pills, buttons, inputs, avatars, images → set to `0`. (Avatars/logos may stay square; do not make them circles.)
- **Soft / blurred box-shadows** (`0 4px 12px rgba(...)`, elevation systems) → delete. Replace with a `1px` border. (Hard offset shadows are allowed *only* on landing elements, §8.)
- **Gradients** used as decoration — SaaS hero gradients, button gradients, bokeh, color washes → delete. (Two exceptions on landing only: a faint grid-line overlay and a single fade-to-body scrim, §8.)
- **Glassmorphism** — heavy `backdrop-blur` + translucent frosted panels as a theme → remove. (A faint translucency on a landing overlay chip is the only tolerated trace.)
- **Neon / glow**, `text-shadow` glows, saturated drop-shadows → delete.
- **Soft palettes** — purple/indigo/blue corporate gradients, pastel SaaS tints → replace with the warm instrument palette.
- **Decorative SVGs / blobs / illustrations** with no function → delete.
- **Oversized rounded hero cards** and **nested cards** → flatten into panels (§5.1) and rows.
- **Drop caps, loose tracking, marketing-script fonts** → replace with mono, normal tracking.

Leave structure and content intact; you are removing cosmetic noise, not features.

---

## 5. Component conversion recipes

Each recipe gives the **spec**, a **raw CSS/structural implementation**, and **translation notes**. Adapt class/prop names to the target system; keep the values.

### 5.1 Panel (the fundamental surface — replaces "card")

**Spec.** A flat raised surface: panel background, `1px` border, `0` radius, compact padding (`12px` dense / `16px` roomy). No shadow. Panels do not nest inside panels — to subdivide, use inner rows/tiles with a *fainter* hairline, not another card.

```css
.panel {
  background: var(--panel);
  border: 1px solid color-mix(in srgb, var(--foreground) 20%, transparent);
  padding: 12px;
}
/* roomy header panel */
.panel--lg { padding: 16px; }
/* inverted panel: dark instrument block on a light page */
.panel--ink { background: var(--foreground); color: var(--primary-foreground);
              border-color: color-mix(in srgb, #fff 15%, transparent); }
```

**Translation.** Utility systems: `border bg-panel p-3` + a border-opacity step. Component libs: disable the library's elevation/shadow and corner radius on Card; keep only border. Anywhere the design has a "Card", render this panel instead.

**Hierarchy of hairlines:** outer panel uses ink/`20%`; inner rows use ink/`15%`; finest dividers ink/`10%`. On ink/dark surfaces use white at `15%` / `10%`.

### 5.2 Section header (inside a panel)

**Spec.** A row at the top of a panel: small mechanical icon + short bold label, a `1px` bottom divider, `~12px` bottom padding/margin. Optional right-aligned compact tool.

```css
.section-header {
  display: flex; align-items: center; justify-content: space-between;
  border-bottom: 1px solid color-mix(in srgb, currentColor 15%, transparent);
  padding-bottom: 12px; margin-bottom: 12px;
  font-size: 0.875rem; font-weight: 600;
}
```

### 5.3 Dense row / table-as-grid (replaces data tables and list cards)

**Spec.** Tabular data renders as stacked grid rows, each row a faint-bordered strip on the workbench/muted surface, fixed-width metric columns on the right, a truncating name on the left, `text-xs`. This is how *all* lists of records look — downloads, history, queue, torrents.

```css
.row {
  display: grid; gap: 12px; align-items: start;
  grid-template-columns: 1fr 90px 90px 90px;  /* name + fixed metric cols */
  background: var(--background);
  border: 1px solid color-mix(in srgb, var(--foreground) 15%, transparent);
  padding: 12px; font-size: 0.75rem;
}
.row__name { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 600; }
```

**Cell label pattern.** Each metric cell is a tiny uppercase label over a bold value:

```css
.cell__label { font-size: 10px; text-transform: uppercase; opacity: 0.6; }
.cell__value { margin-top: 4px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
```

Use labels from the instrument vocabulary (§9.2): `Down`, `Up`, `Ratio`, `ETA`, `Seeds`, `Peers`, `Status`, `Speed`, `Done`.

### 5.4 Progress / meter bar

**Spec.** A `~8px`-tall neutral track with a flat signal-colored fill. No rounding, no gradient, no stripe animation. Track = neutral fill token; fill = the signal hue that matches the row's meaning (action red for downloads, teal for torrents, clay for warnings).

```css
.meter { height: 8px; background: var(--secondary); }      /* track */
.meter__fill { height: 100%; background: var(--signal-red); width: 64%; }
/* on an ink panel: track = rgba(255,255,255,.10) */
```

### 5.5 Metric tile (KPI block)

**Spec.** A small bordered tile with an icon + tiny label row and one large bold value. The whole tile may take a **signal fill** to encode meaning; choose text color for contrast (ink text on yellow/teal, paper text on red/ink).

```css
.metric { border: 1px solid color-mix(in srgb, var(--foreground) 20%, transparent); padding: 12px; }
.metric--red    { background: var(--signal-red);    color: #fffdf8; }
.metric--yellow { background: var(--signal-yellow); color: var(--foreground); }
.metric--teal   { background: var(--signal-teal);   color: var(--foreground); }
.metric--dark   { background: var(--foreground);    color: var(--primary-foreground); }
.metric__label { display:flex; align-items:center; gap:8px; font-size:0.75rem; opacity:0.75; }
.metric__value { margin-top: 16px; font-size: 1.5rem; font-weight: 600; }
```

Across a row of tiles, vary tones by meaning — do not make them all the same color, and do not rainbow them either. A typical bar: one red, one teal, one yellow, one dark.

### 5.6 Status pill / chip

**Spec.** A compact bordered chip with optional icon + short label on the muted surface. Square corners. No solid bright fill unless it's encoding a signal state.

```css
.pill {
  display: inline-flex; align-items: center; gap: 8px;
  border: 1px solid color-mix(in srgb, var(--foreground) 15%, transparent);
  background: var(--background); padding: 8px; font-size: 0.75rem;
}
```

### 5.7 Button

**Spec.** Buttons are for **direct actions only** (add link, add magnet, pause, recheck, copy, install). Primary = solid ink fill with paper text; hover lightens to `#2c2822`. Square, `1px` border, compact height (~36–40px). No gradient, no rounded, no shadow.

```css
.btn {
  height: 36px; padding: 0 12px; border: 1px solid var(--foreground);
  background: var(--foreground); color: var(--primary-foreground);
  font-family: var(--font-mono); border-radius: 0;
}
.btn:hover { background: #2c2822; }
.btn--ghost { background: transparent; color: var(--foreground); }
.btn--danger { background: var(--signal-clay); border-color: var(--signal-clay); color: #fffdf8; }
```

Do not invent marketing/CTA buttons inside the dashboard. Label buttons with verbs from the action vocabulary.

### 5.8 Input / form control

**Spec.** Square, `1px` border using the input token, panel or body background, mono text. No rounded fields, no floating-label glassy treatments, no inner shadow.

```css
.input {
  border: 1px solid var(--input); background: var(--panel);
  color: var(--foreground); padding: 8px 12px; border-radius: 0;
  font-family: var(--font-mono);
}
.input:focus { outline: 2px solid var(--ring); outline-offset: 0; }
```

### 5.9 Histogram / bandwidth meter (multi-bar chart)

**Spec.** A real chart renders as a row of bordered cells, each containing a bottom-anchored signal-colored fill scaled by value. Flat bars, hairline cell borders, no axes chrome, no gradients.

```css
.histogram { display: grid; grid-template-columns: repeat(24, 1fr); gap: 4px; }
.histogram__cell { height: 80px; border: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent);
                   background: var(--muted); display: flex; align-items: flex-end; }
.histogram__bar { width: 100%; background: var(--signal-red); /* height set per-datum */ }
```

### 5.10 Terminal / code / command block

**Spec.** Used for install commands and any literal CLI text. An **ink-filled** block with paper-ish caption, a tiny `Terminal` label, and the command itself in **data-yellow** monospace, allowed to wrap/break.

```css
.terminal { border: 1px solid var(--foreground); background: var(--foreground); color: var(--primary-foreground); padding: 16px; }
.terminal__cap { font-size: 0.75rem; color: rgba(255,255,255,0.55); }
.terminal__cmd { margin-top: 16px; display: block; font-size: 0.875rem; line-height: 1.75; color: var(--signal-yellow); word-break: break-all; }
```

### 5.11 Eyebrow + title (page/section heading pattern)

**Spec.** A tiny uppercase **action-red** eyebrow label above a compact bold title, with a calm muted summary line. On the dashboard, titles stay practical (`text-3xl`/`4xl` max). Hero-scale type is landing-only.

```css
.eyebrow { font-size: 0.75rem; font-weight: 600; text-transform: uppercase; color: var(--signal-red); }
.page-title { margin-top: 12px; font-size: clamp(1.5rem, 2.5vw, 2.25rem); font-weight: 600; line-height: 1; letter-spacing: normal; }
.page-summary { margin-top: 12px; max-width: 48rem; font-size: 0.875rem; line-height: 1.5; color: var(--muted-foreground); }
```

### 5.12 Modal / dialog / popover / dropdown

**Spec.** Same panel material: `--popover` surface, `1px` border, square, no soft shadow (an overlay scrim dimming the background is fine; the panel itself uses a border, not a blur-shadow). Keep contents dense.

---

## 6. Layout system

- **Visible grid.** Compose with explicit columns, rows, meters, and tables. Asymmetric content/aside splits are good (e.g. `1fr 360px`, `1.05fr 0.95fr`, `0.7fr 1.3fr`).
- **Density.** Dashboard surfaces are dense and scannable. Default gaps `8–12px`, panel padding `12–16px`. Do not pad like a marketing site.
- **Spacing scale.** Stick to multiples of `4px`; `8 / 12 / 16` are the everyday values. Avoid arbitrary `13px`, `27px` spacing.
- **Stability.** App chrome (sidebar, app bar) must not shift when navigating between pages. Layout shell is fixed; only the work area changes.
- **Responsive.** Collapse multi-column grids to single column at small widths; keep rows readable by letting the name column flex and metric columns wrap.

---

## 7. (When the project has navigation) App shell / control strip

If the target has a sidebar/nav shell, treat it as a **physical control strip bolted to the workbench**, not generic chrome.

- Sidebar surface = workbench (`#eee9df` light / `#171512` dark), hard `1px` separators between zones: header, primary nav, telemetry readouts, secondary links, user controls.
- **Active nav state** is high-contrast and route-aware (ink fill + paper text on the active item), not a faint tint.
- Subnav points to **real routes**, not shared placeholders.
- Include **telemetry readout blocks** — compact instrument readouts (storage, ratio, engine state, bandwidth, worker health) rendered as label+value/meter, not decorative widgets.
- The main inset is the workbench surface with hard borders and stable spacing. **No floating, rounded, or shadowed inset.** It should feel docked and mechanical.
- Header controls inside the inset are compact action tools, not marketing nav.
- **Breadcrumbs are generated from the current route path** — never a hand-maintained per-page breadcrumb map.

(If the framework provides a sidebar primitive, theme it via tokens and wrapper classes; don't hand-edit its generated source.)

---

## 8. Landing / marketing / empty-state page rules

The public page is the one place allowed a little flourish — still disciplined:

- Lead immediately with the **product name**, its **purpose**, and the **primary action** (e.g. an install command in a terminal block, §5.10). No long marketing preamble.
- **Hero-scale type** is allowed here only (`text-5xl`→`7xl`), still mono, still normal tracking, weight 600.
- **Hard offset shadows** are permitted on landing panels only: `box-shadow: 10px 10px 0 #171512;` or a softer `8px 8px 0 rgba(23,21,18,0.18)`. No blur.
- A faint **grid-line background overlay** is permitted: two `1px` line gradients at `rgba(23,21,18,0.07)`, ~`52px` tiles, optionally with a single fade-to-body scrim at the bottom. This is the only tolerated gradient.
- Feature highlights are bordered tiles on a near-white paper surface (`#fffdf8`), not rounded marketing cards.
- Body copy stays concrete and implementation-minded. No fluff.

---

## 9. Typography & language

### 9.1 Type rules
- Mono everywhere, including headings. Variable weight; `600` for emphasis/headings, `400` body.
- Letter spacing always `normal`. **Never** negative tracking.
- Reserve large type for landing. Dashboard headings stay compact and practical.
- Tiny uppercase labels (`10–12px`, `opacity ~0.6`) for cell/metric labels.

### 9.2 Instrument label vocabulary
Prefer short, mechanical labels: `Down`, `Up`, `Ratio`, `ETA`, `Seeds`, `Peers`, `Status`, `Speed`, `Done`, `Queued`, `Disk`, `Active`, `Paused`. Action verbs for buttons: `Add link`, `Add magnet`, `Pause`, `Resume`, `Recheck`, `Copy`, `Install`, `Retry`.

### 9.3 Copy tone
Concrete, calm, implementation-minded. No "Supercharge your workflow!" marketing voice. **Never** put how-to-use-the-UI explanatory text inside the UI. If something is a placeholder, do not imply it is production-ready.

---

## 10. Anti-pattern checklist (reject on sight)

- [ ] Any non-zero border radius (rounded cards/buttons/pills/inputs/avatars).
- [ ] Soft/blurred box-shadows or elevation systems (outside allowed landing offset shadows).
- [ ] Decorative gradients, bokeh, color washes, glassmorphism, neon/glow.
- [ ] Soft purple/blue/indigo SaaS palettes or pastel tints.
- [ ] Decorative SVGs, blobs, ornamental illustrations.
- [ ] Cards nested inside cards; oversized rounded hero cards.
- [ ] One hue dominating the whole interface.
- [ ] Marketing hero or CTA styling inside the dashboard.
- [ ] How-to-use explanatory text baked into the UI.
- [ ] Negative letter-spacing; proportional sans where mono belongs.
- [ ] Hard-coded hex in components after the token layer exists.
- [ ] Hand-edited generated component-library source for cosmetic cleanup.
- [ ] Floating/rounded/shadowed app inset; nav active state that's a faint tint.
- [ ] Manual per-page breadcrumb maps.

---

## 11. Acceptance / verification checklist

Conversion is done when:

- [ ] All global color/font/radius flow from the §2 token layer (one source of truth); no stray hardcoded cosmetic hex remains.
- [ ] Both light and dark palettes are wired through the project's dark-mode mechanism.
- [ ] Radius is `0` app-wide; structure is expressed with `1px` borders, not shadows.
- [ ] Mono font (variable monospace) applies to body **and** headings; tracking is normal.
- [ ] Cards are gone — replaced by panels, dense grid-rows, tables, meters, pills, metric tiles. No nested cards.
- [ ] Lists/tables render as dense grid-rows with tiny uppercase labels + bold values.
- [ ] Progress/charts are flat signal-colored fills on neutral tracks/cells — no gradients/animation.
- [ ] Signal colors appear only where they carry meaning; no single hue dominates; no rainbow.
- [ ] (If applicable) The shell is a docked control strip with hard separators, route-aware high-contrast active states, telemetry readouts, route-generated breadcrumbs, and a stable mechanical inset.
- [ ] Landing (if any) leads with name + purpose + primary action; any flourish limited to hard offset shadows and a faint grid overlay.
- [ ] All anti-patterns in §10 are absent.
- [ ] Navigating between pages does not shift app chrome.

---

## 12. Decision tree for ambiguous cases

- *"This third-party component is rounded/shadowed and I can't fully retheme it."* → Theme via tokens first; then wrap with a square, hard-bordered container. If it still rounds, accept the minimal forced radius but neutralize shadow and bring its colors onto the palette. Never fork its source for looks.
- *"There's no obvious place for tokens."* → Create one global stylesheet / theme file imported at the root, put §3.1 there, and route everything through it.
- *"The design needs a color but none of the signals mean anything here."* → Use neutral surfaces (panel/workbench/border) and ink text. Absence of color is correct; do not add a hue for liveliness.
- *"Should this be a card?"* → No. It's a panel (§5.1). If it needs internal structure, use inner rows/tiles with fainter hairlines, not a nested card.
- *"The content is a marketing section."* → If it's the public landing, apply §8. If it's inside the dashboard, strip the marketing framing and present it as labeled equipment.
- *"Light vs dark default?"* → Match the project's existing default; ensure both palettes from §2 are present either way.

---

*Keep this file framework-agnostic. When you learn a cleaner universal mapping for a styling system, generalize it here rather than hard-coding a single stack.*
