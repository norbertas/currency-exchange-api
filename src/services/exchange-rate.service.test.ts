import axios, { AxiosResponse } from 'axios';
import LRUCache from '../common/least-recently-used.cache';
import ExchangeRateService from './exchange-rate.service';

jest.mock('axios');
jest.mock('../common/least-recently-used.cache');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const currenciesToTest = ['USD', 'ILS'];

describe('Test Exchange Rate Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should call Exchange Rate API with provided currency if value is not in cache', async () => {
    const mockedCache = new LRUCache(2);
    mockedCache.get = jest.fn().mockReturnValue(undefined);
    const exchangeRateService = new ExchangeRateService(mockedCache);

    const mockedResponse: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.get.mockResolvedValue(mockedResponse);

    for (const currency of currenciesToTest) {
      await exchangeRateService.getExchangeRate(currency);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.EXCHANGE_RATE_API}/${currency}`);
    }
  });

  it('Should fetch exchange rate from Cache if exists', async () => {
    const mockedCache = new LRUCache(2);
    mockedCache.get = jest.fn().mockReturnValue({});
    const exchangeRateService = new ExchangeRateService(mockedCache);

    const mockedResponse: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    mockedAxios.get.mockResolvedValue(mockedResponse);

    for (let index = 0; index < 4; index++) {
      await exchangeRateService.getExchangeRate(currenciesToTest[0]);
    }
    expect(mockedAxios.get).toHaveBeenCalledTimes(0);

  });
});