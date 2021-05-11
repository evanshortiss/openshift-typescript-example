import redis from 'redis';
import {
  REDIS_SERVICE_HOST,
  REDIS_SERVICE_PORT,
  REDIS_SERVICE_PASS,
} from './config';
import log from './log';

let client!: redis.RedisClient;

if (REDIS_SERVICE_HOST) {
  log.info(
    `connecting redis client to: ${REDIS_SERVICE_HOST}:${REDIS_SERVICE_PORT}`
  );
  client = redis.createClient({
    host: REDIS_SERVICE_HOST,
    port: REDIS_SERVICE_PORT,
    password: REDIS_SERVICE_PASS,
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
