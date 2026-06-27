#!/bin/sh
# Деплой на сервер: копирует изменения и пересобирает nginx-контейнер.
# Использует SSH-ключ ~/.ssh/id_ed25519 (пароль не нужен).
set -eu

SERVER="root@futurespb.ru"
REMOTE_DIR="/root/Future"

echo "1/3 Копируем изменённые файлы на сервер..."
rsync -az --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='.env' \
  --exclude='*.local' \
  /Users/dmitrylymar/Desktop/future-studio/ \
  "$SERVER:$REMOTE_DIR/front/"

echo "2/3 Пересобираем и перезапускаем контейнер..."
ssh "$SERVER" "
  cd $REMOTE_DIR &&
  docker rm -f nginx_server 2>/dev/null || true &&
  docker-compose build nginx &&
  docker-compose up -d nginx
"

echo "3/3 Готово! Сайт обновлён на futurespb.ru"
