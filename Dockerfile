FROM node:23-alpine3.20
LABEL authors="josleke"

WORKDIR /app

COPY ./build /app/build

RUN npm install -g serve

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "build"]