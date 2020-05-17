FROM node:alpine

RUN mkdir /home/node/app
WORKDIR /home/node/app
COPY . /home/node/app
RUN ls -a
RUN chmod -R 777 /home/node/app
RUN npm install

EXPOSE 4200
