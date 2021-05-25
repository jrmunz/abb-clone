FROM node:latest

WORKDIR /app

COPY ./package.json .
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/server/package.json ./packages/server/

RUN yarn install

COPY ./packages/common/dist ./packages/common/dist
COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/server/.env.prod ./packages/server/.env
COPY ./ormconfig.json .

WORKDIR /app/packages/server

ENV NODE_ENV production

EXPOSE 4000

CMD ["yarn", "start"]