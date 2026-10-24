---
name: font-sizes-suggestion
description: Analyzes WoodpeckerWebReact typography and suggests responsive font-size usage for phones, tablets, laptops, and large monitors. Use when implementing responsive text, refactoring Tailwind font sizes, or planning a mobile-first typography system.
---

# Responsive Font Size Guidelines — WoodpeckerWebReact

Guidelines for making typography work across **phones**, **tablets/laptops**, and **large monitors**, based on the current codebase audit (see `reports/font-audit-report.md`).

---

## 1. Current state (what you have today)

| Pattern | Problem on small screens |
|---------|---------------------------|
| Fixed custom sizes (`text-86`, `text-72`, …) | No `sm:` / `md:` / `lg:` variants — same px on a 375px phone as on a 27" monitor |
| Arbitrary sizes (`text-[18px]`, `text-[25px]`) | Hard to maintain; not part of a shared scale |
| Large headlines (`text-86` = 86px) | Overflow, broken layout with fixed `w-[900px]` containers |
| Mixed families per role | Bree Serif (hero), Neuton (about), Ledger (body blocks), Junge (nav) — OK, but sizes are not tied to **roles** |
| `index.css` pseudo-elements use `text-sm` | Fine on mobile; ensure parent blocks don’t assume desktop width |

**Largest sizes in use:** `text-86` (homepage + about features), `text-72` (about hero), `text-56` (about intro).

Typography cannot be fully responsive until **layout** also stops using fixed widths (`w-[900px]`, `ml-[430px]`, absolute positioning in `HomepageMain.jsx`). Plan font changes together with layout refactors.

---

## 2. Target breakpoints

Use Tailwind’s default breakpoints (already available; no config change required):

| Device | Breakpoint | Min width | Typical use |
|--------|------------|-----------|-------------|
| Phone (default) | *(none)* | 0–639px | Base sizes — smallest type |
| Large phone / small tablet | `sm:` | 640px | Slightly larger nav and subtitles |
| Tablet / small laptop | `md:` | 768px | Two-column about sections start breathing |
| Laptop | `lg:` | 1024px |接近 current “designed” desktop look |
| Desktop / monitor | `xl:` | 1280px | Full marketing scale (86px headlines) |
| Large monitor | `2xl:` | 1536px | Optional +1 step for display only |

**Rule:** Define the **default (no prefix)** for mobile first, then add `sm:`, `md:`, `lg:`, `xl:` for larger screens.

---

## 3. Recommended type scale (semantic roles)

Map design intent to **roles**, not raw pixel classes in JSX. Implement once in `tailwind.config.js` or `@layer components` in `index.css`.

### Proposed responsive scale (font size in px)

| Role | Mobile (default) | `sm` | `md` | `lg` | `xl` | Font family |
|------|------------------|------|------|------|------|-------------|
| **Display** (homepage hero words) | 36 | 44 | 56 | 72 | 86 | Bree Serif |
| **Display secondary** (tagline under hero) | 22 | 28 | 32 | 38 | 44 | Bree Serif |
| **H1** (about: “Segmentne izrade”) | 32 | 40 | 48 | 60 | 72 | Neuton bold |
| **H2** (section titles, card titles) | 24 | 26 | 28 | 32 | 36 | Neuton / Junge |
| **H3** (about column headings) | 18 | 20 | 22 | 24 | 24 | Neuton bold |
| **Lead** (intro under H1) | 16 | 18 | 18 | 20 | 22 | Neuton light |
| **Body** (paragraphs) | 16 | 16 | 17 | 18 | 18 | Ledger / Neuton light |
| **Body large** (homepage description block) | 16 | 18 | 20 | 22 | 25 | Ledger |
| **UI / nav** | 14 | 16 | 16 | 18 | 18 | Junge |
| **Caption** (pseudo-elements, labels) | 12 | 12 | 13 | 14 | 14 | Neuton / sans |
| **Button** | 14 | 14 | 16 | 16 | 16 | Junge or sans |

This keeps **one mental model**: Display > H1 > H2 > Body > Caption.

---

## 4. How to implement (pick one approach)

### Option A — Responsive utility classes in `index.css` (recommended)

Define semantic classes once; components stay readable.

