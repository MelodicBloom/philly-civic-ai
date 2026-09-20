#!/data/data/com.termux/files/usr/bin/bash
set -euo pipefail

REPO_URL="${REPO_URL:-https://github.com/MelodicBloom/philly-civic-ai.git}"
REPO_DIR="${REPO_DIR:-$HOME/philly-civic-ai}"
BRANCH="${BRANCH:-feat/agrarian-futures-claim-ledger-v0}"
INSTALL_BROWSER="${INSTALL_BROWSER:-0}"

log() {
  printf '\n[%s] %s\n' "$(date '+%H:%M:%S')" "$*"
}

log "Installing required Termux packages"
pkg update -y
pkg install -y nodejs-lts git curl

if [[ "$INSTALL_BROWSER" == "1" ]]; then
  log "Installing optional Chromium visual-validation dependencies"
  pkg install -y x11-repo
  pkg install -y chromium
fi

if [[ ! -d "$REPO_DIR/.git" ]]; then
  log "Cloning canonical repository"
  git clone "$REPO_URL" "$REPO_DIR"
fi

cd "$REPO_DIR"

log "Fetching remote state"
git fetch --prune origin

if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  git switch "$BRANCH"
else
  git switch --track -c "$BRANCH" "origin/$BRANCH"
fi

log "Fast-forwarding implementation branch"
git pull --ff-only origin "$BRANCH"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "ERROR: working tree is not clean. Resolve local changes before evidence review." >&2
  git status --short
  exit 2
fi

log "Checking Node/npm versions"
node --version
npm --version

node -e '
const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 12)) {
  console.error("ERROR: Node >=22.12.0 is required; found " + process.versions.node);
  process.exit(1);
}
'

log "Installing locked dependencies"
npm ci --no-audit --no-fund

log "Running ledger negative self-test"
node scripts/validate-claim-ledger.mjs --self-test

log "Running complete repository validation"
npm run validate

log "Environment ready"
printf 'repo=%s\nbranch=%s\nhead=%s\n' "$REPO_DIR" "$BRANCH" "$(git rev-parse HEAD)"

if [[ "$INSTALL_BROWSER" == "1" ]]; then
  printf 'Optional visual gate: npm run termux:validate\n'
else
  printf 'Chromium skipped. Re-run with INSTALL_BROWSER=1 only if UI/rendering changes require visual QA.\n'
fi
