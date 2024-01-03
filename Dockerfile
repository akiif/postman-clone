# -------- Builder -------- #
FROM node:20-alpine as builder

LABEL maintainer="Akif Mohammed akiif.dev@gmail.com"

WORKDIR /app

COPY . .

# Disable nextjs telemetry
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Install app dependencies
RUN npm run install_deps
# Build the production version 
RUN npm run build


# -------- Runner -------- #
FROM node:20-alpine as runner

WORKDIR /app

# Copy the standalone output as well as the public and static items
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.env.local ./.env

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV PORT 6686
ENV HOSTNAME "localhost"

EXPOSE 6686

CMD ["node", "server.js"]
