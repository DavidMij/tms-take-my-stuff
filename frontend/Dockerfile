FROM node:17.9.1
WORKDIR /app

RUN npm install -g pnpm serve
COPY package.json package-lock.json ./
RUN pnpm install

COPY . .
RUN pnpm run build

ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "/app/dist" ]
