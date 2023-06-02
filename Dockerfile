# Specify a base image
FROM node:18.6

# Set a working directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm install

# Bundle app source
COPY . .

# Bind the port that your app will run on
EXPOSE 3000

# Define the Docker command to run your app
CMD [ "npm", "run", "start" ]
