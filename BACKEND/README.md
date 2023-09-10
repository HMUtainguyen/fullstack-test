## NestJS Starter Kit

This starter kit has the following outline:

- Monolithic Project.
- REST API

This is a Github Template Repository, so it can be easily [used as a starter template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) for other repositories.

## Starter kit Features

One of our main principals has been to keep the starter kit as lightweight as possible. With that in mind, here are some of the features that we have added in this starter kit.

| Feature            | Info               | Progress |
| ------------------ | ------------------ | -------- |
| Authentication     | JWT                | Done     |
| Authorization      | RBAC (Role based)  | Done     |
| ORM Integration    | TypeORM            | Done     |
| DB Migrations      | TypeORM            | Done     |
| Logging            | winston            | Done     |
| Request Validation | class-validator    | Done     |
| Pagination         | SQL offset & limit | Done     |
| Docker Ready       | Dockerfile         | Done     |

## Docs

- [Project Structure](./docs/project-structure.md)
- [Middleware](./docs/middleware.md)
- [Access Control List (ACL)](./docs/acl.md)
- [Contribution guide](./CONTRIBUTING.md)

## Installation

Note: when using docker, all the `npm` commands can also be performed using `./scripts/npm` (for example `./scripts/npm install`).
This script allows you to run the same commands inside the same environment and versions than the service, without relying on what is installed on the host.

```bash
$ npm install
```

Create a `.env` file from the template `.env.template` file.

Generate public and private key pair for jwt authentication:

### With docker

Run this command:

```bash
./scripts/generate-jwt-keys
```

It will output something like this. You only need to add it to your `.env` file.

````

Must enter the base64 of the key files in `.env`:

```bash
JWT_PUBLIC_KEY_BASE64=
````

## Running the app

We can run the project with or without docker.

### Local

To run the server without Docker we need this pre-requisite:

- MySQL server running

Commands:

```bash
# run migration in window( create products schema first)
$ npm run typeorm:win migration:run

# development maybe need restart BE in first time run
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Docker

```bash
# build image
$ docker build -t my-app .

# run container from image
$ docker run -p 3000:3000 --volume 'pwd':/usr/src/app --network --env-file .env my-app

# run using docker compose: database
$ docker compose -f system.docker-compose.yml up -d
# run using docker compose: app
$ docker compose up -d
```

Apple M1 users please append `MYSQL_PLATFORM=linux/amd64` to your `.env` file. This is a workaround as MySQL docker images still doesn't support arm64 operating systems.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migrations

```bash
# install
$ npm install -g ts-node

# generate migration (replace CreateUsers with name of the migration)
$ npm run migration:generate -- -n CreateUsers

# run migration
$ npm run typeorm migration:run

# revert migration
$ npm run migration:revert
```

## External Links

<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo.svg" width="150" alt="Nest Logo" /></a>
