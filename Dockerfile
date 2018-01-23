FROM node:6

EXPOSE 8080

COPY . .

RUN npm install

CMD ["npm", "start"]
