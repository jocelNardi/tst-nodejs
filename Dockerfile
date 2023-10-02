FROM node:16-alpine

WORKDIR /app

COPY ./package.json .

RUN npm cache clean --force

RUN yarn install

COPY . .

EXPOSE 4000

RUN npx prisma generate

CMD yarn prisma:migrate && yarn prisma:seed && yarn start

