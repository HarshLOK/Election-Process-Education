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
# We copy serve.json into dist so that the serve package uses the security headers
RUN cp serve.json dist/serve.json
CMD ["serve", "-s", "dist"]
