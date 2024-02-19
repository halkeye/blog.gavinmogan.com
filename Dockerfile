FROM node:18.19.1

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
