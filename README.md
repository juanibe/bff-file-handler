## Node Version used: 18.12.1

## Npm version used: 8.19.2

## Technologies used

- NestJS (https://nestjs.com/)
- Express
- rate-limiter-flexible v^3.0.3
- Typescript

## Installation

```bash
$ npm install
```

## Environment file

A .env file should be placed at root level of the app. Example env file:

```
PORT=3000
AUTH_USER=admin
AUTH_PASS=admin
```

## Authorization

A "Basic token" should be set as Authorization header, Base64 encoded with the format `user:password`
To encode you can use this tool: https://www.base64encode.org/

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

```

## Developer notes

Since it is a small app, I placed the code in the same place. Ideally it should be diveded in "modules", each module with its concern.
