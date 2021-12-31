import { logger } from '../util/logger';

class LRUCache {
  constructor(capacity: number) {
    this.capacity = capacity;
    logger.debug(`LRUCache initialized with capacity of ${capacity}`);
  }
  private cache: Map<string, any> = new Map<string, any>();
  private capacity: number;

  public get(key: string): any {
    const value = this.cache.get(key);
    if (value === undefined) {
      logger.debug(`LRUCache GET: miss for key ${key}`);
      return undefined;
    } else {
      logger.debug(`LRUCache GET: hit for key ${key}`);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
  }

  put(key: string, value: any): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
      logger.debug(`LRUCache PUT: key ${key} already in cache, value will be rewritten`);
    }
    if (this.cache.size >= this.capacity) {
      const keyToEvict = this.cache.keys().next().value;
      this.cache.delete(keyToEvict);
      logger.debug(`LRUCache PUT: reached max capacity, key ${keyToEvict} will be evicted`);
    }
    logger.debug(`LRUCache PUT: adding value for key ${key}`);
    this.cache.set(key, value);
  }
}

export = LRUCache;