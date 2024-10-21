# Use an official Node.js runtime as a parent image
FROM node:20.18.0 AS builder

# Create the /app directory and a non-root user, then set permissions
RUN useradd -m web

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application files
COPY . .

# Use a new stage to run the application
FROM node:20.18.0

# Create the same user in the final stage
RUN useradd -m web

# Set the working directory in the container to /app
WORKDIR /app

# Copy files from the builder stage
COPY --from=builder /app .

# Change to non-root user
USER web

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variables
ENV NODE_ENV=production
ENV MAP_API_KEY=""

# Run server.js when the container launches
CMD ["node", "server.js"]
