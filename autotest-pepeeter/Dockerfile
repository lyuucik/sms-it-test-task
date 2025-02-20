FROM node:23-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY wildberries.js .

EXPOSE 8080

ENTRYPOINT ["node", "wildberries.js"]
