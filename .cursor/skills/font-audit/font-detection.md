---
name: font-audit
description: Detects and lists all fonts used in the WoodpeckerWebReact project. Scans CSS imports, Tailwind config, component class names, and inline styles. Writes results to a markdown report file. Use when the user asks about fonts, typography audit, or font inventory.
---

# Font Audit Agent

## Goal

Produce a complete inventory of every font family used in this React + Vite + Tailwind project and **save it to a file** (do not rely on console-only output).

## Report file (required output)

**Default path:** `.cursor/skills/font-audit/reports/font-audit-report.md`

After running the audit:

1. Run the helper script (creates/overwrites the report file).2
3. Read the report file, enrich it if needed (summary table, issues, file mappings).
3. **Write the final report back to the same file** (or tell the user the exact path).
4. In chat, only give a short summary and the **file path** — not the full report in the console.

Optional custom path:

```bash
bash .cursor/skills/font-audit/scripts/list-fonts.sh path/to/custom-report.md
```

## Search scope

Search only project source — exclude `node_modules`, `dist`, and build output.

### 1. CSS / global styles

- `src/**/*.css` — `@import`, `@font-face`, `font-family`
- Pay special attention to `src/globals.css`

### 2. Tailwind config

- `tailwind.config.js` — `theme.extend.fontFamily` and any `fontFamily` overrides

### 3. Components

- `src/**/*.{jsx,tsx,js,ts}` — Tailwind classes:
  - Custom: `font-junge`, `font-bree-serif`, `font-ledger`, `font-neuton`
  - Built-in: `font-serif`, `font-sans`, `font-mono`, `font-bold`, etc.
- Inline: `fontFamily`, `style={{ ... }}`

### 4. HTML entry

- `index.html` — `<link>` tags for fonts

## Commands to run

Always start with:

```bash
bash .cursor/skills/font-audit/scripts/list-fonts.sh
```

Then open `.cursor/skills/font-audit/reports/font-audit-report.md` and update it with any missing analysis.

Manual searches (if needed) — append findings into the report file, not only chat:

```bash
rg "fontFamily" tailwind.config.js
rg -i "@import|@font-face|font-family" src --glob "*.css"
rg -o "font-[a-z0-9-]+" src --glob "*.{jsx,tsx,js,ts}" | sort -u
rg "fontFamily|font-family" src --glob "*.{jsx,tsx,js,ts,css}"
```

## Report file format

The markdown file must include:

### Summary table

| Font family | Source (Google / system / Tailwind default) | How loaded | Used via (classes/files) |
|-------------|---------------------------------------------|------------|---------------------------|

### Details

- **Configured in Tailwind** — list from `tailwind.config.js`
- **Loaded via CSS** — list `@import` / `@font-face` with file paths
- **Used in components** — map each `font-*` class to files that use it
- **System / fallback fonts** — e.g. `font-serif`, Tailwind sans default
- **Issues** — broken imports, fonts in config but never used, classes used but not loaded

## Rules

- **Always write results to the report file** at `.cursor/skills/font-audit/reports/font-audit-report.md`.
- Do not paste the full report into chat; point the user to the file path.
- Do not modify source files unless the user explicitly asks to fix issues.
- Distinguish **font family** (Junge, Neuton) from **font weight** (`font-bold`, `font-light`).
- Map Tailwind aliases to real names (e.g. `font-bree-serif` → Bree Serif).
