#!/bin/sh
# Refuse Minecraft world and server data.
#
# Reads file paths on stdin (one per line) and exits 1 if any of them looks
# like world data (level.dat holds the seed, region files hold the world) or
# server data (player names, UUIDs, IPs). Archives are refused too: world
# backups are usually .zip files. Used by the pre-commit hook and CI, with -z
# so that git does not quote paths containing non-ASCII characters:
#   git diff --cached --name-only -z | tr '\0' '\n' | sh scripts/guard-world-data.sh
#   git ls-files -z | tr '\0' '\n' | sh scripts/guard-world-data.sh
set -eu

pattern='(^|/)(level\.dat(_old|_new)?|session\.lock|uid\.dat|usercache\.json|usernamecache\.json|ops\.json|whitelist\.json|banned-(players|ips)\.json|server\.properties)$'
pattern="$pattern"'|\.(mca|mcr|mcc|mcworld)$'
pattern="$pattern"'|\.(zip|7z|rar|tar|tgz|gz|bz2|xz|zst)$'
pattern="$pattern"'|^(world[^/]*|saves|backups)/'
pattern="$pattern"'|(^|/)(playerdata|DIM-?1)/'
pattern="$pattern"'|(^|/)[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(dat|dat_old|json)$'

hits=$(grep -E "$pattern" || true)
if [ -n "$hits" ]; then
  echo "Refusing: Minecraft world/server data detected:" >&2
  printf '%s\n' "$hits" | sed 's/^/  /' >&2
  echo "World files must never be committed. Keep them outside the repo or in world/." >&2
  exit 1
fi
