# ariciachan.com

Astro rebuild of the Framer portfolio (Home, Play and About pages so far).

## Run it

```sh
rm -rf node_modules && npm install   # first time only (see note below)
npm run dev                           # http://localhost:4321
npm run build                         # static site in dist/
```

The `node_modules` folder in here was installed from a Linux sandbox, so reinstall it once on your Mac.

## Where things live

| What | Where |
| --- | --- |
| Colors, fonts, shared type styles | `src/styles/global.css` |
| Nav / footer / custom cursor | `src/components/Nav.astro`, `Footer.astro`, `Cursor.astro` |
| Desk illustration + hover effects | `src/components/Hero.astro` (positions are copied from the live site: `d` = desktop on a 1200px canvas, `m` = phone on a 390px canvas) |
| Project cards and Design Tidbits copy | `src/data/projects.ts` |
| Popups (desk items, Kirple) | `src/components/HomeOverlays.astro` |
| Play galleries (layout data) | `src/data/galleries.json`, rendered by `GalleryOverlay.astro` |
| Overlays, dragging, tea, scroll reveals | `src/scripts/site.ts` |
| Pages | `src/pages/` |
| Images (renamed from Framer) | `public/images/` |

Breakpoints match Framer: desktop ≥ 1200px, tablet 810–1199px, phone < 810px.

## Interactions

Ported from the Framer site: click-to-open popups (instant, close on backdrop click or Esc), draggable cat (springs back) and photo strips (stay put), press-and-hold tea, polaroid press on About, scroll reveals, and a custom cursor that becomes a flower over the vase and an ↗ arrow over links.

## Case studies

All six case studies live at `/<slug>` and are generated from `src/data/case-studies/<slug>.json` (a snapshot of the Framer layout) by `src/pages/[slug].astro`, `src/layouts/CaseStudy.astro` and the recursive renderer `src/components/CsNode.astro`. Edit text directly in those JSON files. Media is in `public/images/cs/` and `public/media/cs/`.

`/duolingo` is behind a light passcode gate (like Framer's, it keeps casual visitors out but isn't secure). Set the passcode with:

```bash
npm run set-passcode -- duolingo <your-passcode>
```

Until you do, the page can't be unlocked.

## Reference material

`_ref/` holds the original Framer image downloads and build snapshots used during the migration. It's git-ignored and can be deleted.

## Deploy

Any static host works (Vercel, Netlify, Cloudflare Pages, GitHub Pages). Build command `npm run build`, output `dist/`.
