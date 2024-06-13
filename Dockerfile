FROM node:21.7.1

WORKDIR /use/src/app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm","start" ]