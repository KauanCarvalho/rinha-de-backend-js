FROM node:20.8.0-alpine

COPY . .
RUN npm ci

RUN npm install pm2 -g

CMD ["pm2-runtime", "ecosystem.config.json", "--no-daemon"]
