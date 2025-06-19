FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm install pg
EXPOSE 4000
CMD ["./start.sh"]