```css
@layer components {
  .type-display {
    @apply font-bree-serif text-headlinesColor text-shadow-custom-medium;
    @apply text-36 sm:text-44 md:text-56 lg:text-72 xl:text-86;
  }
  .type-display-sub {
    @apply font-bree-serif text-headlinesColor text-shadow-custom-medium;
    @apply text-22 sm:text-28 md:text-32 lg:text-38 xl:text-44;
  }
  .type-h1 {
    @apply font-neuton font-bold;
    @apply text-32 sm:text-40 md:text-48 lg:text-60 xl:text-72;
  }
  .type-h2 {
    @apply font-neuton font-bold;
    @apply text-24 sm:text-26 md:text-28 lg:text-32 xl:text-36;
  }
  .type-h3 {
    @apply font-neuton font-bold;
    @apply text-18 sm:text-20 md:text-22 lg:text-24;
  }
  .type-lead {
    @apply font-neuton font-extralight;
    @apply text-16 sm:text-18 md:text-18 lg:text-20 xl:text-22;
  }
  .type-body {
    @apply font-neuton font-light text-justify text-gray-600;
    @apply text-16 md:text-17 lg:text-18;
  }
  .type-body-lg {
    @apply font-ledger text-center;
    @apply text-16 sm:text-18 md:text-20 lg:text-22 xl:text-25;
  }
  .type-nav {
    @apply font-junge;
    @apply text-14 sm:text-16 lg:text-18;
  }
  .type-caption {
    @apply text-sm md:text-14;
  }
}
```

**Note:** Add `text-17`, `text-25`, `text-38`, `text-60` to `tailwind.config.js` if missing, or use closest existing tokens (`text-18`, `text-24`, etc.).

### Option B — Inline responsive Tailwind (no new CSS file)

Example for homepage hero (replaces `text-86`):

```html
<span class="font-bree-serif text-headlinesColor text-shadow-custom-medium
  text-36 sm:text-44 md:text-56 lg:text-72 xl:text-86">
  Dizajn
</span>
```

Use when touching a file anyway; migrate to Option A when the same pattern repeats 3+ times.

### Option C — Fluid typography with `clamp()` (optional polish)

For display and H1 only, add one config entry per role:

```js
// tailwind.config.js — example
'display-fluid': ['clamp(2rem, 5vw + 1rem, 5.375rem)', { lineHeight: '1.15' }],
```

Use on large monitors for smoother scaling between `lg` and `xl`. Keep **min** readable on phones (≥ 32px for display words).

---

## 5. Where to apply — file-by-file

### `Navbar.jsx`

| Element | Today | Suggested |
|---------|-------|-----------|
| Nav links | `text-[18px] font-junge` | `type-nav` or `text-14 sm:text-16 lg:text-18 font-junge` |
| Layout | Fixed `pl-[64px]` / `pr-[64px]` | `px-4 sm:px-8 lg:px-16`; stack or hamburger below `md` |

### `HomepageMain.jsx`

| Element | Today | Suggested |
|---------|-------|-----------|
| “Dizajn”, “Konsultacije”, “Izrada” | `text-86` | `type-display` |
| Subline “ormara i drugog…” | `text-44` | `type-display-sub` |
| Container | `w-[900px] ml-16` | `w-full max-w-5xl mx-auto px-4 lg:px-8` — **required** for font scaling to matter |
| Decorative lines | Absolute px positions | Hide or simplify below `lg` (typography won’t fix overlap) |

### `HomepageCTA.jsx`

| Element | Today | Suggested |
|---------|-------|-----------|
| CTA copy | `text-24 font-bree-serif` | `type-h3` or `text-18 md:text-22 lg:text-24 font-bree-serif` |
| Card width | `w-[400px]` | `w-full max-w-sm md:max-w-md` |

### `HomepageAdditionalDescription.jsx`

| Element | Today | Suggested |
|---------|-------|-----------|
| Block text | `text-[25px] font-ledger` | `type-body-lg` on container; children inherit |
| Spans | Per-line borders | `text-16 md:text-20 lg:text-22` inside responsive padding |

### `AboutPageFirstSection.jsx`

| Element | Today | Suggested |
|---------|-------|-----------|
| Center headline | `text-56 font-ledger` | `text-28 sm:text-36 md:text-44 lg:text-56 font-ledger` |
| Column body | `text-18 font-ledger` | `type-body` |
| Columns | `w-[420px]` × 3 | `w-full md:w-1/2 lg:w-[420px]` — single column on phone |

### `AboutPageSecondSection.jsx`

| Element | Today | Suggested |
|---------|-------|-----------|
| Banner line | `text-32 font-neuton` | `text-20 sm:text-24 md:text-28 lg:text-32 font-neuton` |

### `AboutPageThirdSection.jsx`

| Element | Today | Suggested |
|---------|-------|-----------|
| Eyebrow | `text-22 font-neuton font-extralight` | `type-lead` |
| Main title | `text-72 font-neuton font-bold` | `type-h1` |
| Column titles | `text-24 font-neuton font-bold` | `type-h3` |
| Column body | `text-18 font-neuton font-light` | `type-body` |
| Layout | `flex-row` always | `flex-col md:flex-row` for columns |

