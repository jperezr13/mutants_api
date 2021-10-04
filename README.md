Rest API to detect if the DNA is from mutants or humans, it also returns the stats of all the DNAs that were validated by the API

_________________________________________________

## Use Instructions

The API have 2 endpoints:

### /mutant: 

You can call this end point with the DNA parameter, this is an array of strings, and this detects if this array is human or mutant, also this information is saved in a database in order to provide stats

- **URL:** https://api-meli-mutants-jperez.herokuapp.com/mutant

- **Method:** POST

- **Body Params:** JSON based in DNA sequence with this format:

  ```javascript
  {"dna": [[string], [string], [string], ...]}
  ```
  > **E.g Mutant:**
  {
  "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
  }

  > **E.g Human:**
  {
  "dna":["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTT"]
  }

This array must be NxN. The strings only have these characters; A, T, C, G.
 
 - **Expected results:** 
  
    - 200: This is a Mutant. 
    - 403: This is a Human.
    - 400: Any error or Incorrect DNA. 
    

### /stats:

Return stats of all the DNAs that were validated by the API

- **URL:** https://api-meli-mutants-jperez.herokuapp.com/stats

- **Method:** GET

- **Response:** 

  ```javascript
  {
    "count_mutant_dna": [number],
    "count_human_dna": [number],
    "ratio": [number]
  }
  ```
## Additional Information
This app was deployed in Heroku, with a free MySql Database https://remotemysql.com/
_________________________________________________

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
For running this app, you must create .env file with the environment variables to connect to database
> **E.g .env File:**
  ```bash
  TYPEORM_TYPE=mysql
  TYPEORM_HOST=localhost
  TYPEORM_DATABASE=db_name
  TYPEORM_USERNAME=user
  TYPEORM_PASSWORD=pass
  TYPEORM_PORT='your database port'
  TYPEORM_SYNCHRONIZE=true
  TYPEORM_RUN_MIGRATIONS=true
  TYPEORM_LOGGING=true
  TYPEORM_KEEP_CONNECTION_ALIVE=true
  TYPEORM_AUTO_LOAD_ENTITIES=true
```
## Installation

```bash
$ npm install
```
  or
```bash
$ yarn install
```
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

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## License

Nest is [MIT licensed](LICENSE).

## Coverage Test

![Screen Shot 2021-10-04 at 9 51 18 AM](https://user-images.githubusercontent.com/33725347/135873694-f54cab19-23c1-4feb-99c1-635aa275c503.png)

## Stress Test API Jmeter

![Test Jmeter (4)](https://user-images.githubusercontent.com/33725347/135889331-3461b20d-86e6-4738-a3e1-73de377d59b2.jpg)
![Test Jmeter (1)](https://user-images.githubusercontent.com/33725347/135889436-fb0ee665-99f0-49e1-b5f9-0d0bfaa0e37a.jpg)
![Test Jmeter (3)](https://user-images.githubusercontent.com/33725347/135889379-3c0faf5e-c5b5-4c3c-a7f1-fdfb2d672b70.jpg)
![Test Jmeter (2)](https://user-images.githubusercontent.com/33725347/135889397-e3dd4ddb-394b-48ae-80ec-9503c941db79.jpg)
![Test Jmeter](https://user-images.githubusercontent.com/33725347/135889462-c7393ba3-ab90-4556-8fbc-3cb2fe227745.jpg)

