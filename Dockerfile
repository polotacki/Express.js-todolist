FROM node:12

WORKDIR /app

ENV NODE_ENV=production

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

RUN npm install pm2 -g

EXPOSE 3000

CMD [ "pm2-runtime", "index.js" ]

