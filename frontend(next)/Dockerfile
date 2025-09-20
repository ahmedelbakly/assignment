# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install react-toastify
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

