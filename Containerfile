FROM node:18-alpine as build-stage
WORKDIR /app
COPY .yarn/ ./.yarn/
COPY .yarnrc.yml package.json yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.23-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
