import redis from 'redis';
import { REDIS_HOST, REDIS_PORT, REDIS_PASS } from './config';
import log from './log';

let client!: redis.RedisClient;

if (REDIS_HOST) {
  log.info(`connecting redis client to: ${REDIS_HOST}:${REDIS_PORT}`);
  client = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASS,
  });
}

export function getViewCount(): Promise<void | number> {
  return new Promise((resolve, reject) => {
    if (!client) {
      log.warn('no redis client. cannot return view count');
      resolve();
    } else {
      client.incr('views', (err, n) => {
        if (err) {
          reject(err);
        } else {
          resolve(n);
        }
      });
    }
  });
}
