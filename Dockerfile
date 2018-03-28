# Node v8.9.0
FROM node:carbon

# app working directory
WORKDIR /usr/src/app

# ADD . /usr/src/app

# copy package.json and package-lock.json
COPY package*.json /usr/src/app/

# install app dependencies
RUN npm i

RUN npm i -g nodemon

# copy sourcecode
COPY . /usr/src/app

# run the app
CMD [ "nodemon", "start" ]