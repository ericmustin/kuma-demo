# docker build . -t kuma-demo-be-update:latest

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN apk add curl

CMD [ "npm", "start" ]