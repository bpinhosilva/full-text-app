# Node v8.9.0
FROM node:carbon

# app working directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY package*.json ./

# install app dependencies
RUN npm i

# copy sourcecode
COPY . .

# run the app
CMD [ "npm", "start" ]