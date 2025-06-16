FROM node:22-slim as builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and PNPM-lock.json to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install the application dependencies
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Override .env file
COPY .env.docker ./.env

RUN pnpm run build

FROM nginx:alpine

COPY ./dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
