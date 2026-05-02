FROM node:20-alpine
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the Vite application
RUN npm run build

# Install a simple static file server
RUN npm install -g serve

# Serve the 'dist' directory on the port provided by Google Cloud Run
CMD ["serve", "-s", "dist"]
