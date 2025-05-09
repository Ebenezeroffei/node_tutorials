FROM alpine/node:21

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "node","app.js" ]
