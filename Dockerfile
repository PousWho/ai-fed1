FROM node:20.11.1
WORKDIR /app
COPY package.json package.json
RUN npm i
COPY . .
