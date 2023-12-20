# Use an official Node runtime as a parent image
FROM node:18.13

WORKDIR /korokoro_front_end

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .
COPY .env.local .env.local

RUN npm run build

EXPOSE 3000

CMD ["tail", "-f", "/dev/null"]
