FROM node:20
ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

CMD ["yarn", "dev"]
