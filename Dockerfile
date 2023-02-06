FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
WORKDIR ./dist

# Ignoreed when also specified in docker-compose.
ENV API_PORT=5000

EXPOSE 5000

CMD node app.js