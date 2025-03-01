FROM node:20.18.3

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
