FROM --plateform=linux/amd64 node:22

EXPOSE 9000
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENTRYPOINT node index.js