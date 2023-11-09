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

## API DOCS:

- GET /health

  Returns information about CPU pressure and available
  memory

  Headers:
  Authorization Basic

- POST /upload

  Uploads a csv file with up to 50 MB

  Headers:
  Authorization Basic

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

Ideally the app should be diveded in "modules", each module with its concern, but since it is a small app I decided to keep the code within the src folder.
