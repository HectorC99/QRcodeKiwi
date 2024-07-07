# Use Node.js LTS version as the base image
FROM node:20.11.1 as build

# Set the working directory inside the container
WORKDIR /webservices

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code
COPY . .

# Start server
RUN npm run start

# Expose port 4000 to the outside world
EXPOSE 4000

# Command to run the Express app
CMD ["node", "./dist/index.js"]
