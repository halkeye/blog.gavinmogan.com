FROM node:20.19.6

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
