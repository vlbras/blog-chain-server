
## Installation

```bash
$ pnpm install
```

## Database setup

```bash
# set up .env
$ cp .env.example .env

# run db
$ docker-compose up -d

# run seed
$ pnpm seed:run
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Documentation
```bash
# default value for PORT is 3000
$ http://localhost:3000/api/
```
## Modules integration
```bash
# common packages 
$ pnpm i @nestjs/cqrs @nestjs/swagger class-transformer class-validator

# config packages
$ pnpm i @unifig/adapter-env @unifig/core @unifig/nest

# auth packages
$ pnpm i @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs
$ pnpm i -D @types/bcryptjs @types/passport-jwt

# mongo packages
$ pnpm i @nestjs/mongoose mongoose nestjs-object-id
```

