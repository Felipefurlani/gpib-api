FROM node:current-alpine

ARG PORT=3000
ENV PORT $PORT

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

ARG DB_USER
ENV DB_USER $DB_USER

ARG DB_PORT=3306
ENV DB_PORT $DB_PORT

ARG DB_PASSWORD
ENV DB_PASSWORD $DB_PASSWORD

ARG DB_HOST 
ENV DB_HOST $DB_HOST

ARG DB_DATABASE
ENV DB_DATABASE $DB_DATABASE

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build app
RUN npm run build

EXPOSE $PORT

CMD [ "npm", "start" ]
