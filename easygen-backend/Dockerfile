FROM node:22-slim as base

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

RUN pnpm run build

# Override .env file
COPY .env.docker ./.env

EXPOSE 3000

CMD ["node", "dist/main"]
