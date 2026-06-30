#!/data/data/com.termux/files/usr/bin/bash
set -e

PASTA_PROJETO="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PASTA_PROJETO"

if [ ! -d ".git" ]; then
  echo "Erro: esta pasta ainda não é um repositório Git."
  echo "Clone seu repositório do GitHub ou rode: git init"
  exit 1
fi

MENSAGEM="${1:-Atualização Quintal Vivo GO $(date '+%Y-%m-%d %H:%M')}"

echo "== Publicação Quintal Vivo GO =="
git status --short

git add .

if git diff --cached --quiet; then
  echo "Nada novo para publicar."
  exit 0
fi

git commit -m "$MENSAGEM"
git push origin main

echo "Publicação enviada para o GitHub. A Netlify deve iniciar o deploy automaticamente."
