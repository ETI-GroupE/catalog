# Catalog server

## How to setup (local development)

Clone the repository then install the NPM packages
```
npm install
```

Run program with src/app.ts as the entry point (can be changed under package.json). This will enable hot-reload on save.

```
npm run start
```

## How to setup (container)

Destroy any previous docker containers running and start up the container.

```
docker-compose down --volumes && docker-compose up -build -d
```
