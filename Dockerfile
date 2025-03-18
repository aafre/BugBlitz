# Stage 1: Build the Vite app
FROM node:latest AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code into the container
COPY . .

# Build the app using Vite (outputs to "dist")
RUN npm run build

# Stage 2: Serve the built app with Nginx
FROM nginx:latest

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the build stage (now in the "dist" folder)
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
