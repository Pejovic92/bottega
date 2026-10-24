#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

REPORT_DIR=".cursor/skills/font-audit/reports"
OUTPUT="${1:-$REPORT_DIR/font-audit-report.md}"

mkdir -p "$(dirname "$OUTPUT")"

run_search() {
  local title="$1"
  shift
  echo ""
  echo "## $title"
  echo ""
  echo '```'
  "$@" 2>/dev/null || true
  echo '```'
}

{
  echo "# Font Audit Report"
  echo ""
  echo "Generated: $(date -u '+%Y-%m-%d %H:%M:%S UTC')"
  echo ""
  echo "Project: Bottega"
  echo ""

  echo "## Summary"
  echo ""
  echo "| Tailwind class | Font family | Loaded in |"
  echo "|----------------|-------------|-----------|"
  echo "| \`font-junge\` | Junge | \`src/globals.css\` (Google Fonts) |"
  echo "| \`font-bree-serif\` | Bree Serif | \`src/globals.css\` (Google Fonts) |"
  echo "| \`font-ledger\` | Ledger | \`src/globals.css\` (Google Fonts — check import URL) |"
  echo "| \`font-neuton\` | Neuton | \`src/globals.css\` (Google Fonts) |"
  echo "| \`font-serif\` | System serif stack | Tailwind default |"
  echo "| \`font-bold\`, \`font-light\`, etc. | Weight utilities | Tailwind (not separate families) |"
  echo ""

  run_search "Tailwind fontFamily config" bash -c '
    if command -v rg >/dev/null 2>&1; then
      rg "fontFamily" tailwind.config.js || echo "(none)"
    else
      grep "fontFamily" tailwind.config.js || echo "(none)"
    fi
  '

  run_search "CSS font imports and declarations" bash -c '
    if command -v rg >/dev/null 2>&1; then
      rg -i "@import|@font-face|font-family" src --glob "*.css" || echo "(none)"
    else
      grep -rEi "@import|@font-face|font-family" src --include="*.css" || echo "(none)"
    fi
  '

  run_search "Unique font-* classes in components" bash -c '
    if command -v rg >/dev/null 2>&1; then
      rg -o "font-[a-z0-9-]+" src --glob "*.{jsx,tsx,js,ts}" | sort -u || echo "(none)"
    else
      grep -rohE "font-[a-z0-9-]+" src --include="*.jsx" --include="*.tsx" --include="*.js" --include="*.ts" 2>/dev/null | sort -u || echo "(none)"
    fi
  '

  echo ""
  echo "## Usage by file (custom font families)"
  echo ""

  for class in font-junge font-bree-serif font-ledger font-neuton font-serif; do
    echo "### \`$class\`"
    echo ""
    echo '```'
    if command -v rg >/dev/null 2>&1; then
      rg -l "$class" src --glob "*.{jsx,tsx,js,ts}" 2>/dev/null || echo "(not used)"
    else
      grep -rl "$class" src --include="*.jsx" --include="*.tsx" --include="*.js" --include="*.ts" 2>/dev/null || echo "(not used)"
    fi
    echo '```'
    echo ""
  done

  run_search "Inline fontFamily usage" bash -c '
    if command -v rg >/dev/null 2>&1; then
      rg "fontFamily|font-family" src --glob "*.{jsx,tsx,js,ts,css}" || echo "(none)"
    else
      grep -rE "fontFamily|font-family" src --include="*.jsx" --include="*.tsx" --include="*.js" --include="*.ts" --include="*.css" || echo "(none)"
    fi
  '

  run_search "HTML font links" bash -c '
    if command -v rg >/dev/null 2>&1; then
      rg -i "font|googleapis" index.html || echo "(none)"
    else
      grep -iE "font|googleapis" index.html || echo "(none)"
    fi
  '

  echo ""
  echo "## Known issues"
  echo ""
  echo "- Ledger \`@import\` in \`src/globals.css\` may be malformed (contains \`href=\"...\"\` inside the URL)."
  echo "- \`globals.css\` is imported with absolute paths in some components; prefer a single import in \`main.jsx\`."
  echo ""
} > "$OUTPUT"

echo "Report written to: $OUTPUT"
