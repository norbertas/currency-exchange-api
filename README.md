# A simple Currency Exchange API

API is written using Node.js with Express using Typescript. express-validator is used for validating the requests.

Jest and Supertest is used for testing.

Pino is used for logging. 

## Endpoints

`GET /quote`

### Request
| Query parameter | Description |
| ---------| ----------- |
| baseCurrency | String, 3 letters ISO currency code. Currency to convert from. |
| quoteCurrency | String, 3 letters ISO currency code. Currency to convert to. |
| baseAmount | Integer. The amount to convert in cents. Example: 100 (1 USD) |

Supported currencies are USD, EUR, GBP and ILS. API calculates the total amount expected in the quoteCurrency accordingly to the exchange rate provided by the 3rd party service.

### Response

Response body: JSON with the following properties
| Property |  Description |
| -------- | ------------ |
| exchangeRate | Decimal, the offered exchange rate. Up to 3 decimal digits. |
| quoteAmount | Integer, the expected amount in cents. Rounded with default `Math.round()` |

## Caching

LRU Cache is used for caching exchange rates fetched from external API. 

Cache size can be passed via environment variable `LRU_CACHE_SIZE` (defaults to 2).

LRU Cache is implemented as simple in-memory cache using Javascript Map type as it holds key-value pairs and remembers the original insertion order of the keys.

## 3rd party exchange provider

Exchange rates are fetched from https://exchangerate-api.com

## Running application

`npm run dev` - runs application in development mode with reload on save

`npm run start` - transpiles Typescript to Javascript and runs application

Application tested with Node.js version v16.13.1.

Before running application run `npm install`.

## Testing

`npm run test` - runs tests

## Environment variables
| Variable | Description | Default |
| ---------| ----------- | ------- |
| EXCHANGE_RATE_API | External Exchange Rate API URL | - |
| PORT | Port for application to use | 3000 |
| DEBUG_LOGS | Enables debug logging | false |
| LRU_CACHE_SIZE | LRU Cache size for caching exchange rates | 2 |


Environment variables are taken from the [.env](./.env) file using dotenv library.
