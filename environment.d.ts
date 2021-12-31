declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXCHANGE_RATE_API: string;
      DEBUG_LOGS: string;
      PORT?: string;
      LRU_CACHE_SIZE: number;
      SUPPORTED_CURRENCIES: [string];
    }
  }
}

export { };