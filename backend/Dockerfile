# Development image for the E-commerce backend (Express + nodemon).
FROM node:22-alpine

WORKDIR /app

# Install dependencies first so this layer is cached unless package files change.
COPY package*.json ./
RUN npm ci

# Copy the source. In dev this is overlaid by a bind mount from docker-compose.
COPY . .

EXPOSE 8000

# -L (legacy/polling watch) is required for nodemon to detect changes
# through Docker bind mounts on macOS, where inotify events do not propagate.
CMD ["npx", "nodemon", "-L", "server.js"]
