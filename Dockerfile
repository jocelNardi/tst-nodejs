FROM node:16-alpine

WORKDIR /app

COPY ./package.json .

RUN npm cache clean --force

RUN yarn install

COPY . .

EXPOSE 4000

RUN yarn build

CMD yarn start

