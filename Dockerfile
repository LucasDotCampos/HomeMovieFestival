FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm i

EXPOSE 5555
