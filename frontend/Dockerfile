


# hotelbooking/frontend/Dockerfile

# Use an official Node.js image as the base
FROM node:22-alpine3.20

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Build the frontend
RUN npm run build

# Expose the necessary port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]




