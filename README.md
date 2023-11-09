## Node Version used: 18.12.1

## Npm version used: 8.19.2

## Technologies used

- NestJS (https://nestjs.com/)
- Express
- rate-limiter-flexible v^3.0.3
- Typescript

## Installation

Clone the repository

```bash
$ git clone <repository-url>
```

Install the necessary packages

```bash
$ npm install
```

Run the code

```bash
$ npm run start:dev
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

- A CI/CD template for Github actions was created as an example, even though no server was configured to deploy the application

- Ideally the app should be diveded in "modules", each module with its concern, but since it is a small app I decided to keep the code within the src folder.
