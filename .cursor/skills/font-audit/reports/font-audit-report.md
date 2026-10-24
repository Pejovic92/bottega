# Font Audit Report

Generated: 2026-06-03 12:52:31 UTC

Project: Bottega

## Summary

| Tailwind class | Font family | Loaded in |
|----------------|-------------|-----------|
| `font-junge` | Junge | `src/globals.css` (Google Fonts) |
| `font-bree-serif` | Bree Serif | `src/globals.css` (Google Fonts) |
| `font-ledger` | Ledger | `src/globals.css` (Google Fonts — check import URL) |
| `font-neuton` | Neuton | `src/globals.css` (Google Fonts) |
| `font-serif` | System serif stack | Tailwind default |
| `font-bold`, `font-light`, etc. | Weight utilities | Tailwind (not separate families) |

## Font sizes over 80px

| Class | Size | Font family | File | Line context |
|-------|------|-------------|------|--------------|
| `text-86` | 86px | Bree Serif (`font-bree-serif`) | `src/components/Homepage/HomepageMain.jsx` | Headlines: Dizajn, Konsultacije, Izrada |
| `text-86` | 86px | (inherits / section default) | `src/components/About/AboutPageFourthSection.jsx` | 5 feature blocks (`custom-text-k`, `-f`, `-p`, `-ps`, `-kr`) |

**Total:** 8 usages of `text-86` (86px) — all above 80px. No other font-size classes exceed 80px (`text-72` is 72px).

## Font sizes (all custom + common)

| Class | Size | Used in |
|-------|------|---------|
| `text-86` | 86px | HomepageMain.jsx, AboutPageFourthSection.jsx |
| `text-72` | 72px | AboutPageThirdSection.jsx |
| `text-56` | 56px | AboutPageFirstSection.jsx |
| `text-44` | 44px | HomepageMain.jsx |
| `text-36` | 36px | FieldCard.jsx |
| `text-32` | 32px | AboutPageSecondSection.jsx |
| `text-24` | 24px | AboutPageThirdSection.jsx, HomepageCTA.jsx |
| `text-22` | 22px | AboutPageThirdSection.jsx |
| `text-18` / `text-[18px]` | 18px | AboutPageFirstSection.jsx, AboutPageThirdSection.jsx, Navbar.jsx |
| `text-16` | 16px | FieldCard.jsx |
| `text-[25px]` | 25px | HomepageAdditionalDescription.jsx |

## Tailwind fontFamily config

```
      fontFamily:{
```

## CSS font imports and declarations

```
src/globals.css:@import url('https://fonts.googleapis.com/css2?family=Junge:wght@400&display=swap');
src/globals.css:@import url('https://fonts.googleapis.com/css2?family=Bree Serif:wght@400&display=swap');
src/globals.css:@import url('href="https://fonts.googleapis.com/css2?family=Ledger:wght@400&display=swap"');
src/globals.css:@import url("https://fonts.googleapis.com/css2?family=Neuton:ital,wght@0,200;0,300;0,400;0,700;0,800;1,400&display=swap")
```

## Unique font-* classes in components

```
font-bold
font-bree-serif
font-extralight
font-junge
font-ledger
font-light
font-neuton
font-semibold
font-serif
```

## Usage by file (custom font families)

### `font-junge`

```
src/components/Navbar/Navbar.jsx
src/components/Process-description/FieldCard.jsx
src/components/About/AboutPageFourthSection.jsx
```

### `font-bree-serif`

```
src/components/Homepage/HomepageMain.jsx
src/components/Homepage/HomepageCTA.jsx
```

### `font-ledger`

```
src/components/Homepage/HomepageAdditionalDescription.jsx
src/components/About/AboutPageFirstSection.jsx
```

### `font-neuton`

```
src/components/Process-description/FieldCard.jsx
src/components/About/AboutPageThirdSection.jsx
src/components/About/AboutPageSecondSection.jsx
```

### `font-serif`

```
src/components/Process-description/FieldCard.jsx
```


## Inline fontFamily usage

```
(none)
```

## HTML font links

```
(none)
```

## Known issues

- Ledger `@import` in `src/globals.css` may be malformed (contains `href="..."` inside the URL).
- `globals.css` is imported with absolute paths in some components; prefer a single import in `main.jsx`.

