FROM node:latest

WORKDIR /app

COPY package*.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# RUN pnpm run migrate-mongo:down

# Inject initial data to the DB
# RUN pnpm run migrate-mongo:up

EXPOSE 3000

CMD ["node", "dist/app.js"]