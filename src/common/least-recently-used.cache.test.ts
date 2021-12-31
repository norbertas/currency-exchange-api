import LRUCache from './least-recently-used.cache';

describe('Test LRU Cache', () => {
  it('Should return value from cache after adding it', () => {
    const cache = new LRUCache(2);
    cache.put('key', 'value');
    expect(cache.get('key')).toBe('value');
  });

  it('Should return undefined if key does not exist', () => {
    const cache = new LRUCache(2);
    expect(cache.get('key')).toBeUndefined();
  });

  it('Should evict least used recently used keys', () => {
    const cache = new LRUCache(3);
    cache.put('key1', 'value1');
    cache.put('key2', 'value2');
    expect(cache.get('key1')).toBe('value1');
    cache.put('key3', 'value3');
    cache.put('key4', 'value4');
    expect(cache.get('key2')).toBeUndefined();
  });

  it('Should return latest value from cache for the same key', () => {
    const cache = new LRUCache(2);
    cache.put('key1', 'value1');
    cache.put('key2', 'value2');
    cache.put('key1', 'newValue1');
    expect(cache.get('key1')).toBe('newValue1');
  });
});