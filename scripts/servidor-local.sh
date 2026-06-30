#!/data/data/com.termux/files/usr/bin/bash
set -e

PORTA="${1:-8080}"
PASTA_PROJETO="$(cd "$(dirname "$0")/.." && pwd)"

cd "$PASTA_PROJETO"
echo "== Servidor local Quintal Vivo GO =="
echo "Projeto: $PASTA_PROJETO"
echo "Abra no navegador: http://127.0.0.1:$PORTA"
echo "Para parar: CTRL + C"
python -m http.server "$PORTA"
