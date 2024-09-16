# Use the official Node.js slim image
FROM node:slim

# Set the working directory inside the container
WORKDIR /express

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 9090

# Command to run the application
CMD ["node", "express.cjs"]