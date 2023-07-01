# Getting started

## config

copy .env.example and rename .env (DO NOT DELETE OR RENAME .env.example JUST COPY AND RENAME)

## Run

### Prod

show container

```sh
$ sudo docker ps
```

run prod

```sh
$ sudo docker compose -f docker-compose.production.yml up --build -d --remove-orphans
```

Stop and remove the containers

```sh
$ sudo docker-compose down
```

docker compose down
or

```sh
$ docker restart <container_id>
```

### Localy

for both of app and cdn

```sh
$ npm install
```

cdn

```sh 
$ npm start
```

app

```sh
$ npm run dev
```

MongoDB

```sh
$ docker run mongodb
```

or you can run these only with docker:

```sh
$ docker compose -f docker-compose.development.yml up --build -d --remove-orphans
```

Stop and remove the containers

```sh
$ sudo docker-compose down
```

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
