# nodejs-express-postgres-boilerplate
The **nodejs-express-postgres-boilerplate** is a boilerplate template for application using nodejs, express and postgresql

## Table of Contents
* [Getting Started](https://github.com/arisculala/nodejs-express-postgres-boilerplate#getting-started)
     - [Prerequisites](https://github.com/arisculala/nodejs-express-postgres-boilerplate#prerequisites)
     - [Setup PostgreSQL Locally](https://github.com/arisculala/nodejs-express-postgres-boilerplate#setup-postgresql-locally)
     - [Installation](https://github.com/arisculala/nodejs-express-postgres-boilerplate#installation)
     - [Postman](https://github.com/arisculala/nodejs-express-postgres-boilerplate#postman)

[References](https://github.com/arisculala/nodejs-express-postgres-boilerplate#references)
 

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
* Node.js
* npm or yarn
* PostgreSQL

### Setup PostgreSQL Locally
First, you need to set and run the PostgreSQL instance locally
1. You can setup postgresql and run locally or
2. You can setup using the provided `npm run start-pg` command in the project
3. Clone the repository
```bash
$ git clone https://github.com/arisculala/nodejs-express-postgres-boilerplate.git
```
4. Run the docker command to initialize postgresql
```bash
$ cd nodejs-express-postgres-boilerplate
$ npm install
$ npm run start-pg
```
5. Initialize and the database
```bash
$ chmod +x src/scripts/db/initialize_db.sh
$ ./src/scrips/db/initialize_db.sh
```

### Installation
1. Copy .env.example (Configure the service by updating the .env file with your PostgreSQL connection details)
```bash
$ cd nodejs-express-postgres-boilerplate
$ cp .env.example .env
```
2. Install dependencies
```bash
$ npm install
```
3. Run the service
```bash
$ npm run dev
```
4. Open service in the browser
```bash
http://localhost:3000/api/healthcheck/liveness
```

### Postman
You can import provided postman collection under `nodejs-express-postgres-boilerplate/docs/postman/nodejs-express-postgres-boilerplate.postman_collection.json`


### Run test
```bash
$ npm run test
```

## References
