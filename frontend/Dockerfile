FROM node:20-alpine AS base

WORKDIR /app
ENV NEXT_DIST_DIR=.next-docker

COPY package*.json /app/
RUN npm install

COPY . /app/

EXPOSE 3000

FROM base AS dev

CMD ["npm", "run", "dev"]
  
FROM base AS builder

ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ARG STRIPE_PUBLISHABLE_KEY
ENV STRIPE_PUBLISHABLE_KEY=${STRIPE_PUBLISHABLE_KEY}

RUN npm run build

FROM node:20-alpine AS prod

WORKDIR /app
ENV NEXT_DIST_DIR=.next-docker

COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/.next-docker /app/.next-docker
COPY --from=builder /app/public /app/public
COPY --from=builder /app/next.config.ts /app/next.config.ts

EXPOSE 3000

CMD ["npm", "run", "start", "--", "-H", "0.0.0.0", "-p", "3000"]