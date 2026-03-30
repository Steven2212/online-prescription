# Use Node base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose Railway port
EXPOSE 8080

# Start server (production)
CMD ["node", "server.js"]