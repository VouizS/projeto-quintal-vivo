#!/data/data/com.termux/files/usr/bin/bash
set -e

PASTA_PROJETO="$(cd "$(dirname "$0")/.." && pwd)"
NOME="quintal-vivo-backup-$(date '+%Y%m%d-%H%M%S').zip"
DESTINO="$PASTA_PROJETO/backups"

mkdir -p "$DESTINO"
cd "$PASTA_PROJETO"

zip -r "$DESTINO/$NOME" . \
  -x "*.git*" \
  -x "backups/*" \
  -x "node_modules/*"

echo "Backup criado em: $DESTINO/$NOME"
