FROM node:20.12-alpine3.18 as builder
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . .
RUN npm run build

FROM node:20.12-alpine3.18
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist /app/dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
