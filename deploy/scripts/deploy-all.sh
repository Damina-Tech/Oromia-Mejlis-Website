#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BRANCH="${1:-main}"

bash "$SCRIPT_DIR/deploy-backend.sh" "$BRANCH"
bash "$SCRIPT_DIR/deploy-frontend.sh" "$BRANCH"

echo "Full website stack deployed."
