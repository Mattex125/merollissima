#!/bin/sh
# Colours are design tokens: hex values may only appear in src/styles/global.css.
# Fails if source code anywhere else in src/ contains a hex colour literal.
set -eu

hits=$(grep -rnE '#[0-9a-fA-F]{3,8}\b' src \
  --include='*.astro' --include='*.ts' --include='*.tsx' \
  --include='*.js' --include='*.mjs' --include='*.css' |
  grep -v '^src/styles/global\.css:' || true)

if [ -n "$hits" ]; then
  echo "Hex colours found outside src/styles/global.css (use a design token instead):" >&2
  printf '%s\n' "$hits" >&2
  exit 1
fi
