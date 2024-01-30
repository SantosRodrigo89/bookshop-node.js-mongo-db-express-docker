FROM node:21.6
WORKDIR /app-node
COPY . .
RUN npm install 
ENTRYPOINT npm start 