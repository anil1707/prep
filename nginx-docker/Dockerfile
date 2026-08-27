from node:22-alpine

WORKDIR /myapp

COPY package*.json ./

RUN npm ci

COPY . .

expose 5000

CMD ["npm", "start"]