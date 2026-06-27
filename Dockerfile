# Stage 1: Сборка
FROM node:22-alpine3.21 AS build

WORKDIR /app

# Сначала копируем только файлы зависимостей для кэширования слоев
COPY package*.json ./
RUN npm ci

# Копируем исходники и собираем проект
COPY . .
RUN npm run build

# Stage 2: Раздача статики через Nginx
FROM nginx:alpine

# Копируем конфиг nginx
COPY --from=build /app/nginx /etc/nginx/

# Копируем билд React-приложения
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
