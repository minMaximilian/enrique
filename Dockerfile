FROM node:16.8

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN [ "node", "deploy-commands.ts" ]

CMD [ "node", "index.ts" ]
