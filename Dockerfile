FROM node:19 AS base

WORKDIR /home/code/

RUN adduser node sudo

EXPOSE 8000

CMD [ "bash" ]
