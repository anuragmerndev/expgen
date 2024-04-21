FROM node:20-alpine

WORKDIR /usr/src/app

COPY package* .

RUN npm ci

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]