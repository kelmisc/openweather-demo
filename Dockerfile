FROM node:14-alpine 

WORKDIR /app

COPY . .

CMD [ "node", "server.js"]