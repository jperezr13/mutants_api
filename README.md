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

Devuelve estadísticas en base a las secuencias de ADN que han sido consultadas. 

- **URL:** https://api-meli-mutants-jperez.herokuapp.com/stats

- **Method:** GET

- **Respuesta:** 

  ```javascript
  {
    "count_mutant_dna": [number],
    "count_human_dna": [number],
    "ratio": [number]
  }
  ```
_________________________________________________

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
