#!/data/data/com.termux/files/usr/bin/bash
set -e

echo "== Quintal Vivo GO | Instalador Termux =="
pkg update -y
pkg upgrade -y
pkg install -y git nano zip unzip python
termux-setup-storage || true
chmod +x scripts/*.sh

echo "Instalação concluída."
echo "Para testar localmente: ./scripts/servidor-local.sh"
echo "Para publicar: ./scripts/publicar.sh \"mensagem do commit\""
