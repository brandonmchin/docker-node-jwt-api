FROM node:10.14.1

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY ./ ./

EXPOSE 5000

CMD ["npm", "start"]
