FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy built files
COPY --from=builder /app/out ./out

# Install serve for static hosting
RUN npm install -g serve

EXPOSE 3000

# Serve static files
CMD ["serve", "-s", "out", "-l", "3000"]
