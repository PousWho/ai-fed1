FROM node:18.20.3
WORKDIR /app
COPY package.json package.json
RUN npm i
COPY . .
