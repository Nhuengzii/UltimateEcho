FROM node:lts-slim
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY src ./src
RUN npm install
RUN apt-get update
RUN apt-get install -y ffmpeg
RUN npm run build
CMD ["npm", "run", "start"]
