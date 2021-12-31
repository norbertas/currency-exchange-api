import express, { Application } from 'express';
import QuoteController from './quote/quote.controller';

const app: Application = express();

app.use(express.json());

const quoteController = new QuoteController();
app.use('/quote', quoteController.getRoutes());

export default app;