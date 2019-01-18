FROM node:8.11.4

WORKDIR /app

ADD . .

RUN yarn install
RUN NODE_ENV=production npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]