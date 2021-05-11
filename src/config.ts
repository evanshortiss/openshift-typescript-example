import { from, logger } from 'env-var';
import * as pino from 'pino';

const { get } = from(process.env, {}, logger);

const config = {
  PORT: get('PORT').default('8080').asPortNumber(),

  LOG_LEVEL: get('LOG_LEVEL')
    .default('debug')
    .asEnum(Object.keys(pino.levels.values)),

  REDIS_SERVICE_HOST: get('REDIS_SERVICE_HOST').asString(),
  REDIS_SERVICE_PORT: get('REDIS_SERVICE_PORT').default(6379).asPortNumber(),
  REDIS_SERVICE_PASS: get('REDIS_SERVICE_PASS').asString(),
};

export = config;
