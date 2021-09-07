FROM node:16.8 AS build

WORKDIR /usr/enrique

COPY . .

RUN npm install

RUN npm run build

FROM node:16.8

WORKDIR /usr/enrique

COPY package.json package-lock.json ./

COPY --from=build /usr/enrique/dist ./src

CMD ["node", "./src/index.js"]