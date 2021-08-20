FROM node:12.20.1-alpine3.10

LABEL maintainer="LOM"

WORKDIR /var/opt/paketa
COPY . .

RUN npm i
RUN npm run build

EXPOSE 8000

CMD npm run start