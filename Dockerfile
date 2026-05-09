FROM node:20

# Thư mục làm việc trong container
WORKDIR /app

# Copy package trước để optimize cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Expose port backend
EXPOSE 5000

# Start server
CMD ["npm", "start"]