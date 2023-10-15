FROM node:16
ARG env=".env"
WORKDIR /api/pecs

COPY package* ./

RUN npm install

COPY . .

COPY ${env} .env
RUN npx prisma generate 

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/src/main.js" ]