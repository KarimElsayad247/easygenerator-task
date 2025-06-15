# Easygenerator Technical Task Backend


## Notes

### What would I add if I had time?

- Database Authentication: authentication in mongodb is fairly complex, as attested
by the maintainers of the official mongodb docker container. [See Authentication section
here](https://hub.docker.com/_/mongo).



## Project setup

```bash
$ pnpm install

$ cp .env.development .env
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

Todo: Deploy to Hetzner VM
