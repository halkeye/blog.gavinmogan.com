FROM node:20.16.0

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
