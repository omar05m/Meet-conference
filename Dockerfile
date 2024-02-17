FROM node:latest

WORKDIR C:\Users\SuperElectro\Desktop\Meet-conference

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

LABEL author="Omar Boumehraz"

CMD ["npx", "nodemon", "server.js"]
