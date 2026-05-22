FROM node:20.20.2

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
