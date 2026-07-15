FROM node:20-alpine AS build
LABEL authors="josleke"

WORKDIR /app

ARG GENERATE_SOURCEMAP=false
ARG VITE_APPLICATION_ID
ARG VITE_BASE_URL
ARG VITE_VALIDATE_URL

ENV GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP
ENV VITE_APPLICATION_ID=$VITE_APPLICATION_ID
ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_VALIDATE_URL=$VITE_VALIDATE_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
LABEL authors="josleke"

WORKDIR /app

COPY --from=build /app/build /app/build

RUN npm install -g serve

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "build"]
