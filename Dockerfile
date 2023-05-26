FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

CMD sleep 10 && npm run typeorm migration:run -- -d src/shared/typeorm/connection

EXPOSE 3000