# DESIGN.md — imatrofailo.github.io Design System

Єдине джерело дизайн-рішень. Читай перед будь-якими змінами до CSS або HTML.

---

## Color Tokens

```css
:root {
  /* Base */
  --ivory:  #FAF9F5;   /* page background */
  --paper:  #FFFFFF;   /* cards, sidebar, elevated surfaces */
  --slate:  #141413;   /* primary text, dark UI */
  --oat:    #E3DACC;   /* section dividers, borders */

  /* Accent */
  --clay:   #D97757;   /* primary brand accent (company category) */
  --clay-d: #B85C3E;   /* clay hover / dark variant */
  --clay-l: #FDF0EB;   /* clay background tint */

  /* Semantic */
  --olive:  #788C5D;   /* topic category */
  --olive-l:#EEF3E8;   /* olive background tint */
  --blue:   #4A7CC7;   /* product category */
  --blue-l: #EEF3FC;   /* blue background tint */

  /* Grays */
  --g100: #F0EEE6;    /* subtle backgrounds, code bg */
  --g200: #E6E3DA;    /* card borders light */
  --g300: #D1CFC5;    /* standard border */
  --g500: #87867F;    /* secondary text, labels */
  --g700: #3D3D3A;    /* dark secondary text */
}
```

## Category → Color Mapping

| Category | CSS var | Hex |
|----------|---------|-----|
| company  | `--clay`  | #D97757 |
| topic    | `--olive` | #788C5D |
| product  | `--blue`  | #4A7CC7 |

## Typography

```css
--serif: ui-serif, Georgia, "Times New Roman", serif;   /* headings, hero, numbers */
--sans:  system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;  /* body default */
--mono:  ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;  /* labels, dates, counts */
```

**Scale:**
- Hero h1: `clamp(44px, 6vw, 80px)`, weight 500, letter-spacing -0.02em
- Section heading: serif, 22px, weight 500
- Body: sans, 15–17px, line-height 1.55
- Label/meta: mono, 10–12px, color `var(--g500)`
- Post card: sans, 12.5px

---

## Component Patterns

### Bubble (canvas)
- Drawn with Canvas 2D API (no SVG, no D3)
- Radius ∝ sqrt(count), min 30px
- Fill: category color at 80–90% opacity; stroke: white 1.5px
- Label inside if radius > 38px; font mono 11-13px; color white
- Hover: scale 1.06 + show `#tooltip`

### Card (post-card)
```html
<a class="post-card" href="...">
  Post title text
  <div class="post-date">YYYY-MM-DD</div>
</a>
```
- bg `--g100`, border-left 2px `--g300`
- Hover: border-left `--clay`, bg `--clay-l`
- Border-radius 8px, padding 10px 12px

### Sidebar Panel
- Fixed right, width 400px (100% on mobile)
- Slides in: `right: 0` via `transition: right 0.28s cubic-bezier(0.4,0,0.2,1)`
- Sticky `.sidebar-head` with close button (×)
- Post list: flex column, max-height 65vh, overflow-y auto
- Scrollbar: 4px, `--g300` thumb

### Pill / Filter Button
```html
<button class="filter-btn active">Label</button>
```
- border-radius 999px, border 1.5px `--g300`
- Active: bg `--slate`, color white
- Hover: bg `--g100`

### Stat Block
```html
<div class="stat">
  <div class="stat-num">163</div>
  <div class="stat-label">постів</div>
</div>
```
- Font: serif for number, mono for label
- Border 1.5px `--g300`, border-radius 12px

### Nav Bar (nav.js)
- Fixed top, bg `--paper`, border-bottom 1.5px `--oat`
- Height 48px, max-width 1100px centered
- Active link: color `--clay`, underline 2px
- Zero dependencies — vanilla JS injection

### Category Tag (sidebar)
```html
<div class="sidebar-tag company">openai</div>
```
- Mono 10.5px, padding 2px 8px, border-radius 4px
- company → clay-l bg, clay-d text
- topic   → olive-l bg, #3D5A2A text
- product → blue-l bg, #1E40AF text

---

## Layout

- Max-width: **1100px**, centered with `margin: 0 auto`
- Horizontal padding: 52px desktop, 20px mobile (breakpoint 768px)
- Page background: `--ivory`
- Section dividers: `border: 1.5px solid var(--oat)` or `var(--g300)`

---

## Principles

1. **Zero dependencies** — vanilla JS only, no React, no D3, no npm
2. **Single-file pages** — each page (index.html, charts.html, tips.html) is self-contained except for `nav.js` and `data/*.json`
3. **Fetch from JSON** — never hardcode topic data in HTML; always `fetch('data/topics.json')`
4. **No build step** — files deploy as-is via `git push` → GitHub Pages
5. **Mobile-first breakpoint** — all layouts must work at 375px width
