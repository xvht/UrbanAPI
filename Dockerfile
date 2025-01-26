FROM node:20

WORKDIR /app

COPY package.json bun.lock ./

RUN npm install -g bun

RUN bun install

COPY . .

EXPOSE 8080

CMD ["bun", "start"]
