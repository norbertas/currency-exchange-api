import express, { Request, Response } from 'express';
import { validationResult, ValidationChain, query } from 'express-validator';
import ExchangeRateService from '../services/exchange-rate.service';
import LRUCache from '../common/least-recently-used.cache';
import { Quote } from './quote.interface';

interface QuoteRequest {
  baseCurrency: string,
  quoteCurrency: string,
  baseAmount: number
}
class QuoteController {
  exchangeRateService: ExchangeRateService;
  supportedCurrencies = process.env.SUPPORTED_CURRENCIES;
  router: express.Router;

  validate = (validations: ValidationChain[]) => {
    return async (req: express.Request<Record<string, any> | undefined, unknown, unknown, QuoteRequest>, res: express.Response, next: express.NextFunction) => {
      await Promise.all(validations.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      res.status(400).json({ errors: errors.array() });
    };
  };

  constructor() {
    this.exchangeRateService = new ExchangeRateService(new LRUCache(process.env.LRU_CACHE_SIZE));
    this.router = express.Router();
  }

  getRoutes() {
    const routes = this.router.get('/', this.validate([
      query('baseCurrency').isIn(this.supportedCurrencies),
      query('quoteCurrency').isIn(this.supportedCurrencies),
      query('baseAmount').isInt()
    ]), async (req: Request<unknown, unknown, unknown, QuoteRequest>, res: Response) => {
      try {
        const exchangeRateResponse = await this.exchangeRateService.getExchangeRate(req.query.baseCurrency);
        const exchangeRateValue = exchangeRateResponse.rates[req.query.quoteCurrency];

        const quoteResponse: Quote = {
          exchangeRate: + exchangeRateValue.toFixed(3),
          quoteAmount: Math.round(req.query.baseAmount * exchangeRateValue)
        };

        res.status(200).send(quoteResponse);
      }
      catch (e: any) {
        res.status(500).send(e.message);
      }

    });
    return routes;
  }
}
export = QuoteController;