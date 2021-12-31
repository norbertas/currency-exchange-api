import axios, { AxiosResponse } from 'axios';
import { ExchangeRate } from './exchange-rate.interface';
import LRUCache from '../common/least-recently-used.cache';

class ExchangeRateService {
  constructor(cache: LRUCache) {
    this.cache = cache;
  }
  private cache: LRUCache;

  public async getExchangeRate(baseCurrency: string) {
    const cachedValue = this.cache.get(baseCurrency);
    if (cachedValue !== undefined) {
      return cachedValue;
    } else {
      const response: AxiosResponse<ExchangeRate> = await axios.get(`${process.env.EXCHANGE_RATE_API}/${baseCurrency}`);
      this.cache.put(baseCurrency, response.data);
      return response.data;
    }
  }
}
export = ExchangeRateService;