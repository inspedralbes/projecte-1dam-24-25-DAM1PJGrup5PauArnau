FROM node:16-alpine@sha256:9b7c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run","dev"]