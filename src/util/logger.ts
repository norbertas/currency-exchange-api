import pino from 'pino';

export const logger = pino({
  level: (process.env.DEBUG_LOGS === 'true') ? 'debug' : 'info',
  transport: {
    target: 'pino-pretty'
  }
});