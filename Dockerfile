FROM node:21.4.0-alpine

ENV FORCE_COLOR=1

RUN npm install -g @angular/cli@16.2.0
RUN apk --update add --no-cache bash chromium firefox

ENV CHROME_BIN=/usr/bin/chromium-browser

WORKDIR /home/node/wshopping
COPY . .
