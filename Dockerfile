FROM node:14

RUN mkdir -p /usr/src/cte-commander && chown -R node:node /usr/src/cte-commander

WORKDIR /usr/src/cte-commander

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE ${PORT}