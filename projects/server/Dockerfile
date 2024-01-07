FROM node:20-slim AS base

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*


FROM base AS build

WORKDIR /app

COPY package.json tsconfig.json ./
COPY prisma prisma
COPY src src

RUN npm install
RUN npx prisma generate
RUN npm run build


FROM base AS node_modules

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev


FROM base

WORKDIR /app

COPY bin.js package.json ./
COPY --from=build /app/out out
COPY --from=node_modules /app/node_modules node_modules
COPY --from=build /app/node_modules/.prisma node_modules/.prisma
COPY --from=build /app/node_modules/@prisma/client node_modules/@prisma/client

ENV NODE_ENV=production

CMD ["npm", "start"]
