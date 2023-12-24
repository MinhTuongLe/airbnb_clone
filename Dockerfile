# user image contain Node.js and yarn
FROM node:18

# create app directory
WORKDIR /usr/src/app

# Copy all files to the workdir
COPY . /usr/src/app

# 
# install Yarn
# RUN npm install yarn

# run yarn build
RUN yarn

# Copy package.json and yarn.lock to the workdir
COPY package*.json yarn.lock ./

# Install dependencies by Yarn
RUN yarn install --ignore-engines

# Expose default port of Next.js
EXPOSE 3000

# Command to run when starting the container
CMD ["yarn", "dev"]