# n-downloader Style Philosophy

Use this note when extending the landing page, dashboard, or any future app surface. The product should stay visually consistent even if implementation details, components, or routing change.

## North Star

n-downloader is a practical homelab download manager with a public edge installer and a local control room. The visual language should feel like a precise technical object: tactile, gridded, compact, and slightly industrial.

Use Teenage Engineering products as a loose quality reference: exposed structure, crisp labels, restrained color, deliberate controls, and a sense that every visible element has a job. Do not copy a specific product UI. Apply the discipline.

## Palette

The app uses shadcn/ui with CSS variables enabled. Keep the semantic tokens in `src/styles.css` aligned to this palette so managed primitives use the same surfaces as the custom UI.

Primary surfaces:

- Warm instrument body: `#f7f4ef`
- Dashboard workbench: `#eee9df`
- Raised panel: `#f8f5ed`
- Track/fill neutral: `#d8cfbf`
- Ink: `#171512`
- Muted text: `#635d53`

Signal colors:

- Action red: `#ce3f21`
- Data yellow: `#efb84f`
- Torrent teal: `#5bb3a7`
- Warning clay: `#d95c3d`

Rules:

- Use color as a signal, not decoration.
- Never let one hue dominate the whole interface.
- Avoid glossy SaaS gradients, bokeh, glassmorphism, neon, soft purple/blue palettes, and decorative blobs.
- Prefer flat fills, hard borders, and functional contrast.

## Shape And Materials

- Use squared panels and hard-edged controls.
- Border radius should be `0` unless an existing primitive forces otherwise.
- Prefer `1px` borders over shadows. Use offset shadows sparingly on public landing elements only.
- Do not put cards inside cards. Use panels, rows, tables, meters, and segmented tool areas.
- Surfaces should feel like labeled equipment, not marketing cards.

## Layout

- Landing pages should immediately show `n-downloader`, the product purpose, and the install command.
- Dashboard pages should be dense, scannable, and operational.
- Use visible grid systems: columns, rows, meters, progress bars, status pills, and compact tables.
- Reserve hero-scale typography for the landing page.
- Dashboard headings should be compact and practical.
- Keep app chrome stable. Navigating between dummy pages should not shift the sidebar or app bar.

## Dashboard Shell

The sidebar and sidebar inset are part of the product design, not generic shadcn chrome.

- The sidebar should feel like a physical control strip attached to the workbench.
- Use hard separators between header, navigation, telemetry blocks, secondary links, and user controls.
- Sidebar active states should be high contrast and route-aware.
- Subnavigation should point to real dummy routes, not shared placeholder links.
- Sidebar telemetry blocks should be compact instrument readouts: storage, ratio, engine state, bandwidth, or worker health.
- The sidebar inset is the main workbench. It should use the dashboard workbench surface `#eee9df`, hard borders, and stable spacing.
- Avoid floating or rounded inset treatments. The shell should feel docked and mechanical.
- Header controls inside the inset should be compact action tools, not marketing navigation.
- Breadcrumbs must be generated from the current route path. Do not maintain a separate manual breadcrumb map for each dummy page.
- App-owned route files should live inside TanStack pathless route group directories such as `routes/(home)` and `routes/(app)` to keep the tree readable without changing URLs.
- App-owned components should be grouped by responsibility: `components/layout`, `components/navigation`, and `components/screens`.
- Do not reorganize or hand-edit `components/ui` for design cleanup; it is shadcn-managed. Theme it through semantic CSS variables and wrapper classes.

## Typography

- Use the existing JetBrains Mono variable font.
- Letter spacing stays normal. Do not use negative tracking.
- Labels should be short and instrument-like: `Down`, `Up`, `Ratio`, `ETA`, `Seeds`, `Peers`.
- Body copy should be concrete, calm, and implementation-minded.
- Avoid fluffy marketing language.

## Dashboard Product References

Take functional cues from JDownloader:

- Link grabber
- Host accounts
- Package grouping
- Archive extraction
- Retry and cooldown states
- Queue priority and scheduler

Take functional cues from qBittorrent:

- Torrents, seeds, peers, trackers
- Ratio, upload speed, download speed
- Categories and tags
- Recheck, pause, resume, and seeding states
- Global and per-job bandwidth limits

Blend these into one local control room. Downloads and torrents should share queue, bandwidth, storage, and history concepts.

## Interaction Guidelines

- Public edge deployments sell installation through a curl command.
- Sustained server deployments open directly into the dashboard.
- Buttons are for direct actions only: add link, add magnet, pause, recheck, copy, install.
- Use icons when they clarify mechanical actions.
- Dummy content should look plausible enough to guide later implementation.
- Never imply a feature is production-ready if it is just a placeholder.

## Anti-Patterns

- No generic starter dashboard placeholders.
- No oversized rounded cards.
- No nested cards.
- No marketing hero inside the dashboard.
- No explanatory text about how to use the UI inside the UI.
- No purely decorative gradients or ornamental SVGs.
- No soft corporate SaaS look.
