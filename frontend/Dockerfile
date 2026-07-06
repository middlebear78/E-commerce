# Development image for the E-commerce frontend (Create React App dev server).
FROM node:22-alpine

WORKDIR /app

# Install dependencies first so this layer is cached unless package files change.
COPY package*.json ./
RUN npm ci

# Copy the source. In dev this is overlaid by a bind mount from docker-compose.
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
