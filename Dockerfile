FROM node:20.15.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=1000

EXPOSE 1000

CMD ["npm", "run", "dev"]

# docker build -t vaga-bot .
# docker run -d -p 1000:1000 vaga-bot
