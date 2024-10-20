# Use an official Node.js runtime as a parent image
FROM node:20.18.0 AS builder

RUN useradd -m web && chown -R web:web /app

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

FROM node:20.18.0

# Set the working directory in the container to /app
WORKDIR /app

COPY --from=builder /app .

USER web

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NODE_ENV=production

# Run app.js when the container launches
CMD ["node", "server.js"]
