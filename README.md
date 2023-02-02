# Express server

Allows the UI to interface with the postgres database via REST. This repo uses docker-compose to build an express server and is dependent on the [database repo](https://github.com/icttimetable/nportal-excel-db).

## How to setup (local development)

Please ensure that the [database container](https://github.com/icttimetable/nportal-excel-db) has been set up. Also ensure that [NodeJS](https://nodejs.org/en/download/) has been installed.

Clone the repository then install the NPM packages
```
npm install
```

Run program with src/app.ts as the entry point (can be changed under package.json). This will enable hot-reload on save.

```
npm run start
```

## How to setup (container)

Please read the documentation in https://github.com/icttimetable/docs.

Testing commit (dongen)
