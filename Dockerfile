FROM node:21.4.0-alpine

ENV FORCE_COLOR=1

RUN apk --update add --no-cache bash chromium firefox

ENV CHROME_BIN=/usr/bin/chromium-browser

WORKDIR /home/node/dev/wshopping
COPY . .

RUN npm install --silent && mv node_modules ../
