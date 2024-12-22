FROM node:22.12.0-alpine3.21 AS deps
WORKDIR /srv
COPY . .
RUN npm ci
RUN npm run build

FROM nginx
ENV RESOLVER 1.1.1.1
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/includes /etc/nginx/includes/
COPY --from=deps /srv/dist /var/www/html
