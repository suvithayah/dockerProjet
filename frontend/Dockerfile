FROM node:14-alpine as build

COPY . /app

WORKDIR /app

RUN yarn && yarn build

FROM nginx:1.21-alpine

COPY --from=build ./app/build /usr/share/nginx/html

EXPOSE 80