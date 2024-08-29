FROM node:21.7.1


WORKDIR /usr/src/smart-brain-api

COPY ./ ./

RUN npm install


# CMD [ "node", "server.js" ]
CMD ["/bin/bash"]