### `AboutPageFourthSection.jsx`

| Element | Today | Suggested |
|---------|-------|-----------|
| Feature lines | `text-86 font-junge` | `type-display` or `text-32 sm:text-44 md:text-56 lg:text-72 xl:text-86 font-junge` |
| Container | `w-[700px]` | `w-full max-w-xl lg:max-w-2xl px-4` |
| `h-[90px]` on `<p>` | Fixed height | `min-h-[4rem] md:min-h-[5rem]` — let line-height grow with text |

### `FieldCard.jsx` (Process description)

| Element | Today | Suggested |
|---------|-------|-----------|
| Card title | `text-36` | `text-24 md:text-28 lg:text-36` |
| Body | default + `font-neuton` | `type-body` |
| Button | `text-16 font-junge` | `type-nav` or `text-14 md:text-16 font-junge` |
| Flip container | `w-[300px] h-[500px]` | `w-full max-w-[300px]` on small screens |

### `index.css` (custom-text-* pseudo captions)

| Element | Today | Suggested |
|---------|-------|-----------|
| `::after` captions | `text-sm` | `text-xs sm:text-sm` — keep caption smaller than body |

### `Rectangles.jsx` / animation labels

| Element | Today | Suggested |
|---------|-------|-----------|
| Label | `text-sm font-semibold` | Keep `text-xs sm:text-sm` — labels stay secondary |

---

## 6. Tailwind config additions (suggested)

Extend `fontSize` with **responsive-friendly** tokens and optional `lineHeight` pairs. Align names to roles:

```js
fontSize: {
  // existing '16'…'86' — keep for backward compatibility during migration
  'display-sm': ['2.25rem', { lineHeight: '1.2' }],   // 36px mobile display
  'display-lg': ['5.375rem', { lineHeight: '1.15' }], // 86px desktop display
  // … or rely on responsive prefixes only
},
```

Prefer **responsive prefixes** on existing `text-*` keys over adding many new keys.

---

## 7. Migration order (practical)

1. **Fix foundations:** import `globals.css` once in `main.jsx`; fix Ledger `@import`.
2. **Add semantic classes** (`type-display`, `type-h1`, …) in `index.css`.
3. **Navbar + CTA** — small, isolated, good first test on phone width.
4. **About sections** — mostly text; refactor columns to `flex-col` on mobile.
5. **HomepageMain** — last (depends on layout rewrite for decorations).
6. **Run `font-detection.md` audit** after each phase; update `font-audit-report.md`.

---

## 8. Acceptance checklist (responsive typography “done”)

- [ ] No text wider than viewport on 375px width (iPhone SE class)
- [ ] Display text ≥ 32px on mobile, scales up to ≤ 86px only at `xl:`
- [ ] Body text 16–18px on phone; 18px on laptop+
- [ ] Nav readable without horizontal scroll (≥ 14px tap targets)
- [ ] About H1 (`text-72` today) scales down to ~32px on phone
- [ ] No new arbitrary `text-[Npx]` without justification
- [ ] Pseudo-element captions stay ≤ body size at each breakpoint

---

## 9. Quick reference — replace this → with that

| Current class | Mobile-first replacement |
|---------------|-------------------------|
| `text-86` | `text-36 sm:text-44 md:text-56 lg:text-72 xl:text-86` or `type-display` |
| `text-72` | `text-32 sm:text-40 md:text-48 lg:text-60 xl:text-72` or `type-h1` |
| `text-56` | `text-28 sm:text-36 md:text-44 lg:text-56` |
| `text-44` | `text-22 sm:text-28 md:text-32 lg:text-38 xl:text-44` or `type-display-sub` |
| `text-36` | `text-24 md:text-28 lg:text-36` |
| `text-32` | `text-20 sm:text-24 md:text-28 lg:text-32` |
| `text-24` | `text-18 md:text-22 lg:text-24` |
| `text-22` | `text-16 sm:text-18 md:text-20 lg:text-22` |
| `text-18` / `text-[18px]` | `text-16 md:text-18` |
| `text-[25px]` | `text-16 sm:text-18 md:text-20 lg:text-22 xl:text-25` |
| `text-[18px]` (nav) | `text-14 sm:text-16 lg:text-18` |

---

## 10. How to use this document

**With the agent:** In Agent mode, prompt:

> Follow `font-sizes-suggestion.md` and apply `type-display` to HomepageMain headlines.

**With font audit:** Run `font-detection.md` before and after changes to verify sizes per breakpoint.

**Output:** Implementation PRs should reference this file; optional report path: `reports/font-responsive-plan.md` if you want a generated diff-specific plan later.
