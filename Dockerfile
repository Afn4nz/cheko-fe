FROM node:20-alpine AS build
WORKDIR /app

COPY package.json ./
COPY package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; \
  else npm i; fi

COPY . .

RUN npx --yes expo --version && npx expo export -p web

FROM node:20-alpine
WORKDIR /app
RUN npm i -g serve
COPY --from=build /app/dist ./dist
EXPOSE 8081
CMD ["serve", "-s", "dist", "-l", "8081"]
