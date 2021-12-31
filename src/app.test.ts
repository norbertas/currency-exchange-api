import request from 'supertest';
import app from './app';

jest.mock('./services/exchange-rate.service', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        getExchangeRate: jest.fn().mockResolvedValue({
          base: 'USD',
          rates: {
            USD: 1,
            EUR: 2,
            GBP: 3,
            ILS: 4
          }
        })
      };
    })
  };
});

describe('GET /quote', () => {
  it('Should return status code 400 if no params are passed', async () => {
    const res = await request(app)
      .get('/quote')
      .send();

    expect(res.statusCode).toEqual(400);
  });

  it('Should return exchangeRate and quoteAmount amount given baseCurrency, quoteCurrency and baseAmount', async () => {
    const res = await request(app)
      .get('/quote')
      .query({
        baseCurrency: 'USD',
        quoteCurrency: 'GBP',
        baseAmount: '143'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.exchangeRate).toBeDefined();
    expect(res.body.exchangeRate).toBe(3);
    expect(res.body.quoteAmount).toBeDefined();
    expect(res.body.quoteAmount).toBe(429);
  });
});
